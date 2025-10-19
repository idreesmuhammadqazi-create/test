import styles from './ErrorDisplay.module.css';

interface ErrorMessage {
  line: number;
  message: string;
  type: 'syntax' | 'runtime';
}

interface ErrorDisplayProps {
  errors: ErrorMessage[];
  isValidating: boolean;
}

export default function ErrorDisplay({ errors, isValidating }: ErrorDisplayProps) {
  return (
    <div className={styles.container}>
      <div className={styles.header}>Errors</div>

      {isValidating && <div className={styles.validating}>Validating...</div>}

      {!isValidating && errors.length === 0 && (
        <div className={styles.noErrors}>No errors detected</div>
      )}

      {!isValidating && errors.length > 0 && (
        <ul className={styles.errorList}>
          {errors.map((error, index) => (
            <li key={index} className={styles.errorItem}>
              <span className={styles.errorLine}>Line {error.line}:</span>
              <span className={error.type === 'syntax' ? styles.syntaxBadge : styles.runtimeBadge}>
                {error.type === 'syntax' ? 'Syntax Error' : 'Runtime Error'}
              </span>
              <div className={styles.errorMessage}>{error.message}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export type { ErrorMessage };
