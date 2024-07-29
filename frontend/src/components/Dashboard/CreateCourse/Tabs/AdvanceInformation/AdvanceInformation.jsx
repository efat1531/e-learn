/* eslint-disable react/prop-types */
import { useRef, useState } from "react";
import Button from "../../../../ui/Button";
import Input from "../../../../ui/Input";
import Select from "../../../../ui/Select";
import TextArea from "../../../../ui/TextArea";
import { X } from "lucide-react";
import CourseOutline from "./CourseOutline";
import TargetAudience from "./TargetAudience";
import CourseRequirements from "./CourseRequirements";

const AdvanceInformation = ({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  setCurrentTab,
  courseOutlines,
  setCourseOutlines,
  courseRequirements,
  setCourseRequirements,
  targetAudience,
  setTargetAudience,
}) => {
  const [thumbnail, setThumbnail] = useState("");
  const [thumbnailFile, setThumbnailFile] = useState("");

  const ref = useRef();

  const handleFileSelect = (e) => {
    e.preventDefault();
    const files = e.target.files;
    const file = files[0];
    setThumbnailFile(file);
    setThumbnail(URL.createObjectURL(file));
  };

  const handleClick = () => {
    ref.current.click();
  };

  return (
    <>
      <div className="p-8 border-b">
        <h3>Advance Information</h3>
      </div>
      {/* Form Content */}
      {/* Course Thumbnail */}
      <div className="p-8 border-b">
        <div>
          <label htmlFor="courseThumbnail">Course Thumbnail</label>
          <div className="flex gap-4 mt-2">
            {/* Image */}
            <div>
              {thumbnail ? (
                <div className="w-60">
                  <img src={thumbnail} alt="Course photo" />
                </div>
              ) : (
                <div className="w-60">
                  <img
                    src="https://careers.vanoord.com/static/images/placeholder-image.jpg"
                    alt="Course photo"
                  />
                </div>
              )}
            </div>
            <div className="grid gap-4">
              <span>
                Upload your course Thumbnail here. <b>Important guidelines:</b>{" "}
                1200x800 pixels or 12:8 Ratio. Supported format:{" "}
                <b>.jpg, .jpeg, or .png</b>
              </span>
              {/* File Upload */}
              <div>
                <input
                  ref={ref}
                  id="courseThumbnail"
                  type="file"
                  className="hidden"
                  accept=".jpg, .jpeg, .png"
                  onChange={handleFileSelect}
                />
                <Button
                  type="button"
                  title="Upload Image"
                  onClick={handleClick}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Description */}
      <div className="p-8 border-b">
        <div className="row">
          <div>
            <TextArea
              id="description"
              label="Course Description"
              placeholder="Enter your course description"
              required
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.description}
            />
            <p className="text-xs text-red-400 font-bold mt-2">
              {errors.description && touched.description && errors.description}
            </p>
          </div>
        </div>
      </div>
      {/* Course Outline */}
      <div className="p-8 border-b">
        <CourseOutline
          courseOutlines={courseOutlines}
          setCourseOutlines={setCourseOutlines}
        />
      </div>
      {/* Target Audience */}
      <div className="p-8 border-b">
        <TargetAudience
          targetAudience={targetAudience}
          setTargetAudience={setTargetAudience}
        />
      </div>
      {/* Course Requirements */}
      <div className="p-8">
        <CourseRequirements
          courseRequirements={courseRequirements}
          setCourseRequirements={setCourseRequirements}
        />
      </div>
      <div className="px-8 pb-8 border-b">
        {/* Button */}
        <div className="mt-4 flex justify-between">
          <Button
            title="Previous"
            className="bg-transparent text-black border hover:bg-CustomGray-50"
            secondary
            type="button"
            onClick={() => setCurrentTab("basic")}
          />
          <Button
            title="Save & Next"
            secondary
            type="button"
            onClick={() => console.log(values)}
          />
        </div>
      </div>
    </>
  );
};
export default AdvanceInformation;
