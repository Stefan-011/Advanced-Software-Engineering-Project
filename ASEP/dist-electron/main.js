import { app, BrowserWindow } from "electron";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { spawn } from "node:child_process";
const __dirname$1 = path.dirname(fileURLToPath(import.meta.url));
process.env.APP_ROOT = path.join(__dirname$1, "..");
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, "public") : RENDERER_DIST;
let win;
function createWindow() {
  const iconPath = VITE_DEV_SERVER_URL ? path.join(process.env.VITE_PUBLIC, "electron-vite.svg") : path.join(RENDERER_DIST, "electron-vite.svg");
  win = new BrowserWindow({
    icon: iconPath,
    webPreferences: {
      preload: path.join(__dirname$1, "preload.js"),
      nodeIntegration: true
    }
  });
  win.loadURL("http://localhost:3000");
  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    win.loadFile(path.join(RENDERER_DIST, "index.html"));
  }
  win.webContents.on("did-finish-load", () => {
    win == null ? void 0 : win.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  });
}
app.whenReady().then(() => {
  createWindow();
  const backendPath = path.join(__dirname$1, "../backend/server.js");
  const server = spawn("node", [backendPath]);
  server.stdout.on("data", (data) => {
    console.log(`Server output: ${data}`);
  });
  server.stderr.on("data", (data) => {
    console.error(`Server error: ${data}`);
  });
  server.on("close", (code) => {
    console.log(`Server process exited with code ${code}`);
  });
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
    win = null;
  }
});
export {
  MAIN_DIST,
  RENDERER_DIST,
  VITE_DEV_SERVER_URL
};
