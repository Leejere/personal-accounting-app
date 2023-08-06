/**
 *
 * @param {number} year, full, 4 digits
 * @returns boolean
 */
const isLeapYear = (year) => {
  return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
};

/**
 *
 * @param {number} num, 2 digits or 4 digits
 * @returns if validated, return 4 digits year, else return false
 */
const validateYear = (num) => {
  if (num > 0 && num <= 50) {
    return 2000 + num;
  }
  if (num > 50 && num <= 99) {
    return 1900 + num;
  }
  if (num >= 1900 && num <= 2100) {
    return num;
  }
  return false;
};

/**
 *
 * @param {number} num
 * @returns boolean
 */
const couldBeMonth = (num) => {
  return num > 0 && num < 13;
};

/**
 *
 * @param {number} num
 * @param {number} refMonth
 * @param {boolean} isLeapYear
 * @returns boolean
 */
const couldBeDay = (num, refMonth, isLeapYear) => {
  const ceiling =
    refMonth === 2
      ? isLeapYear
        ? 29
        : 28
      : [4, 6, 9, 11].includes(refMonth)
      ? 30
      : 31;

  return num > 0 && num <= ceiling;
};

/**
 *
 * @param {number} year
 * @param {number} month
 * @param {numberboolean} day
 * @returns boolean
 */
const validateYearMonthDay = (year, month, day) => {
  if (!validateYear(year)) {
    return false;
  }
  const isLeap = isLeapYear(validateYear(year));
  if (couldBeMonth(month) && couldBeDay(day, month, isLeap)) {
    return true;
  }
  return false;
};

/**
 *
 * @param {number} num1
 * @param {number} num2
 * @param {number} num3
 * @returns array
 */
const findPossibleSequences = (num1, num2, num3) => {
  const possibilities = [];

  if (validateYearMonthDay(num1, num2, num3)) {
    possibilities.push("ymd");
  } else if (validateYearMonthDay(num3, num2, num1)) {
    possibilities.push("dmy");
  } else if (validateYearMonthDay(num3, num1, num2)) {
    possibilities.push("mdy");
  }

  return possibilities;
};

/**
 *
 * @param {string} sequence "ymd", "dmy", "mdy"
 * @returns parser method
 */
const getDateParserWithoutDelim = (sequence) => {
  if (sequence === "ymd") {
    return (numberString) => {
      const yearUpToIdx = numberString.length === 8 ? 4 : 2;
      return new Date(
        Number(numberString.slice(0, yearUpToIdx)),
        Number(numberString.slice(yearUpToIdx, yearUpToIdx + 2)) - 1,
        Number(numberString.slice(yearUpToIdx + 2, yearUpToIdx + 4))
      );
    };
  }
  if (sequence === "dmy") {
    return (numberString) => {
      return new Date(
        Number(numberString.slice(4, numberString.length)),
        Number(numberString.slice(2, 4)) - 1,
        Number(numberString.slice(0, 2))
      );
    };
  }
  if (sequence === "mdy") {
    return (numberString) => {
      return new Date(
        Number(numberString.slice(4, numberString.length)),
        Number(numberString.slice(0, 2)) - 1,
        Number(numberString.slice(2, 4))
      );
    };
  }
};

/**
 *
 * @param {string} str
 * @returns array of three numbers
 */
const parseStrTo3NumWithDelim = (str) => {
  const matches = str.match(
    /^(\d{1,4})[/,，。.-\s]{1,3}(\d{1,2})[/,，。.-\s]{1,3}(\d{1,4})$/
  );

  if (!matches) {
    return false;
  }
  const [_, match1, match2, match3] = matches;

  if (!match1 || !match2 || !match3) {
    return false;
  }

  return [Number(match1), Number(match2), Number(match3)];
};

/**
 *
 * @param {string} sequence "ymd", "dmy", "mdy"
 * @returns parser method
 */
const getDateParserWithDelim = (sequence) => {
  if (sequence === "ymd") {
    return (dateStr) => {
      const [year, month, day] = parseStrTo3NumWithDelim(dateStr);
      return new Date(year, month - 1, day);
    };
  }

  if (sequence === "dmy") {
    return (dateStr) => {
      const [day, month, year] = parseStrTo3NumWithDelim(dateStr);
      return new Date(year, month - 1, day);
    };
  }

  if (sequence === "mdy") {
    return (dateStr) => {
      const [month, day, year] = parseStrTo3NumWithDelim(dateStr);
      return new Date(year, month - 1, day);
    };
  }
};

export {
  findPossibleSequences,
  getDateParserWithoutDelim,
  parseStrTo3NumWithDelim,
  getDateParserWithDelim,
};
