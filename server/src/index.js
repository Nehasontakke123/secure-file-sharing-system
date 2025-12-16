import express from "express";
import cors from "cors";
import fileRoutes from "./routes/file.routes.js";
import connectDB from "./config/db.js";
import loadEnv from "./config/env.js";

loadEnv();
connectDB();

const app = express();

// ✅ CORS configuration (FIXED)
app.use(
  cors({
    origin: "http://localhost:5173", // Vite frontend
    credentials: true,
  })
);

// ✅ Body parser
app.use(express.json());

// ✅ Routes
app.use("/api/files", fileRoutes);

// ✅ Server start
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
