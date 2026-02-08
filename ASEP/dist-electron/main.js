import { ipcMain, app, BrowserWindow } from "electron";
import { fileURLToPath } from "node:url";
import path from "node:path";
import fs from "fs/promises";
const __dirname$1 = path.dirname(fileURLToPath(import.meta.url));
process.env.APP_ROOT = path.join(__dirname$1, "..");
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");
const getConfigFilePath = () => path.join(app.getPath("userData"), "configurationFile.txt");
const ensureConfigFile = async () => {
  const filePath = getConfigFilePath();
  try {
    await fs.access(filePath);
  } catch {
    const defaultContent = `TimeToSleep: 8
SleepCycle: 90
ThemeColor: #212121`;
    await fs.writeFile(filePath, defaultContent, "utf8");
  }
};
process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, "public") : RENDERER_DIST;
let win;
function createWindow() {
  const iconPath = VITE_DEV_SERVER_URL ? path.join(process.env.VITE_PUBLIC, "logo.png") : path.join(RENDERER_DIST, "logo.png");
  win = new BrowserWindow({
    icon: iconPath,
    minHeight: 800,
    minWidth: 600,
    // autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname$1, "preload.mjs"),
      nodeIntegration: true
    }
  });
  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    win.loadFile(path.join(RENDERER_DIST, "index.html"));
  }
  win.webContents.on("did-finish-load", () => {
    win == null ? void 0 : win.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  });
}
ipcMain.handle("read-file", async () => {
  const filePath = getConfigFilePath();
  try {
    await ensureConfigFile();
    const data = await fs.readFile(filePath, "utf8");
    console.log("Read config file:", filePath);
    console.log(data);
    return { content: data };
  } catch (err) {
    console.error("Failed to read config file:", err);
    return { error: "Failed to read file", content: "" };
  }
});
ipcMain.handle(
  "write-file",
  async (_event, { TimeToSleep, SleepCycle, ThemeColor }) => {
    if (TimeToSleep == null || SleepCycle == null || !ThemeColor) {
      return {
        error: "Please provide TimeToSleep, SleepCycle, and ThemeColor"
      };
    }
    const filePath = getConfigFilePath();
    const content = `TimeToSleep: ${TimeToSleep}
SleepCycle: ${SleepCycle}
ThemeColor: ${ThemeColor}`;
    try {
      await fs.writeFile(filePath, content, "utf8");
      console.log("Wrote config file:", filePath);
      return { message: "File created/updated successfully" };
    } catch (err) {
      console.error("Failed to write config file:", err);
      return { error: "Failed to write file" };
    }
  }
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
export {
  MAIN_DIST,
  RENDERER_DIST,
  VITE_DEV_SERVER_URL
};
