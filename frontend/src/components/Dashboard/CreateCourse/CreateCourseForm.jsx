import PropTypes from "prop-types";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import { Formik } from "formik";
import { Link } from "react-router-dom";
import BasicInformation from "./Tabs/BasicInformation";
import AdvanceInformation from "./Tabs/AdvanceInformation";

const validate = (values) => {
  const errors = {};
  if (!values.email) {
    errors.email = "Email Missing";
  }
  if (!values.description) {
    errors.description = "Description Missing";
  }
  return errors;
};

const CreateCourseForm = ({ tab, setCurrentTab }) => {
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
