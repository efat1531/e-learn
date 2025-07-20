import mongoose from "mongoose";

// The DynamicFilter class is a utility class that processes query parameters
class DynamicFilter {
  constructor(query) {
    this.query = query;
    this.filters = {};
  }

  // The process method processes the query parameters and returns the filters
  process() {
    for (const [key, value] of Object.entries(this.query)) {
      if (value !== undefined && value !== null && value !== "") {
        if (key === "page" || key === "limit" || key === "sort") continue;
        this.addFilter(key, value);
      }
    }
    return this.filters;
  }

  // The addFilter method adds a filter based on the key and value
  addFilter(key, value) {
    if (this.isDateComparisonQuery(key)) {
      this.addDateComparisonFilter(key, value);
    } else if (this.isPriceComparisonQuery(key)) {
      this.addPriceComparisonFilter(key, value);
    } else if (this.isObjectId(value)) {
      this.addObjectIdFilter(key, value);
    } else if (this.isRangeQuery(value)) {
      this.addRangeFilter(key, value);
    } else if (this.isArrayQuery(value)) {
      this.addArrayFilter(key, value);
    } else if (this.isBooleanQuery(value)) {
      this.addBooleanFilter(key, value);
    } else if (this.isNumericQuery(value)) {
      this.addNumericFilter(key, value);
    } else {
      this.addStringFilter(key, value);
    }
  }

  // The isDateComparisonQuery method checks if the key is a date comparison query
  isDateComparisonQuery(key) {
    return [
      "createdBefore",
      "createdAfter",
      "updatedBefore",
      "updatedAfter",
    ].includes(key);
  }

  // The isPriceComparisonQuery method checks if the key is a price comparison query
  isPriceComparisonQuery(key) {
    return ["priceGreaterThan", "priceLessThan", "priceEquals"].includes(key);
  }

  // The isObjectId method checks if the value is a valid ObjectId
  isObjectId(value) {
    return mongoose.Types.ObjectId.isValid(value);
  }

  // The isRangeQuery method checks if the value is a range query
  isRangeQuery(value) {
    return typeof value === "string" && value.includes("-");
  }

  // The isArrayQuery method checks if the value is an array query
  isArrayQuery(value) {
    return typeof value === "string" && value.includes(",");
  }

  // The isBooleanQuery method checks if the value is a boolean query
  isBooleanQuery(value) {
    return value === "true" || value === "false";
  }

  // The isNumericQuery method checks if the value is a numeric query
  isNumericQuery(value) {
    return !isNaN(value);
  }

  // The addDateComparisonFilter method adds a date comparison filter
  addDateComparisonFilter(key, value) {
    const dateField = key.startsWith("created") ? "createdAt" : "updatedAt";
    const operator = key.endsWith("Before") ? "$lte" : "$gte";
    this.filters[dateField] = { [operator]: new Date(value) };
  }

  // The addPriceComparisonFilter method adds a price comparison filter
  addPriceComparisonFilter(key, value) {
    const price = parseFloat(value);
    if (isNaN(price)) return;

    let operator;
    switch (key) {
      case "priceGreaterThan":
        operator = "$gt";
        break;
      case "priceLessThan":
        operator = "$lt";
        break;
      case "priceEquals":
        operator = "$eq";
        break;
    }

    this.filters.price = { [operator]: price };
  }

  // The addObjectIdFilter method adds an ObjectId filter
  addObjectIdFilter(key, value) {
    this.filters[key] = new mongoose.Types.ObjectId(value);
  }

  // The addRangeFilter method adds a range filter
  addRangeFilter(key, value) {
    const [min, max] = value.split("-");
    this.filters[key] = {};
    if (min) this.filters[key].$gte = this.parseValue(key, min);
    if (max) this.filters[key].$lte = this.parseValue(key, max);
  }

  // The addArrayFilter method adds an array filter
  addArrayFilter(key, value) {
    this.filters[key] = {
      $in: value.split(",").map((v) => this.parseValue(key, v.trim())),
    };
  }

  // The addBooleanFilter method adds a boolean filter
  addBooleanFilter(key, value) {
    this.filters[key] = value === "true";
  }

  // The addNumericFilter method adds a numeric filter
  addNumericFilter(key, value) {
    this.filters[key] = parseFloat(value);
  }

  // The addStringFilter method adds a string filter
  addStringFilter(key, value) {
    this.filters[key] = { $regex: value, $options: "i" };
  }

  // The parseValue method parses the value based on the key
  parseValue(key, value) {
    if (key === "createdAt" || key === "updatedAt") {
      return new Date(value);
    }
    if (this.isObjectId(value)) {
      return new mongoose.Types.ObjectId(value);
    }
    return !isNaN(value) ? parseFloat(value) : value;
  }
}

export default DynamicFilter;
