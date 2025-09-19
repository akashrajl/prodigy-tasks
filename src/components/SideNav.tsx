// src/components/SideNav.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './SideNav.module.css';
import { FaHome, FaUser, FaListAlt, FaInfoCircle, FaEnvelope } from 'react-icons/fa';

const sections = ['home', 'about', 'tasks', 'internship', 'contact'];

const SideNav = () => {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { 
        rootMargin: '-50% 0px -50% 0px',
        threshold: 0
      }
    );

    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      sections.forEach(id => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  const getLinkClass = (section: string) => {
    return `${styles.navLink} ${activeSection === section ? styles.active : ''}`;
  };

  return (
    <nav className={styles.sideNav}>
      <ul>
        <li>
          <Link href="/" className={getLinkClass('home')} aria-label="Home">
            <FaHome /> <span>Home</span>
          </Link>
        </li>
        <li>
          <Link href="/#about" className={getLinkClass('about')} aria-label="About Me">
            <FaUser /> <span>About</span>
          </Link>
        </li>
        <li>
          <Link href="/#tasks" className={getLinkClass('tasks')} aria-label="Tasks">
            <FaListAlt /> <span>Tasks</span>
          </Link>
        </li>
        <li>
          <Link href="/#internship" className={getLinkClass('internship')} aria-label="Internship">
            <FaInfoCircle /> <span>Internship</span>
          </Link>
        </li>
        <li>
          <Link href="/#contact" className={getLinkClass('contact')} aria-label="Contact">
            <FaEnvelope /> <span>Contact</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default SideNav;