# Smart Audit Pipeline

An AI-powered Financial Audit Pipeline built using the MERN stack. The application automates journal entry processing by performing AI enrichment, risk assessment, anomaly detection, metadata management, and similarity search through a modern React frontend and Node.js backend.

---

## Project Overview

The Smart Audit Pipeline is designed to simulate an intelligent auditing workflow.

Each journal entry passes through an asynchronous enrichment pipeline where it is analyzed for:

- Risk Score
- Risk Level
- Anomaly Detection
- Semantic Vector
- Financial Vector
- Entity Vector

The application also provides dashboard analytics, metadata management, similarity search, and complete CRUD functionality.

---

# Features

## Backend

- CRUD APIs
- Repository-Service-Controller Architecture
- MongoDB with Mongoose
- Background AI Enrichment Worker
- Risk Score Calculation
- Risk Level Classification
- Anomaly Detection
- Semantic Vector Generation
- Financial Vector Generation
- Entity Vector Generation
- Dashboard Analytics API
- Similarity Search API
- Metadata Update API
- Model Migration Script
- Risk Score Update Script

---

## Frontend

- Dashboard
- Create Journal Entry
- View Journal Entry
- Delete Journal Entry
- Metadata Update
- Similarity Search
- Strategy Selection
- Bootstrap UI
- Responsive Layout

---

# Technology Stack

## Frontend

- React
- JavaScript (ES6)
- Axios
- Bootstrap 5

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose

---

# Project Structure

```
MERN_1/
│
├── README.md
│
├── backend/
│   ├── README.md
│   ├── .env.example
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── repositories/
│   ├── routes/
│   ├── scripts/
│   ├── services/
│   ├── workers/
│   ├── package.json
│   └── index.js
│
├── frontend/
│   ├── README.md
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
│
└── .gitignore
```

---

# Installation

## Clone Repository

```bash
git clone <repository-url>
```

Move into the project directory

```bash
cd MERN_1
```

---

# Backend Setup

```bash
cd backend

npm install
```

Create `.env`

```env
PORT=2000
MONGO_URI=mongodb://127.0.0.1:27017/audit-pipeline
```

Run backend

```bash
npm run dev
```

---

# Frontend Setup

```bash
cd frontend

npm install

npm start
```

Application runs on

```
http://localhost:3000
```

Backend runs on

```
http://localhost:2000
```

---

# Application Workflow

```
Create Journal Entry
          │
          ▼
Store in MongoDB
          │
          ▼
Background AI Worker
          │
          ▼
Risk Analysis
          │
          ▼
Anomaly Detection
          │
          ▼
Vector Generation
          │
          ▼
Dashboard
          │
          ▼
Similarity Search
          │
          ▼
Metadata Review
```

---

# Available Scripts

## Backend

```bash
npm run dev
```

Start development server

```bash
npm run seed
```

Populate sample journal entries

```bash
npm run migrate:models
```

Upgrade existing entries from v1 to v2

```bash
npm run update:risk
```

Recalculate risk scores

---

## Frontend

```bash
npm start
```

Start React application

```bash
npm run build
```

Build production application

---

# API Endpoints

| Method | Endpoint | Description |
|----------|----------|-------------|
| POST | /api/entries | Create Journal Entry |
| GET | /api/entries | Get All Entries |
| GET | /api/entries/:id | Get Entry |
| PUT | /api/entries/:id | Update Entry |
| DELETE | /api/entries/:id | Delete Entry |
| PUT | /api/entries/:id/metadata | Update Metadata |
| GET | /api/entries/dashboard/stats | Dashboard Statistics |
| POST | /api/entries/search/similar | Similarity Search |

---

# AI Enrichment

Each journal entry is automatically enriched with

- Risk Score
- Risk Level
- Anomaly Detection
- Semantic Vector
- Financial Vector
- Entity Vector

The enrichment runs asynchronously using a background worker.

---

# Future Improvements

- User Authentication
- Pagination
- Export Reports (Excel/PDF)
- Advanced Filters
- Real AI Embedding Models
- Notifications

---

# Author

**Jyoti Rani**

