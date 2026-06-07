const markAttendance = async (req, res) => {
    try {
      const { userId } = req.body;
  
      const today = new Date().toISOString().split("T")[0];
  
      const existingAttendance = await Attendance.findOne({
        userId,
        date: today,
      });
  
      if (existingAttendance) {
        return res.json({
          message: "Attendance already marked today",
        });
      }
  
      const attendance = await Attendance.create({
        userId,
        date: today,
        time: new Date().toLocaleTimeString(),
        status: "Present",
      });
  
      res.status(201).json({
        message: "Attendance marked successfully",
        attendance,
      });
  
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };