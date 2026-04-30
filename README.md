# Workout Log API

## Description

This app is a simple workout log designed to help you track your fitness progress. You can add workouts with names, reps, or time spent, and update them as your routine evolves. It keeps your workouts organized so you can review, search, and manage your training history with ease.

## Features

- **Add Workouts** — Create new workouts with a name and amount (reps or minutes).
- **Edit Existing Entries** — Update any workout as your routine changes.
- **Search Your History** — Quickly find workouts by name or keyword.
- **Delete Workouts** — Remove entries you no longer need.
- **Load All Workouts** — View your full training history in a clean, organized list.
- **Responsive Frontend UI** — Simple, lightweight interface built with vanilla JavaScript.
- **RESTful API Backend** — Node.js + Express server with MongoDB for persistent storage.
- **Environment‑Based Configuration** — Use a `.env` file to manage local settings.

## Tech Stack

| Layer        | Technology |
|--------------|------------|
| Backend      | Node.js + Express (routing, controllers, server logic) |
| Database     | MongoDB + Mongoose (schemas, validation, persistence) |
| Frontend     | HTML, CSS, JavaScript (vanilla, lightweight UI) |
| Environment  | dotenv (environment variables) |
| Architecture | RESTful API design |

## Project Structure

```
workout-log-api/
├── server.js               # Entry point for the Express server
├── package.json            # Project metadata and dependencies
├── .env                    # Environment variables (PORT, BASE_URL)
├── public/                 # Frontend files served by Express
│   ├── index.html          # Main UI
│   ├── styles.css          # Styling
│   └── script.js           # Frontend logic (fetch, render, events)
├── models/
│   └── workoutModel.js     # Mongoose schema and model
└── routes/
    └── workoutRoutes.js    # API routes for workouts
```

## Why This Stack?

This project uses a simple, well‑understood stack to keep the codebase approachable and easy to extend.  
Node.js and Express provide a lightweight backend, MongoDB and Mongoose offer flexible data modeling, and the vanilla JavaScript frontend keeps the UI fast and dependency‑free.  
The goal is clarity, not complexity.

## Prerequisites

Before running the app, make sure you have:
- Node.js installed
- MongoDB installed and running locally

## Getting started

  1. Open a terminal window.
  2. Confirm Node.js is installed.
  3. Confirm MongoDB is installed and running.
  4. Clone the repository:

      ```bash
      git clone https://github.com/ORandonat/workout-log-api.git
      ```
     
  5. Navigate into the project folder:

      ```bash
      cd workout-log-api
      ```
     
  6. Install dependencies:

      ```bash
      npm install
      ```
      
  7. Create a .env file in the project root with the following values:

      ```
      PORT=your_port_number
      BASE_URL=your_ip_address
      ```

     ***(Replace the placeholders with your actual values.)***
   
  8. Start MongoDB (if needed):
     
      ```bash
      sudo service mongod start
      ```
     
  9. Start the server:

      ```bash
      node server.js
      ```
      
  10. Once the server is running, open the app in your browser using the URL shown in your terminal.
     
## Usage

After starting the server, you can begin adding workouts to your log.  
Each workout requires a name and an amount (reps or minutes).  
You can view all workouts, edit entries, search by keyword, and delete workouts you no longer need.

## API Endpoints

### Workouts

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

## Screenshots

UI previews coming soon (workout list, add/edit forms, and notes section).

## Current Limitations

- Some elements do not have label attributes, which limits accessibility.
 
## Roadmap

- Add user authentication (sign up, login, protected routes)
- Add workout categories and filtering
- Add pagination for large workout histories
- Add sorting options (date, name, duration)
- Add data visualization (charts for workout trends)
- Add mobile-friendly UI improvements
- Add Docker support for easier deployment
- Add automated tests (unit, integration, and API)

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

---
### About the Developer
Built by **Nathan O'Rando**, a QA/Support hybrid engineer specializing in debugging, clean documentation, and practical backend design.
