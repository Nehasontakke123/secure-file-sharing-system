// import api from "../api/api";
// import { useState } from "react";

// const UploadFile = ({ onUploadSuccess }) => {
//   const [file, setFile] = useState(null);
//   const [message, setMessage] = useState("");

//   const handleUpload = async () => {
//     if (!file) return;

//     const formData = new FormData();
//     formData.append("file", file);

//     try {
//       const res = await api.post("/files/upload", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       // 🔥 IMPORTANT
//       onUploadSuccess(res.data.file._id);

//       setMessage("File uploaded successfully ✅");
//     } catch {
//       setMessage("Upload failed ❌");
//     }
//   };

//   return (
//     <div className="card">
//       <h3>📤 Upload File</h3>
//       <input
//         type="file"
//         className="input"
//         onChange={(e) => setFile(e.target.files[0])}
//       />
//       <button className="btn" onClick={handleUpload}>
//         Upload
//       </button>
//       <p className="message">{message}</p>
//     </div>
//   );
// };

// export default UploadFile;


import api from "../api/api.jsx";
import { useState } from "react";

const UploadFile = ({ onUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      
      const res = await api.post("/files/upload", formData);

      onUploadSuccess(res.data.fileId);
      setMessage("File uploaded successfully ✅");
    } catch (err) {
      console.error(err);
      setMessage("Upload failed ❌");
    }
  };

  return (
    <div className="card">
      <h3>📤 Upload File</h3>
      <input
        type="file"
        className="input"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <button className="btn" onClick={handleUpload}>
        Upload
      </button>
      <p className="message">{message}</p>
    </div>
  );
};

export default UploadFile;
