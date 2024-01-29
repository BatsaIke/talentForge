// components/LandingPage.js
import Image from 'next/image';
import styles from './ForStudents.module.css';
import Link from 'next/link';

const ForStudents = () => {
  return (
    <div className={styles.container}>
      {/* Left Column */}
      <div className={styles.leftColumn}>
        <div className={styles.leftContent}>
          <div className={styles.leftItem}>For Students</div>
          <div className={styles.leftItemContent}>
            <h2 >
              Hone your skills with first-hand industry experience
            </h2>
            <Link href={{ pathname: 'login', query: { userType: 'student' } }} className={styles.applyButton}>Apply Here</Link>
            
            <div className={styles.sectionText}>
              <p >
                Get your next internship appointment. Join this network{' '}
                <br></br>of businesses with job opportunities in various
                industries.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column */}
      <div className={styles.rightColumn}>
        <div className={styles.rightContent}>
          <Image
            src="/supervise-intern.png"
            alt="interns"
             width={300} height={300}
          />
        </div>
      </div>
    </div>
  );
};

export default ForStudents;
