// This middleware checks:
// Owner OR shared user → allow
// Others → deny (even if URL is known)

import File from "../models/File.js";
import FileShare from "../models/FileShare.js";

export const fileAccessMiddleware = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { fileId } = req.params;

    const file = await File.findById(fileId);

    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }

    // Owner access
    if (file.owner.toString() === userId) {
      return next();
    }

    // Shared user access
    const sharedAccess = await FileShare.findOne({
      fileId,
      sharedWith: userId,
    });

    if (sharedAccess) {
      return next();
    }

    // Unauthorized access
    return res.status(403).json({
      message: "Access denied",
    });
  } catch (error) {
    res.status(500).json({ message: "Authorization check failed" });
  }
};
