// components/Header.js

import Link from 'next/link';
import styles from './Header.module.css';
import Button from '../formgroup/button/Button';
import Image from 'next/image';

const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <Image src="/talentforge.png" alt="Logo" width={50} height={50} /> 
      </div>
      <div className={styles.nav}>
        <Link href={"forgot-password"} className={styles.navItem}>Explore Services</Link>
        <Link href='interns' className={styles.navItem}>Explore Intern</Link>
        <Link href='jobs' className={styles.navItem}>Explore Jobs</Link>
      </div>
      <div className={styles.buttons}>
        <button className={styles.applyButton}>Apply for Intern</button>
        <button className={styles.hireButton}>Hire Interns</button>
        <Link href={"login"}className={styles.loginButton}>Login</Link> 
      </div>
      
    </div>
  );
};

export default Header;
