// ProfileDetails.js
import React from 'react';
import styles from './ProfileDetails.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';

const ProfileDetails = ({ name, school, course, level }) => {
  return (
    <div className={styles.profileDetails}>
      <div className={styles.leftSection}>
        <h2>Bio</h2>
        <div className={styles.leftContent}>
          <p>Name</p>
          <p>School</p>
          <p>Course</p>
          <p>Level</p>
        </div>
      </div>
      <div className={styles.rightSection}>
        <div className={styles.leftContent}>
          <p>{name}</p>
          <p>{school}</p>
          <p>{course}</p>
          <p>{level}</p>
          <div className={styles.icon}>
            <span>Edit</span>
            <FontAwesomeIcon icon={faPenToSquare} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;
