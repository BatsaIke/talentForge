// components/Header.js
"use client"

import Link from 'next/link';
import styles from './Header.module.css';
import Image from 'next/image';
import { buttonLinks } from './Links.';
import { useState } from 'react';

const Header = () => {
  const [open, setOpen] = useState(false) 
  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <Image src="/talentforge.png" alt="Logo" width={50} height={50} /> 
      </div>
      <div className={styles.nav}>
        {buttonLinks.map((link) =>(<Link key={link.path} href={link.path} className={styles.navItem}>{link.title}</Link>))}
        
        
      </div>
      <div className={styles.buttons}>
        <button className={styles.applyButton}>Apply for Intern</button>
        <button className={styles.hireButton}>Hire Interns</button>
        <Link href={"login"}className={styles.loginButton}>Login</Link> 
      </div>
      
      <button onClick={()=>setOpen((prev)=>!prev)} className={styles.menuButton}> Menu</button>
      
      {open&& <div className={styles.mobileLinks} >
        <div className={styles.mobileDiv}>
              {buttonLinks.map((link) =>(<Link key={link.path} href={link.path} className={styles.navItemMobile}>{link.title}</Link>))}
           </div>  
              <div className={styles.buttonsMobile}>
        <button className={styles.applyButton}>Apply for Intern</button>
        <button className={styles.hireButton}>Hire Interns</button>
        <Link href={"login"}className={styles.loginButton}>Login</Link> 
      </div>
              </div> 
              
             }

      
      
     
    </div>
  );
};

export default Header;
