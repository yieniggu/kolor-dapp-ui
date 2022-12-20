import fromExponential from "from-exponential";

export const oneYearInSeconds = 31536000;

// Count decimals of a given number
export const countDecimals = (number) => {
  if (Math.floor(number) === number) return 0;

  let str = number.toString();
  //console.log("string: ", str);

  const splitted = str.split(".");
  //console.log(`decimals: 0.${splitted[1]}`);
  return splitted[1].length;
};

// Get the numbers (attributes) of a given object
export const extractNumberTypes = (object) => {
  // extract object keys
  const keys = Object.keys(object);

  let numbers = [];
  keys.forEach((key) => {
    //console.log(`key ${key}: ${object[key]} - type: ${typeof object[key]}`);
    if (typeof object[key] === "number") {
      //console.log("number found: ", object[key]);
      numbers.push(object[key]);
    }
  });

  return numbers;
};

export const extractMaxDecimals = (numbers) => {
  let maxDecimals = 0;
  numbers.forEach((number) => {
    let currentDecimals = countDecimals(number);
    if (currentDecimals > maxDecimals) maxDecimals = currentDecimals;
  });

  return maxDecimals;
};

// Converts an array of objects to an array of arrays,
//  as solidity handles arrays of structs this way!
// ej: [{a, b, c}], {d, e, f}] -> [[a, b, c], [d, e, f]]
export const convertSpeciesToArray = (species) => {
  let speciesAsArrays = [];

  species.map((specie) => {
    //console.log("before refactor: ", specie);
    specie = refactorSpecie(specie);
    //console.log("refactored...: ", specie);
    let {
      speciesAlias,
      scientificName,
      size,
      initialTCO2perYear,
      TCO2perSecond,
      density,
    } = specie;

    const decimals = maxDecimalsOf(specie);
    //console.log("specie decimals done: ", decimals);

    let specieAsArray = [];
    specieAsArray.push(
      speciesAlias,
      scientificName,
      normalizeNumber(density, decimals), // Array normalized to count decimals on solidity
      normalizeNumber(size, decimals), // As solidity only handle numbers as integers!
      decimals,
      normalizeNumber(TCO2perSecond, decimals),
      normalizeNumber(initialTCO2perYear, decimals),
      0,
      0,
      0
    );

    speciesAsArrays.push(specieAsArray);
  });

  return speciesAsArrays;
};

// Converts a set of objects inside an array to an
// array of arrays, as solidity handles arrays of structs this way!
// ej: [{a, b, c}], {d, e, f}] -> [[a, b, c], [d, e, f]]
export const convertPointsToArray = (points) => {
  let pointsAsArrays = [];

  points.map((coordinate) => {
    coordinate = refactorPoints(coordinate);

    let { latitude, longitude } = coordinate;

    const decimals = maxDecimalsOf(coordinate);

    let coordinateAsArray = [];
    coordinateAsArray.push(
      normalizeNumber(latitude),
      normalizeNumber(longitude),
      decimals,
      0,
      0
    );

    pointsAsArrays.push(coordinateAsArray);
  });

  return pointsAsArrays;
};

// Convert numbers from strings to numbers
export const refactorPoints = (points) => {
  points.latitude = Number(points.latitude);
  points.longitude = Number(points.longitude);

  return points;
};

// Convert numbers from strings to numbers
export const refactorSpecie = (specie) => {
  specie.initialTCO2perYear = Number(getInitialTCO2perYear([specie]));
  specie.size = Number(specie.size);
  specie.density = Number(specie.density);
  specie.TCO2perSecond = Number(specie.TCO2perSecond);

  return specie;
};

// Extract the max decimals of an object with different
// floating point numbers (decimal part)
export const maxDecimalsOf = (object) => {
  const numbers = extractNumberTypes(object);

  const maxDecimals = extractMaxDecimals(numbers);

  //console.log("max decimals: ", maxDecimals);
  return maxDecimals;
};

// This function normalize a number to account for decimals
// given that solidity only work with integer numbers
export const normalizeNumber = (number, decimals = 0, round = true) => {
  // number = Number(number);
  // decimals = Number(decimals);

  let result = number * Math.pow(10, decimals);
  //console.log("result before: ", result);

  decimals = decimals.toString();

  result = result.toString();

  if (result.includes("e")) {
    result = fromExponential(result);
    //console.log("includes exponential");

    return fromExponential(roundValue(result, decimals * -1));
  }

  //console.log("result after: ", result);

  if (round) return Math.round(result);

  return roundValue(result, decimals * -1);
};

export const roundValue = (value, decimals) => {
  //console.log(value, decimals);
  return Number(Math.round(value + "e+" + decimals) + "e-" + decimals);
};

// Get the CO2 that a given specie offsets in five years
export const getInitialTCO2perYear = (species) => {
  let initialTCO2perYear = 0;

  species.map((specie) => {
    initialTCO2perYear += specie.TCO2perSecond * oneYearInSeconds;
    //console.log("initial tco2 now: ", initialTCO2perYear);
  });

  return Math.round(initialTCO2perYear);
};

export const getDate = (dateInTimestamp) => {
  const date = new Date(dateInTimestamp * 1000);

  return date.toLocaleString();
};
