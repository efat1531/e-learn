import SORT_BY from "./sortBy.js";

class DynamicSort {
  // Constructor with query parameter
  constructor(query) {
    this.query = query;
    this.sortOptions = {};
  }

  // Process the query parameter
  process() {
    // Check if the query parameter has a sort option
    if (this.query.sort) {
      const sortQueries = this.query.sort.split(",");
      // Loop through the sort options
      sortQueries.forEach((sortQuery) => {
        const sortOption = SORT_BY.find(
          (option) => option.SORT_NAME === sortQuery
        );
        if (sortOption) {
          Object.assign(this.sortOptions, sortOption.SORT_VALUE);
        }
      });
    }
    return this.sortOptions;
  }
}

export default DynamicSort;
