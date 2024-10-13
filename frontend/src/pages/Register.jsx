import { Link } from "react-router-dom";
import RegisterBanner from "../assets/images/RegisterBanner.png";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { toastManager } from "../components/ui/toastGeneral.jsx";
import { passwordValidator } from "../utils/validatorFunctions.js";
import { useRegisterMutation } from "../features/api/authApiSlice.js";
const Register = () => {
  const [register, { isLoading }] = useRegisterMutation();
  const handleSubmit = async(e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      name: formData.get("full_name"),
      email: formData.get("email"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirm_password"),
      agree: formData.get("agree_toc") === "on",
    };
    if (!data.agree) {
      toastManager.error("Please agree to the terms and conditions");
      return;
    }
    
    const passwordValidation = passwordValidator(data.password);
    if (passwordValidation) {
      toastManager.error(passwordValidation);
      return;
    }
    if (data.password !== data.confirmPassword) {
      toastManager.error("Passwords do not match");
      return;
    }

    try {
      await register(data).unwrap();
      toastManager.success("Account created successfully");
      setTimeout(() => {
        window.location.href = "/verify?email=" + data.email;
      }, 2000);
    } catch (error) {
      const errorMessage = error?.data?.message ?? "An error occurred";
      toastManager.error(errorMessage);
    }
    
  };
  return (
    <div>
      <div className="flex justify-evenly">
        <div className="w-full bg-[#EBEBFF] hidden tablet:block">
          <div className="max-w-prose mx-auto">
            <img src={RegisterBanner} />
          </div>
        </div>
        <div className="w-full flex items-center">
          <div className="max-w-[650px] w-full mx-auto p-4">
            <h2 className="text-center">Create your account</h2>
            <form onSubmit={handleSubmit} className="mt-8 grid gap-4">
              <Input
                label="Full Name"
                id="full_name"
                placeholder="Enter first and last name"
              />
              <Input
                label="Email"
                id="email"
                type="email"
                placeholder="Email address..."
              />
              <div className="flex gap-4">
                <Input
                  label="Password"
                  placeholder="Password"
                  type="password"
                  id="password"
                />
                <Input
                  label="Confirm Password"
                  placeholder="Confirm Password"
                  type="password"
                  id="confirm_password"
                />
              </div>
              <div className="flex justify-between">
                <div className="flex gap-2 items-center">
                  <input
                    type="checkbox"
                    className="h-5 w-5 border accent-Primary-600"
                    id="agree_toc"
                    name="agree_toc"
                  />
                  <label htmlFor="agree_toc" className="cursor-pointer">
                    I Agree with your{" "}
                    <Link
                      to="/terms_conditions"
                      className="text-blue-400 hover:underline"
                    >
                      Terms and Conditions
                    </Link>
                  </label>
                </div>
                <Button
                  title="Create Account"
                  secondary={true}
                  type="submit"
                  className="px-4 "
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
