const express = require("express");
const router = express.Router();

const { markAttendance } = require("../controllers/attendanceController");
const { authMiddleware } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");

router.post(
  "/mark",
  authMiddleware,
  authorizeRoles("professor"),
  markAttendance
);

module.exports = router;
const { getMyAttendance } = require("../controllers/attendanceController");

// Student can view their attendance
router.get(
  "/my",
  authMiddleware,
  authorizeRoles("student"),
  getMyAttendance
);