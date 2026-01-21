import { Router } from "express";
import { emailQueue } from "../queues/email.queue";
import { pool } from "../config/db";
import { v4 as uuid } from "uuid";


const router = Router();

router.post("/schedule", async (req, res) => {
  const { userEmail, emails, subject, body, scheduledAt, sender } = req.body;

  console.log("📥 Schedule request received");

  for (const to of emails) {
    const id = uuid();

    console.log("📝 Inserting email into DB:", id);

    await pool.query(
      `INSERT INTO emails
       (id, user_email, recipient_email, subject, body, status, scheduled_at, sender_email)
       VALUES ($1,$2,$3,$4,$5,'scheduled',$6,$7)`,
      [id, userEmail, to, subject, body, scheduledAt, sender]
    );

    const scheduledTime = new Date(scheduledAt).getTime();
    const delay = Math.max(scheduledTime - Date.now(), 0);

    console.log("⏳ Calculated delay (ms):", delay);

    await emailQueue.add(
      "send-email",
      { emailId: id, to, subject, body, sender },
      { delay, jobId: id }
    );

    console.log("✅ Job added to queue:", id);
  }

  res.json({ message: "Emails scheduled successfully" });
});


// GET scheduled emails
router.get("/scheduled", async (_, res) => {
  const result = await pool.query(
    "SELECT * FROM emails WHERE status='scheduled' ORDER BY scheduled_at ASC"
  );
  res.json(result.rows);
});

// GET sent emails
router.get("/sent", async (_, res) => {
  const result = await pool.query(
    "SELECT * FROM emails WHERE status IN ('sent','failed') ORDER BY sent_at DESC"
  );
  res.json(result.rows);
});

export default router;
