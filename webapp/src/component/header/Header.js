// components/Header.js
'use client';

import Link from 'next/link';
import styles from './Header.module.css';
import Image from 'next/image';
import { buttonLinks } from './Links.';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '@/redux/slices/authSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faBell,
  faMessage,
  faFileAlt,
  faBriefcase
} from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  const [open, setOpen] = useState(false);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const userRole = useSelector((state) => state.auth.user?.role);
  const dispatch = useDispatch();

  console.log(isAuthenticated, 'Authentication ');
  const handleLogout = async () => {
    await dispatch(logout());
  };

  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <Image src="/talentforge.png" alt="Logo" width={50} height={50} />
      </div>
      <div className={styles.nav}>
        {!isAuthenticated &&
          buttonLinks.map((link) => (
            <Link key={link.path} href={link.path} className={styles.navItem}>
              {link.title}
            </Link>
          ))}
        {isAuthenticated && userRole === 'student' && (
          <>
            <Link href="/my-profile" className={styles.navItem}>
              <FontAwesomeIcon icon={faUser} className={styles.iconProfile} color='#ffffff' />
             <p>Profile</p>  
            </Link>
            <Link href="/my-applications" className={styles.navItem}>
              <FontAwesomeIcon icon={faFileAlt} className={styles.iconApplication}color='#ffffff' />
              <p>Applications</p> 
            </Link>
            <Link href="/my-jobs" className={styles.navItem}>
              <FontAwesomeIcon icon={faBriefcase} className={styles.iconJobs}  color='#ffffff'/>
              <p>Jobs</p> 
            </Link>
          </>
        )}
        
      </div>
      <div className={styles.buttons}>
        {!isAuthenticated &&
        <>
        <button className={styles.applyButton}>Apply for Intern</button>
        <button className={styles.hireButton}>Hire Interns</button>
        <Link href={'login'} className={styles.loginButton}>
          Login
        </Link>
        </>
         }
      </div>
      <div className={styles.buttons}>
        {isAuthenticated && (
          <>
            <button className={styles.notificationButton}>
              <FontAwesomeIcon icon={faBell} color='#999999' className={styles.icon}/>
            </button>
            <button className={styles.chatButton}>
              <FontAwesomeIcon icon={faMessage} color='#999999' className={styles.icon} />
            </button>
            <button className={styles.profileButton}>
              <FontAwesomeIcon icon={faUser} />
            </button>
          </>
        )}
        {isAuthenticated ? (
          <button onClick={handleLogout} className={styles.loginButton}>
            Logout
          </button>
        ) : (
          ""
        )}
      </div>

      <button
        onClick={() => setOpen((prev) => !prev)}
        className={styles.menuButton}
      >
        {' '}
        Menu
      </button>

      {open && (
        <div className={styles.mobileLinks}>
          <div className={styles.mobileDiv}>
            {buttonLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={styles.navItemMobile}
              >
                {link.title}
              </Link>
            ))}
          </div>
          <div className={styles.buttonsMobile}>
            <button className={styles.applyButton}>Apply for Intern</button>
            <button className={styles.hireButton}>Hire Interns</button>
            <Link href={'login'} className={styles.loginButton}>
              Login
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
