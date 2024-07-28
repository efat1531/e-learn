import LoginBanner from "../assets/images/LoginBanner.png";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "../features/api/authApiSlice";
import { setCredentials } from "../features/authSlice";
import { toastManager } from "../components/ui/toastGeneral";
import { useFetchUserQuery } from "../features/api/userApiSlice";
import { setUserInformation } from "../features/authSlice";

const Login = () => {
  const [remember, setRemember] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alreadyLoggedIn = localStorage.getItem("eLearn-userInfo");
  const needFetch = !!alreadyLoggedIn;
  const { data } = useFetchUserQuery(undefined, {
    skip: !needFetch,
  });

  const [login, { isLoading }] = useLoginMutation();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const toastId = toastManager.loading("Logging in...");
    const formData = new FormData(event.target);
    const { email, password } = Object.fromEntries(formData.entries());
    try {
      const response = await login({ email, password }).unwrap();
      const { token } = response;
      if (remember) {
        dispatch(setCredentials(token));
      }
      toastManager.updateStatus(toastId, {
        render: "Logged in successfully",
        type: "success",
      });
    } catch (error) {
      const message = await (error?.data
        ? error?.data?.message
        : error?.error?.message || "Something went wrong");
      toastManager.updateStatus(toastId, {
        render: message,
        type: "reject",
      });
    }
  };
  useEffect(() => {
    if (data) {
      dispatch(setUserInformation(data.data));
      navigate(-1);
    }
  }, [data, dispatch, navigate]);
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
