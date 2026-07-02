# Smart Audit Pipeline - Frontend

A React-based frontend for the **Smart Audit Pipeline** application. This application provides an intuitive user interface for managing journal entries, viewing AI-generated audit insights, updating metadata, and performing similarity searches.

---

## Features

### Dashboard
- View overall audit statistics
- Total Journal Entries
- Pending Entries
- Completed Entries
- Risk Distribution
- Anomaly Count

### Journal Entries
- View all journal entries
- Display company name, amount, risk level, and status
- Open detailed journal entry information

### Create Journal Entry
- Create new journal entries
- Automatic background AI enrichment
- Dashboard and table refresh after creation

### Metadata Update
- Update comments
- Update workflow status
- No AI reprocessing triggered

### Similarity Search
Search similar journal entries using different AI strategies:

- Semantic Similarity
- Financial Similarity
- Entity Similarity

Displays:
- Similar Entries
- Risk Level
- Similarity Score

### Delete Entry
- Delete journal entries
- Confirmation dialog before deletion
- Automatic UI refresh

---

# Technology Stack

- React
- Axios
- Bootstrap 5
- JavaScript (ES6)
- React Class Components

---

# Project Structure

```
frontend/
│
├── public/
│
├── src/
│   ├── components/
│   │   ├── Dashboard.js
│   │   ├── CreateEntry.js
│   │   ├── EntryModal.js
│   │   ├── JournalTable.js
│   │   └── SimilaritySearch.js
│   │
│   ├── services/
│   │   └── api.js
│   │
│   ├── App.js
│   ├── index.js
│   └── index.css
│
├── package.json
└── README.md
```

---

# Installation

## Clone Repository

```bash
git clone <repository-url>
```

Move into the frontend directory:

```bash
cd frontend
```

---

## Install Dependencies

```bash
npm install
```

---

## Start Development Server

```bash
npm start
```

Application runs at:

```
http://localhost:3000
```

---

# Backend Requirement

The backend server must be running before starting the frontend.

Default backend URL:

```
http://localhost:2000/api/entries
```

---

# User Workflow

```
Dashboard
      │
      ▼
Create Journal Entry
      │
      ▼
Background AI Processing
      │
      ▼
Journal Entries Table
      │
      ▼
View Entry Details
      │
      ├── Update Metadata
      │
      ├── View AI Anomalies
      │
      └── Similarity Search
```

---

# Screens

The application includes:

- Dashboard
- Create Journal Entry
- Journal Entries Table
- Entry Details Modal
- Metadata Update
- Similarity Search

---

# API Integration

The frontend communicates with the backend using Axios.

Main endpoints used:

| Method | Endpoint | Purpose |
|---------|----------|---------|
| GET | `/api/entries` | Fetch all journal entries |
| POST | `/api/entries` | Create journal entry |
| GET | `/api/entries/:id` | View journal entry |
| PUT | `/api/entries/:id/metadata` | Update metadata |
| DELETE | `/api/entries/:id` | Delete journal entry |
| GET | `/api/entries/dashboard/stats` | Dashboard statistics |
| POST | `/api/entries/search/similar` | Similarity Search |

---

# Future Improvements

- Authentication
- Pagination
- Advanced Filters
- Dark Mode
- Export to Excel/PDF
- Real AI Embedding Integration

---

# Author

**Jyoti Rani**

