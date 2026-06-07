const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  date: {
    type: String, // "2026-06-04"
    required: true,
  },

  time: {
    type: String, // "10:45 AM"
    required: true,
  },

  status: {
    type: String,
    default: "present",
  },
});

module.exports = mongoose.model("Attendance", attendanceSchema);