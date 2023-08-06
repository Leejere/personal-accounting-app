import {
  findPossibleSequences,
  getDateParserWithoutDelim,
  parseStrTo3NumWithDelim,
  getDateParserWithDelim,
} from "../util/dateUtils";

const getDateParser = (str) => {
  // Deal with all numbers situations
  if (!parseStrTo3NumWithDelim(str) && !str.match(/^(\d{6,8})$/)) {
    return { isDate: false };
  }

  if (str.match(/^(\d{6,8})$/) && str.length === 6) {
    const possibleSequences = findPossibleSequences(
      Number(str.slice(0, 2)),
      Number(str.slice(2, 4)),
      Number(str.slice(4, 6))
    );

    if (possibleSequences.length === 0) {
      return { isDate: false };
    }

    return {
      isDate: true,
      possibilities: possibleSequences.map((sequence) => ({
        sequence: sequence,
        parserType: "withoutDelim",
      })),
    };
  }

  if (str.match(/^(\d{6,8})$/) && str.length === 8) {
    // Could be y-m-d
    const possibleSequences = findPossibleSequences(
      Number(str.slice(0, 4)),
      Number(str.slice(4, 6)),
      Number(str.slice(6, 8))
    ).concat(
      findPossibleSequences(
        Number(str.slice(0, 2)),
        Number(str.slice(2, 4)),
        Number(str.slice(4, 8))
      )
    );

    if (possibleSequences.length === 0) {
      return { isDate: false };
    }

    return {
      isDate: true,
      possibilities: possibleSequences.map((sequence) => ({
        sequence: sequence,
        parserType: "withoutDelim",
      })),
    };
  }

  if (parseStrTo3NumWithDelim(str)) {
    const [num1, num2, num3] = parseStrTo3NumWithDelim(str);
    const possibleSequences = findPossibleSequences(num1, num2, num3);

    if (possibleSequences.length === 0) {
      return { isDate: false };
    }

    return {
      isDate: true,
      possibilities: possibleSequences.map((sequence) => ({
        sequence: sequence,
        parserType: "withDelim",
      })),
    };
  }

  // If all numbers fail, then try the native Date method
  if (isNaN(Date.parse(str))) {
    return { isDate: false };
  }

  return {
    isDate: true,
    possibilities: [
      {
        sequence: "automatic",
        parserType: "native",
      },
    ],
  };
};

export { getDateParser };
