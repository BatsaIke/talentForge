// Checkbox.js
import React from 'react';
import './Checkbox.css';

const Checkbox = React.forwardRef(({ label, checked, onChange, ...rest }, ref) => {
  return (
    <div className="checkbox-container">
      <label className="checkbox-label">
        <input type="checkbox" checked={checked} onChange={onChange} ref={ref} {...rest} />
        {label}
      </label>
    </div>
  );
});

export default Checkbox;
