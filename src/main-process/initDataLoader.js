import { app } from "electron";
import path from "path";
import fs from "fs";
import Papa from "papaparse";
import { transformInitData } from "./transformInitData.js";

/**
 * Partial process of loadInitData
 * Load one file and send via channel
 * @param {*} mainWindow
 * @param {String} dir filename
 * @param {String} channel
 * @param {Function} callback to process data returned
 */
const loadOneFile = (mainWindow, dir, channel, callback) => {
  if (!fs.existsSync(dir)) {
    mainWindow.webContents.send(channel, {
      success: true,
      hasData: false,
    });
    return;
  }
  fs.readFile(dir, "utf8", (err, data) => {
    if (err) {
      mainWindow.webContents.send(channel, {
        success: false,
        error: err,
      });
      return;
    }
    Papa.parse(data, {
      header: true,
      complete: (result) => {
        const processed = callback(result.data);
        mainWindow.webContents.send(channel, {
          success: true,
          hasData: true,
          data: processed,
        });
      },
    });
  });
};

/**
 * Load stored user data from userDataDir/userCashFlow.csv
 * extracts column types and returns the data
 * @param {*} mainWindow
 * @returns null
 */
const loadFiles = (mainWindow) => {
  const userDataDir = app.getPath("userData");
  const csvDir = path.join(userDataDir, "userCashFlow.csv");
  const accountsDir = path.join(userDataDir, "accounts.json");

  loadOneFile(mainWindow, csvDir, "init-data", transformInitData);
  loadOneFile(mainWindow, accountsDir, "accounts-data", (data) => data);
};

export { loadFiles };
