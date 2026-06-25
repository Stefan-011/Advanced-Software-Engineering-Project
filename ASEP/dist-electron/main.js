import { ipcMain as p, app as i, BrowserWindow as m } from "electron";
import { fileURLToPath as P } from "node:url";
import e from "node:path";
import l from "fs/promises";
const g = e.dirname(P(import.meta.url));
process.env.APP_ROOT = e.join(g, "..");
const r = process.env.VITE_DEV_SERVER_URL, F = e.join(process.env.APP_ROOT, "dist-electron"), a = e.join(process.env.APP_ROOT, "dist"), s = () => e.join(i.getPath("userData"), "configurationFile.txt"), R = async () => {
  const o = s();
  try {
    await l.access(o);
  } catch {
    await l.writeFile(o, `TimeToSleep: 15
SleepCycle: 90
ThemeColor: #212121`, "utf8");
  }
};
process.env.VITE_PUBLIC = r ? e.join(process.env.APP_ROOT, "public") : a;
let t;
function u() {
  const o = r ? e.join(process.env.VITE_PUBLIC, "logo.png") : e.join(a, "logo.png");
  t = new m({
    icon: o,
    minHeight: 800,
    minWidth: 600,
    // autoHideMenuBar: true,
    webPreferences: {
      preload: e.join(g, "preload.mjs"),
      nodeIntegration: !1
    }
  }), r ? t.loadURL(r) : t.loadFile(e.join(a, "index.html")), t.webContents.on("did-finish-load", () => {
    t == null || t.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  });
}
p.handle("read-file", async () => {
  const o = s();
  try {
    await R();
    const n = await l.readFile(o, "utf8");
    return console.log("Read config file:", o), console.log(n), { content: n };
  } catch (n) {
    return console.error("Failed to read config file:", n), { error: "Failed to read file", content: "" };
  }
});
p.handle(
  "write-file",
  async (o, { TimeToSleep: n, SleepCycle: c, ThemeColor: d }) => {
    if (n == null || c == null || !d)
      return {
        error: "Please provide TimeToSleep, SleepCycle, and ThemeColor"
      };
    const f = s(), h = `TimeToSleep: ${n}
SleepCycle: ${c}
ThemeColor: ${d}`;
    try {
      return await l.writeFile(f, h, "utf8"), console.log("Wrote config file:", f), { message: "File created/updated successfully" };
    } catch (w) {
      return console.error("Failed to write config file:", w), { error: "Failed to write file" };
    }
  }
);
i.on("window-all-closed", () => {
  process.platform !== "darwin" && (i.quit(), t = null);
});
i.on("activate", () => {
  m.getAllWindows().length === 0 && u();
});
i.whenReady().then(u);
export {
  F as MAIN_DIST,
  a as RENDERER_DIST,
  r as VITE_DEV_SERVER_URL
};
