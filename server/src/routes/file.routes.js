import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
// import { upload } from "../middlewares/upload.middleware.js";
import { upload } from "../middlewares/fileUpload.middleware.js";

import {
  uploadFile,
  accessViaShareLink,
} from "../controllers/file.controller.js";
import { generateShareLink } from "../controllers/share.controller.js";
import { fileAccessMiddleware } from "../middlewares/fileAccess.middleware.js";

const router = express.Router();

// ✅ FILE UPLOAD (login required)
router.post(
  "/upload",
  authMiddleware,
  upload.single("file"),
  uploadFile
);

// ✅ GENERATE SHARE LINK (login required)
router.post("/share", authMiddleware, generateShareLink);

// ✅ ACCESS VIA SHARE LINK (❗ NO LOGIN ❗)
router.get("/shared/:token", accessViaShareLink);

// ✅ NORMAL FILE ACCESS (login + permission)
router.get("/:fileId", authMiddleware, fileAccessMiddleware, (req, res) => {
  res.json({ message: "File access granted" });
});

export default router;
