const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("fileSystem", {
  onInitDataLoad: (callback) => {
    ipcRenderer.on("init-data", (event, args) => callback(args));
  },
});

console.log("I am preload");
