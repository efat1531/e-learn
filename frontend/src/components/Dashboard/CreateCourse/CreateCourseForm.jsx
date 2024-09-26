import PropTypes from "prop-types";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import { Formik } from "formik";
import { json, Link } from "react-router-dom";
import BasicInformation from "./Tabs/BasicInformation";
import AdvanceInformation from "./Tabs/AdvanceInformation/AdvanceInformation";
import { useState } from "react";
import Curriculum from "./Tabs/Curriculum/Curriculum";
import PublishCourse from "./Tabs/PublishCourse";

const validate = (values) => {
  const errors = {};
  if (!values.title) {
    errors.title = "Title Missing";
  }
  if (!values.description) {
    errors.description = "Description Missing";
  }
  if (!values.price) {
    errors.price = "Course price Missing";
  }
  if (!values.introVideo) {
    errors.introVideo = "Course intro video Missing";
  }
  if (!values.summary) {
    errors.summary = "Course summary Missing";
  }
  if (!values.level) {
    errors.level = "Course level Missing";
  }
  if (!values.language) {
    errors.language = "Course language Missing";
  }
  return errors;
};

const CreateCourseForm = ({ tab, setCurrentTab }) => {
  const [courseOutlines, setCourseOutlines] = useState(["", ""]);
  const [courseRequirements, setCourseRequirements] = useState(["", ""]);
  const [targetAudience, setTargetAudience] = useState(["", ""]);
  const [thumbnailFile, setThumbnailFile] = useState("");

  // Curriculum
  const [curriculums, setCurriculums] = useState([]);

  function isEmpty(obj) {
    console.log(Object.keys(obj).length === 0);
    return Object.keys(obj).length === 0;
  }

  return (
    <div>
      <Formik
        initialValues={{
          title: "",
          duration: 0,
          price: 0,
          discount: 0,
          discountExpires: "",
          introVideo: "",
          summary: "",
          level: "",
          language: "",
          description: "",
        }}
        validate={validate}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(true);
          //   Action
          const data = {
            title: values.title,
            duration: values.duration,
            price: values.price,
            discount: values.discount,
            discountExpires: values.discountExpires,
            introVideo: values.introVideo,
            summary: values.summary,
            level: values.level,
            language: values.language,
            description: values.description,
            whatYouWillLearn: courseOutlines,
            requirements: courseRequirements,
            courseContent: curriculums,
          }
          console.log(data);
          
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
                curriculums={curriculums} 
                setCurriculums={setCurriculums}
              />
            )}
            {tab == "publish" && (
              <PublishCourse
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
