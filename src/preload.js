const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("fileSystem", {
  // Send cashflow data to renderer
  onInitDataLoad: (callback) => {
    ipcRenderer.on("init-data", (event, data) => callback(data));
  },
  // Send accounts data to renderer
  onInitAccountsLoad: (callback) => {
    ipcRenderer.on("accounts-data", (event, data) => callback(data));
  },
});

console.log("I am preload");
