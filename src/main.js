import { app, BrowserWindow } from "electron";
import path from "path";
import { loadFiles } from "./main-process/initDataLoader.js";

if (require("electron-squirrel-startup")) {
  app.quit();
}

const isDev = MAIN_WINDOW_VITE_DEV_SERVER_URL ? true : false;
const isMac = process.platform === "darwin";

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: isDev ? 1200 : 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  if (isDev) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(
      path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`)
    );
  }

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  // Load init user data
  mainWindow.webContents.on("did-finish-load", () => {
    loadFiles(mainWindow);
  });
};

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (!isMac) {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
