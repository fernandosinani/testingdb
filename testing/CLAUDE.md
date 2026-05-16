# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Goal

Backend system to store and manage staff information for a small company. Phase 1 focuses on the API and database. A frontend web form will be added later.

## Tech Stack

- Python 3.x
- FastAPI
- SQLite (via SQLAlchemy ORM)
- Pydantic for data validation

## Project Structure

```
testing/
├── .env                  # Environment config
├── requirements.txt      # Python dependencies
├── staff.db              # SQLite database file (generated)
├── main.py               # FastAPI app entry point
├── models.py             # SQLAlchemy models
├── schemas.py            # Pydantic request/response schemas
├── database.py           # Database connection and session config
└── venv/                 # Virtual environment (not committed)
```

## Environment Setup

```bash
python -m venv venv
.\venv\Scripts\activate   # Windows
pip install -r requirements.txt
```

## Running the App

```bash
uvicorn main:app --reload
```

API docs available at `http://127.0.0.1:8000/docs` (Swagger) and `http://127.0.0.1:8000/redoc`.

## Data Model — Staff

| Field      | Type   | Constraints          |
|------------|--------|----------------------|
| id         | int    | PK, employee ID, unique |
| name       | str    | required             |
| lastname   | str    | required             |
| email      | str    | required             |
| phone      | str    | required             |

## API Endpoints

| Method | Path          | Description              |
|--------|---------------|--------------------------|
| POST   | `/staff`      | Add new staff member     |
| GET    | `/staff`      | List all staff members   |
| GET    | `/staff/{id}` | Get staff by employee ID |
| PUT    | `/staff/{id}` | Update staff member      |
| DELETE | `/staff/{id}` | Delete staff member      |

## Error Handling

- Duplicate employee ID → 409 Conflict
- Missing required fields → 422 Unprocessable Entity (FastAPI handles this via Pydantic)
- Staff not found → 404 Not Found
