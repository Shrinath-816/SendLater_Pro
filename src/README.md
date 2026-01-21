ReachInbox – Backend (Email Scheduler Service)

This backend is a production grade email scheduling service built as part of the ReachInbox hiring assignment.
It supports persistent scheduling, rate limiting, concurrency and reliable email delivery using BullMQ + Redis, PostgreSQL and Ethereal SMTP.
# Features Implemented
# Core Features

Schedule emails to be sent at a specific future time

Persistent scheduling using BullMQ delayed jobs (❌ no cron jobs)

Reliable job execution that survives server restarts

Email sending via Ethereal Email (SMTP) for testing

Stores all email metadata and status in PostgreSQL

# Reliability & Scale

Worker-based processing with configurable concurrency

Hourly rate limiting using Redis (safe across workers)

Automatic retry with BullMQ backoff

Idempotent job handling (no duplicate sends)

Clean failure handling (scheduled, sent, failed)

# Tech Stack

Node.js + TypeScript

Express.js – REST APIs

BullMQ – Job queue & scheduler

Redis – Queue backend & rate limiting

PostgreSQL (Neon) – Persistent storage

Nodemailer + Ethereal Email – SMTP testing

# Project stcture
backend/
├── src/
│   ├── config/        # DB & Redis configuration
│   ├── queues/        # BullMQ queue setup
│   ├── routes/        # API routes
│   ├── workers/       # Email worker
│   ├── app.ts         # Express app
│   └── server.ts      # Server bootstrap
├── .env.example
├── package.json
└── README.md


# Environment Setup
1) Create .env file
    
    Copy the example file:  cp .env.example .env

Then fill in your own values for credentials in .env for

PORT=4000

DATABASE_URL=postgresql://<user>:<password>@<host>/<db>?sslmode=require

REDIS_HOST=127.0.0.1
REDIS_PORT=6379

WORKER_CONCURRENCY=5
MAX_EMAILS_PER_HOUR=200

SMTP_HOST=smtp.ethereal.email
SMTP_PORT=587
SMTP_USER=your_ethereal_user@ethereal.email
SMTP_PASS=your_ethereal_password


# Database schema for postgre SQL(Neon) is 

CREATE TABLE IF NOT EXISTS emails (
  id UUID PRIMARY KEY,
  user_email TEXT NOT NULL,
  recipient_email TEXT NOT NULL,
  subject TEXT NOT NULL,
  body TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('scheduled', 'sent', 'failed')),
  scheduled_at TIMESTAMP NOT NULL,
  sent_at TIMESTAMP,
  sender_email TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

# Running the backend

1) Start redis (Using Dcocker)

docker run -d -p 6379:6379 --name redis-bullmq redis:7

2) Install dependencies 

npm install


3) Start API server

npm run dev


server runs at - http://localhost:4000

health check - GET /health


4) Start worker in seperate terminal with 

npm run worker


# API endpoints

1) Schedule email

POST /emails/schedule


Request boy (JSON) should contain - 

{
  "userEmail": "test@gmail.com",
  "emails": ["test@example.com"],
  "subject": "Test Email",
  "body": "Hello from ReachInbox",
  "scheduledAt": "2026-01-21T09:52:00Z",
  "sender": "your_ethereal_user@ethereal.email" 
}

here the sender will be like - postgresql://neondb_owner:npg_XVP0nLuH3t........


2) View scheduled email at 

GET /emails/scheduled


3) View sent/ failed emails

GET /emails/sent


4) Email Delivery (Ethereal)

Emails are sent via Ethereal Email

They do not reach real inboxes

Each send logs a Preview URL in the worker: 🔗 https://ethereal.email/message/xxxx


 # bScheduling & Rate Limiting Design

Emails are scheduled using BullMQ delayed jobs

No cron jobs are used

Rate limiting is enforced using Redis counters:

Keyed by sender + hour window

When limit is exceeded:

Job throws an error

BullMQ retries with backoff (1 hour)

This approach is safe across:

Multiple workers

Multiple server instances

# Restart Safety

Jobs are stored in Redis

Email state is stored in PostgreSQL

On restart:

Pending jobs continue correctly

Sent emails are not duplicated













Redis is run using Docker.

Container:
redis:7

Port:
6379

