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
This app was built using Node.js, Express, MongoDB, HTML, CSS, Javascript, Mongoose.

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
- Elements do not have label attributes. Accessibility is limited.
 
## Roadmap
- [ ] UI polish and CSS styling.
- [ ] Identify any remaining duplication and mark candidates for refactoring

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
- March 26, 2026 - Adjusted CSS to make the app look like a white page on a blue background and added independent scrolling functionality to the list of workouts.
- March 27, 2026 - Changed the form for 'Add Workout' to have notes hidden by default. New button 'Add Notes +' will add the notes field to the form. When notes are added, the button text changes to 'Remove Notes -' and when clicked will display a confirmation box letting the user know their notes will be lost. Moved date-container to requiredFields div and updated 'additionalFields' div to 'notes-container' to hold button and textarea elements. Updated CSS styling rules accordingly.
- March 29, 2026 - Refactored all IDs in HTML, JavaScript, and CSS to follow kebab-case naming convention.
- April 6, 2026 - Separated JS from HTML into script.js. Replaced inline onclick attributes with event listeners. Extracted createWorkoutListItem as a DOM helper. Extracted formatDateTime and formatDisplayDate as date helpers. Added auto-sort by date to loadWorkouts. Removed debug console.log statements.
- April 8, 2026 - Redesigned createWorkoutListItem to build a structured card layout. Styled the workout card with CSS (padding, border/shadow, spacing between sections). Styled workout-card-top with flexbox to push name left and buttons right. Styled workout-card-middle stats row. Styled the chevron and notes section. Styled the Add Notes and Load Workouts buttons. Made changes to addWorkout form input sizing to make it look less chunky. Changed the background color of edit buttons to grey.
- April 10, 2026 - Added labels to addWorkout and editWorkout forms. Refactored event wiring. Removed inline styling from HTML and created a 'hidden' class to toggle visibility on the edit form, notes, and error messages.
- April 20, 2026 - Updated addWorkout form to display with "card" layout. Added media query for mobile/smaller displays. Added clear loading states for API fetch calls.
- April 21, 2026 - Refactored script.js to centralize message handling with showMessage/hideMessage helpers.
- April 23, 2026 - Refactored script.js architecture and cleaned up DOM references.
