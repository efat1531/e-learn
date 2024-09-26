/* eslint-disable react/prop-types */
import { Plus } from "lucide-react";
import { useState } from "react";
import Input from "../../../../ui/Input";
import _ from "lodash";

const TargetAudience = ({targetAudience, setTargetAudience}) => {
  const handleChange = (e, ind) => {
    let audi = _.cloneDeep(targetAudience);
    audi[ind] = e.target.value;
    setTargetAudience(audi);
  };

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between">
        <h5>Target Audience ({targetAudience.length}/8)</h5>
        <span
          className="flex text-Primary-500 gap-2 items-center hover:bg-gray-100 cursor-pointer px-4 py-2"
          onClick={() => {
            if (targetAudience.length + 1 <= 8)
              setTargetAudience((prev) => [...prev, ""]);
          }}
        >
          <Plus size={20} /> Add New
        </span>
      </div>
      {/* Content */}
      <div className="space-y-4 mt-2">
        {targetAudience.map((cnt, ind) => (
          <Input
            label={`0${ind + 1}`}
            key={ind}
            placeholder="Who is this course for..."
            value={targetAudience[ind]}
            onChange={(e) => handleChange(e, ind)}
          />
        ))}
      </div>
    </>
  );
};
export default TargetAudience;
