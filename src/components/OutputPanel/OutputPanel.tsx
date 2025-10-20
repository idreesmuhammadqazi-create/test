import { useEffect, useRef, useState } from 'react';
import styles from './OutputPanel.module.css';

interface OutputPanelProps {
  output: string[];
  isRunning: boolean;
  waitingForInput?: boolean;
  inputPrompt?: string;
  onInputSubmit?: (value: string) => void;
}

export default function OutputPanel({ 
  output, 
  isRunning, 
  waitingForInput = false, 
  inputPrompt = '',
  onInputSubmit 
}: OutputPanelProps) {
  const outputRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState('');

  // Auto-scroll to bottom when new output appears
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output]);

  // Focus input field when waiting for input
  useEffect(() => {
    if (waitingForInput && inputRef.current) {
      inputRef.current.focus();
    }
  }, [waitingForInput]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onInputSubmit && inputValue.trim()) {
      onInputSubmit(inputValue);
      setInputValue('');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span>Output</span>
        {isRunning && <span className={styles.statusRunning}>Running...</span>}
        {!isRunning && output.length > 0 && <span className={styles.statusCompleted}>Completed</span>}
      </div>

      <div className={styles.outputArea} ref={outputRef}>
        {output.length === 0 && !isRunning && (
          <div className={styles.emptyMessage}>No output yet</div>
        )}
        {output.length === 0 && isRunning && (
          <div className={styles.emptyMessage}>Running...</div>
        )}
        {output.map((line, index) => (
          <div key={index} className={styles.outputLine}>
            {line}
          </div>
        ))}
        
        {waitingForInput && (
          <div className={styles.inputContainer}>
            <div className={styles.inputPrompt}>{inputPrompt}</div>
            <form onSubmit={handleSubmit} className={styles.inputForm}>
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className={styles.inputField}
                placeholder="Enter value..."
              />
              <button type="submit" className={styles.submitButton}>
                Submit
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
