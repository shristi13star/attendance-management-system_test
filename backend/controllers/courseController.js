import mongoose from "mongoose";
import Course from "../models/Course.js";
import User from "../models/User.js";
import Enrollment from "../models/Enrollment.js";
import xlsx from "xlsx";
import bcrypt from "bcryptjs";
import fs from "fs";

// ✅ CREATE COURSE 
export const createCourse = async (req, res) => {
  try {
    const { courseName, professorId } = req.body;

    const course = new Course({
      courseName,
      professor: professorId
    });

    await course.save();

    res.json({ message: "Course created", course });

  } catch (err) {
    res.status(500).json(err);
  }
};


// 🔥 Upload Excel and Add Students
export const uploadStudents = async (req, res) => {
  try {
    const file = req.file.path;
    const { courseId } = req.body;
    const courseObjectId = new mongoose.Types.ObjectId(courseId);

    const workbook = xlsx.readFile(file);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = xlsx.utils.sheet_to_json(sheet);

    let createdCount = 0;

    for (let student of data) {

      if (!student.Name || !student.Email) {
        continue;
      }

      let existing = await User.findOne({ email: student.Email });

      if (!existing) {
        const hashedPassword = await bcrypt.hash("default123", 10);

        existing = new User({
          name: student.Name,
          email: student.Email,
          rollNo: student["Roll No"],
          role: "student",
          password: hashedPassword
        });

        await existing.save();
      }

      const already = await Enrollment.findOne({
        student: existing._id,
        course: courseObjectId
      });

      if (!already) {
        await Enrollment.create({
          student: existing._id,
          course: courseObjectId
        });

        createdCount++;
      }
    }

    fs.unlinkSync(file);

    res.json({
      message: "Students uploaded & linked",
      added: createdCount,
      totalProcessed: data.length
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error uploading students", error: err.message });
  }
};