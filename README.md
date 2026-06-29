# Workout Log API

## Description
The Workout Log API is a full‑stack fitness tracking application that allows users to securely log workouts, track progress, and manage their training history. It includes a complete authentication system, protected API routes, and a lightweight frontend built with vanilla JavaScript. The backend is powered by Node.js, Express, and MongoDB Atlas, and is fully prepared for deployment on Render.

---

## Features

### Authentication
- User signup
- User login
- JWT‑based authentication
- Persistent sessions via localStorage
- Protected workout routes
- Redirect logic for login, signup, and dashboard pages

### Workout Management
- Add workouts (name + reps/minutes + optional notes)
- Edit existing workouts
- Delete workouts
- Search workouts by keyword
- Auto‑sorted workout list
- Custom date/time selection
- Notes section with toggle
- Responsive UI

### Frontend
- Login page
- Signup page
- Dashboard (workouts page)
- Clean, dependency‑free UI
- Loading states and message helpers

### Backend
- RESTful API
- Express routing and controllers
- MongoDB Atlas + Mongoose
- Auth middleware (requireAuth)
- Environment‑based configuration
- Production‑ready server (Render)

---

## Tech Stack

| Layer      | Technology                     |
|------------|--------------------------------|
| Backend    | Node.js, Express               |
| Database   | MongoDB Atlas, Mongoose        |
| Auth       | JWT, bcrypt                    |
| Frontend   | HTML, CSS, Vanilla JavaScript  |
| Environment| dotenv                         |
| Deployment | Render                         |

---

## Project Structure

```
workout-log-api/
├── server.js                 # Express server entry point
├── package.json              # Dependencies and scripts
├── .env                      # Local environment variables (ignored)
├── .env.example              # Template for required env vars
│
├── middleware/
│   └── requireAuth.js        # Protects workout routes
│
├── models/
│   ├── userModel.js          # User schema (email, password, displayName)
│   └── workoutModel.js       # Workout schema (name, amount, notes, date)
│
├── routes/
│   ├── userRoutes.js         # Signup + login routes
│   └── workoutRoutes.js      # CRUD workout routes (protected)
│
└── public/                   # Frontend served by Express
├── index.html                # Dashboard (workouts)
├── login.html                # Login page
├── signup.html               # Signup page
├── styles.css                # Styling
├── login.js                  # Login logic
└── signup.js                 # Signup logic
```

---

## Environment Variables

Create a `.env` file in the backend root with the following values:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
NODE_ENV=development

These variables are required for both local development and production.
Do not commit your real `.env` file — it should remain in `.gitignore`.

For deployment (Render), set the same variables in the Render dashboard under:
Settings → Environment → Environment Variables

---

## Why This Stack?

This project uses a simple, reliable stack designed to stay easy to understand while still supporting real-world features like authentication, protected routes, and persistent data storage.

Node.js and Express provide a lightweight, flexible backend for building RESTful APIs. MongoDB and Mongoose offer a schema‑driven, scalable database layer that works well for user accounts and workout data. The frontend is built with vanilla JavaScript to keep the interface fast, dependency‑free, and easy to maintain.

The goal is clarity, not complexity — a clean full‑stack foundation that can grow without becoming overwhelming.

---

## Prerequisites

Before running the app, make sure you have:

- Node.js installed
- A MongoDB Atlas connection string (MONGO_URI)

(Optional)  
If you prefer running MongoDB locally instead of using Atlas, you may install and run a local MongoDB server.  
Just update your `MONGO_URI` in the `.env` file to point to your local instance.

---

## Getting Started

## Getting Started

If you want to get the project running quickly, here’s the short version:

1. Clone the repository:
   git clone https://github.com/ORandonat/workout-log-api.git

2. Navigate into the project folder:
   cd workout-log-api

3. Install dependencies:
   npm install

4. Create a `.env` file with your MONGO_URI and JWT_SECRET values.

5. Start the development server:
   npm run dev

For full setup details, see the “Running Locally” section below.

---

## Running Locally

### 1. Install dependencies
npm install

### 2. Create a `.env` file in the project root
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_secret
NODE_ENV=development

### 3. Start the development server
npm run dev

The server will start on the port defined in your `.env` file (default: 4000).

### 4. Open the app in your browser
http://localhost:4000

You can now sign up, log in, and manage workouts using the local backend and frontend.

---
     
## Usage

Whether you're running the app locally or using a deployed version, the workflow is the same:

