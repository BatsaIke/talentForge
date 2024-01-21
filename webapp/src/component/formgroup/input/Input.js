// MyInput.js
import React from 'react';
import './Input.css'

const Input = ({ placeholder, onChange, value,type,props }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      className="my-input"
      {...props}
    />
  );
};


export default Input;
