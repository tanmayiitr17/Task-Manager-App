Task Manager README

This repository contains the source code for a MERN (MongoDB, Express.js, React.js, Node.js) full-stack project called Task Manager. Task Manager is a task management application that allows users to efficiently organize their tasks based on priority, date, and time. Redux Toolkit is integrated into the project for state management.

Clone Repository:
- To clone this repository, execute the following command in your terminal:
  git clone <repository_url>

Installation:
- After cloning the repository, navigate to the project directory.
- Run the following command to install the required dependencies:
  npm install

Starting the Application:
- Ensure MongoDB is installed and running on your system.
- Start the backend server by navigating to the `server` directory and running `npm start`.
- Once the server is running, return to the project directory.
- Run the following command to start the frontend development server:
  npm start

Dependencies:
- Frontend:
  - React
  - React Router DOM
  - Material-UI Icons
  - Redux Toolkit
  - React Hook Form
  - Yup
  - Redux Persist
  - Redux Persist Integration React
  - React Hot Toast
- Backend:
  - Express.js
  - MongoDB
  - Mongoose
- Development:
  - Concurrently (optional, for running backend and frontend concurrently)

Folder Structure:
- client: Contains the frontend React application.
- server: Contains the backend Express.js server and MongoDB integration.
- client/src/components: Contains reusable components used throughout the application.
- client/src/pages: Contains React components for different pages of the application (e.g., Home, Login, Signup, About).
- client/src/redux: Contains Redux-related files including slices and the Redux store configuration.
- client/src/api: Contains functions for making API requests.
- client/src/utils: Contains utility functions (e.g., date formatting, notifications).

Important Files:
- client/src/App.tsx: Entry point of the frontend application, sets up routing and navigation.
- client/src/index.tsx: Renders the root component of the frontend application.
- client/src/redux/store.ts: Configuration of the Redux store, including persistence setup.
- client/src/redux/taskSlice.ts: Redux slice for managing tasks.
- client/src/redux/userSlice.ts: Redux slice for managing user authentication and data.
- client/src/utils/DateFormat.ts: Utility function for formatting dates.
- client/src/utils/Notify.ts: Utility functions for showing success and error notifications.

Additional Notes:
- Ensure that you have Node.js and npm installed on your system before running the application.
- Customize the backend server endpoints in the API functions according to your setup.
- Customize the styling and functionality as per your requirements.
- For production deployment, build the frontend application using `npm run build` and deploy the generated build files to your server.
