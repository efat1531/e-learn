import LoginBanner from "../assets/images/LoginBanner.png";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../features/api/authApiSlice";
import { setCredentials, setTempCredentials } from "../features/authSlice";
import { toast } from "react-toastify";

const Login = () => {
  const [remember, setRemember] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/home");
    }
  }, [navigate, userInfo]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const { email, password } = Object.fromEntries(formData.entries());

    try {
      const response = await login({ email, password }).unwrap();
      const { token } = response;
      if (remember) {
        dispatch(setCredentials(token));
      } else {
        dispatch(setTempCredentials(token));
      }
      toast.success("Logged in successfully");
      navigate("/home");
    } catch (error) {
      const message = error.data ? error.data.message : error.error.message;
      toast.error(message);
    }
  };
  return (
    <div>
      <div className="flex justify-evenly">
        <div className="w-full bg-[#EBEBFF] hidden tablet:block">
          <div className="max-w-prose mx-auto">
            <img src={LoginBanner} />
          </div>
        </div>
        <div className="w-full flex items-center">
          <div className="max-w-[650px] w-full mx-auto p-4">
            <h2 className="text-center">Sign in to your account</h2>
            <form onSubmit={handleSubmit} className="mt-8 grid gap-4">
              <Input
                label="Email"
                id="email"
                type="email"
                placeholder="Username or email address..."
              />
              <Input
                label="Password"
                placeholder="Password"
                id="password"
                type="password"
              />
              <div className="flex justify-between">
                <div className="flex gap-2 items-center">
                  <input
                    type="checkbox"
                    className="h-5 w-5 border accent-Primary-600"
                    id="remember"
                    value={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                  />
                  <label htmlFor="remember" className="cursor-pointer">
                    Remember Me
                  </label>
                </div>
                <Button
                  title="Sign in"
                  type="submit"
                  secondary={true}
                  className="px-8"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
