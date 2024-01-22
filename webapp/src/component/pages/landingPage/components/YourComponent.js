// YourComponent.jsx
import React from 'react';
import styles from './YourComponent.module.css';
import JobOffers from './job-offers/JobOffers';
import ForStudents from './for-students/ForStudents';
import ForBusiness from './for-business/ForBusiness';
import NetworkPage from './NetworkPage';
import RisingTalents from './rising-talents/RisingTalent';
import BlogPage from './blog-page/BlogPage';
import Link from 'next/link';

const YourComponent = () => {
  return (
    <div className={styles.container}>
      <div className={styles.leftColumn}>
        <JobOffers></JobOffers>
        <RisingTalents/>
        <BlogPage/>
        
      
       
        {/* Add your content here */}
      </div>
      <div className={styles.rightColumn}>
       <ForStudents/>
       <ForBusiness/>
       <NetworkPage/>
       
       <div className={styles.rightItemSignup}> 
          <div className={styles.signupDiv}>
          <p>Perfect Career Mentorhsip Opportunity is Just a Click Away</p>
          <Link href={"signup"} className={styles.signupDivLink}> Sign Up</Link>
          </div>
          </div>
       
        {/* Add your content here */}
      </div>
    </div>
  );
};

export default YourComponent;
