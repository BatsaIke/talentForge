// pages/JobOffers.js

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { jobData } from '../../webData';
import styles from '../job-offers/JobOffers.module.css'; // Create a CSS file for styling
import { faBriefcase } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
library.add(faBriefcase);


const JobOffers = () => {
  return (
    <div className={styles.jobOffersPage}>
      <div className={styles.jobOffers}>  
        <FontAwesomeIcon
          icon="briefcase"
          size="sm"
         
          style={{ padding: '10px' }}
        />
     
        <h3>
          <span>Intern Offers</span>
        </h3>
      </div>
      {jobData.map((job) => (
        <div key={job.id} className={styles.jobContainer}>
          <div className={styles.imageContainer}>
            <Image src={job.image} alt={job.jobTitle} width={60} height={60} />
          </div>
          <div className={styles.jobDetails}>
            <h3 style={{ fontSize: 14 }}>{job.jobTitle}</h3>
            <p className={styles.companyName}>{job.companyName}</p>
            <p className={styles.jobDescription}>
              {job.jobDescription.substring(0, 40)}...
            </p>
            <div className={styles.actionButtons}>
              <Link href={`/job/${job.id}`} className={styles.readMoreButton}>
                Read More
              </Link>
              <button className={styles.applyButton}>Apply</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default JobOffers;
