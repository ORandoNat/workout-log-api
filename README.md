# Workout Log API
## Description
This app is a simple workout log designed to help you track your fitness progress. You can add workouts with names, reps, or time spent, and update them as your routine evolves. It keeps your workouts organized so you can review, search, and manage your training history with ease.

## Features
- Add Workouts — Create new workout entries with a name, reps, time, or other details.
- Edit Existing Entries — Update any workout as your routine changes.
- Search Your History — Quickly find workouts by name or keyword.
- Delete Workouts — Remove entries you no longer need.
- Load All Workouts — View your full training history in a clean, organized list.
- Responsive Frontend UI — Simple, lightweight interface built with vanilla JavaScript.
- RESTful API Backend — Node.js + Express server with MongoDB for persistent storage.

## Technologies used
This project is built with Node.js, Express, MongoDB, Mongoose, and a lightweight frontend using HTML, CSS, and JavaScript. The stack is intentionally simple and easy to understand, making the app approachable for both users and developers.

## Prerequisites
Before running the app, make sure you have:
- Node.js installed
- MongoDB installed and running locally

## Getting started
  1. Open a terminal window.
  2. Confirm Node.js is installed.
  3. Confirm MongoDB is installed and running.
  4. Clone the repository:<br />```git clone https://github.com/ORandonat/workout-log-api.git```
  5. Navigate into the project folder:<br />```cd workout-log-api```
  6. Install dependencies:<br />```npm install```
  7. Create a .env file in the project root with the following values:<br />- PORT=your_port_number<br />- BASE_URL=your_ip_address<br />*(Replace the placeholders with your actual values.)*
  8. Start MongoDB (if needed):<br />```sudo service mongod start```
  9. Start the server:<br />```node server.js```
  10. Once the server is running, open the app in your browser using the URL shown in your terminal.
     
## Usage
Once the app is open and running, you can start adding workouts to the log. Each workout will need a name and amount(in reps/minutes). You can then load all of the workouts you've logged, edit existing entries, and delete entries you no longer need/want.

## Known Issues and Limitations
- Some elements do not have label attributes, which limits accessibility.
 
## Roadmap
- [ ] Add label attributes to all elements to improve accessibility.
- [ ] UI polish and CSS styling.
- [ ] Identify any remaining duplication and mark candidates for refactoring

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
