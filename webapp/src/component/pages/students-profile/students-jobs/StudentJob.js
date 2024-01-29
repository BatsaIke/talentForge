// StudentJobs.js
import React from 'react';
import styles from './StudentJobs.module.css';
import Image from 'next/image';
import Link from 'next/link';


const StudentJob = () => {
  // Dummy data for applied jobs
  const appliedJobs = [
    {
      id: 1,
      logo: '/talentforge.png', 
      title: 'Software Developer Intern',
      company: 'ABC Tech Solutions',
      location: 'City, Country',
      status: 'Applied',
    },
    {
        id: 2,
        logo: '/talentforge.png', 
        title: 'Web Developer Intern',
        company: 'Mawc Solutions',
        location: 'Accra, Ghana',
        status: 'Shortlisted',
      },
      {
        id: 3,
        logo: '/talentforge.png', 
        title: 'Business Developer Intern',
        company: 'Nandi Solutions',
        location: 'Accra, Ghana',
        status: 'shortlisted',
      },
      {
        id: 4,
        logo: '/talentforge.png', 
        title: 'Software engineer Intern',
        company: 'Koosa Tech',
        location: 'Accra, Ghana',
        status: 'Hired',
      },
      {
        id: 5,
        logo: '/talentforge.png', 
        title: 'Software engineer Intern',
        company: 'Techfix Tech',
        location: 'Accra, Ghana',
        status: 'Rejected',
      },
  ];

  return (
    <div className={styles.studentJobs}>
      <h2>My Jobs</h2>
      <hr className={styles.horizontalRule} />
      {appliedJobs.map((job) => (
        <React.Fragment key={job.id}>
          <Link href={'/job/id'} className={styles.jobItem}>
            <Image src={job.logo} alt="Company Logo" width={100} height={100} className={styles.logo} />
            <div className={styles.jobDetails}>
              <h3>{job.title}</h3>
              <p>{job.company}</p>
              <p>{job.location}</p>
              <p>Status: {job.status}</p>
            </div>
          </Link>
          <hr className={styles.horizontalRule} />
        </React.Fragment>
      ))}
    </div>
  );
};

export default StudentJob;
