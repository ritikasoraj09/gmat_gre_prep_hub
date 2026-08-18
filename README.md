# GRE & GMAT Prep Hub

An AI-powered exam preparation platform for GRE and GMAT aspirants. Students practice with real exam-style questions, get a live timer and scoring, track progress on an analytics dashboard, and get instant doubt resolution from an AI chatbot.

Presented by **Team 52**.

---

## Table of Contents

1. [Problem Statement](#problem-statement)
2. [Features](#features)
3. [Tech Stack](#tech-stack)
4. [Architecture](#architecture)
5. [Project Structure](#project-structure)
6. [Getting Started](#getting-started)
7. [Environment Variables](#environment-variables)
8. [API Reference](#api-reference)
9. [Dataset](#dataset)
10. [Usability / Application](#usability--application)
11. [Team](#team)
12. [References](#references)

---

## Problem Statement

Students preparing for GMAT and GRE exams face multiple challenges: finding high-quality past-year questions, accessing realistic exam simulations, and getting instant clarification on doubts. Traditional study material (books, PDFs) doesn't provide interactive learning or track progress. Many students also lack access to expert tutors for quick query resolution.

**GRE & GMAT Prep Hub** solves this with a comprehensive, AI-powered platform that lets students:
- Practice in an actual exam-like environment
- Track their performance over time
- Get instant AI-based support for doubts

## Features

- **Timed practice exams** across GRE (Verbal, Quantitative, Analytical Writing) and GMAT (Quantitative, Verbal, Data Insights) sections
- **Difficulty-tiered questions** — beginner / intermediate / advanced
- **AI chatbot** for step-by-step doubt resolution, powered by the OpenAI API
- **Progress dashboard** with score trends, section-wise breakdowns, and time-tracking, built with Recharts
- **Smooth, animated UI** using Framer Motion
- **Multi-device compatible**, responsive layout

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React, Tailwind CSS, shadcn/ui-style components |
| Backend | Node.js, Express.js |
| Database | PostgreSQL |
| AI Chatbot | OpenAI API |
| Data Visualization | Recharts |
| Animation | Framer Motion |
| Deployment | AWS / Google Cloud / Firebase |

## Architecture

```
HTML & CSS  →  JavaScript  →  React.js  →  Node.js (Backend)  →  PostgreSQL
 (Exam UI)     (interactivity)  (components)   (API, scoring,      (persistence)
                                                 chatbot proxy)
```

Request flow:

```
Client (React)
   │
   ├── GET  /api/questions?section=verbal&difficulty=medium
   ├── POST /api/scores                (save a completed attempt)
   ├── GET  /api/scores/:userId        (fetch history for dashboard)
   └── POST /api/chatbot               (ask the AI a doubt)
            │
            ▼
      Express server
            │
            ├── PostgreSQL (questions, attempts, users)
            └── OpenAI API (chat completions)
```

## Project Structure

```
gre-gmat-prep-hub/
├── README.md
├── .gitignore
├── client/                        # React frontend
│   ├── package.json
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── index.html
│   └── src/
│       ├── main.jsx
│       ├── App.jsx
│       ├── index.css
│       ├── api/
│       │   └── client.js          # fetch wrapper for backend API
│       ├── data/
│       │   └── sampleQuestions.js # local fallback/demo question bank
│       ├── components/
│       │   ├── Navbar.jsx
│       │   ├── ExamTimer.jsx
│       │   ├── QuestionCard.jsx
│       │   ├── AIChatbot.jsx
│       │   ├── ProgressDashboard.jsx
│       │   └── ui/
│       │       ├── button.jsx
│       │       └── card.jsx
│       └── pages/
│           ├── Home.jsx
│           ├── ExamPage.jsx
│           └── Dashboard.jsx
└── server/                        # Express backend
    ├── package.json
    ├── .env.example
    ├── server.js
    ├── models/
    │   ├── db.js
    │   └── schema.sql
    ├── controllers/
    │   ├── questionController.js
    │   ├── scoreController.js
    │   └── chatbotController.js
    ├── routes/
    │   ├── questions.js
    │   ├── scores.js
    │   └── chatbot.js
    └── middleware/
        └── errorHandler.js
```

## Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL 14+
- An OpenAI API key

### 1. Clone and install

```bash
git clone https://github.com/<your-username>/gre-gmat-prep-hub.git
cd gre-gmat-prep-hub

# Backend
cd server
npm install

# Frontend
cd ../client
npm install
```

### 2. Set up the database

```bash
createdb gre_gmat_prep_hub
psql -d gre_gmat_prep_hub -f server/models/schema.sql
```

### 3. Configure environment variables

Copy `server/.env.example` to `server/.env` and fill in your values (see [Environment Variables](#environment-variables)).

### 4. Run it

```bash
# Terminal 1 — backend (http://localhost:5000)
cd server
npm run dev

# Terminal 2 — frontend (http://localhost:5173)
cd client
npm run dev
```

## Environment Variables

`server/.env`

```
PORT=5000
DATABASE_URL=postgresql://user:password@localhost:5432/gre_gmat_prep_hub
OPENAI_API_KEY=sk-your-key-here
CLIENT_ORIGIN=http://localhost:5173
```

## API Reference

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/questions` | List questions, filterable by `?section=` and `?difficulty=` |
| GET | `/api/questions/:id` | Get a single question |
| POST | `/api/scores` | Save a completed attempt `{ userId, section, score, totalQuestions, timeTakenSec }` |
| GET | `/api/scores/:userId` | Get score history for the dashboard |
| POST | `/api/chatbot` | Send a doubt `{ question, context }`, get a step-by-step AI explanation |

## Dataset

The content dataset covers GMAT and GRE practice questions organized by section (Verbal, Quantitative, Data Insights, Analytical Writing) and difficulty level (beginner / intermediate / advanced), along with per-question solving-time tracking. A small demo set ships in `client/src/data/sampleQuestions.js` and mirrors the schema used by the `questions` table in `server/models/schema.sql`, so it can be swapped for a full question bank without touching the app code.

## Usability / Application

- Clear, instructive UI for problem-solving with difficulty-tiered questions
- AI chatbot for instant answers and time management
- Test-score analysis for students to study their performance
- Multi-device compatibility for practice on any device

## Team

| ID | Name |
|---|---|
| 23BAI10161 | Arnav Sonwani |
| 23BAI10197 | Rujjul Saha |
| 23BAI10972 | Neel Lokhande |
| 23BAI11030 | Nirvan Singh |
| 23BAI11041 | Aishwarya Mazumdar |
| 23BAI11084 | Ritika Soraj |

## References

- Official GRE and GMAT exam guides (ETS, GMAC)
- OpenAI API documentation — https://platform.openai.com/docs
- React documentation — https://react.dev
- Recharts documentation — https://recharts.org
