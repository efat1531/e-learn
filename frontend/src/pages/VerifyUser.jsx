import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FaSpinner } from "react-icons/fa"; // Import the spinner icon
import Button from "../components/ui/Button";
import RegisterBanner from "../assets/images/RegisterBanner.png";
import OTPCountDownTimer from "../components/ui/OTPCountDownTimer";
import OTPInput from "../components/ui/OTPInput";
import { toastManager } from "../components/ui/toastGeneral.jsx";
import { useVerifyUserMutation, useLazyFetchNewVerifyOtpQuery } from "../features/api/authApiSlice.js";

const VerifyUser = () => {
  const [otpDuration, setOtpDuration] = useState(null);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const location = useLocation();
  const [verifyUser, { isLoading }] = useVerifyUserMutation();
  const [fetchNewVerifyOtp, { isFetching }] = useLazyFetchNewVerifyOtpQuery();
  
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const emailParam = queryParams.get("email");
    if (emailParam) {
      setEmail(emailParam);
    }

    const savedEndTime = localStorage.getItem("otpResendEndTime");
    if (savedEndTime) {
      const remainingTime = Math.floor(
        (new Date(savedEndTime) - new Date()) / 1000
      );
      if (remainingTime > 0) {
        setOtpDuration(remainingTime);
      }
    }
  }, [location]);

  // Handle Submit OTP
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (otp.length !== 6) {
      toastManager.error("OTP must be a 6-digit number");
      return;
    }

    const data = {
      email: email,
      token: otp,
    };

    try {
      await verifyUser(data).unwrap();
      toastManager.success("Account verified successfully");
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    } catch (error) {
      const errorMessage = error?.data?.message ?? "An error occurred";
      toastManager.error(errorMessage);
    }
  };

  // Handle Resend OTP
  const handleResendOtp = async() => {
    if (!otpDuration || otpDuration <= 0) {
      await fetchNewVerifyOtp(email);
      startResendTimer(900); // 15 minutes
    }
  };

  const startResendTimer = (duration) => {
    const endTime = new Date(new Date().getTime() + duration * 1000);
    localStorage.setItem("otpResendEndTime", endTime);
    setOtpDuration(duration);
  };

  const onEndTimer = () => {
    localStorage.removeItem("otpResendEndTime");
    setOtpDuration(null);
  };

  return (
    <div>
      <div className="flex justify-evenly">
        <div className="w-full bg-[#EBEBFF] hidden tablet:block">
          <div className="max-w-prose mx-auto">
            <img src={RegisterBanner} alt="Register Banner" />
          </div>
        </div>
        <div className="w-full flex items-center">
          <div className="max-w-[650px] w-full mx-auto p-4">
            <h2 className="text-center">Verify your account</h2>
            <form onSubmit={handleSubmit} className="mt-8 grid gap-4">
              <OTPInput length={6} onChange={setOtp} />
              <div className="w-full flex justify-center">
                <Button
                  title={
                    isLoading ? (
                      <div className="flex items-center">
                        <FaSpinner className="animate-spin mr-2" />
                        Verifying
                      </div>
                    ) : (
                      "Verify"
                    )
                  }
                  secondary={true}
                  type="submit"
                  className="px-4 w-28"
                />
              </div>
            </form>
            <div className="my-4 w-full flex items-center justify-center">
              {otpDuration ? (
                <div className="">
                  Please wait{" "}
                  <OTPCountDownTimer
                    duration={otpDuration}
                    onFinishFunction={onEndTimer}
                  />{" "}
                </div>
              ) : (
                <p>
                  Didn't receive OTP?{" "}
                  <button
                    onClick={handleResendOtp}
                    className="text-blue-400 hover:underline"
                  >
                    Please click here to receive OTP
                  </button>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyUser;
