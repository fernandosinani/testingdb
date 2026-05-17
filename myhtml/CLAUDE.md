# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Single-page React frontend for the Company Staff Database. Connects to the FastAPI backend in `../testing/` to manage staff records (name, lastname, ID, email, phone).

## Tech Stack

- React 19
- Vite (dev server + build)
- Plain CSS (no framework)
- FastAPI backend in `../testing/` (Python, SQLite, SQLAlchemy)

## Project Structure

```
myhtml/
├── index.html          # Vite entry point
├── package.json
├── vite.config.js
├── CLAUDE.md
├── public/
└── src/
    ├── main.jsx        # React entry
    ├── App.jsx          # Main component (form + table + search)
    └── App.css          # All styles
```

## Commands

```bash
# Install dependencies
npm install

# Dev server (runs on http://localhost:5173, proxies /staff to backend)
npm run dev

# Production build (outputs to dist/)
npm run build
```

## Backend

The FastAPI backend must be running separately:

```bash
cd ../testing
.\venv\Scripts\activate
uvicorn main:app --reload
```

The Vite dev server proxies `/staff` API calls to `http://localhost:8000` so no CORS issues in development.
