const express = require("express");
const fs = require("fs");
const multer = require("multer");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Bildelagring med Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "server/uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});
const upload = multer({ storage });

// Lagringsfil for data
const DATA_FILE = "server/data.json";

// Hente alle data
app.get("/api/data", (req, res) => {
  const data = JSON.parse(fs.readFileSync(DATA_FILE));
  res.json(data);
});

// Lagre tekst og bilde
app.post("/api/save", upload.single("image"), (req, res) => {
  const { version, text } = req.body;
  const imagePath = req.file ? req.file.path : null;

  // Hent eksisterende data
  const data = JSON.parse(fs.readFileSync(DATA_FILE));

  // Oppdater data
  data[version] = {
    content: text,
    imagePath: imagePath || data[version]?.imagePath || null,
  };

  // Skriv til data.json
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));

  res.json({ message: "Data lagret!", updatedVersion: data[version] });
});

// Start serveren
app.listen(PORT, () => {
  console.log(`Serveren kjører på http://localhost:${PORT}`);
});
