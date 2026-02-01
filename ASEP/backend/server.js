import express from "express";
import fs from "fs/promises";
import path from "path";
import cors from "cors";
import { fileURLToPath } from "url";

const app = express();
const port = 3000;

app.use(cors());

app.get("/data", (req, res) => {
  res.json({ message: "Hello from Node backend!" });
});

app.get("/readfile", async (req, res) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const filePath = path.join(__dirname, "example.txt");

  try {
    const data = await fs.readFile(filePath, "utf8");
    console.log(data);
    res.json({ content: data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to read file" });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
