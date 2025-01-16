const SORT_BY = [
  {
    SORT_NAME: "price-asc",
    SORT_VALUE: { currentPrice: 1 },
  },
  {
    SORT_NAME: "price-desc",
    SORT_VALUE: { currentPrice: -1 },
  },
  {
    SORT_NAME: "rating",
    SORT_VALUE: { rating: 1 },
  },
  {
    SORT_NAME: "rating-desc",
    SORT_VALUE: { rating: -1 },
  },
  {
    SORT_NAME: "oldest",
    SORT_VALUE: { createdAt: 1 },
  },
  {
    SORT_NAME: "newest",
    SORT_VALUE: { createdAt: -1 },
  },
  {
    SORT_NAME: "name",
    SORT_VALUE: { slug: 1 },
  },
  {
    SORT_NAME: "name-desc",
    SORT_VALUE: { slug: -1 },
  },
  {
    SORT_NAME: "students",
    SORT_VALUE: { numStudents: -1 },
  },
  {
    SORT_NAME: "course-rating",
    SORT_VALUE: { courseRating: -1 },
  },
  {
    SORT_NAME: "course-students",
    SORT_VALUE: { courseStudents: -1 },
  },
];

export default SORT_BY;
