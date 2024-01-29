// Alert.js
import React from 'react';
import { useSelector } from 'react-redux';
import './Alert.css';

const Alert = () => {
  const alerts = useSelector((state) => state.alerts);
  return (
   
      <div className="alert-wrapper">
        {React.Children.toArray(
           alerts.map((alert) => (
            <div className={`alert alert-${alert.alertType}`}>
              {alert.msg}
            </div>
          ))
        )
       }
      </div>
   
  );
};

export default Alert;
