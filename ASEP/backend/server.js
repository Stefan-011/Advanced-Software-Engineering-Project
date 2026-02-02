import express from "express";
import fs from "fs/promises";
import path from "path";
import cors from "cors";
import { fileURLToPath } from "url";

const app = express();
const port = 8080;

app.use(
  cors({
    origin: "http://localhost:3000", // or '*' for all origins
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);

// Middleware to parse JSON body if you want to send POST requests later
app.use(express.json());

app.get("/data", (req, res) => {
  res.json({ message: "Hello from Node backend!" });
});

app.get("/readfile", async (req, res) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const filePath = path.join(__dirname, "configurationFile.txt");

  try {
    const data = await fs.readFile(filePath, "utf8");
    console.log(data);
    res.json({ content: data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to read file" });
  }
});

app.get("/writefile", async (req, res) => {
  const { TimeToSleep, SleepCycle, ThemeColor } = req.query;

  if (!TimeToSleep || !SleepCycle || !ThemeColor) {
    return res.status(400).json({
      error: "Please provide TimeToSleep, SleepCycle, and ThemeColor",
    });
  }

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const filePath = path.join(__dirname, "configurationFile.txt");

  const content = `TimeToSleep: ${TimeToSleep}
SleepCycle: ${SleepCycle}
ThemeColor: ${ThemeColor}`;

  try {
    await fs.writeFile(filePath, content, "utf8");
    res.json({ message: "File created/updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to write file" });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
