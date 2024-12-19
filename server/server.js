const express = require("express");
const fs = require("fs");
const multer = require("multer");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Konfigurer multer for bildeopplasting
const upload = multer({
  dest: "uploads/", // Mappen for opplastede bilder
});

// Serve React frontend fra "build"-mappen
app.use(express.static(path.join(__dirname, "build")));

// Serve opplastede bilder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// API-endepunkter
app.get("/api/data", (req, res) => {
  const data = JSON.parse(fs.readFileSync("data.json"));
  res.json(data);
});

app.post("/api/save", (req, res) => {
  const { version, title, content } = req.body;
  const data = JSON.parse(fs.readFileSync("data.json"));
  if (!data[version]) {
    data[version] = {};
  }
  data[version].title = title;
  data[version].content = content;
  fs.writeFileSync("data.json", JSON.stringify(data, null, 2));
  res.json({ message: "Data lagret!" });
});

app.post("/api/upload", upload.single("image"), (req, res) => {
  const { version } = req.body;

  if (!req.file) {
    return res.status(400).json({ success: false, message: "Ingen fil lastet opp." });
  }

  const data = JSON.parse(fs.readFileSync("data.json"));
  const imageUrl = `/uploads/${req.file.filename}`;

  if (!data[version]) {
    data[version] = {};
  }
  data[version].image = imageUrl;

  fs.writeFileSync("data.json", JSON.stringify(data, null, 2));
  res.json({ success: true, imageUrl });
});

// Fallback: Send index.html for React-ruter
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// Start serveren
app.listen(PORT, () => {
  console.log(`Serveren kjører på http://localhost:${PORT}`);
});
