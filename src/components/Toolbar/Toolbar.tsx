import { useRef, useState, useEffect } from 'react';
import { EXAMPLES } from '../../constants/examples';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import styles from './Toolbar.module.css';

interface ToolbarProps {
  onRun: () => void;
  onClear: () => void;
  onDownload: () => void;
  onUpload: (file: File) => void;
  onLoadExample: (exampleCode: string) => void;
  isRunning: boolean;
}

export default function Toolbar({
  onRun,
  onClear,
  onDownload,
  onUpload,
  onLoadExample,
  isRunning
}: ToolbarProps) {
  const { currentUser, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showExamplesMenu, setShowExamplesMenu] = useState(false);
  const examplesRef = useRef<HTMLDivElement>(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onUpload(file);
      // Reset input so same file can be selected again
      e.target.value = '';
    }
  };

  const handleExampleClick = (code: string) => {
    setShowExamplesMenu(false);
    onLoadExample(code);
  };

  const handleLogout = async () => {
    if (confirm('Are you sure you want to logout?')) {
      try {
        await logout();
      } catch (error) {
        console.error('Logout error:', error);
      }
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (examplesRef.current && !examplesRef.current.contains(event.target as Node)) {
        setShowExamplesMenu(false);
      }
    };

    if (showExamplesMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showExamplesMenu]);

  return (
    <div className={styles.toolbar}>
      <button
        className={styles.runButton}
        onClick={onRun}
        disabled={isRunning}
      >
        Run
      </button>

      <button className={styles.secondaryButton} onClick={onClear}>
        Clear
      </button>

      <button className={styles.secondaryButton} onClick={onDownload}>
        Download
      </button>

      <button className={styles.secondaryButton} onClick={handleUploadClick}>
        Upload
      </button>

      <input
        ref={fileInputRef}
        type="file"
        accept=".txt"
        onChange={handleFileChange}
        className={styles.fileInput}
      />

      <div className={styles.examplesContainer} ref={examplesRef}>
        <button
          className={styles.secondaryButton}
          onClick={() => setShowExamplesMenu(!showExamplesMenu)}
        >
          Examples ▼
        </button>

        {showExamplesMenu && (
          <div className={styles.dropdown}>
            {EXAMPLES.map((example, index) => (
              <div
                key={index}
                className={styles.dropdownItem}
                onClick={() => handleExampleClick(example.code)}
              >
                {example.title}
              </div>
            ))}
          </div>
        )}
      </div>

      <button 
        className={styles.themeToggle}
        onClick={toggleTheme}
        title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      >
        {theme === 'light' ? '🌙' : '☀️'}
      </button>

      <div className={styles.userSection}>
        <span className={styles.userName}>
          {currentUser?.displayName || currentUser?.email}
        </span>
        <button className={styles.logoutButton} onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}
