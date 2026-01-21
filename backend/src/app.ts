import express from "express";
import cors from "cors";
import emailRoutes from "./routes/email.routes";

const app = express();


app.use(cors());
app.use(express.json());


app.use("/emails", emailRoutes);

app.get("/health", (_, res) => {
  res.json({ status: "OK" });
});

export default app;



