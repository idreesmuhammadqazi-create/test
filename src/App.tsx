import { useState, useEffect, useCallback, useRef } from 'react';
import Editor from './components/Editor/Editor';
import OutputPanel from './components/OutputPanel/OutputPanel';
import ErrorDisplay, { ErrorMessage } from './components/ErrorDisplay/ErrorDisplay';
import Toolbar from './components/Toolbar/Toolbar';
import Landing from './components/Landing/Landing';
import SaveAsModal from './components/SaveAsModal/SaveAsModal';
import ProgramsLibrary from './components/ProgramsLibrary/ProgramsLibrary';
import { tokenize } from './interpreter/lexer';
import { parse } from './interpreter/parser';
import { Interpreter } from './interpreter/interpreter';
import { validate } from './validator/validator';
import { saveCode, loadCode, clearSavedCode } from './utils/storage';
import { downloadCode, readFile } from './utils/fileHandler';
import { debounce } from './utils/debounce';
import { RuntimeError } from './interpreter/types';
import { useAuth } from './contexts/AuthContext';
import { Program } from './types/program';
import { createProgram, updateProgram } from './services/programsService';
import styles from './App.module.css';

function App() {
  const { currentUser } = useAuth();
  const [code, setCode] = useState('');
  const [output, setOutput] = useState<string[]>([]);
  const [errors, setErrors] = useState<ErrorMessage[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [waitingForInput, setWaitingForInput] = useState(false);
  const [inputPrompt, setInputPrompt] = useState('');
  const inputResolveRef = useRef<((value: string) => void) | null>(null);
  
  // Program management state
  const [currentProgram, setCurrentProgram] = useState<{ id: string; name: string } | null>(null);
  const [showSaveAsModal, setShowSaveAsModal] = useState(false);
  const [showProgramsLibrary, setShowProgramsLibrary] = useState(false);
  const [lastSavedCode, setLastSavedCode] = useState('');

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
    setWaitingForInput(false);

    try {
      // Tokenize and parse
      const tokens = tokenize(code);
      const ast = parse(tokens);

      // Create interpreter with custom input handler
      const interpreter = new Interpreter(async (variableName: string, variableType: string) => {
        return new Promise<string>((resolve) => {
          setInputPrompt(`Enter value for ${variableName} (${variableType}):`);
          setWaitingForInput(true);
          inputResolveRef.current = resolve;
        });
      });

      // Execute with animation
      const generator = interpreter.executeProgram(ast);

      for await (const line of generator) {
        setOutput(prev => [...prev, line]);
        // Wait 300ms between outputs
        await new Promise(resolve => setTimeout(resolve, 300));
      }

      setIsRunning(false);
      setWaitingForInput(false);
    } catch (error) {
      setIsRunning(false);
      setWaitingForInput(false);

      if (error instanceof RuntimeError) {
        setErrors([{
          line: (error as RuntimeError).line,
          message: (error as RuntimeError).message,
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

  // Handle input submission
  const handleInputSubmit = (value: string) => {
    if (inputResolveRef.current) {
      inputResolveRef.current(value);
      inputResolveRef.current = null;
      setWaitingForInput(false);
      setInputPrompt('');
    }
  };

  // Show landing page if not authenticated
  if (!currentUser) {
    return <Landing />;
  }

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
          <OutputPanel 
            output={output} 
            isRunning={isRunning}
            waitingForInput={waitingForInput}
            inputPrompt={inputPrompt}
            onInputSubmit={handleInputSubmit}
          />
          <ErrorDisplay errors={errors} isValidating={isValidating} />
        </div>
      </div>
    </div>
  );
}

export default App;
