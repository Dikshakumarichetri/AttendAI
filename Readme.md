AttendAI

Tech Stack

Frontend: Next.js
Backend: Node.js, Express.js
Database: MongoDB (Atlas)
ODM: Mongoose
Environment Management: dotenv
Development Tools: nodemon
Version Control: Git, GitHub

Day 1 Setup

Goal
Set up full-stack project foundation and basic SaaS structure.

Backend Setup

- Installed Node.js and initialized project using `npm init -y`
- Installed Express, Mongoose, dotenv, and nodemon
- Created Express server in `index.js`
- Connected MongoDB Atlas using Mongoose
- Created `config/db.js` for database connection

Environment Variables

- Created `.env` file
- Added PORT and MONGO_URI
- Configured dotenv in backend

Routes Setup

- Created `routes` folder
- Added `authRoutes.js` and `attendanceRoutes.js`
- Mounted routes in `index.js` using:

  - `/api/auth`
  - `/api/attendance`

Git Setup

- Initialized Git repository
- Added `.gitignore` for node_modules and .env

Frontend Setup

- Created Next.js app using `npx create-next-app@latest`
- Created pages: Login, Register, Dashboard, Attendance

Result
Backend server running, MongoDB connected, basic routes created, frontend initialized, and project structure set up.

Day 2  Webcam + Face Detection

Goal
Build real-time face detection in browser using webcam and face-api.js.

What I did

- Accessed webcam using getUserMedia()
- Displayed live video in Next.js app
- Loaded face-api.js models from /public/models
- Ran real-time face detection on video stream
- Drew bounding boxes using canvas overlay

Tech Stack

- Next.js
- face-api.js
- HTML5 Video API
- Canvas API

Output

- Live webcam feed
- Real-time face detection with bounding box

Status
Completed: Working face detection pipeline in browser


Day 3  Face Registration System

Goal
Register users and save their facial data for future recognition.

Features Implemented
- Created a user registration form
- Captured user name input
- Reused webcam component from Day 2
- Detected a face using face-api.js
- Generated a face descriptor (face embedding/vector)
- Converted descriptor to a JSON-friendly array
- Sent user data to the backend using a POST request
- Connected frontend and backend using Fetch API
- Configured Express middleware:
  - express.json()
  - cors()
- Stored user name and face descriptor in MongoDB Atlas

Technologies Used
- Next.js
- React
- face-api.js
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose

Learning Outcomes
- Understanding face descriptors and embeddings
- Sending data from frontend to backend
- Creating API endpoints with Express
- Using CORS for cross-origin communication
- Storing biometric data in MongoDB
- Understanding the face registration workflow

End Result
Users can enter their name, capture their face, generate a face descriptor, and save their registration data in MongoDB for future face recognition and attendance tracking.