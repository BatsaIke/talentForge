// components/LandingPage.js
import Image from 'next/image';
import styles from './ForBusiness.module.css';

const ForBusiness = () => {
  return (
    <div className={styles.container}>
{/* Right Column */}
<div className={styles.leftColumn}>
        <div className={styles.leftContent}>
          <Image
            src="/s-interns.png"
            alt="interns"
            width={300} height={300}
          />
        </div>
      </div>




      {/* Left Column */}
      <div className={styles.rightColumn}>
        <div className={styles.rightContent}>
          <div className={styles.rightItem}>For Businesses</div>
          <div className={styles.rightItemContent}>
            <h2 style={{ width: 300, color: '#2D2F34', textAlign: "right" }}>
              Get involved in shaping the next generation of workers
            </h2>
            <button className={styles.applyButton}>Sign Up</button>
            <div className={styles.sectionText}>
              <p style={{ fontSize: 12, width: 400, textAlign: "right" }}>
                Hire a pre vetted coah-able intern interest and  {' '}
                <br></br>with condiderable knowledge in your industry
              </p>
            </div>
          </div>
        </div>
      </div>

      
    </div>
  );
};

export default ForBusiness;
