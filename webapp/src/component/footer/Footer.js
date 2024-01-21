// components/Footer.js

import React from 'react';
import Link from 'next/link';
import styles from './Footer.module.css'; // Import the CSS file
import Image from 'next/image';
import { companyData, conatactData, internData } from '../pages/landingPage/webData';

const Footer = () => {
  return (
    <div className={styles.footerContainer}>
      {/* Left Side */}
      <div className={styles.leftSide}>
        <Image src="/footerlogo.png" alt="Logo" className={styles.logo} width={900} height={900} />
        <div className={styles.copyrightText}>@2024 Talent Forge</div>
      </div>

      {/* Right Side */}
      <div className={styles.rightSide}>
        {/* Companies Section */}
        <div className={styles.rightSideItems}>
          <div className={styles.footerSection}>
            <h4>Companies</h4>
             {/* Display company names and links */}
          <div className={styles.companysLinks}>
            {companyData.map((company) => (
              <div key={company.id}>
                <Link href={company.link}>{company.name}</Link>
              </div>
            ))}
          </div>
          </div>

          {/* Interns Section */}
          <div className={styles.footerSection}>
            <h4>Interns</h4>
            <div className={styles.internLinks}>
            {internData.map((intern) => (
              <Link key={intern.id} href={intern.link}>
                <div>{intern.name}</div>
              </Link>
            ))}
          </div>
          </div>

          {/* Company Section */}
          <div className={styles.footerSection}>
            <h4>Company</h4>
           
          </div>

          <div className={styles.footerSection}>
            <h4>Contacts</h4>
            <div className={styles.internLinks}>
            {conatactData.map((intern) => (
              <Link key={intern.id} href={intern.link}>
                <div>{intern.name}</div>
              </Link>
            ))}
          </div>
          </div>

          
          
        </div>
        {/* Navigation Links */}
        <div className={styles.navLinks}>
            <Link href="/terms-of-service">Terms of Service</Link>
            <span className={styles.separator}></span>
            <Link href="/privacy-policy">Privacy Policy</Link>
            <span className={styles.separator}></span>
            <Link href="/privacy-settings">Privacy Settings</Link>
          </div>
      </div>
    </div>
  );
};

export default Footer;
