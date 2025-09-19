// src/components/Footer.tsx
import styles from './Footer.module.css';
import Link from 'next/link';

// You can copy the SVG icons from About.tsx if you want them here
const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>Thank you for visiting my showcase.</p>
      {/* Add social links here if desired */}
      <p className={styles.copyright}>&copy; 2025 Akash Raj L — Prodigy InfoTech Internship Showcase</p>
      <Link href="https://your-main-portfolio.com" target="_blank" className={styles.portfolioLink}>
        Return to Main Portfolio
      </Link>
    </footer>
  );
};
export default Footer;