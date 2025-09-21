// src/components/LoginModal.tsx
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import styles from './LoginModal.module.css';
import { FaGoogle, FaTimes } from 'react-icons/fa';
import { AuthError } from 'firebase/auth';

type LoginModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
  const { signInWithGoogle, signUpWithEmailPassword, signInWithEmailPassword } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleGoogleSignIn = async () => {
    await signInWithGoogle();
    onClose();
  };
  
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    let result;
    if (isSignUp) {
      result = await signUpWithEmailPassword({ email, password });
    } else {
      result = await signInWithEmailPassword({ email, password });
    }

    if (result && 'code' in result) { // Check if the result is an AuthError
      setError(result.message);
    } else {
      onClose(); // Success
    }
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}><FaTimes /></button>
        
        <h2 className={styles.title}>{isSignUp ? 'Create Account' : 'Login'}</h2>
        
        <form onSubmit={handleFormSubmit} className={styles.form}>
          <input 
            type="email" 
            placeholder="Email Address" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
            required 
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
            required 
            minLength={6}
          />
          {error && <p className={styles.error}>{error}</p>}
          <button type="submit" className={styles.submitButton}>
            {isSignUp ? 'Sign Up' : 'Login'}
          </button>
        </form>

        <div className={styles.divider}>OR</div>

        <div className={styles.providerButtons}>
          <button className={styles.providerButton} onClick={handleGoogleSignIn}>
            <FaGoogle /> Continue with Google
          </button>
        </div>
        
        <div className={styles.toggleAuth}>
          {isSignUp ? (
            <p>Already have an account? <button onClick={() => setIsSignUp(false)}>Login</button></p>
          ) : (
            <p>Don&apos;t have an account? <button onClick={() => setIsSignUp(true)}>Sign Up</button></p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
