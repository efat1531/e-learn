/* eslint-disable react/prop-types */
import Button from "../../../ui/Button";
import Input from "../../../ui/Input";
import Select from "../../../ui/Select";
import TextArea from "../../../ui/TextArea";

const PublishCourse = ({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  setCurrentTab,
}) => {
  return (
    <>
      <div className="p-8 border-b">
        <h3>Publish Course</h3>
      </div>
      {/* Form Content */}
      <div className="p-8">
        <div className="row">
          {/* Level */}
          <div>
            <Select
              id="level"
              label="Course Level"
              required
              items={[{value:'Beginner', label:'Beginner'},{value:'Advanced', label:'Advanced'}]}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.level}
            />
            <p className="text-xs text-red-400 font-bold mt-2">
              {errors.level && touched.level && errors.level}
            </p>
          </div>
          {/* Language */}
          <div>
            <Select
              id="language"
              label="Course language"
              required
              items={[{value:'Bangla', label:'Bangla'},{value:'English', label:'English'}]}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.language}
            />
            <p className="text-xs text-red-400 font-bold mt-2">
              {errors.language && touched.language && errors.language}
            </p>
          </div>
        </div>
        {/* Button */}
        <div className="mt-4 flex justify-between">
          <Button
            title="Previous"
            className="bg-transparent text-black border hover:bg-CustomGray-50 hover:text-black"
            secondary
            type="button"
            onClick={() => setCurrentTab("curriculum")}
          />
          <Button title="Update" secondary type="submit" />
        </div>
      </div>
    </>
  );
};
export default PublishCourse;
