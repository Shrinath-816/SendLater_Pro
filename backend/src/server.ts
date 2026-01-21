import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import { connectDB } from "./config/db";
import { redis } from "./config/redis";

const PORT = process.env.PORT || 4000;

const start = async () => {
  await connectDB();
  await redis.ping();
  console.log("Redis connected");

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

start();



