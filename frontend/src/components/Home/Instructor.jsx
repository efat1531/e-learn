import InstructorCard from "./InstructorCard";

const Instructor = () => {
  return (
    <section id="instructor" className="py-16">
      <div className="container">
        {/* <!-- Section Header Start --> */}
        <div className="section-header">
          <h2>Top Instructors</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 laptop:grid-cols-3 desktop:grid-cols-4 gap-4 mx-auto items-center">
          <InstructorCard />
          <InstructorCard />
          <InstructorCard />
        </div>
      </div>
    </section>
  );
};

export default Instructor;
