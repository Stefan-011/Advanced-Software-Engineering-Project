import { app, BrowserWindow, ipcMain } from "electron";
import { fileURLToPath } from "node:url";
import path from "node:path";
import fs from "fs/promises";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

process.env.APP_ROOT = path.join(__dirname, "..");

export const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
export const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
export const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");

const getConfigFilePath = () =>
  path.join(app.getPath("userData"), "configurationFile.txt");

const ensureConfigFile = async () => {
  const filePath = getConfigFilePath();
  try {
    await fs.access(filePath);
  } catch {
    const defaultContent = `TimeToSleep: 8\nSleepCycle: 90\nThemeColor: #212121`;
    await fs.writeFile(filePath, defaultContent, "utf8");
  }
};

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL
  ? path.join(process.env.APP_ROOT, "public")
  : RENDERER_DIST;

let win: BrowserWindow | null;

function createWindow() {
  const iconPath = VITE_DEV_SERVER_URL
    ? path.join(process.env.VITE_PUBLIC, "logo.png")
    : path.join(RENDERER_DIST, "logo.png");

  win = new BrowserWindow({
    icon: iconPath,
    minHeight: 800,
    minWidth: 600,
    // autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.mjs"),
      nodeIntegration: true,
    },
  });

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    win.loadFile(path.join(RENDERER_DIST, "index.html"));
  }

  win.webContents.on("did-finish-load", () => {
    win?.webContents.send("main-process-message", new Date().toLocaleString());
  });
}

ipcMain.handle("read-file", async () => {
  const filePath = getConfigFilePath();

  try {
    await ensureConfigFile(); // make sure file exists
    const data = await fs.readFile(filePath, "utf8");
    console.log("Read config file:", filePath);
    console.log(data);
    return { content: data };
  } catch (err) {
    console.error("Failed to read config file:", err);
    return { error: "Failed to read file", content: "" };
  }
});

// Write file handler
ipcMain.handle(
  "write-file",
  async (_event, { TimeToSleep, SleepCycle, ThemeColor }) => {
    if (TimeToSleep == null || SleepCycle == null || !ThemeColor) {
      return {
        error: "Please provide TimeToSleep, SleepCycle, and ThemeColor",
      };
    }

    const filePath = getConfigFilePath();
    const content = `TimeToSleep: ${TimeToSleep}\nSleepCycle: ${SleepCycle}\nThemeColor: ${ThemeColor}`;

    try {
      await fs.writeFile(filePath, content, "utf8");
      console.log("Wrote config file:", filePath);
      return { message: "File created/updated successfully" };
    } catch (err) {
      console.error("Failed to write config file:", err);
      return { error: "Failed to write file" };
    }
  },
);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
    win = null;
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.whenReady().then(createWindow);
