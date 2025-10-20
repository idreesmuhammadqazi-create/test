/**
 * Landing Page
 * Shown to unauthenticated users
 */

import { useState } from 'react';
import AuthModal from '../Auth/AuthModal';
import styles from './Landing.module.css';

export default function Landing() {
  const [showAuth, setShowAuth] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <h1 className={styles.title}>IGCSE/A-LEVELS Pseudocode Editor</h1>
        <p className={styles.subtitle}>
          Write, run, and debug IGCSE/A-LEVELS pseudocode with real-time syntax checking and execution
        </p>

        <div className={styles.features}>
          <div className={styles.feature}>
            <div className={styles.featureIcon}>✓</div>
            <h3>Standard Compliant</h3>
            <p>Follows Cambridge IGCSE & A-Level pseudocode syntax</p>
          </div>
          <div className={styles.feature}>
            <div className={styles.featureIcon}>⚡</div>
            <h3>Real-time Validation</h3>
            <p>Instant error detection and syntax highlighting</p>
          </div>
          <div className={styles.feature}>
            <div className={styles.featureIcon}>▶</div>
            <h3>Live Execution</h3>
            <p>Run code with animated output and interactive input</p>
          </div>
          <div className={styles.feature}>
            <div className={styles.featureIcon}>📚</div>
            <h3>20+ Examples</h3>
            <p>Learn from comprehensive working examples</p>
          </div>
        </div>

        <button onClick={() => setShowAuth(true)} className={styles.ctaButton}>
          Get Started Free
        </button>

        <p className={styles.note}>No credit card required • Sign up with Google or Email</p>
      </div>

      {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
    </div>
  );
}
