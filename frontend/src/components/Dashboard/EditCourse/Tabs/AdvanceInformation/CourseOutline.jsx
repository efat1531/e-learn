/* eslint-disable react/prop-types */
import { Plus } from "lucide-react";
import Input from "../../../../ui/Input";
import _ from "lodash";

const CourseOutline = ({courseOutlines, setCourseOutlines}) => {
  const handleChange = (e, ind) => {
    let outlines = _.cloneDeep(courseOutlines);
    outlines[ind] = e.target.value;
    setCourseOutlines(outlines);
  };

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between">
        <h5>What you will teach in this course ({courseOutlines.length}/8)</h5>
        <span
          className="flex text-Primary-500 gap-2 items-center hover:bg-gray-100 cursor-pointer px-4 py-2"
          onClick={() => {
            if (courseOutlines.length + 1 <= 8)
              setCourseOutlines((prev) => [...prev, ""]);
          }}
        >
          <Plus size={20} /> Add New
        </span>
      </div>
      {/* Content */}
      <div className="space-y-4 mt-2">
        {courseOutlines.map((cnt, ind) => (
          <Input
            label={`0${ind + 1}`}
            key={ind}
            placeholder="What will you teach in this course..."
            value={courseOutlines[ind]}
            onChange={(e) => handleChange(e, ind)}
          />
        ))}
      </div>
    </>
  );
};
export default CourseOutline;
