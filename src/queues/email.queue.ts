import { Queue } from "bullmq";

export const emailQueue = new Queue("emailQueue", {
  connection: {
    host: process.env.REDIS_HOST || "127.0.0.1",
    port: parseInt(process.env.REDIS_PORT || "6379", 10),
  },
  defaultJobOptions: {
    attempts: 5,               
    backoff: {
      type: "fixed",
      delay: 60 * 60 * 1000,    
    },
    removeOnComplete: true,
    removeOnFail: true,
  },
});


