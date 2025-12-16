import api from "../api/api";
import { useEffect, useState } from "react";

const GenerateShareLink = ({ fileId, onLinkGenerated }) => {
  const [id, setId] = useState("");
  const [link, setLink] = useState("");

  useEffect(() => {
    if (fileId) {
      setId(fileId);
    }
  }, [fileId]);

  const generateLink = async () => {
    try {
      const res = await api.post("/files/share", {
        fileId: id,
        expiryMinutes: 10,
      });

      setLink(res.data.shareLink);

      // 🔥 SEND LINK TO APP
      onLinkGenerated(res.data.shareLink);
    } catch {
      alert("Failed to generate link ❌");
    }
  };

  return (
    <div className="card">
      <h3>🔗 Generate Share Link</h3>

      <input className="input" value={id} readOnly />

      <button className="btn" onClick={generateLink}>
        Generate Link
      </button>

      {link && (
        <div className="share-link">
          <a href={link} target="_blank" rel="noreferrer">
            {link}
          </a>
        </div>
      )}
    </div>
  );
};

export default GenerateShareLink;
