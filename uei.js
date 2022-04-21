/**
 * This function determines whether a UEI is valid
 * @param {string} d — The UEI to be validated
 * @returns boolean of whether it's valid or not
 */
const validUEI = (d) => {
  // Steps are laid out here:
  // https://www.gsa.gov/about-us/organization/federal-acquisition-service/office-of-systems-management/integrated-award-environment-iae/iae-systems-information-kit/uei-technical-specifications-and-api-information

  // 12-character
  if (d.length != 12) {
    return false;
  }

  // The first character is not zero to avoid cutting off digits that can occur during data imports, for example, when importing data into spreadsheet programs.
  if (d[0] == "0") {
    return false;
  }

  //The letters “O” and “I” are not used to avoid confusion with zero and one.
  if (d.toUpperCase().includes("O") || d.toUpperCase().includes("I")) {
    return false;
  }

  // Nine-digit sequences are not used in the identifier to avoid collision with the nine-digit DUNS Number or Taxpayer Identification Number (TIN).
  if (d.match(/\d{9}/)) {
    return false;
  }

  // The final character is a checksum of the first 11 characters. Checksums are used to detect errors within data.
  if (!checkDigit(d)) {
    return false;
  }

  // If you've made it here, it's valid
  return true;
};

/**
 * Checks to see if the check digit is a valid check digit
 * @param {string} d — The UEI string
 * @returns boolean as to whether the check digit is valid
 */
const checkDigit = (d) => {
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

exports.validUEI = validUEI;
