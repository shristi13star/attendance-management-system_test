import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import courseRoutes from "./routes/courseRoutes.js";
import authRoutes from "./routes/authRoutes.js"; // ✅ added

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// ✅ routes
app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);

app.get("/", (req, res) => {
  res.send("API Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});