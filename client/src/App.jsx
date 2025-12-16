import { useState } from "react";
import UploadFile from "./components/UploadFile";
import GenerateShareLink from "./components/GenerateShareLink";
import AccessSharedFile from "./components/AccessSharedFile";
import "./App.css";

const App = () => {
  const [uploadedFileId, setUploadedFileId] = useState("");
  const [shareLink, setShareLink] = useState(""); // 🔥 NEW

  return (
    <div className="app-container">
      <h2 className="app-title">🔐 Secure File Sharing System</h2>

      <UploadFile onUploadSuccess={setUploadedFileId} />

      <GenerateShareLink
        fileId={uploadedFileId}
        onLinkGenerated={setShareLink} // 🔥 PASS DOWN
      />

      <AccessSharedFile shareLink={shareLink} /> {/* 🔥 AUTO-FILL */}
    </div>
  );
};

export default App;
