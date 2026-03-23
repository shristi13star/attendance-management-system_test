import express from "express";
import { createCourse, uploadStudents } from "../controllers/courseController.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.post("/create", createCourse);

// Excel upload route
router.post("/upload", upload.single("file"), uploadStudents);

export default router;