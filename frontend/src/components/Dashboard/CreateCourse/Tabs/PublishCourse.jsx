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
          {/* Welcome Message */}
          <div>
            <TextArea
              id="welcomeMessage"
              label="Welcome Message"
              placeholder="Enter the course starting message here..."
              required
              type="text"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.welcomeMessage}
            />
            <p className="text-xs text-red-400 font-bold mt-2">
              {errors.welcomeMessage && touched.welcomeMessage && errors.welcomeMessage}
            </p>
          </div>
          {/* Congratulations Message */}
          <div>
            <TextArea
              id="congratulationsMessage"
              label="Congratulations Message"
              placeholder="Enter the course completed message here..."
              required
              type="text"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.congratulationsMessage}
            />
            <p className="text-xs text-red-400 font-bold mt-2">
              {errors.congratulationsMessage && touched.congratulationsMessage && errors.congratulationsMessage}
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
          <Button title="Submit" secondary type="submit" />
        </div>
      </div>
    </>
  );
};
export default PublishCourse;
