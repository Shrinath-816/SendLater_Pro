 # Email Scheduling System 
SendLater Pro is a queue-based email scheduling system built as part of the Software Development Internship assignment for ReachInbox (Outbox Labs).
The project demonstrates how production systems reliably schedule and send emails without cron jobs, using persistent queues and worker processes.
# Project Objective
Schedule emails for a specific future time
Ensure no email is lost or duplicated
Handle rate limits and concurrency
Survive server and worker restarts
Provide a dashboard to monitor emails
# Project Structure

SendLater_Pro/
├── backend/    → Email scheduler, queue, worker
├── frontend/   → React dashboard
└── README.md   → Project overview
# Tech Stack
Backend
Node.js + TypeScript
Express.js
BullMQ + Redis
PostgreSQL (Neon)
Nodemailer (Ethereal SMTP)
Frontend
React.js (Vite)
TypeScript
Axios
React Router DOM
# Key Backend Features
Email scheduling using BullMQ delayed jobs
No cron jobs used
Persistent jobs stored in Redis
Email state stored in PostgreSQL
Separate Worker process
 # Configurable:
Worker concurrency
Hourly email rate limit
Automatic retry and failure handling
Email status tracking:
scheduled
sent
failed
# Frontend Features
React dashboard
View:
Scheduled emails
Sent / failed emails
Real-time data from backend APIs
Clean and minimal UI
Loading and empty states handled
# Restart Safety
Jobs are persisted in Redis
Email state is persisted in PostgreSQL
Restarting backend or worker does not lose scheduled emails

# How to Run
Backend setup → backend/README.md
Frontend setup → frontend/README.md
Each folder contains clear run instructions and environment setup.
# Environment & Security
.env files are not committed
.env.example files are provided
Reviewers can configure their own credentials
