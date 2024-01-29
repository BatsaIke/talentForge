'use client';
import React, { useState } from 'react';
import styles from './StudentsProfile.module.css';
import ProfileBio from './profile-bio/ProfileBio';
import ProfileDetails from './profile-details/ProfileDetails';
import ProfileDocuments from './profile-documents/ProfileDocuments';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBusinessTime, faBook } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import StudentJob from './students-jobs/StudentJob';
import StudentAvailability from './profile-availability/StudentAvailability';

const StudentsProfile = () => {
  const [currentView, setCurrentView] = useState('profile'); // Initial view is profile

  const profileImage = '/batsa.jpg';
  const skills = ['React js', 'Java', 'NodeJS'];
  const bio =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
  const name = 'John Doe';
  const level = 'level 400';
  const school = 'Ghana Institute of management and public administration';
  const course = 'Computer science';

  const handleViewChange = (view) => {
    setCurrentView(view);
  };

  return (
    <div className={styles.profileContainer}>
      <div className={styles.leftContent}>
        {/* Content for the left side (70%) goes here */}
        {currentView === 'profile' && (
          <>
            <ProfileBio profileImage={profileImage} skills={skills} bio={bio} />
            <ProfileDetails
              name={name}
              course={course}
              level={level}
              school={school}
            />
            <ProfileDocuments />
            <StudentAvailability/>
          </>
        )}
        {currentView === 'applications' && <StudentJob />}
      </div>
      <div className={styles.rightContent}>
        <button
          onClick={() => handleViewChange('profile')}
          className={styles.jobexplore}
        >
          <FontAwesomeIcon icon={faBook} color="#e37735" size="2xl" />
          <span>My Profile</span>
        </button>
        <button
          onClick={() => handleViewChange('applications')}
          className={styles.jobexplore}
        >
          <FontAwesomeIcon icon={faBook} color="#e37735" size="2xl" />
          <span>My Applications</span>
        </button>
        <Link href={'/jobs'} className={styles.jobexplore}>
          <FontAwesomeIcon icon={faBusinessTime} color="#e37735" size="2xl" />
          <span>Explore Jobs</span>
        </Link>
      </div>
    </div>
  );
};

export default StudentsProfile;
