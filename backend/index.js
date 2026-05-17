
require('dotenv').config();
const express = require('express');
const app = express();
const Port = process.env.PORT;
const connectDB = require('./config/db');
connectDB();



// import routes
const authRoutes = require("./routes/authRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");

// mount routes
//All routes inside authRoutes.js should start with /api/auth

app.use("/api/auth", authRoutes);
app.use("/api/attendance", attendanceRoutes);
app.get('/', (req, res) => {
  res.send('Hello from your Express backend!');
});

app.listen(Port, () => {
  console.log(`Server is running on http://localhost:${Port}`);
});

