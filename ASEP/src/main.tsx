import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ThemeProvider } from "@mui/material";
import { DefaultTheme } from "styled-components";
import RouterProvider from "./router/RouterProvider.tsx";
const theme: DefaultTheme = {
  colors: {
    primary: "#0070f3",
    secondary: "#1db954",
  },
};
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </RouterProvider>
  </React.StrictMode>,
);

// Use contextBridge
window.ipcRenderer.on("main-process-message", (_event, message) => {
  console.log(message);
});
