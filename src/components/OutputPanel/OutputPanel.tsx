import { useEffect, useRef } from 'react';
import styles from './OutputPanel.module.css';

interface OutputPanelProps {
  output: string[];
  isRunning: boolean;
}

export default function OutputPanel({ output, isRunning }: OutputPanelProps) {
  const outputRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new output appears
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output]);

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
      </div>
    </div>
  );
}
