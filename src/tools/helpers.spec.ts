import { expect } from "chai";
import { isPlainObject } from "./helpers";
import { isArray } from "./helpers";
import { isArrayOrObject } from "./helpers";

describe("isPlainObject", () => {
  it("should return true for plain objects", () => {
    expect(isPlainObject({})).to.be.true;
    expect(isPlainObject({ key: "value" })).to.be.true;
    expect(isPlainObject(Object.create(null))).to.be.true;
  });

  it("should return false for arrays", () => {
    expect(isPlainObject([])).to.be.false;
  });

  it("should return false for null", () => {
    expect(isPlainObject(null)).to.be.false;
  });

  it("should return false for undefined", () => {
    expect(isPlainObject(undefined)).to.be.false;
  });

  it("should return false for strings", () => {
    expect(isPlainObject("string")).to.be.false;
  });

  it("should return false for numbers", () => {
    expect(isPlainObject(123)).to.be.false;
  });

  it("should return false for booleans", () => {
    expect(isPlainObject(true)).to.be.false;
    expect(isPlainObject(false)).to.be.false;
  });

  it("should return false for Date objects", () => {
    expect(isPlainObject(new Date())).to.be.false;
  });

  it("should return false for functions", () => {
    expect(isPlainObject(() => {})).to.be.false;
  });
});

describe("isArray", () => {
  it("should return true for arrays", () => {
    expect(isArray([])).to.be.true;
    expect(isArray([1, 2, 3])).to.be.true;
    expect(isArray(new Array(5))).to.be.true;
  });

  it("should return false for non-arrays", () => {
    expect(isArray({})).to.be.false;
    expect(isArray("string")).to.be.false;
    expect(isArray(123)).to.be.false;
    expect(isArray(true)).to.be.false;
    expect(isArray(null)).to.be.false;
    expect(isArray(undefined)).to.be.false;
    expect(isArray(() => {})).to.be.false;
    expect(isArray(new Date())).to.be.false;
  });
});

describe("isArrayOrObject", () => {
  it("should return true for plain objects", () => {
    expect(isArrayOrObject({})).to.be.true;
    expect(isArrayOrObject({ key: "value" })).to.be.true;
    expect(isArrayOrObject(Object.create(null))).to.be.true;
  });

  it("should return true for arrays", () => {
    expect(isArrayOrObject([])).to.be.true;
    expect(isArrayOrObject([1, 2, 3])).to.be.true;
    expect(isArrayOrObject(new Array(5))).to.be.true;
  });

  it("should return false for non-arrays and non-objects", () => {
    expect(isArrayOrObject("string")).to.be.false;
    expect(isArrayOrObject(123)).to.be.false;
    expect(isArrayOrObject(true)).to.be.false;
    expect(isArrayOrObject(false)).to.be.false;
    expect(isArrayOrObject(null)).to.be.false;
    expect(isArrayOrObject(undefined)).to.be.false;
    expect(isArrayOrObject(() => {})).to.be.false;
    expect(isArrayOrObject(new Date())).to.be.false;
  });
});
