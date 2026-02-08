import { ipcRenderer, contextBridge } from "electron";

// --------- Expose some API to the Renderer process ---------
contextBridge.exposeInMainWorld("ipcRenderer", {
  on(...args: Parameters<typeof ipcRenderer.on>) {
    const [channel, listener] = args;
    return ipcRenderer.on(channel, (event, ...args) =>
      listener(event, ...args),
    );
  },
  off(...args: Parameters<typeof ipcRenderer.off>) {
    const [channel, ...omit] = args;
    return ipcRenderer.off(channel, ...omit);
  },
  send(...args: Parameters<typeof ipcRenderer.send>) {
    const [channel, ...omit] = args;
    return ipcRenderer.send(channel, ...omit);
  },
  invoke(...args: Parameters<typeof ipcRenderer.invoke>) {
    const [channel, ...omit] = args;
    return ipcRenderer.invoke(channel, ...omit);
  },

  // You can expose other APTs you need here.
  // ...
});

contextBridge.exposeInMainWorld("electronAPI", {
  readFile: async () => {
    try {
      const result = await ipcRenderer.invoke("read-file");
      return result;
    } catch (err) {
      console.error("readFile failed:", err);
      return { content: "", error: "Failed to read file" };
    }
  },

  writeFile: async (data: {
    TimeToSleep: number | string;
    SleepCycle: number | string;
    ThemeColor: string;
  }) => {
    try {
      const result = await ipcRenderer.invoke("write-file", data);
      return result;
    } catch (err) {
      console.error("writeFile failed:", err);
      return { error: "Failed to write file" };
    }
  },
});
