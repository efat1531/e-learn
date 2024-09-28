import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import React from "react";
import PropTypes from "prop-types";

const Input = ({ id, type, label, optional = false, ...rest }) => {
  const [hide, setHide] = useState(false);
  return (
    <div className="grid gap-2 w-full">
      <label htmlFor={id}>{label}</label>
      <div className="relative">
        <input
          type={type === "password" ? (hide ? "text" : type) : type}
          id={id}
          name={id}
          {...rest}
          className="px-4 py-2 bg-white border w-full"
          required={!optional}
        />
        {type === "password" && (
          <span className="absolute top-2.5 right-2">
            {!hide ? (
              <Eye
                className="text-gray-500 cursor-pointer"
                onClick={() => setHide((prev) => !prev)}
              />
            ) : (
              <EyeOff
                className="text-gray-500 cursor-pointer"
                onClick={() => setHide((prev) => !prev)}
              />
            )}
          </span>
        )}
      </div>
    </div>
  );
};

Input.propTypes = {
  id: PropTypes.string,
  type: PropTypes.string,
  label: PropTypes.string,
  optional: PropTypes.bool,
};

export default Input;
