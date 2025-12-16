import api from "../api/api";
import { useEffect, useState } from "react";

const AccessSharedFile = ({ shareLink }) => {
  const [url, setUrl] = useState("");
  const [file, setFile] = useState(null);

  // 🔥 AUTO-FILL WHEN LINK IS GENERATED
  useEffect(() => {
    if (shareLink) {
      setUrl(shareLink);
    }
  }, [shareLink]);

  const accessFile = async () => {
    try {
      const token = url.split("/shared/")[1];
      const res = await api.get(`/files/shared/${token}`);
      setFile(res.data);
    } catch {
      alert("Invalid or expired link ❌");
    }
  };

  return (
    <div className="card">
      <h3>📂 Access Shared File</h3>

      <input
        className="input"
        placeholder="Paste Share Link"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />

      <button className="btn" onClick={accessFile}>
        Access File
      </button>

      {file && (
        <pre className="file-preview">
          {JSON.stringify(file, null, 2)}
        </pre>
      )}
    </div>
  );
};

export default AccessSharedFile;
