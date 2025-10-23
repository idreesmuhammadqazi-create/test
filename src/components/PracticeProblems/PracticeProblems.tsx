import { useState } from 'react';
import styles from './PracticeProblems.module.css';

interface Problem {
  id: number;
  level: 'IGCSE' | 'A-Level';
  topic: string;
  title: string;
  description: string;
  hints: string[];
  solution: string;
  testCases?: { input: string; output: string }[];
}

const problems: Problem[] = [
  {
    id: 1,
    level: 'IGCSE',
    topic: 'Variables & Output',
    title: 'Calculate Rectangle Area',
    description: 'Write a program that declares variables for length and width, assigns values (length = 10, width = 5), calculates the area, and outputs the result.',
    hints: [
      'Declare three INTEGER variables: Length, Width, and Area',
      'Use the <- operator to assign values',
      'Area formula: Length * Width',
    ],
    solution: `DECLARE Length : INTEGER
DECLARE Width : INTEGER
DECLARE Area : INTEGER

Length <- 10
Width <- 5
Area <- Length * Width

OUTPUT "The area is: ", Area`,
  },
  {
    id: 2,
    level: 'IGCSE',
    topic: 'Input & Selection',
    title: 'Pass or Fail',
    description: 'Write a program that inputs a student\'s score (0-100) and outputs "Pass" if the score is 50 or above, or "Fail" otherwise.',
    hints: [
      'Use INPUT to get the score',
      'Use IF-THEN-ELSE for the decision',
      'Pass mark is >= 50',
    ],
    solution: `DECLARE Score : INTEGER

OUTPUT "Enter your score:"
INPUT Score

IF Score >= 50 THEN
    OUTPUT "Pass"
ELSE
    OUTPUT "Fail"
ENDIF`,
  },
  {
    id: 3,
    level: 'IGCSE',
    topic: 'Loops',
    title: 'Times Table',
    description: 'Write a program that outputs the 7 times table from 7×1 to 7×10.',
    hints: [
      'Use a FOR loop from 1 TO 10',
      'Multiply 7 by the loop counter',
      'Output both the counter and result',
    ],
    solution: `DECLARE i : INTEGER
DECLARE Result : INTEGER

FOR i <- 1 TO 10
    Result <- 7 * i
    OUTPUT "7 x ", i, " = ", Result
NEXT i`,
  },
  {
    id: 4,
    level: 'IGCSE',
    topic: 'Arrays',
    title: 'Array Average',
    description: 'Declare an array of 5 integers, fill it with values {10, 20, 30, 40, 50}, calculate and output the average.',
    hints: [
      'Declare an array with ARRAY[1:5]',
      'Use a loop to fill the array',
      'Sum all values, then divide by 5',
    ],
    solution: `DECLARE Numbers : ARRAY[1:5] OF INTEGER
DECLARE i : INTEGER
DECLARE Sum : INTEGER
DECLARE Average : REAL

Numbers[1] <- 10
Numbers[2] <- 20
Numbers[3] <- 30
Numbers[4] <- 40
Numbers[5] <- 50

Sum <- 0
FOR i <- 1 TO 5
    Sum <- Sum + Numbers[i]
NEXT i

Average <- Sum / 5
OUTPUT "Average: ", Average`,
  },
  {
    id: 5,
    level: 'A-Level',
    topic: 'Functions',
    title: 'Factorial Function',
    description: 'Write a function called Factorial that takes an integer N and returns N! (factorial). Then call it with N=5 and output the result.',
    hints: [
      'Function should RETURN INTEGER',
      'Use a loop to multiply 1 * 2 * 3 * ... * N',
      'Remember to declare Result variable inside function',
    ],
    solution: `FUNCTION Factorial(N : INTEGER) RETURNS INTEGER
    DECLARE Result : INTEGER
    DECLARE i : INTEGER

    Result <- 1
    FOR i <- 1 TO N
        Result <- Result * i
    NEXT i

    RETURN Result
ENDFUNCTION

DECLARE Answer : INTEGER
Answer <- Factorial(5)
OUTPUT "5! = ", Answer`,
  },
  {
    id: 6,
    level: 'A-Level',
    topic: 'Procedures & Parameters',
    title: 'Swap Procedure',
    description: 'Write a procedure called Swap that takes two INTEGER parameters by reference and swaps their values. Test it with two variables.',
    hints: [
      'Use BYREF for both parameters so they can be modified',
      'Need a temporary variable to hold one value during swap',
      'Declare the temp variable inside the procedure',
    ],
    solution: `PROCEDURE Swap(BYREF A : INTEGER, BYREF B : INTEGER)
    DECLARE Temp : INTEGER
    Temp <- A
    A <- B
    B <- Temp
ENDPROCEDURE

DECLARE X : INTEGER
DECLARE Y : INTEGER

X <- 10
Y <- 20

OUTPUT "Before: X = ", X, ", Y = ", Y
CALL Swap(X, Y)
OUTPUT "After: X = ", X, ", Y = ", Y`,
  },
  {
    id: 7,
    level: 'A-Level',
    topic: 'Searching',
    title: 'Linear Search',
    description: 'Write a function called LinearSearch that searches for a target value in an array and returns the index (or -1 if not found). Test with an array of 5 numbers.',
    hints: [
      'Loop through array indices 1 to 5',
      'Compare each element with target',
      'Return index when found, -1 if loop completes',
    ],
    solution: `FUNCTION LinearSearch(Arr : ARRAY[1:5] OF INTEGER, Target : INTEGER) RETURNS INTEGER
    DECLARE i : INTEGER

    FOR i <- 1 TO 5
        IF Arr[i] = Target THEN
            RETURN i
        ENDIF
    NEXT i

    RETURN -1
ENDFUNCTION

DECLARE Numbers : ARRAY[1:5] OF INTEGER
DECLARE Index : INTEGER

Numbers[1] <- 10
Numbers[2] <- 25
Numbers[3] <- 30
Numbers[4] <- 45
Numbers[5] <- 50

Index <- LinearSearch(Numbers, 30)
IF Index = -1 THEN
    OUTPUT "Not found"
ELSE
    OUTPUT "Found at index ", Index
ENDIF`,
  },
  {
    id: 8,
    level: 'A-Level',
    topic: 'String Manipulation',
    title: 'Palindrome Checker',
    description: 'Write a program that inputs a word and checks if it\'s a palindrome (reads same forwards and backwards). Use string functions.',
    hints: [
      'Use LENGTH() to get string length',
      'Use SUBSTRING() to get individual characters',
      'Compare characters from start and end moving inward',
    ],
    solution: `DECLARE Word : STRING
DECLARE Length : INTEGER
DECLARE i : INTEGER
DECLARE IsPalindrome : BOOLEAN
DECLARE FirstChar : STRING
DECLARE LastChar : STRING

OUTPUT "Enter a word:"
INPUT Word

Length <- LENGTH(Word)
IsPalindrome <- TRUE

FOR i <- 1 TO Length DIV 2
    FirstChar <- SUBSTRING(Word, i, 1)
    LastChar <- SUBSTRING(Word, Length - i + 1, 1)

    IF FirstChar <> LastChar THEN
        IsPalindrome <- FALSE
    ENDIF
NEXT i

IF IsPalindrome THEN
    OUTPUT Word, " is a palindrome"
ELSE
    OUTPUT Word, " is not a palindrome"
ENDIF`,
  },
];

