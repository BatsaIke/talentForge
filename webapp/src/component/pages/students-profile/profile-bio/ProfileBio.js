// ProfileBio.js
import React from 'react';
import styles from './ProfileBio.module.css';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';

const ProfileBio = ({ profileImage, skills, bio }) => {
  return (
    <div className={styles.profileBio}>
      <Image src={profileImage} alt="Profile" width={100} height={100} className={styles.profileImage} />
      <div className={styles.bioDiv}>
        <div className={styles.skills}>
          <ul>
            {skills.map((skill, index) => (
              <li key={index}> Skills: {skill}</li>
            ))}
          </ul>
        </div>
        <p className={styles.bio}>{bio}</p>
        <div className={styles.icon}>
          <span>Edit</span>
          <FontAwesomeIcon icon={faPenToSquare} />
        </div>
      </div>
    </div>
  );
};

export default ProfileBio;
