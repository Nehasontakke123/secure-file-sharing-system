import crypto from "crypto";
import ShareLink from "../models/ShareLink.js";

// Generate secure share link with expiry
export const generateShareLink = async (req, res) => {
  try {
    const { fileId, expiryMinutes } = req.body;
    const userId = req.user.id;

    const token = crypto.randomBytes(32).toString("hex");

    const expiresAt = new Date(
      Date.now() + expiryMinutes * 60 * 1000
    );

    await ShareLink.create({
      fileId,
      token,
      createdBy: userId,
      expiresAt,
    });

    res.status(201).json({
      shareLink: `${process.env.BASE_URL}/api/files/shared/${token}`,
      expiresAt,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to generate link" });
  }
};
