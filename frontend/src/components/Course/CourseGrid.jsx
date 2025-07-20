import CourseCard from "./CourseCard";

const CourseGrid = () => {
  let r = [1, 2];
  return (
    <div className="grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 py-4">
      {/* <!-- Course Item Start --> */}
      {r.map((c) => (
        <CourseCard key={c} />
      ))}
      {/* <!-- Course Item End --> */}
    </div>
  );
};

export default CourseGrid;
