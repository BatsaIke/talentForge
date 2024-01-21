// components/LandingPage.js
import Link from 'next/link';
import styles from './LandingPage.module.css';
import NetworkPage from './components/NetworkPage';
import BlogPage from './components/blog-page/BlogPage';
import ForBusiness from './components/for-business/ForBusiness';
import ForStudents from './components/for-students/ForStudents';
import JobOffers from './components/job-offers/JobOffers';
import RisingTalents from './components/rising-talents/RisingTalent';

const LandingPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.leftColumn}>
        <div className={styles.leftContent}>
          <div className={styles.jobOffers}>
            <JobOffers/>
          </div>
          <div className={styles.leftItemRising}>
            <RisingTalents/>
            </div>
          <div className={styles.leftItemBlog}>
            <BlogPage />
          </div>
        </div>
      </div>
      <div className={styles.rightColumn}>
        <div className={styles.rightContent}>
          <div className={styles.rightItem}>
            <ForStudents/>
          </div>
          <div className={styles.rightItemBusines}>
            <ForBusiness/>
          </div>
          <div className={styles.rightItemNetwork}>
            <NetworkPage/>
          </div>
          <div className={styles.rightItemSignup}> 
          <div className={styles.signupDiv}>
          <p>Perfect Career Mentorhsip Opportunity is Just a Click Away</p>
          <Link href={"signup"} className={styles.signupDivLink}> Sign Up</Link>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
