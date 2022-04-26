/**
 * This function determines whether a UEI is valid
 * @param {string} d — The UEI to be validated
 * @returns boolean of whether it's valid or not
 */
const validUEI = (d) => {
  // Steps are laid out here:
  // https://www.gsa.gov/about-us/organization/federal-acquisition-service/office-of-systems-management/integrated-award-environment-iae/iae-systems-information-kit/uei-technical-specifications-and-api-information

  d = d.toUpperCase();
  return /^\w{12}$/.test(d) && !/(^0)|\d{9}|[O|I]/.test(d) && _checkDigit(d)
    ? true
    : false;
};

/**
 * Checks to see if the check digit is a valid check digit
 * @param {string} d — The UEI string
 * @returns boolean as to whether the check digit is valid
 */
const _checkDigit = (d) => {
  // This is the workhorse and it runs twice...
  // For each character, you multiply by its position
  // Then you take modulus 10 of the product
  // Then you sum it all up
  const reducerStep = (m) => {
    return m
      .map((i, j) => {
        return (i * (j + 1)) % 10;
      })
      .reduce((i, j) => {
        return i + j;
      }, 0);
  };

  // Convert the first 11 digits of the UEI into an
  // array of ASCII codes for each character
  let s0 = d
    .substr(0, d.length - 1)
    .split("")
    .map((i) => i.charCodeAt(0));
  let res = reducerStep(s0);

  // After you've implemented the reducerStep, you
  // run the same process again until you get a
  // single digit. But this time you're not
  // converting to ASCII. Instead, you're creating
  // an array of integers.
  while (res > 9) {
    res = reducerStep(
      res
        .toString()
        .split("")
        .map((i) => parseInt(i))
    );
  }

  // Check to see if the computed digit is the
  // same as the provided check digit
  return res == d[d.length - 1];
};

let methods = {
  validUEI,
};

// This allows for the private export of the checkDigit
// function for testing purposes
if (process.env.NODE_ENV == "test") {
  methods._checkDigit = _checkDigit;
}
module.exports = methods;
