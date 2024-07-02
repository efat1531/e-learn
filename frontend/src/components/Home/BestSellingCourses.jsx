import CourseGrid from "../Course/CourseGrid";

const BestSellingCourses = () => {
  return (
    <section id="best-selling-course" className="bg-gray-200 py-16">
      <div className="px-8">
        {/* <!-- Section Header Start --> */}
        <div className="section-header">
          <h2>Best Selling Courses</h2>
        </div>
        {/* <!-- Section Header End --> */}
        {/* <!-- Course Grid Start --> */}
        <CourseGrid />
        {/* <!-- Course Grid End --> */}
      </div>
    </section>
  );
};

export default BestSellingCourses;
