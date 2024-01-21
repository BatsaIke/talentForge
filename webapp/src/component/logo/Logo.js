// Logo.js
import React from 'react';
import styles from './Logo.module.css' 
import Image from 'next/image';

const Logo = () => {
  return (
    <div className={styles.logoContainer}>
      <p className={styles.leftText}>Talent</p>
      <Image
        src="/talentforge.png"
        alt="Logo"
        className={styles.logoImage}
        width={80} // Set the width according to your design
        height={80} // Set the height according to your design
      />
      <p className={styles.rightText}>Forge</p>
    </div>
  );
};

export default Logo;
