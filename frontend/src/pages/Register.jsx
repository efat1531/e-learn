import React, { Suspense, lazy, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../features/api/authApiSlice";
import { setCredentials } from "../features/authSlice";
import { toastManager } from "../components/ui/toastGeneral";
import { useFetchUserQuery } from "../features/api/userApiSlice";
import { setUserInformation } from "../features/authSlice";

// Lazy load components
const LoginBanner = lazy(() => import("../assets/images/LoginBanner.png"));
const Button = lazy(() => import("../components/ui/Button"));
const Input = lazy(() => import("../components/ui/Input"));

const Login = () => {
  const [remember, setRemember] = useState(false);
  const [needFetch, setNeedFetch] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id: userID } = useSelector((state) => state.auth);

  const location = useLocation();
  const from = location.state?.from || "/";

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
      const response = await login({ email, password, remember }).unwrap();
      const { token } = response;
      setNeedFetch(true);
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
    if (userID) {
      if (from !== "/login" || from !== "/register") {
        navigate(from);
      }
      navigate("/");
    }
    if (data) {
      dispatch(setUserInformation(data.data));
    }
  }, [data, dispatch, navigate, needFetch, userID]);

  return (
    <div>
      <div className="flex justify-evenly">
        <div className="w-full bg-[#EBEBFF] hidden tablet:block">
          <div className="max-w-prose mx-auto">
            <Suspense fallback={<div>Loading Banner...</div>}>
              <img src={LoginBanner} alt="Login Banner" />
            </Suspense>
          </div>
        </div>
        <div className="w-full flex items-center">
          <div className="max-w-[650px] w-full mx-auto p-4">
            <h2 className="text-center">Sign in to your account</h2>
            <form onSubmit={handleSubmit} className="mt-8 grid gap-4">
              <Suspense fallback={<div>Loading Input...</div>}>
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
              </Suspense>
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
                <Suspense fallback={<div>Loading Button...</div>}>
                  <Button
                    title="Sign in"
                    type="submit"
                    secondary={true}
                    className="px-8"
                  />
                </Suspense>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
