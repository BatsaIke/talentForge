// Button.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Button.css';

const Button = ({ onClick, children, type, icon, className, ...props }) => {
  // Add the new class to the button
  const buttonClassName = `my-button ${className || ''}`;

  return (
    <button
      type={type}
      onClick={onClick}
      className={buttonClassName}
      {...props}
    >
      {children}
      {icon && <FontAwesomeIcon icon={icon} className="icon-right" />}
    </button>
  );
};

export default Button;
