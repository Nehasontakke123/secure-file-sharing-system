# 🔐 Secure File Sharing System

A full-stack secure file sharing application inspired by Google Drive, built using the **MERN stack**.  
This system allows users to upload files, securely share them with controlled access, and generate expirable share links with strict authorization rules.

---

## 🚀 Live Demo

### Frontend (Vercel)
👉 https://secure-file-sharing-system-2mh1.vercel.app/

### Backend (Node.js + Express)
👉 https://secure-file-sharing-system-11wu.vercel.app/

---

## 🛠 Tech Stack

### Frontend
- React.js (Vite)
- Axios
- Modern CSS (Glassmorphism UI, animations)
- Responsive Design

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- Multer (file uploads)
- Crypto (secure token generation)

---

## ✨ Key Features

### 📤 File Upload
- Upload files securely (PDF, Images, CSV)
- File type & size validation (max 10MB)
- Metadata stored in MongoDB:
  - Filename
  - Type
  - Size
  - Upload date
  - Owner

---

### 🔗 Secure File Sharing
- Generate secure shareable links
- Token-based access (unguessable)
- Share links support **expiry time**
- Only authorized users can access files

---

### 🔒 Access Control & Security (Core Highlight)
- Authorization middleware implemented
- Access allowed only if:
  - User is **owner**, OR
  - User has explicit permission, OR
  - Valid, non-expired share link is used
- Direct URL access without permission is blocked
- Expired links automatically revoke access

> This logic ensures production-level security similar to real-world systems.

---

### 🎨 Premium UI/UX
- Glassmorphism card design
- Smooth animations (CSS keyframes)
- Auto-filled file IDs after upload
- Seamless end-to-end flow without manual DB interaction
- Fully responsive layout

---

## 🧠 Application Flow

1. User uploads a file
2. File ID is auto-displayed in UI
3. User generates a secure share link
4. Share link can be accessed until expiry
5. Unauthorized access is denied at backend level

---

## 📂 Project Structure

