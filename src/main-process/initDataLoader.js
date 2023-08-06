const { app } = require("electron");
const path = require("path");
const fs = require("fs");
const Papa = require("papaparse");

/**
 *
 * @param {*} mainWindow
 * @returns null
 */
const loadInitData = (mainWindow) => {
  const userDataDir = app.getPath("userData");
  const csvDir = path.join(userDataDir, "userCashFlow.csv");
  if (!fs.existsSync(csvDir)) {
    mainWindow.webContents.send("init-data", {
      success: true,
      data: [],
    });
    return;
  }

  fs.readFile(csvDir, "utf8", (err, data) => {
    if (err) {
      mainWindow.webContents.send("init-data", {
        success: false,
        error: err,
      });
      return;
    }
    Papa.parse(data, {
      header: true,
      complete: (result) => {
        mainWindow.webContents.send("init-data", {
          success: true,
          data: result.data,
        });
      },
      error: (error) => {
        mainWindow.webContents.send("init-data", {
          success: false,
          error: error,
        });
      },
    });
  });
};

module.exports = loadInitData;
