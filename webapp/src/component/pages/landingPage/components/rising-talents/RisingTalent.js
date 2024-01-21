// components/RisingTalents.js

import React from 'react';
import styles from './RisingTalents.module.css'; // Import the CSS file
import { talentData } from '../../webData';
import Image from 'next/image';

const RisingTalents = ({ talents }) => {
  return (
    <div className={styles.risingTalentsPage}>
        <h4>Rising Talents</h4>
      {talentData.map((talent) => (
        <div key={talent.id} className={styles.talentContainer}>
          <div className={styles.leftSide}>
            <div className={styles.studentImageContainer}>
              <Image src={"/batsa.jpg"} width={50} height={60} alt={talent.name}  className={styles.studentImage} />
              <Image src={"/supervise-intern.png"} width={50} height={60}  alt="School Logo" className={styles.schoolLogo} />
            </div>
          </div>
          <div className={styles.rightSide}>
            <div className={styles.studentInfo}>
              <h3>{talent.name}</h3>
              <ul>
              <li>{`${talent.courseOfStudy}`}</li>
              <li> {`${talent.level}`} Student </li>
                <li>{talent.specialty}</li>
              <button className={styles.viewMoreButton}>View More</button>
              </ul>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RisingTalents;
