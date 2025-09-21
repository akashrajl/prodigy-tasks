'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css';
import {
  FaGithub, FaLinkedin, FaEnvelope, FaTwitter, FaInstagram, FaDiscord,
  FaCalculator, FaTasks, FaStopwatch, FaTimes, FaQrcode
} from 'react-icons/fa';

// --- HERO SECTION (Updated Text) ---
const Hero = () => {
  const titleText = "Prodigy InfoTech Android Dev Intern Tasks";
  return (
    <section id="home" className={styles.section}>
      <div className={styles.heroContent}>
        <motion.h1
          className={`${styles.heroTitle} ${styles.undeline}`}
          data-text={titleText}
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Prodigy InfoTech Android Dev Intern Tasks
        </motion.h1>

        <motion.p
          className={styles.author}
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
           viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Done by AKASH RAJ L
        </motion.p>

        <motion.div
          className={styles.divider}
          initial={{ width: 0 }}
          whileInView={{ width: 80 }}
           viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
        />

        <motion.p
          className={styles.summary}
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
           viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          Prodigy InfoTech is a dynamic hub of innovation, dedicated to shaping the future of technology. We empower interns to translate academic knowledge into real-world, impactful solutions.
        </motion.p>

        <motion.p
          className={styles.summary}
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
           viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 1.0 }}
        >
          During my internship, I developed a series of Android applications, sharpening my skills in mobile development and problem-solving.
        </motion.p>

        <div className={styles.scrollPrompt}>
          <a href="#about">
            Scroll down to see about me
            <div className={styles.scrollArrow}>↓</div>
          </a>
        </div>
      </div>
    </section>
  );
};

// --- SKILLS DATA ---
// --- SKILLS DATA ---
const skillsData = [
  { name: 'React', url: 'https://react.dev/', size: 'large' },
  { name: 'Next.js', url: 'https://nextjs.org/', size: 'wide' },
  { name: 'Node.js', url: 'https://nodejs.org/', size: 'medium' },
  { name: 'TypeScript', url: 'https://www.typescriptlang.org/', size: 'medium' },
  { name: 'Python', url: 'https://www.python.org/', size: 'medium' },
    { name: 'Git', url: 'https://git-scm.com/', size: 'medium' },
  { name: 'JavaScript', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript', size: 'wide' },
  { name: 'Flutter', url: 'https://flutter.dev/', size: 'medium' },
  { name: 'Supabase', url: 'https://supabase.com/', size: 'large' },
  { name: 'Firebase', url: 'https://firebase.google.com/', size: 'medium' },
  { name: 'HTML5', url: 'https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5', size: 'medium' },
  { name: 'CSS3', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS3', size: 'medium' },

];

// --- ABOUT SECTION (New Layout) ---
const About = () => {
  // Array of vibrant colors for the skill badges
  const skillColors = [
    '#3ecd5e', '#e44002', '#952aff', '#cd3e94', '#4c49ea', '#f9b234'
  ];

  return (
    <section id="about" className={styles.section}>
      <motion.div
        className={styles.aboutContainer}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7 }}
      >
        <div className={styles.aboutLeft}>
          <div className={styles.pfpWrapper}>
            <Image
              src="/profile-placeholder.png" // Corrected image path
              alt="Akash Raj L"
              width={200}
              height={200}
              className={styles.profileImage}
            />
          </div>
          <h2 className={styles.name}>AKASH RAJ L</h2>
          <div className={styles.aboutSocials}>
            <a href="https://github.com/akashrajl" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <FaGithub /> <span>GitHub</span>
            </a>
            <a href="https://linkedin.com/in/akashrajl" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <FaLinkedin /> <span>LinkedIn</span>
            </a>
            <a href="mailto:laakashraj2004@gmail.com" aria-label="Email">
              <FaEnvelope /> <span>Email</span>
            </a>
            <pre> </pre>
          </div>
          <a href="https://github.com/akashrajl" target="_blank" rel="noopener noreferrer" className={styles.portfolioButton}>
            View My Full Portfolio
          </a>
        </div>

        <div className={styles.aboutRight}>
          <h3 className={styles.skillsHeading}>About Me</h3>
          <p className={styles.bio}>
            Dynamic and results-oriented Information Technology undergraduate
            with proven expertise in full-stack development, machine learning,
            and AI-driven real-time systems. Proficient in delivering innovative solutions.
          </p>
          <h3 className={styles.skillsHeading}>My Toolkit</h3>
          <div className={styles.skillsGrid}>
            {skillsData.map((item, index) => (
              <div
                key={item.name}
                className={`${styles.skillItem} ${styles[item.size]}`}
                style={{ backgroundColor: skillColors[index % skillColors.length] }} // Apply random color
              >
                {item.name}
              </div>
            ))}
          </div>
        </div>
      </motion.div>
       <div className={styles.scrollPrompt}>
          <a href="#tasks">
            Scroll to see the demo of the tasks
            <div className={styles.scrollArrow}>↓</div>
          </a>
      </div>
    </section>
  );
};

