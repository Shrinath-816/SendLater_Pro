import { Worker } from "bullmq";
import { redis } from "../config/redis";
import { pool } from "../config/db";
import nodemailer from "nodemailer";

console.log(" Worker file loaded");

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const MAX_PER_HOUR = Number(process.env.MAX_EMAILS_PER_HOUR || 100);

new Worker(
  "emailQueue",
  async (job) => {
    console.log(" Worker picked job:", job.id);

    const { emailId, to, subject, body, sender } = job.data;

    //  Safety check (prevents SMTP crash)
    if (!to || typeof to !== "string") {
      console.error(" Invalid recipient:", job.data);

      await pool.query(
        "UPDATE emails SET status='failed' WHERE id=$1",
        [emailId]
      );

      return;
    }

    //  Hourly rate limit (Redis-safe across workers)
    const hourKey = `rate:${sender}:${new Date().toISOString().slice(0, 13)}`;
    const count = await redis.incr(hourKey);
    if (count === 1) await redis.expire(hourKey, 3600);

    if (count > MAX_PER_HOUR) {
      console.log(" Rate limit exceeded, retrying later:", job.id);
      throw new Error("Rate limit exceeded"); 
    }

    try {
      const info = await transporter.sendMail({
        from: sender,
        to,
        subject,
        text: body,
      });

      console.log(" Email sent successfully:", to);
      console.log(" Preview URL:", nodemailer.getTestMessageUrl(info));

      await pool.query(
        "UPDATE emails SET status='sent', sent_at=NOW() WHERE id=$1",
        [emailId]
      );
    } catch (err) {
      console.error(" SMTP send failed:", err);

      await pool.query(
        "UPDATE emails SET status='failed' WHERE id=$1",
        [emailId]
      );

      throw err; 
    }
  },
  {
    connection: {
      host: process.env.REDIS_HOST || "127.0.0.1",
      port: parseInt(process.env.REDIS_PORT || "6379", 10),
    },
    concurrency: Number(process.env.WORKER_CONCURRENCY || 1),
  }
);

console.log("Worker registered and waiting");
