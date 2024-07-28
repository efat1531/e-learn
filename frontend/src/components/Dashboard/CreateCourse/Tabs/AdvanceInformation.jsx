/* eslint-disable react/prop-types */
import Button from "../../../ui/Button";
import Input from "../../../ui/Input";
import Select from "../../../ui/Select";
import TextArea from "../../../ui/TextArea";

const AdvanceInformation = ({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
}) => {
  return (
    <>
      <div className="p-8 border-b">
        <h3>Advance Information</h3>
      </div>
      {/* Form Content */}
      <div className="p-8">
        <div className="row">
          {/* Title */}
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
        {/* Button */}
        <div className="mt-4">
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
