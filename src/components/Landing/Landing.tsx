/**
 * Landing Page
 * Shown to unauthenticated users
 */

import { useState } from 'react';
import AuthModal from '../Auth/AuthModal';
import { useAuth } from '../../contexts/AuthContext';
import styles from './Landing.module.css';

export default function Landing() {
  const [showAuth, setShowAuth] = useState(false);
  const { setGuestMode } = useAuth();

  const handleTryNow = () => {
    setGuestMode(true);
  };

  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <div className={styles.badge}>For IGCSE & A-Level Students</div>
        
        <h1 className={styles.title}>
          Master Pseudocode with
          <span className={styles.highlight}> Pseudocode Runner</span>
        </h1>
        
        <p className={styles.subtitle}>
          The complete online IDE for Cambridge IGCSE and A-Level pseudocode.
          Write, debug, and execute your code with instant feedback—all in your browser.
        </p>

        <div className={styles.productHuntBadge}>
          <a href="https://www.producthunt.com/products/igcse-alevels-pseudocode-editor?embed=true&utm_source=badge-featured&utm_medium=badge&utm_source=badge-igcse&#0045;alevels&#0045;pseudocode&#0045;editor" target="_blank" rel="noopener noreferrer">
            <img 
              src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1029676&theme=light&t=1761148821132" 
              alt="IGCSE/ALevels pseudocode editor - Run Cambridge pseudocode like real code. | Product Hunt" 
              style={{ width: '250px', height: '54px' }} 
              width="250" 
              height="54" 
            />
          </a>
        </div>

        <div className={styles.ctaGroup}>
          <button onClick={() => setShowAuth(true)} className={styles.ctaButton}>
            Start Coding Free
            <span className={styles.arrow}>→</span>
          </button>
          <button onClick={handleTryNow} className={styles.tryNowButton}>
            Try Now without Login
          </button>
          <p className={styles.note}>No credit card required • Get started in 30 seconds</p>
        </div>

        <div className={styles.features}>
          <div className={styles.feature}>
            <div className={styles.featureIcon}>
              <span className={styles.iconEmoji}>✓</span>
            </div>
            <h3>Standards Compliant</h3>
            <p>100% aligned with Cambridge IGCSE & A-Level pseudocode syntax specifications</p>
          </div>
          
          <div className={styles.feature}>
            <div className={styles.featureIcon}>
              <span className={styles.iconEmoji}>⚡</span>
            </div>
            <h3>Real-Time Validation</h3>
            <p>Catch errors as you type with intelligent syntax checking and instant feedback</p>
          </div>
          
          <div className={styles.feature}>
            <div className={styles.featureIcon}>
              <span className={styles.iconEmoji}>🐛</span>
            </div>
            <h3>Step-by-Step Debugger</h3>
            <p>Understand your code better with line-by-line execution and variable inspection</p>
          </div>
          
          <div className={styles.feature}>
            <div className={styles.featureIcon}>
              <span className={styles.iconEmoji}>💾</span>
            </div>
            <h3>Cloud Storage</h3>
            <p>Save unlimited programs and access them from any device, anytime</p>
          </div>
          
          <div className={styles.feature}>
            <div className={styles.featureIcon}>
              <span className={styles.iconEmoji}>📚</span>
            </div>
            <h3>20+ Examples</h3>
            <p>Learn from comprehensive working examples covering all exam topics</p>
          </div>
          
          <div className={styles.feature}>
            <div className={styles.featureIcon}>
              <span className={styles.iconEmoji}>🌙</span>
            </div>
            <h3>Dark Mode</h3>
            <p>Easy on the eyes with beautiful light and dark themes for comfortable coding</p>
          </div>
        </div>

        <div className={styles.testimonials}>
          <div className={styles.testimonial}>
            <p className={styles.quote}>"Perfect for practicing pseudocode for my exams. The debugger helped me understand loops and arrays!"</p>
            <p className={styles.author}>— IGCSE Student</p>
          </div>
          <div className={styles.testimonial}>
            <p className={styles.quote}>"Finally, a proper pseudocode editor that actually follows the Cambridge spec. Game changer!"</p>
            <p className={styles.author}>— A-Level Student</p>
          </div>
        </div>

        <div className={styles.finalCta}>
          <h2>Ready to ace your Computer Science exams?</h2>
          <button onClick={() => setShowAuth(true)} className={styles.ctaButtonSecondary}>
            Sign Up with Google or Email
          </button>
        </div>
      </div>

      {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
    </div>
  );
}
