const express = require("express")
const router = express.Router()
const { createUser, getUsers } = require("../controllers/userController")
const auth = require("../middleware/auth")
const authorize = require("../middleware/rbac")

router.post("/", createUser)

// Admin only
router.get("/admin", auth, authorize("admin"), (req, res) => {
    res.json({ message: "Admin Access" })
})

// Professor only
router.get("/professor", auth, authorize("professor"), (req, res) => {
    res.json({ message: "Professor Access" })
})

// Student only
router.get("/student", auth, authorize("student"), (req, res) => {
    res.json({ message: "Student Access" })
})

module.exports = router