import File from "../models/File.js";
import ShareLink from "../models/ShareLink.js";

/* ===============================
   FILE UPLOAD CONTROLLER
   =============================== */
export const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const file = await File.create({
      filename: req.file.originalname, // ✅ REQUIRED
      mimeType: req.file.mimetype,
      size: req.file.size,
      buffer: req.file.buffer,         // ✅ REQUIRED
      owner: req.user.id,
    });

    res.status(201).json({
      message: "File uploaded successfully",
      fileId: file._id,
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ message: "File upload failed" });
  }
};


/* ===============================
   ACCESS FILE VIA SHARE LINK
   =============================== */
export const accessViaShareLink = async (req, res) => {
  try {
    const { token } = req.params;

    const linkData = await ShareLink.findOne({ token });

    if (!linkData) {
      return res.status(404).json({
        message: "Invalid or tampered share link",
      });
    }

    if (new Date() > linkData.expiresAt) {
      return res.status(403).json({
        message: "Share link has expired",
      });
    }

    const file = await File.findById(linkData.fileId);

    if (!file) {
      return res.status(404).json({
        message: "File not found or removed",
      });
    }

    res.status(200).json({
      message: "Secure file access granted",
      file: {
        id: file._id,
        filename: file.filename,
        type: file.mimeType,
        size: file.size,
        owner: file.owner,
      },
    });
  } catch (error) {
    console.error("Share link access error:", error);
    res.status(500).json({
      message: "Unable to access file via share link",
    });
  }
};
