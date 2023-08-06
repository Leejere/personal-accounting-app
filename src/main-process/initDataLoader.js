import { app } from "electron";
import path from "path";
import fs from "fs";
import Papa from "papaparse";
import { transformInitData } from "./transformInitData.js";

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
      hasUserData: false,
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
        const processed = transformInitData(result.data);
        mainWindow.webContents.send("init-data", {
          success: true,
          hasUserData: true,
          userData: processed,
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

export { loadInitData };
