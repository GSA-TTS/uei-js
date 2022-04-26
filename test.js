const assert = require("assert");
const uei = require("./uei.js");

console.log(process.env.NODE_ENV);

describe("uei functions", function () {
  it("Checks for only valid 12-character alphanumeric", function () {
    assert.equal(uei.validUEI("N4YFFGL$CDX5"), false);
    assert.equal(uei.validUEI("1234G678912F1"), false);
  });
  it("Checks for starts with 0", function () {
    assert.equal(uei.validUEI("023456789123"), false);
  });
  it("Checks for too many digits in a row", function () {
    assert.equal(uei.validUEI("123456789123"), false);
  });
  it("Checks for an I or an O", function () {
    assert.equal(uei.validUEI("123E56789I23"), false);
    assert.equal(uei.validUEI("123E56789O23"), false);
  });
  it("Checks for an invalid checksum", function () {
    assert.equal(uei.validUEI("N4YFFGL4CDX6"), false);
  });
  it("Validates valid UEIs", function () {
    assert.equal(uei.validUEI("N4YFFGL4CDX5"), true);
    assert.equal(uei._checkDigit("N4YFFGL4CDX5"), true);
    assert.equal(uei.validUEI("VN1AJFAD19J9"), true);
    assert.equal(uei.validUEI("DC2LX4S1GGF3"), true);
  });
});
