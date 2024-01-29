// ProfileDocuments.js
import React from 'react';
import styles from './ProfileDocuments.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';

const ProfileDocuments = () => {
  return (
    <div className={styles.profileDocuments}>
      <div className={styles.requiredDocuments}>
        <h2>Relevant Documents (Required)</h2>
        <p>Curriculum Vitae: <a href="#">Link to CV</a></p>
        <hr className={styles.verticalLine}></hr>
      </div>

      <div className={styles.optionalDocuments}>
        <h2>Relevant Documents (Optional)</h2>
        <p>Cover Letter: <a href="#">Link to Cover Letter</a></p>
        <p>Transcript: <a href="#">Link</a></p>
        <p>Recommendation Letter: <a href="#">Link</a></p>
        <hr className={styles.verticalLine}></hr>
      </div>

      <div className={styles.projects}>
        <h2>Projects</h2>
        <p>Projects: <a href="#">Link to Project</a></p>
        <hr className={styles.verticalLine}></hr>
      </div>

      <div className={styles.experience}>
        <h2>Experience (Optional)</h2>
        <p>Name of Company: </p>
        <p>Position: </p>
        <p>From: Date</p>
        <p>To: Date</p>
        <p>Role Description: Description</p>
        <hr className={styles.verticalLine}></hr>


        <div className={styles.icon}>
            <span>Edit</span>
            <FontAwesomeIcon icon={faPenToSquare} />
          </div>
      </div>
    </div>
  );
};

export default ProfileDocuments;
