import PropTypes from "prop-types";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import { Formik } from "formik";
import { json, Link } from "react-router-dom";
import BasicInformation from "./Tabs/BasicInformation";
import AdvanceInformation from "./Tabs/AdvanceInformation/AdvanceInformation";
import { useState } from "react";
import Curriculum from "./Tabs/Curriculum/Curriculum";

const validate = (values) => {
  const errors = {};
  if (!values.title) {
    errors.title = "Email Missing";
  }
  if (!values.description) {
    errors.description = "Description Missing";
  }
  return errors;
};

const CreateCourseForm = ({ tab, setCurrentTab }) => {
  const [courseOutlines, setCourseOutlines] = useState(["", ""]);
  const [courseRequirements, setCourseRequirements] = useState(["", ""]);
  const [targetAudience, setTargetAudience] = useState(["", ""]);
  const [thumbnailFile, setThumbnailFile] = useState("");

  function isEmpty(obj) {
    console.log(Object.keys(obj).length === 0);
    return Object.keys(obj).length === 0;
  }

  return (
    <div>
      <Formik
        initialValues={{
          title: "",
          description: "",
        }}
        validate={validate}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(true);
          //   Action
          console.log(values);
          console.log(courseOutlines);
          console.log(targetAudience);
          console.log(courseRequirements);
          console.log(thumbnailFile);
          setSubmitting(false);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          //   isSubmitting,
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit}>
            {tab == "basic" && (
              <BasicInformation
                values={values}
                errors={errors}
                touched={touched}
                handleBlur={handleBlur}
                handleChange={handleChange}
                setCurrentTab={setCurrentTab}
              />
            )}
            {tab == "advance" && (
              <AdvanceInformation
                values={values}
                errors={errors}
                touched={touched}
                handleBlur={handleBlur}
                handleChange={handleChange}
                setCurrentTab={setCurrentTab}
                courseOutlines={courseOutlines}
                setCourseOutlines={setCourseOutlines}
                courseRequirements={courseRequirements}
                setCourseRequirements={setCourseRequirements}
                targetAudience={targetAudience}
                setTargetAudience={setTargetAudience}
                setThumbnailFile={setThumbnailFile}
              />
            )}
            {tab == "curriculum" && (
              <Curriculum
                values={values}
                errors={errors}
                touched={touched}
                handleBlur={handleBlur}
                handleChange={handleChange}
                setCurrentTab={setCurrentTab}
              />
            )}
          </form>
        )}
      </Formik>
    </div>
  );
};
export default CreateCourseForm;

CreateCourseForm.propTypes = {
  tab: PropTypes.string.isRequired,
  setCurrentTab: PropTypes.func.isRequired,
};
