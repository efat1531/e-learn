/* eslint-disable react/prop-types */
import Button from "../../../ui/Button";
import Input from "../../../ui/Input";
import Select from "../../../ui/Select";

const BasicInformation = ({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  setCurrentTab
}) => {
  return (
    <>
      <div className="p-8 border-b">
        <h3>Basic Information</h3>
      </div>
      {/* Form Content */}
      <div className="p-8">
        <div className="row">
          {/* Title */}
          <div>
            <Input
              id="title"
              label="Title"
              placeholder="Your Course Title"
              required
              type="text"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.title}
            />
            <p className="text-xs text-red-400 font-bold mt-2">
              {errors.title && touched.title && errors.title}
            </p>
          </div>
        </div>
        <div className="row mt-4">
          {/* Course Category */}
          <div>
            <Select
              id="category"
              label="Course category"
              required
              items={[]}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.title}
            />
            <p className="text-xs text-red-400 font-bold mt-2">
              {errors.title && touched.title && errors.title}
            </p>
          </div>
        </div>
        {/* Button */}
        <div className="mt-4">
          <Button
            title="Save & Next"
            secondary
            type="button"
            onClick={() => setCurrentTab('advance')}
          />
        </div>
      </div>
    </>
  );
};
export default BasicInformation;