interface PracticeProblemsProps {
  onClose: () => void;
  onLoadCode?: (code: string) => void;
}

export default function PracticeProblems({ onClose, onLoadCode }: PracticeProblemsProps) {
  const [selectedProblem, setSelectedProblem] = useState<Problem | null>(null);
  const [showSolution, setShowSolution] = useState(false);
  const [filterLevel, setFilterLevel] = useState<'All' | 'IGCSE' | 'A-Level'>('All');

  const filteredProblems = problems.filter(
    p => filterLevel === 'All' || p.level === filterLevel
  );

  const handleSelectProblem = (problem: Problem) => {
    setSelectedProblem(problem);
    setShowSolution(false);
  };

  const handleTrySolution = () => {
    if (selectedProblem && onLoadCode) {
      if (confirm('Load solution? This will replace your current code.')) {
        onLoadCode(selectedProblem.solution);
        onClose();
      }
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.panel}>
        <div className={styles.header}>
          <h2>Practice Problems</h2>
          <button className={styles.closeButton} onClick={onClose}>×</button>
        </div>

        <div className={styles.content}>
          <div className={styles.sidebar}>
            <div className={styles.filterButtons}>
              <button
                className={`${styles.filterButton} ${filterLevel === 'All' ? styles.active : ''}`}
                onClick={() => setFilterLevel('All')}
              >
                All
              </button>
              <button
                className={`${styles.filterButton} ${filterLevel === 'IGCSE' ? styles.active : ''}`}
                onClick={() => setFilterLevel('IGCSE')}
              >
                IGCSE
              </button>
              <button
                className={`${styles.filterButton} ${filterLevel === 'A-Level' ? styles.active : ''}`}
                onClick={() => setFilterLevel('A-Level')}
              >
                A-Level
              </button>
            </div>

            <div className={styles.problemList}>
              {filteredProblems.map((problem) => (
                <button
                  key={problem.id}
                  className={`${styles.problemButton} ${
                    selectedProblem?.id === problem.id ? styles.active : ''
                  }`}
                  onClick={() => handleSelectProblem(problem)}
                >
                  <div className={styles.problemLevel}>{problem.level}</div>
                  <div className={styles.problemTitle}>{problem.title}</div>
                  <div className={styles.problemTopic}>{problem.topic}</div>
                </button>
              ))}
            </div>
          </div>

          <div className={styles.main}>
            {selectedProblem ? (
              <>
                <div className={styles.problemHeader}>
                  <div>
                    <span className={styles.badge}>{selectedProblem.level}</span>
                    <span className={styles.topicBadge}>{selectedProblem.topic}</span>
                  </div>
                  <h3>{selectedProblem.title}</h3>
                </div>

                <div className={styles.problemDescription}>
                  <h4>Problem:</h4>
                  <p>{selectedProblem.description}</p>
                </div>

                <div className={styles.hintsSection}>
                  <h4>Hints:</h4>
                  <ul>
                    {selectedProblem.hints.map((hint, index) => (
                      <li key={index}>{hint}</li>
                    ))}
                  </ul>
                </div>

                <div className={styles.solutionSection}>
                  <button
                    className={styles.solutionButton}
                    onClick={() => setShowSolution(!showSolution)}
                  >
                    {showSolution ? 'Hide Solution' : 'Show Solution'}
                  </button>

                  {showSolution && (
                    <div className={styles.solutionBox}>
                      <pre>{selectedProblem.solution}</pre>
                      <button
                        className={styles.tryButton}
                        onClick={handleTrySolution}
                      >
                        Try This Solution
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className={styles.emptyState}>
                <p>Select a problem from the list to get started</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
