// MyInput.js
import React from 'react';
import './Input.css';

const Input = React.forwardRef(({ placeholder, onChange, value, type, ...props }, ref) => {
  return (
    <input
      ref={ref}
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      className="my-input"
      {...props}
    />
  );
});

export default Input;