- Create an account or log in with an existing one.
- Add new workouts by entering a name and an amount (reps or minutes).
- Optionally include notes or select a custom date and time.
- View your full workout history in a clean, sorted list.
- Edit any workout to update its details.
- Search workouts by keyword to quickly find past entries.
- Delete workouts you no longer need.

All workout actions are protected and require a valid logged‑in session.

---

## API Endpoints

Below are the available API routes for authentication and workout management.
Authentication routes are public, while workout routes require a valid JWT.

### Auth

#### Sign up  
**POST** `/api/user/signup`  
Body:  
```json
{
  "email": "user@example.com",
  "password": "your_password"
}
```

#### Log in
**POST** `/api/user/login`
Body:  
```json
{
  "email": "user@example.com",
  "password": "your_password"
}
```

Successful login returns a JWT used to access protected workout routes.

### Workouts (Protected)

#### Get all workouts
**GET** `/api/workouts`

#### Get a single workout
**GET** `/api/workouts/:id`

#### Create a new workout
**POST** `/api/workouts`
Body:
```json
{
  "name": "Push-ups",
  "amount": 20
}
```

#### Update a workout
**PATCH** `/api/workouts/:id`
Body (any field optional):
```json
{
  "name": "Sit-ups",
  "amount": 30
}
```

#### Delete a workout
**DELETE** `/api/workouts/:id`

---

## Screenshots

### Dashboard
<img width="2559" height="1271" alt="WorkoutLog_Dashboard" src="https://github.com/user-attachments/assets/3706e8a5-3b75-427d-a638-541797d44f66" />

### Add Form
<img width="704" height="602" alt="WorkoutLog_AddWorkout" src="https://github.com/user-attachments/assets/caecfb55-d413-41c2-8adb-33912ed505c3" />

### Edit Form
<img width="1036" height="1085" alt="WorkoutLog_EditForm" src="https://github.com/user-attachments/assets/e5e9a8e1-7dba-4932-b5eb-f2509bf541d2" />

### Signup page
<img width="2557" height="1264" alt="WorkoutLog_Signup" src="https://github.com/user-attachments/assets/c806245a-00dd-4b3e-957b-6fba962bb738" />

### Login page
<img width="2557" height="1269" alt="WorkoutLog_LoginPage" src="https://github.com/user-attachments/assets/31c9e83a-58ff-426c-96df-eb4f4126e50f" />

---

## Current Limitations

- Some elements do not have label attributes, which limits accessibility.

---

## Roadmap

### Completed
- Add user authentication (sign up, login, protected routes)

### Planned
- Add workout categories and filtering
- Add pagination for large workout histories
- Add sorting options (date, name, duration)
- Add data visualization (charts for workout trends)
- Add mobile-friendly UI improvements
- Add automated tests (unit, integration, and API)

---

## Changelog

- March 14, 2026 — Added dotenv functionality; moved hardcoded PORT to environment variable
- March 15, 2026 — Added route to fetch IP config; updated baseURL logic in frontend
- March 16, 2026 — Added notes section; updated schema and frontend
- March 17, 2026 — Added automatic date/time population for new entries
- March 18, 2026 — Added custom date/time selection; truncated seconds in UI
- March 19, 2026 — Added edit button and full edit workflow
- March 21, 2026 — Added search bar and filtering logic
- March 22, 2026 — Added reps/minutes dropdown; updated schema
- March 23, 2026 — Moved CSS to its own file; restructured HTML
- March 26, 2026 — Updated layout and added independent scrolling for workout list
- March 27, 2026 — Added Add Notes toggle; updated form structure and CSS
- March 29, 2026 — Refactored all IDs to kebab-case
- April 06, 2026 — Separated JS from HTML; added helpers; auto-sort by date
- April 08, 2026 — Redesigned workout card layout; improved styling
- April 10, 2026 — Added labels; refactored event wiring; added "hidden" class
- April 20, 2026 — Updated Add Workout form layout; added mobile media query; added loading states
- April 21, 2026 — Centralized message handling with showMessage/hideMessage helpers
- May 19, 2026 — Implemented full authentication flow; added persistent user session and welcome message; added top navigation header; improved UI layout; resolved JSON parsing and timing issues; removed internal files from version control
- June 26, 2026 — Updated API Endpoints section; added full README screenshots (main page, login, signup, add form, edit form, delete confirmation); reorganized Roadmap into Completed/Planned format; improved overall documentation clarity and consistency

---
### About the Developer
Built by **Nathan O'Rando**, a QA/Support hybrid engineer specializing in debugging, clean documentation, and practical backend design.
