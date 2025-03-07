import React, { useEffect, useState } from "react";
import { useFetchBestInstructorsQuery } from "../../features/api/userApiSlice.js";
import InstructorCard from "./InstructorCard";

const Instructor = () => {
  const { data: fetchTopInstructors } = useFetchBestInstructorsQuery();
  const [topInstructors, setTopInstructors] = useState([]);

  useEffect(() => {
    if (fetchTopInstructors) {
      setTopInstructors(fetchTopInstructors.data);
    }
  }, [fetchTopInstructors]);

  return (
    <section id="instructor" className="py-16 bg-gray-50">
      <div className="container">
        {/* <!-- Section Header Start --> */}
        <div className="section-header">
          <h2>Top Instructors</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 laptop:grid-cols-3 desktop:grid-cols-4 gap-4 px-12 md:px-16 lg:px-20 desktop:px-24 place-items-center">
          {topInstructors.map((instructor, index) => (
            <InstructorCard key={index} instructor={instructor} />
          ))}
          {/* <InstructorCard />
          <InstructorCard />
          <InstructorCard />
          <InstructorCard /> */}
        </div>
      </div>
    </section>
  );
};

export default Instructor;
