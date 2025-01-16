/* eslint-disable react/prop-types */
import { twMerge } from "tailwind-merge";
import Loader from "./Loader";

const Button = ({
  title,
  className,
  disabled,
  loading,
  secondary,
  ...rest
}) => {
  return (
    <button
      className={
        secondary
          ? twMerge(
              `px-6 py-3 bg-Primary-500 hover:duration-[250ms] cursor-pointer text-white ${
                disabled
                  ? "bg-gray-700 hover:bg-gray-700"
                  : "hover:bg-Primary-600 cursor-pointer "
              }`,
              className
            )
          : twMerge(
              `px-6 py-3 bg-Primary-100 hover:duration-[250ms] text-orange-500 ${
                disabled
                  ? "bg-gray-700 hover:bg-gray-700"
                  : "hover:bg-Primary-500 cursor-pointer hover:text-white"
              }`,
              className
            )
      }
      {...rest}
      disabled={disabled}
    >
      <div
        className={
          secondary
            ? "capitalize font-semibold hover:duration-[250ms]"
            : `capitalize font-semibold hover:duration-[250ms] ${
                disabled && "text-slate-400"
              }`
        }
      >
        {!disabled ? (
          title
        ) : loading ? (
          <span className="flex gap-2 items-center justify-center">
            {title} <Loader />{" "}
          </span>
        ) : (
          title
        )}
      </div>
    </button>
  );
};

export default Button;
