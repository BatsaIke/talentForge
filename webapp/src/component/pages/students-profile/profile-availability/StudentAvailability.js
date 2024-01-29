// ProfileDetails.js
import React from 'react';
import styles from './StudentAvailability.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';

const StudentAvailability = ({ name, school, course, level }) => {
  return (
    <div className={styles.profileDetails}>
        <h2>Availability</h2>
         <section>
          <p>From: </p>
          <p>To: </p>
          </section>
          
     
      
      
      <div className={styles.icon}>
            <span>Edit</span>
            <FontAwesomeIcon icon={faPenToSquare} />
          </div>
    </div>
  );
};

export default StudentAvailability;
