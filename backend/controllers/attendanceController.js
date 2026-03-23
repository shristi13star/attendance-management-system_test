const Attendance = require("../models/Attendance");

exports.markAttendance = async (req, res) => {
  try {
    const { studentId, subject, status } = req.body;

    const attendance = await Attendance.create({
      student: studentId,
      subject,
      status,
      markedBy: req.user.id
    });

    res.status(201).json({
      message: "Attendance marked",
      attendance
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// View attendance (student)
exports.getMyAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.find({
      student: req.user.id
    }).populate("markedBy", "name email");

    res.json({
      total: attendance.length,
      attendance
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};