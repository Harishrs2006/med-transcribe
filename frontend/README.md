# 🩺 Medical Transcription App

A full-stack medical transcription application that allows users to upload audio files and receive structured transcription-ready outputs. Built to demonstrate real-world backend–frontend integration.

---

## 🚀 Features
- Upload medical audio files (.ogg, .mp3, .wav)
- Backend file handling using Multer
- REST API built with Express.js
- Frontend built with React + Vite
- Clean UI with upload status and error handling
- Ready for future AI transcription integration

---

## 🛠 Tech Stack

### Frontend
- React
- Vite
- JavaScript
- HTML / CSS

### Backend
- Node.js
- Express.js
- Multer (file uploads)
- CORS

---

## 📂 Project Structure

med-transcribe/
├── backend/
│ ├── index.js
│ ├── uploads/
│ └── package.json
│
├── frontend/
│ ├── src/
│ │ ├── App.jsx
│ │ ├── main.jsx
│ │ └── assets/
│ ├── index.html
│ ├── vite.config.js
│ └── package.json


---

## ▶️ How to Run Locally

### Backend
```bash
cd backend
npm install
node index.js

Backend runs on:
http://localhost:5000

Frontend
cd frontend
npm install
npm run dev

Frontend runs on:
http://localhost:5173


📌 Current Status

Audio upload working

Backend API connected

Transcription logic coming next

🔮 Future Improvements

AI-based speech-to-text integration

Medical terminology correction

User authentication

Downloadable reports

👤 Author

Harish
Second-year CS student | Open Source & Backend Enthusiast