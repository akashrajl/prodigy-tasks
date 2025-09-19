// src/components/Header.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './Header.module.css';
import { useTheme } from '@/context/ThemeContext';
import { useAuth } from '@/context/AuthContext'; // Import useAuth
import { FaSun, FaMoon } from 'react-icons/fa';
import LoginModal from './LoginModal'; // Import the modal

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth(); // Get user and logout function
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <header className={styles.header}>
        <div className={styles.logo}>
          <Link href="/">Akash Raj L - Prodigy AD</Link>
        </div>
        <div className={styles.actions}>
          <button onClick={toggleTheme} className={styles.themeToggle} aria-label="Toggle theme">
            {theme === 'default' ? <FaMoon /> : <FaSun />}
          </button>
          {user ? (
            <div className={styles.userInfo}>
              <span>{user.displayName || 'User'}</span>
              <button onClick={logout} className={styles.loginButton}>Logout</button>
            </div>
          ) : (
            <button onClick={() => setIsModalOpen(true)} className={styles.loginButton}>
              Login
            </button>
          )}
        </div>
      </header>
      <LoginModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default Header;