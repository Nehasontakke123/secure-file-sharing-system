// // controllers/file.controller.js

// import ShareLink from "../models/ShareLink.js";
// import File from "../models/File.js";

// // Access file using shared link (SECURE VERSION)
// export const accessViaShareLink = async (req, res) => {
//   try {
//     const { token } = req.params;

//     // 1️⃣ Find share link by token
//     const linkData = await ShareLink.findOne({ token });

//     if (!linkData) {
//       return res.status(404).json({
//         message: "Invalid or tampered share link",
//       });
//     }

//     // 2️⃣ Expiry validation
//     if (new Date() > linkData.expiresAt) {
//       return res.status(403).json({
//         message: "Share link has expired",
//       });
//     }

//     // 3️⃣ Fetch file metadata (optional but safe)
//     const file = await File.findById(linkData.fileId);

//     if (!file) {
//       return res.status(404).json({
//         message: "File not found or removed",
//       });
//     }

//     // 4️⃣ Secure response (no sensitive path data)
//     res.status(200).json({
//       message: "Secure file access granted",
//       file: {
//         id: file._id,
//         filename: file.filename,
//         type: file.mimeType,
//         size: file.size,
//         owner: file.owner,
//       },
//     });
//   } catch (error) {
//     console.error("Share link access error:", error);
//     res.status(500).json({
//       message: "Unable to access file via share link",
//     });
//   }
// };


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
      filename: req.file.filename,
      originalName: req.file.originalname,
      mimeType: req.file.mimetype,
      size: req.file.size,
      path: req.file.path,
      owner: req.user.id,
    });

    res.status(201).json({
      message: "File uploaded successfully",
      file,
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
