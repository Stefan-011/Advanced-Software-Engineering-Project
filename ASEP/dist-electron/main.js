import { app as r, BrowserWindow as d } from "electron";
import { fileURLToPath as p } from "node:url";
import o from "node:path";
import { spawn as m } from "node:child_process";
const a = o.dirname(p(import.meta.url));
process.env.APP_ROOT = o.join(a, "..");
const t = process.env.VITE_DEV_SERVER_URL, P = o.join(process.env.APP_ROOT, "dist-electron"), c = o.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = t ? o.join(process.env.APP_ROOT, "public") : c;
let e;
function l() {
  const s = t ? o.join(process.env.VITE_PUBLIC, "logo.png") : o.join(c, "logo.png");
  e = new d({
    icon: s,
    minHeight: 800,
    minWidth: 600,
    // autoHideMenuBar: true,
    webPreferences: {
      preload: o.join(a, "preload.mjs"),
      nodeIntegration: !0
    }
  }), e.loadURL("http://localhost:3000"), t ? e.loadURL(t) : e.loadFile(o.join(c, "index.html")), e.webContents.on("did-finish-load", () => {
    e == null || e.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  });
}
r.whenReady().then(() => {
  l();
  const s = o.join(a, "../backend/server.js"), i = m("node", [s]);
  i.stdout.on("data", (n) => {
    console.log(`Server output: ${n}`);
  }), i.stderr.on("data", (n) => {
    console.error(`Server error: ${n}`);
  }), i.on("close", (n) => {
    console.log(`Server process exited with code ${n}`);
  }), r.on("activate", () => {
    d.getAllWindows().length === 0 && l();
  });
});
r.on("window-all-closed", () => {
  process.platform !== "darwin" && (r.quit(), e = null);
});
export {
  P as MAIN_DIST,
  c as RENDERER_DIST,
  t as VITE_DEV_SERVER_URL
};
