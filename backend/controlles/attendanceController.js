const Attendance = require("../models/Attendance");


const markAttendance = async (req, res) => {
  try {
    const { userId } = req.body;

    const today = new Date().toISOString().split("T")[0];

    const attendance = await Attendance.create({
      userId,
      date: today,
      time: new Date().toLocaleTimeString(),
      status: "present",
    });

    return res.status(201).json({
      message: "Attendance marked successfully",
      attendance,
      alreadyMarked: false,
    });

  } catch (error) {
    if (error.code === 11000) {
      return res.status(200).json({
        message: "Attendance already marked today",
        alreadyMarked: true,
      });
    }

    return res.status(500).json({
      message: error.message,
    });
  }
};



const getAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.find()
      .populate("userId", "name");

    return res.json(attendance);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  markAttendance,
  getAttendance,
};