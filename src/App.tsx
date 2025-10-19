import { useState, useEffect, useCallback } from 'react';
import Editor from './components/Editor/Editor';
import OutputPanel from './components/OutputPanel/OutputPanel';
import ErrorDisplay, { ErrorMessage } from './components/ErrorDisplay/ErrorDisplay';
import Toolbar from './components/Toolbar/Toolbar';
import { tokenize } from './interpreter/lexer';
import { parse } from './interpreter/parser';
import { executeProgram } from './interpreter/interpreter';
import { validate } from './validator/validator';
import { saveCode, loadCode, clearSavedCode } from './utils/storage';
import { downloadCode, readFile } from './utils/fileHandler';
import { debounce } from './utils/debounce';
import { RuntimeError } from './interpreter/types';
import styles from './App.module.css';

function App() {
  const [code, setCode] = useState('');
  const [output, setOutput] = useState<string[]>([]);
  const [errors, setErrors] = useState<ErrorMessage[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [isValidating, setIsValidating] = useState(false);

  // Load code from LocalStorage on mount
  useEffect(() => {
    const savedCode = loadCode();
    if (savedCode) {
      setCode(savedCode);
    }
  }, []);

  // Debounced validation
  const debouncedValidate = useCallback(
    debounce((codeToValidate: string) => {
      if (!codeToValidate.trim()) {
        setErrors([]);
        setIsValidating(false);
        return;
      }

      setIsValidating(true);
      const validationErrors = validate(codeToValidate);
      setErrors(validationErrors);
      setIsValidating(false);
    }, 500),
    []
  );

  // Debounced auto-save
  const debouncedSave = useCallback(
    debounce((codeToSave: string) => {
      saveCode(codeToSave);
    }, 1000),
    []
  );

  // Handle code changes
  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
    debouncedValidate(newCode);
    debouncedSave(newCode);
  };

  // Handle run execution
  const handleRun = async () => {
    // Check for syntax errors first
    if (errors.length > 0 && errors.some(e => e.type === 'syntax')) {
      alert('Fix syntax errors before running');
      return;
    }

    // Clear output and errors
    setOutput([]);
    setErrors([]);
    setIsRunning(true);

    try {
      // Tokenize and parse
      const tokens = tokenize(code);
      const ast = parse(tokens);

      // Execute with animation
      const generator = executeProgram(ast);

      for await (const line of generator) {
        setOutput(prev => [...prev, line]);
        // Wait 300ms between outputs
        await new Promise(resolve => setTimeout(resolve, 300));
      }

      setIsRunning(false);
    } catch (error) {
      setIsRunning(false);

      if (error instanceof RuntimeError) {
        setErrors([{
          line: error.line,
          message: error.message,
          type: 'runtime'
        }]);
      } else {
        setErrors([{
          line: 1,
          message: (error as Error).message,
          type: 'runtime'
        }]);
      }
    }
  };

  // Handle clear
  const handleClear = () => {
    if (confirm('Are you sure? This will delete all code.')) {
      setCode('');
      setOutput([]);
      setErrors([]);
      clearSavedCode();
    }
  };

  // Handle download
  const handleDownload = () => {
    downloadCode(code);
  };

  // Handle upload
  const handleUpload = async (file: File) => {
    if (confirm('Load file? This will replace your current code.')) {
      try {
        const content = await readFile(file);
        setCode(content);
      } catch (error) {
        alert((error as Error).message);
      }
    }
  };

  // Handle load example
  const handleLoadExample = (exampleCode: string) => {
    if (confirm('Load example? This will replace your current code.')) {
      setCode(exampleCode);
    }
  };

  return (
    <div className={styles.container}>
      <Toolbar
        onRun={handleRun}
        onClear={handleClear}
        onDownload={handleDownload}
        onUpload={handleUpload}
        onLoadExample={handleLoadExample}
        isRunning={isRunning}
      />

      <div className={styles.splitView}>
        <div className={styles.leftPanel}>
          <Editor value={code} onChange={handleCodeChange} />
        </div>

        <div className={styles.rightPanel}>
          <OutputPanel output={output} isRunning={isRunning} />
          <ErrorDisplay errors={errors} isValidating={isValidating} />
        </div>
      </div>
    </div>
  );
}

export default App;
