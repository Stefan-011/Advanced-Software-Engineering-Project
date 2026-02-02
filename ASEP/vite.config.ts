import { defineConfig } from "vite";
import path from "node:path";
import electron from "vite-plugin-electron/simple";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    electron({
      // Main process entry point (Electron backend code)
      main: {
        // This points to your Electron main process entry
        entry: "electron/main.ts", // Ensure this is your Electron main entry file
      },
      preload: {
        // This is for your preload scripts
        input: path.join(__dirname, "electron/preload.ts"),
      },
    }),
  ],
  build: {
    // Ensure Vite is bundling the frontend only
    outDir: "dist", // Output directory for React build
    target: "esnext", // For modern browsers
    rollupOptions: {
      external: ["electron"], // Exclude Electron and backend from the frontend bundle
    },
  },
  server: {
    port: 3000,
  },
});
