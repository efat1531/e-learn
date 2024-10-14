import { Upload } from "lucide-react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import ChangePasswordForm from "./ChangePasswordForm";
import { Formik } from "formik";
import { useContext } from "react";
import { ProfileContext } from "../../pages/StudentDashboard";

const validate = (values) => {
  const errors = {};
  if (!values.name) {
    errors.name = "Name Missing";
  }
  if (!values.email) {
    errors.email = "Email Missing";
  }
  return errors;
};

const StudentDashboardSettingsForm = () => {
  const profile = useContext(ProfileContext);

  return (
    <>
      <div className="max-w-[82.5rem] mx-auto px-4">
        <h3>Account settings</h3>
        <div className="grid md:grid-cols-3 gap-8 mt-8">
          <div className="w-full">
            <div className="border p-8">
              <div className="relative">
                <img
                  src={`${profile.profilePicture}`}
                  alt="Profile"
                  className="w-full aspect-square object-cover"
                />
                <button className="absolute bottom-0 bg-black/30 w-full py-2 text-white flex items-center justify-center gap-1 shadow font-normal cursor-pointer hover:bg-black/50">
                  <Upload size={16} />
                  Upload Photo
                </button>
              </div>
              <p className="text-sm text-gray-500 mt-4 text-center">
                Image size should be under 1MB and image ratio needs to be 1:1
              </p>
            </div>
          </div>
          <div className="w-full col-span-2">
            <Formik
              initialValues={{
                name: profile.name,
                email: profile.email,
              }}
              validate={validate}
              onSubmit={async (values, { setSubmitting }) => {
                setSubmitting(true);
                console.log("here");

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
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="row">
                    <Input
                      id="name"
                      name="name"
                      label="Full Name"
                      placeholder="Full name"
                      required
                      type="text"
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <p className="text-xs text-red-400 font-bold mt-2">
                      {errors.name && touched.name && errors.name}
                    </p>
                  </div>

                  <div className="row">
                    <Input
                      id="email"
                      name="email"
                      label="Email"
                      placeholder="Email address"
                      required
                      type="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <p className="text-xs text-red-400 font-bold mt-2">
                      {errors.email && touched.email && errors.email}
                    </p>
                  </div>
                  <Button title={"Save Changes"} type="submit" secondary />
                </form>
              )}
            </Formik>
          </div>
        </div>
      </div>
      <ChangePasswordForm />
    </>
  );
};
export default StudentDashboardSettingsForm;