// --- TASKS DATA & TYPE ---
type Task = {
  slug: string;
  title: string;
  description: string;
  features: string[];
  techStack: string[];
  icon: React.ReactNode;
  codeUrl: string;
};

const tasksData: Task[] = [
  { slug: 'calculator', title: 'Calculator App', description: 'A simple calculator app for basic arithmetic.', features: ['Addition, Subtraction, Multiplication, Division', 'Clear Functionality', 'Responsive UI'], techStack: ['React', 'TypeScript', 'CSS Modules'], icon: <FaCalculator />, codeUrl: 'https://github.com/akashrajl', },
  { slug: 'todo-list', title: 'To-Do List App', description: 'A task management app to keep track of your to-dos.', features: ['Add & Delete Tasks', 'Mark as Complete', 'Local Storage Persistence'], techStack: ['React', 'TypeScript', 'localStorage'], icon: <FaTasks />, codeUrl: 'https://github.com/akashrajl', },
  { slug: 'stopwatch', title: 'Stopwatch App', description: 'A stopwatch to measure time with lap functionality.', features: ['Start, Stop, Reset', 'Lap Recording', 'Precise Timing'], techStack: ['React', 'TypeScript', 'Hooks'], icon: <FaStopwatch />, codeUrl: 'https://github.com/akashrajl', },
  { slug: 'tic-tac-toe', title: 'Tic Tac Toe Game', description: 'A classic Tic Tac Toe game for two players.', features: ['Two-player Gameplay', 'Win/Draw Detection', 'Score Tracking'], techStack: ['React', 'TypeScript', 'State Management'], icon: <FaTimes />, codeUrl: 'https://github.com/akashrajl', },
  { slug: 'qr-scanner', title: 'QR Code Scanner', description: 'A simple QR code scanner using your device\'s camera.', features: ['Live Camera Scanning', 'Content-aware Actions', 'Clipboard Access'], techStack: ['React', 'TypeScript', 'html5-qrcode'], icon: <FaQrcode />, codeUrl: 'https://github.com/akashrajl', },
];

