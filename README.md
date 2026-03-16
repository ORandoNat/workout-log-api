# Workout Log API
## Description
This is a workout log to aid in logging and tracking fitness progress. The app allows you to add a new workout with a name and duration, load stored workouts, and delete a workout entry.

## Features
The features of this app include adding a workout with name, duration and notes to the log, loading previously stored workouts, and deleting stored workouts.

## Technologies used
This app was built using Node.js, Express, MongoDB, HTML, Javascript, Mongoose, and axios.

## Prerequisites
Before running this application, please confirm you have the following installed on your machine:  Node.js and MongoDB.

## Getting started
  1. Open a terminal window
  2. Ensure Node.js is installed on your machine.
  3. Ensure MongoDB is installed on your machine.
  4. Clone the repository with "git clone https://github.com/ORandonat/workout-log-api.git". (Remove quotes)
  5. In your terminal, enter "cd workout-log-api" to navigate to the proper directory and enter npm install to install dependencies.
  6. Create a new file in the project directory named .env, open it, and enter PORT=[PORT NUMBER] on the first line and BASE_URL=[YOUR IP ADDRESS] on the second line. (Do not include brackets in your values)
  7. Ensure MongoDB is running and connected by entering "sudo service mongod start". (Remove quotes)
  8. Start the server from your terminal using "node server.js". (Remove quotes)
  9. Once the server is started and you can confirm MongoDB is connected, navigate to the URL in your browser.
     
## Usage
Once the app is open and running, you can start adding workouts to the log. Each workout will need a name and duration. You can then load all of the workouts you've logged, and you can delete entries you no longer need/want.

## Known Issues and Limitations
- [X] baseURL is hardcoded at this time, meaning users will need to update the variable baseURL themselves in order for everything to run properly on their machine. (RESOLVED: See changelog entry for 03/15/2026)
- Features that are currently missing:
  - [ ] Load a specific workout
  - [ ] Update the details of stored workouts
  - [ ] Store date/time for each workout
  - [X] Notes for each workout to record nuances such as pain, energy level, improvements, etc.

## Changelog
- March 14, 2026 - Added dotenv functionality and changed hardcoded PORT value in server.js to an environment variable.
- March 15, 2026 - Added a route to server.js to get the IP configuration from .env and changed hardcoded baseURL variable in index.html to asynchronous function to pull configuration details into the app.
- March 16, 2026 - Added notes section. Updated Mongoose schema to allow for optional notes for each entry and adjusted frontend to reflect this addition.
