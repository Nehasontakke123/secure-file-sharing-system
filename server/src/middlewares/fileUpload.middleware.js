import multer from "multer";

// ✅ Allowed file types (Security)
const allowedTypes = [
  "application/pdf",
  "image/jpeg",
  "image/png",
  "text/csv",
];

// ✅ File type validation
const fileFilter = (req, file, cb) => {
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only PDF, Images, CSV allowed"), false);
  }
};

// ✅ Multer configuration (Vercel compatible)
// Files are stored in memory (RAM), not disk
export const upload = multer({
  storage: multer.memoryStorage(), // 🔥 IMPORTANT FIX
  limits: {
    fileSize: 10 * 1024 * 1024, // 10 MB limit
  },
  fileFilter,
});
