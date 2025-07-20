/* eslint-disable react/prop-types */
import { Plus } from "lucide-react";
import { useState } from "react";
import Input from "../../../../ui/Input";
import _ from "lodash";

const CourseRequirements = ({courseRequirements, setCourseRequirements}) => {
  const handleChange = (e, ind) => {
    let cr = _.cloneDeep(courseRequirements);
    cr[ind] = e.target.value;
    setCourseRequirements(cr);
  };

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between">
        <h5>Course Requirements ({courseRequirements.length}/8)</h5>
        <span
          className="flex text-Primary-500 gap-2 items-center hover:bg-gray-100 cursor-pointer px-4 py-2"
          onClick={() => {
            if (courseRequirements.length + 1 <= 8)
              setCourseRequirements((prev) => [...prev, ""]);
          }}
        >
          <Plus size={20} /> Add New
        </span>
      </div>
      {/* Content */}
      <div className="space-y-4 mt-2">
        {courseRequirements.map((cnt, ind) => (
          <Input
            label={`0${ind + 1}`}
            key={ind}
            placeholder="What is you course requirements..."
            value={courseRequirements[ind]}
            onChange={(e) => handleChange(e, ind)}
          />
        ))}
      </div>
    </>
  );
};
export default CourseRequirements;
