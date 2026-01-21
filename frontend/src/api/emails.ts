import { api } from "./api";

export const getScheduledEmails = async () => {
  const res = await api.get("/emails/scheduled");
  return res.data;
};

export const getSentEmails = async () => {
  const res = await api.get("/emails/sent");
  return res.data;
};

export const scheduleEmails = async (payload: any) => {
  const res = await api.post("/emails/schedule", payload);
  return res.data;
};
