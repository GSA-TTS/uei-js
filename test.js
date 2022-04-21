import assert from "assert";
import { validUEI } from "./uei.js";

describe("uei functions", function () {
  it("Checks for UEI string length", function () {
    assert.equal(validUEI("1234G678912F1"), false);
  });
  it("Checks for starts with 0", function () {
    assert.equal(validUEI("023456789123"), false);
  });
  it("Checks for too many digits in a row", function () {
    assert.equal(validUEI("123456789123"), false);
  });
  it("Checks for an I or an O", function () {
    assert.equal(validUEI("123E56789I23"), false);
    assert.equal(validUEI("123E56789O23"), false);
  });
  it("Checks for an invalid checksum", function () {
    assert.equal(validUEI("N4YFFGL4CDX6"), false);
  });
  it("Validates valid UEIs", function () {
    assert.equal(validUEI("N4YFFGL4CDX5"), true);
    assert.equal(validUEI("VN1AJFAD19J9"), true);
    assert.equal(validUEI("DC2LX4S1GGF3"), true);
  });
});
