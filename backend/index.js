require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
const Port = process.env.PORT;

const connectDB = require("./config/db");
connectDB();

app.use(cors({

  origin:[ "http://localhost:3000",
    "https://attend-ai-seven.vercel.app/"
  ]
}));

app.use(express.json());

// import routes
const authRoutes = require("./routes/authRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");

// mount routes
app.use("/api/auth", authRoutes);
app.use("/api/attendance", attendanceRoutes);

app.get("/", (req, res) => {
  res.send("Hello from your Express backend!");
});

// app.listen(Port, () => {
//   console.log(`Server is running on http://localhost:${Port}`);
// });


app.listen(process.env.PORT || 8000, () => {
  console.log("Server running");
});