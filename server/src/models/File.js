// // models/File.js
// // Stores uploaded file metadata
// // Owner = user who uploaded the file

// import mongoose from "mongoose";

// const fileSchema = new mongoose.Schema(
//   {
//     filename: {
//       type: String,
//       required: true,
//     },

//     originalName: {
//       type: String,
//       required: true,
//     },

//     mimeType: {
//       type: String,
//       required: true,
//     },

//     size: {
//       type: Number,
//       required: true,
//     },

//     path: {
//       type: String,
//       required: true,
//     },

//     // User who uploaded the file
//     owner: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//   },
//   { timestamps: true } // createdAt = upload date
// );

// export default mongoose.model("File", fileSchema);


// models/File.js
import mongoose from "mongoose";

const fileSchema = new mongoose.Schema(
  {
    filename: {
      type: String,
      required: true, // original file name
    },

    mimeType: {
      type: String,
      required: true,
    },

    size: {
      type: Number,
      required: true,
    },

    buffer: {
      type: Buffer,
      required: true, // 🔥 memoryStorage
    },

    owner: {
      type: String, // because you're using x-user-id mock
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("File", fileSchema);
