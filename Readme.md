 * * AttendAI * * 

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
* Installed Node.js and initialized project using `npm init -y`
* Installed Express, Mongoose, dotenv, and nodemon
* Created Express server in `index.js`
* Connected MongoDB Atlas using Mongoose
* Created `config/db.js` for database connection

Environment Variables
* Created `.env` file
* Added PORT and MONGO_URI
* Configured dotenv in backend

Routes Setup
* Created `routes` folder
* Added `authRoutes.js` and `attendanceRoutes.js`
* Mounted routes in `index.js` using:

  * `/api/auth`
  * `/api/attendance`

Git Setup
* Initialized Git repository
* Added `.gitignore` for node_modules and .env

Frontend Setup
* Created Next.js app using `npx create-next-app@latest`
* Created pages: Login, Register, Dashboard, Attendance

Result
Backend server running, MongoDB connected, basic routes created, frontend initialized, and project structure set up.