// --- TASK CARD COMPONENT ---
const TaskCard = ({ task, index }: { task: Task; index: number }) => {
  return (
    <div className={styles.taskCard}>
      <div className={styles['ag_courses-item_bg']}></div>
      <div className={styles.taskContent}>
        <div className={styles.taskText}>
          <div className={styles.taskIcon}>{task.icon}</div>
          <div>
            <div className={styles.taskNumber}>Task {index + 1}</div>
            <div className={styles.taskTitle}>{task.title}</div>
          </div>
        </div>
        <div className={styles.taskHoverContent}>
          <p className={styles.taskDescription}>{task.description}</p>
          <div className={styles.taskDetails}>
            <h4 className={styles.detailsTitle}>Key Features</h4>
            <ul>{task.features.map(f => <li key={f}>{f}</li>)}</ul>
          </div>
          <div className={`${styles.taskDetails}  ${styles.techStackContainer}`}>
            <h4 className={styles.detailsTitle}>Tech Stack</h4>
            <div className={styles.techStackList}>
              {task.techStack.join(' • ')}
            </div>
          </div>
          <pre> </pre>
          <div className={styles.taskLinks}>
            <Link href={`/tasks/${task.slug}`} className={styles.taskButton}>Try It</Link>
            <a href={task.codeUrl} target="_blank" rel="noopener noreferrer" className={styles.taskButton}>View Code</a>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- TASKS SECTION ---
const Tasks = () => {
  return (
    <section id="tasks" className={styles.section}>
      <div className={styles.tasksContainer}>
        <h2 className={styles.sectionTitle}>Internship Tasks</h2>
        <div className={styles.tasksGrid}>
          {tasksData.map((task, index) => (
            <TaskCard task={task} index={index} key={task.slug} />
          ))}
        </div>
         <div className={styles.scrollPrompt}>
            <a href="#internship">
              Scroll to view internship details
              <div className={styles.scrollArrow}>↓</div>
            </a>
        </div>
      </div>
    </section>
  );
};

// --- NEW INTERNSHIP SECTION ---
const Internship = () => {
  return (
    <section id="internship" className={styles.section}>
      <motion.div
        className={styles.internshipContainer}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7 }}
      >
        <div className={styles.internshipHeader}>
          <Image
            src="/prodigy-logo.svg"
            alt="Prodigy InfoTech Logo"
            width={100}
            height={100}
            className={styles.companyLogo}
          />
          <h2 className={styles.sectionTitle}>Prodigy InfoTech Internship</h2>
        </div>
        <div className={styles.internshipContent}>
          <div className={styles.internshipCard}>
            <h3>About the Company</h3>
            <p>Prodigy InfoTech is a dynamic hub of innovation, dedicated to shaping the future of technology. They provide robust opportunities for interns to apply academic knowledge to real-world challenges and grow their skills in a professional environment.</p>
          </div>
          <div className={styles.internshipCard}>
            <h3>About My Internship</h3>
            <ul>
              <li><strong>Role:</strong> Android Development Intern</li>
              <li><strong>Duration:</strong> 1st March 2024 - 31st March 2024</li>
              <li><strong>Focus:</strong> Developed a series of mobile applications demonstrating key Android development principles, including UI/UX design, state management, and interaction with device hardware and APIs.</li>
            </ul>
          </div>
        </div>
        <div className={styles.internshipLinks}>
            <a href="https://www.prodigyinfotech.dev/" target="_blank" rel="noopener noreferrer" className={styles.portfolioButton}>
              Go to Website
            </a>
            <a href="/PRODIGY INFOTECH - Certificate.pdf" target="_blank" rel="noopener noreferrer" className={styles.portfolioButton}>
              View Certificate
            </a>
            <a href="/PRODIGY INFOTECH - Letter of Recommendation.pdf" target="_blank" rel="noopener noreferrer" className={styles.portfolioButton}>
              View LOR
            </a>
        </div>
      </motion.div>
      <div className={styles.scrollPrompt}>
            <a href="#contact">
              Scroll to contact me
              <div className={styles.scrollArrow}>↓</div>
            </a>
      </div>
    </section>
  );
};


// --- CONTACT SECTION ---
const Contact = () => {
  return (
    <section id="contact" className={styles.section}>
      <motion.div
        className={styles.contactContainer}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.7 }}
      >
        <h2 className={styles.sectionTitle}>Get In Touch</h2>
        <p className={styles.contactSubtitle}>
          I&apos;m always open to discussing new projects, creative ideas, or opportunities.
        </p>
        <div className={styles.contactLinks}>
          <a href="https://github.com/akashrajl" target="_blank" rel="noopener noreferrer" className={styles.contactIcon}>
            <FaGithub /> <span>GitHub</span>
          </a>
          <a href="https://linkedin.com/in/akashrajl" target="_blank" rel="noopener noreferrer" className={styles.contactIcon}>
            <FaLinkedin /> <span>LinkedIn</span>
          </a>
          <a href="mailto:laakashraj2004@gmail.com" className={styles.contactIcon}>
            <FaEnvelope /> <span>Email</span>
          </a>
          <a href="https://twitter.com/akashrajl_" target="_blank" rel="noopener noreferrer" className={styles.contactIcon}>
            <FaTwitter /> <span>Twitter</span>
          </a>
           <a href="https://discord.com/users/1086530904794611823" target="_blank" rel="noopener noreferrer" className={styles.contactIcon}>
            <FaDiscord /> <span>Discord</span>
          </a>
          <a href="https://instagram.com/akashrajl._" target="_blank" rel="noopener noreferrer" className={styles.contactIcon}>
            <FaInstagram /> <span>Instagram</span>
          </a>
        </div>
      </motion.div>
    </section>
  );
};

// --- MAIN PAGE ---
export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Tasks />
      <Internship />
      <Contact />
    </main>
  );
}
