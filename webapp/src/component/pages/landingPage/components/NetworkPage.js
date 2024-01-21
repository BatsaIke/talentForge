// components/ForNetworkPage.js

import Image from 'next/image';
import styles from './Network.module.css';

const NetworkPage = () => {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.leftContainer}>
        <div className={styles.textContainer}>
          <p>Liaise with innovative minds all over the globe. From the {' '}
         
            <span className={styles.passionateColor}>Passionate</span> to the{' '}
            <span className={styles.passionateColor}>Seasoned</span>
            </p>
        </div>
        <div className={styles.headersContainer}>
          <div className={styles.header}>
            <img src="/talentforge.png" alt="Network" />
            <p>Network</p>
          </div>
          <div className={styles.header}>
            <img src="/talentforge.png" alt="Learn" />
            <p>Learn</p>
          </div>
          <div className={styles.header}>
            <Image src="/talentforge.png" width={60} height={60} alt="Grow" />
            <p>Grow</p>
          </div>
        </div>
      </div>
      <div className={styles.rightContainer}>
        <Image className={styles.rightImage} src="/global-workers.png"width={300} height={300}  alt="Your Image" />
      </div>
    </div>
  );
};

export default NetworkPage;
