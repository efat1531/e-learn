import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';

const OTPInput = ({ length, onChange }) => {
  const [otp, setOtp] = useState(Array(length).fill(''));
  const inputs = useRef([]);

  const handleChange = (element, index) => {
    const value = element.value.replace(/\D/g, '');
    if (value) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      onChange(newOtp.join(''));

      // Focus on the next input
      if (index < length - 1) {
        inputs.current[index + 1].focus();
      }
    }
  };

const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace') {
      if (otp[index]) {
        const newOtp = [...otp];
        newOtp[index] = '';
        setOtp(newOtp);
        onChange(newOtp.join(''));
      } else if (index > 0) {
        inputs.current[index - 1].focus();
      }
    }
  };

  return (
    <div className="flex justify-center gap-4 items-center w-full">
      {Array(length).fill().map((_, i) => (
        <input
          key={i}
          type="text"
          maxLength="1"
          value={otp[i]}
          onChange={(e) => handleChange(e.target, i)}
          onKeyDown={(e) => handleKeyDown(e, i)}
          ref={(el) => (inputs.current[i] = el)}
          className="w-8 h-12 text-center text-lg border border-gray-300 rounded"
        />
      ))}
    </div>
  );
};

OTPInput.propTypes = {
  length: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default OTPInput;