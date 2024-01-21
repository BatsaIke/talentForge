// Checkbox.js
import React from 'react';
import './Checkbox.css';

const Checkbox = ({ label, checked, onChange, ...rest }) => {
  return (
    <div className="checkbox-container">
      <label className="checkbox-label">
        <input type="checkbox" checked={checked} onChange={onChange} {...rest} />
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
