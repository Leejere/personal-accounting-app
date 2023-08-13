import { getDateParser } from "./identifyDate.js";

const identifyColTypes = (data, colNames) => {
  // Identify each column
  const colTypes = {};

  for (let colName of colNames) {
    colTypes[colName] = { type: "other" };

    // Try 5 rows
    for (let i = 0; i < Math.min(data.length, 5); i++) {
      const cell = data[i][colName];

      // Is this a date?
      if (getDateParser(cell).isDate) {
        colTypes[colName] = {
          type: "date",
          possibilities: getDateParser(cell).possibilities,
        };
        break;
      }

      // Is this a number?
      if (!isNaN(Number(cell))) {
        colTypes[colName] = { type: "number" };
        break;
      }
    }
  }

  return colTypes;
};

const transformRow = (row, colTypes) => {
  // Don't change dates yet
  let sum = 0;
  for (const colName in colTypes) {
    if (colTypes[colName].type === "number") {
      row[colName] = Number(row[colName]);
      sum += row[colName];
    }
  }
  // Add total
  row["total"] = sum;

  return row;
};

const transformInitData = (initData) => {
  const colNames = Object.keys(initData[0]);
  const colTypes = identifyColTypes(initData, colNames);
  console.log(colTypes);
  // Transform data
  const transformedData = initData.map((row) => transformRow(row, colTypes));
  return {
    data: transformedData,
    colTypes: colTypes,
  };
};

export { transformInitData };
