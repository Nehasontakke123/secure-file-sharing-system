import express from "express";
import cors from "cors";
import fileRoutes from "./routes/file.routes.js";
import connectDB from "./config/db.js";
import loadEnv from "./config/env.js";

loadEnv();
connectDB();

const app = express();

/* ===============================
   ✅ CORS — FINAL WORKING CONFIG
================================ */
app.use(
  cors({
    origin: function (origin, callback) {
      const allowedOrigins = [
        "http://localhost:5173",
        "https://secure-file-sharing-system-2mh1.vercel.app",
      ];

      // Allow requests with no origin (Postman, server-to-server)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS not allowed"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "x-user-id"],
    credentials: false, // ⚠️ IMPORTANT
  })
);

// ✅ Body parser
app.use(express.json());

// ✅ Routes
app.use("/api/files", fileRoutes);

// ✅ Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
