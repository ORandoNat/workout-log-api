# Workout Log API
## Description
This is a workout log to aid in logging and tracking fitness progress. The app allows you to add a new workout with a name and amount of reps/time spent, load workouts, edit your workouts, search for workouts, and delete a workout entry.

## Features
- Adding a workout with name, reps/time spent, notes, and date/time to the log
- Loading workouts 
- Editing and updating workouts 
- Searching and filtering workouts
- Deleting workouts

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
Once the app is open and running, you can start adding workouts to the log. Each workout will need a name and amount(in reps/minutes). You can then load all of the workouts you've logged, edit existing entries, and delete entries you no longer need/want.

## Known Issues and Limitations
- Known issues and limitations of Version 1.0 have been addressed and resolved.
 
## Roadmap
- [X] Update duration feature to allow user to choose between duration (in minutes) or quantity of repetitions (reps). Plan to accomplish by introducing a dropdown selection for the two options.
- [X] Version 1.0 upload
- Version 2.0 goals
    - [ ] UI polish and CSS styling.
    - [ ] Automatic sorting of workouts by date so that when the list is loaded or a workout is added, everything will appear in consecutive order by date.

## Changelog
- March 14, 2026 - Added dotenv functionality and changed hardcoded PORT value in server.js to an environment variable.
- March 15, 2026 - Added a route to server.js to get the IP configuration from .env and changed hardcoded baseURL variable in index.html to asynchronous function to pull configuration details into the app.
- March 16, 2026 - Added notes section. Updated Mongoose schema to allow for optional notes for each entry and adjusted frontend to reflect this addition.
- March 17, 2026 - Added date/time field for workout entries. As of now date/time will automatically populate with the current date/time when a new entry is added. Updated schema and frontend to reflect these changes.
- March 18, 2026 - Added the ability to select a custom date and time per entry. If no custom date or time is selected, the entry will default to the current date and time. Adjusted frontend UI to show only Hours:Minutes by dropping seconds via truncation.
- March 19, 2026 - Added edit button to existing entries to allow users to update the details of their workouts. Built editWorkout() function to retrieve the details of the stored workout and automatically render and populate a form with that information. The user can then edit as many fields as they wish. To submit the updated information, the user clicks a save button. Users can also select a cancel button to discard their changes and exit the form.
- March 21, 2026 - Added search bar input and updated loadWorkouts() to filter through the entries based on user-entered criteria.
- March 22, 2026 - Updated duration feature to allow user to choose between amount of reps or the amount of time in minutes that the workout took. Accomplished by adding a dropdown for reps/minutes to the HTML and adding workType to mongoDB schema.
- March 23, 2026 - Moved CSS styling to it's own file (styles.css) and restructured HTML to align with stylesheet.
