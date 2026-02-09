const multer = require("multer");
const path = require("path");

const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  console.log("REQ:", req.method, req.url);
  next();
});
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const safeName =
      Date.now() + "-" + file.originalname.replace(/\s+/g, "_");
    cb(null, safeName);
  },
});

const upload = multer({ storage });
app.get("/api/health", (req, res) => {
  res.json({ ok: true, time: new Date().toISOString() });
});

// Temporary in-memory data
let patients = [];
let nextId = 1;

app.post("/api/patients", (req, res) => {
  const { name, age, phone } = req.body;
  if (!name) return res.status(400).json({ error: "name is required" });

  const patient = {
    id: nextId++,
    name,
    age: age ?? null,
    phone: phone ?? null,
  };

  patients.push(patient);
  res.status(201).json(patient);
});

app.get("/api/patients", (req, res) => {
  res.json(patients);
});
// Serve uploaded files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Upload endpoint
app.post("/api/upload-audio", upload.single("audio"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  res.json({
    ok: true,
    filename: req.file.filename,
    url: `http://localhost:${PORT}/uploads/${req.file.filename}`,
  });
});


app.listen(PORT, () => {
  console.log("Backend running at http://localhost:" + PORT);
});