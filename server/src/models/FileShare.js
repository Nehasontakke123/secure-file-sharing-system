// models/FileShare.js
// Controls which users can access which files
// Used for owner / shared-user authorization

import mongoose from "mongoose";

const fileShareSchema = new mongoose.Schema(
  {
    fileId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "File",
      required: true,
    },

    sharedWith: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    role: {
      type: String,
      enum: ["viewer"],
      default: "viewer",
    },
  },
  { timestamps: true }
);

export default mongoose.model("FileShare", fileShareSchema);
