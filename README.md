# Workout Log API
## Description
This is a workout log to aid in logging and tracking fitness progress. The app allows you to add a new workout with a name and duration, load stored workouts, and delete a workout entry.

## Features
The features of this app include adding a workout with name and duration to the log, loading previously stored workouts, and deleting stored workouts.

## Technologies used
This app was built using Node.js, Express, MongoDB, HTML, Javascript, Mongoose, and axios.

## Prerequisites
Before running this application, please confirm you have the following installed on your machine:  Node.js and MongoDB.

## Getting started:
  1. Open a terminal window
  2. Ensure Node.js is installed on your machine.
  3. Ensure MongoDB is installed on your machine.
  4. Clone the repository with "git clone https://github.com/ORandonat/workout-log-api.git". (Remove quotes)
  5. In your terminal, enter "cd workout-log-api" to navigate to the proper directory and enter npm install to install dependencies.
  6. Ensure MongoDB is running and connected by entering "sudo service mongod start". (Remove quotes)
  7. Start the server from your terminal using "node server.js". (Remove quotes)
  8. Once the server is started and you can confirm MongoDB is connected, navigate to the URL in your browser.
     [Note: You will have to update the baseURL in public/index.html to your machine's IP address in order to run this]
     
## Usage
Once the app is open and running, you can start adding workouts to the log. Each workout will need a name and duration. You can then load all of the workouts you've logged, and you can delete entries you no longer need/want.

## Known Issues and Limitations
Current known issues and limitations include: baseURL is hardcoded at this time, meaning users will need to update the variable baseURL themselves in order for everything to run properly on their machine. Some features that are currently missing are the ability to load a specific workout, and the ability to update the details of stored workouts.
