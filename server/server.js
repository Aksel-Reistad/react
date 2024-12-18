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

// Serve React frontend fra "build"-mappen
app.use(express.static(path.join(__dirname, "build")));

// API-endepunkter
app.get("/api/data", (req, res) => {
  const data = JSON.parse(fs.readFileSync("data.json"));
  res.json(data);
});

app.post("/api/save", (req, res) => {
  const { version, title, content } = req.body;
  const data = JSON.parse(fs.readFileSync("data.json"));
  data[version] = { title, content };
  fs.writeFileSync("data.json", JSON.stringify(data, null, 2));
  res.json({ message: "Data lagret!" });
});

// Fallback: Send index.html for React-ruter
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// Start serveren
app.listen(PORT, () => {
  console.log(`Serveren kjører på http://localhost:${PORT}`);
});
