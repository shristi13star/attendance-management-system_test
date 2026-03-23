import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  courseName: String,
  professor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
});

const Course = mongoose.model("Course", courseSchema);

export default Course;