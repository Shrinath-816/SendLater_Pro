# SendLater Pro – Frontend (React Dashboard)

This is the frontend dashboard for the SendLater Pro / ReachInbox Email Scheduler assignment.

The frontend is built using React + TypeScript and provides a clean UI to:

View Scheduled Emails

View Sent / Failed Emails

Schedule new emails (via backend APIs)

It communicates with the backend via REST APIs.

#  Tech Stack

React.js (Vite)

TypeScript

React Router DOM

Axios

(Styling can be Tailwind / CSS – optional)

# Project Structure
frontend/
├── src/
│   ├── api/          # API calls (axios)
│   ├── components/   # Reusable UI components
│   ├── pages/        # Pages (Dashboard, Scheduled, Sent)
│   ├── types/        # TypeScript interfaces
│   ├── utils/
│   ├── App.tsx
│   └── main.tsx
├── index.html
├── package.json
├── tsconfig.json
└── README.md

# Prerequisites

Before running the frontend, make sure:

Backend is running on:

http://localhost:4000


Node.js version 18+ is installed

▶️ How to Run Frontend
1️⃣ Install dependencies

From the frontend folder:

npm install

2️⃣ Start development server
npm run dev


You should see output like:

Local: http://localhost:5173


# Open in browser:

http://localhost:5173

🔗 Backend Integration

The frontend communicates with the backend using Axios.

Base URL configuration:

http://localhost:4000


Make sure the backend server and worker are running:

cd backend
npm run dev
npm run worker

📡 Available Pages
Route	Description
/	Dashboard
/scheduled	View scheduled emails
/sent	View sent / failed emails

# API Endpoints Used

GET /emails/scheduled → Fetch scheduled emails

GET /emails/sent → Fetch sent / failed emails

POST /emails/schedule → Schedule new emails

# Environment Variables

The frontend does not require secrets for basic functionality.

If environment variables are added later (e.g. Google OAuth), use:

.env.example


and never commit .env.

# Development Notes

The frontend expects backend responses in JSON format

Loading and empty states are handled at UI level

Email scheduling logic is fully handled by backend

This frontend focuses on clarity and usability, not heavy UI animations

# Status

✔ Frontend setup complete
✔ Backend integration working
✔ Ready for UI polish & OAuth integration

# Next Enhancements (Optional)

Google OAuth login

CSV upload for email lists

Compose Email modal

Better table UI & pagination

Toast notifications

🏁 Final Notes

This frontend is designed to be simple, clean, and easy to evaluate for the ReachInbox hiring assignment.

For backend setup and architecture details, refer to:
```
