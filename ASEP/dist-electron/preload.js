"use strict";
const electron = require("electron");
electron.contextBridge.exposeInMainWorld("ipcRenderer", {
  on(...args) {
    const [channel, listener] = args;
    return electron.ipcRenderer.on(channel, (event, ...args2) =>
      listener(event, ...args2),
    );
  },
  off(...args) {
    const [channel, ...omit] = args;
    return electron.ipcRenderer.off(channel, ...omit);
  },
  send(...args) {
    const [channel, ...omit] = args;
    return electron.ipcRenderer.send(channel, ...omit);
  },
  invoke(...args) {
    const [channel, ...omit] = args;
    return electron.ipcRenderer.invoke(channel, ...omit);
  },
  // You can expose other APTs you need here.
  // ...
});

electron.contextBridge.exposeInMainWorld("electronAPI", {
  // Read file handler
  readFile: async () => {
    try {
      const result = await electron.ipcRenderer.invoke("read-file");
      return result; // { content: string, error?: string }
    } catch (err) {
      console.error("readFile failed:", err);
      return { content: "", error: "Failed to read file" };
    }
  },

  // Write file handler
  writeFile: async (data) => {
    // Optional: validate properties
    const { TimeToSleep, SleepCycle, ThemeColor } = data || {};
    if (TimeToSleep == null || SleepCycle == null || !ThemeColor) {
      return { error: "Missing required fields" };
    }

    try {
      const result = await electron.ipcRenderer.invoke("write-file", {
        TimeToSleep,
        SleepCycle,
        ThemeColor,
      });
      return result; // { message: string, error?: string }
    } catch (err) {
      console.error("writeFile failed:", err);
      return { error: "Failed to write file" };
    }
  },
});
