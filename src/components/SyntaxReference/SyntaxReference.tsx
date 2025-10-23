import { useState } from 'react';
import styles from './SyntaxReference.module.css';

interface SyntaxItem {
  category: string;
  items: {
    title: string;
    syntax: string;
    example: string;
    description: string;
  }[];
}

const syntaxData: SyntaxItem[] = [
  {
    category: 'Variables & Data Types',
    items: [
      {
        title: 'DECLARE',
        syntax: 'DECLARE <identifier> : <data type>',
        example: 'DECLARE Age : INTEGER\nDECLARE Name : STRING',
        description: 'Declares a variable with a specific data type (INTEGER, REAL, STRING, CHAR, BOOLEAN)',
      },
      {
        title: 'Assignment',
        syntax: '<identifier> <- <value>',
        example: 'Age <- 16\nName <- "Alice"',
        description: 'Assigns a value to a variable using the <- operator',
      },
      {
        title: 'Arrays',
        syntax: 'DECLARE <identifier> : ARRAY[<lower>:<upper>] OF <type>',
        example: 'DECLARE Numbers : ARRAY[1:10] OF INTEGER\nNumbers[5] <- 42',
        description: 'Declares an array with lower and upper bounds (1-indexed)',
      },
    ],
  },
  {
    category: 'Input & Output',
    items: [
      {
        title: 'INPUT',
        syntax: 'INPUT <identifier>',
        example: 'DECLARE Number : INTEGER\nINPUT Number',
        description: 'Reads input from the user into a variable',
      },
      {
        title: 'OUTPUT',
        syntax: 'OUTPUT <value>, <value>, ...',
        example: 'OUTPUT "Hello, ", Name\nOUTPUT "Sum: ", Total',
        description: 'Displays output to the screen. Can output multiple values separated by commas',
      },
    ],
  },
  {
    category: 'Selection',
    items: [
      {
        title: 'IF Statement',
        syntax: 'IF <condition> THEN\n    <statements>\nENDIF',
        example: 'IF Age >= 18 THEN\n    OUTPUT "Adult"\nENDIF',
        description: 'Executes statements only if condition is true',
      },
      {
        title: 'IF-ELSE Statement',
        syntax: 'IF <condition> THEN\n    <statements>\nELSE\n    <statements>\nENDIF',
        example: 'IF Score >= 50 THEN\n    OUTPUT "Pass"\nELSE\n    OUTPUT "Fail"\nENDIF',
        description: 'Executes first block if true, else block if false',
      },
      {
        title: 'CASE Statement',
        syntax: 'CASE OF <identifier>\n    <value> : <statements>\n    OTHERWISE : <statements>\nENDCASE',
        example: 'CASE OF Grade\n    "A" : OUTPUT "Excellent"\n    "B" : OUTPUT "Good"\n    OTHERWISE : OUTPUT "Other"\nENDCASE',
        description: 'Multi-way selection based on value',
      },
    ],
  },
  {
    category: 'Iteration',
    items: [
      {
        title: 'FOR Loop',
        syntax: 'FOR <identifier> <- <start> TO <end>\n    <statements>\nNEXT <identifier>',
        example: 'FOR i <- 1 TO 10\n    OUTPUT i\nNEXT i',
        description: 'Repeats for a fixed number of iterations',
      },
      {
        title: 'FOR with STEP',
        syntax: 'FOR <identifier> <- <start> TO <end> STEP <increment>\n    <statements>\nNEXT <identifier>',
        example: 'FOR i <- 0 TO 100 STEP 10\n    OUTPUT i\nNEXT i',
        description: 'Loop with custom increment value',
      },
      {
        title: 'WHILE Loop',
        syntax: 'WHILE <condition> DO\n    <statements>\nENDWHILE',
        example: 'WHILE Count < 10 DO\n    Count <- Count + 1\nENDWHILE',
        description: 'Repeats while condition is true (checks before execution)',
      },
      {
        title: 'REPEAT Loop',
        syntax: 'REPEAT\n    <statements>\nUNTIL <condition>',
        example: 'REPEAT\n    Count <- Count + 1\nUNTIL Count = 10',
        description: 'Repeats until condition is true (checks after execution)',
      },
    ],
  },
  {
    category: 'Procedures & Functions',
    items: [
      {
        title: 'PROCEDURE',
        syntax: 'PROCEDURE <identifier>(<parameters>)\n    <statements>\nENDPROCEDURE',
        example: 'PROCEDURE Greet(Name : STRING)\n    OUTPUT "Hello, ", Name\nENDPROCEDURE',
        description: 'Defines a reusable block of code without return value',
      },
      {
        title: 'CALL Procedure',
        syntax: 'CALL <identifier>(<arguments>)',
        example: 'CALL Greet("Alice")',
        description: 'Executes a procedure',
      },
      {
        title: 'FUNCTION',
        syntax: 'FUNCTION <identifier>(<parameters>) RETURNS <type>\n    <statements>\n    RETURN <value>\nENDFUNCTION',
        example: 'FUNCTION Square(N : INTEGER) RETURNS INTEGER\n    RETURN N * N\nENDFUNCTION',
        description: 'Defines a reusable block of code that returns a value',
      },
      {
        title: 'Parameters',
        syntax: 'BYVAL <identifier> : <type>\nBYREF <identifier> : <type>',
        example: 'PROCEDURE Test(BYVAL X : INTEGER, BYREF Y : INTEGER)\n    Y <- X * 2\nENDPROCEDURE',
        description: 'BYVAL passes a copy, BYREF passes reference (can modify original)',
      },
    ],
  },
  {
    category: 'Operators',
    items: [
      {
        title: 'Arithmetic',
        syntax: '+ - * / DIV MOD',
        example: 'Result <- 10 DIV 3  // 3\nRemainder <- 10 MOD 3  // 1',
        description: 'DIV for integer division, MOD for remainder',
      },
      {
        title: 'Comparison',
        syntax: '= <> < > <= >=',
        example: 'IF Age >= 18 THEN\n    OUTPUT "Adult"\nENDIF',
        description: '= equals, <> not equals',
      },
      {
        title: 'Logical',
        syntax: 'AND OR NOT',
        example: 'IF Age >= 18 AND Age < 65 THEN\n    OUTPUT "Working age"\nENDIF',
        description: 'Combine conditions with AND, OR, NOT',
      },
    ],
  },
  {
    category: 'Built-in Functions',
    items: [
      {
        title: 'String Functions',
        syntax: 'LENGTH(<string>)\nSUBSTRING(<string>, <start>, <length>)\nUCASE(<string>)\nLCASE(<string>)',
        example: 'Len <- LENGTH("Hello")  // 5\nSub <- SUBSTRING("Hello", 1, 3)  // "Hel"',
        description: 'String manipulation functions',
      },
      {
        title: 'Type Conversion',
        syntax: 'INT(<value>)\nREAL(<value>)\nSTRING(<value>)',
        example: 'X <- INT(3.7)  // 3\nY <- STRING(42)  // "42"',
        description: 'Convert between data types',
      },
      {
        title: 'Math Functions',
        syntax: 'ROUND(<number>, <decimals>)\nRANDOM()',
        example: 'R <- ROUND(3.14159, 2)  // 3.14\nRand <- RANDOM()  // 0.0-1.0',
        description: 'Mathematical operations',
      },
    ],
  },
];

interface SyntaxReferenceProps {
  onClose: () => void;
}

export default function SyntaxReference({ onClose }: SyntaxReferenceProps) {
  const [selectedCategory, setSelectedCategory] = useState(syntaxData[0].category);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = syntaxData.map(category => ({
    ...category,
    items: category.items.filter(item =>
      searchTerm === '' ||
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
    ),
  })).filter(category => category.items.length > 0);

  const currentCategory = filteredData.find(cat => cat.category === selectedCategory) || filteredData[0];

  return (
    <div className={styles.overlay}>
      <div className={styles.panel}>
        <div className={styles.header}>
          <h2>Syntax Reference</h2>
          <button className={styles.closeButton} onClick={onClose}>×</button>
        </div>

        <div className={styles.searchBar}>
          <input
            type="text"
            placeholder="Search syntax..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
        </div>

        <div className={styles.content}>
          <div className={styles.sidebar}>
            {filteredData.map((category) => (
              <button
                key={category.category}
                className={`${styles.categoryButton} ${
                  selectedCategory === category.category ? styles.active : ''
                }`}
                onClick={() => setSelectedCategory(category.category)}
              >
                {category.category}
              </button>
            ))}
          </div>

          <div className={styles.main}>
            {currentCategory && currentCategory.items.map((item) => (
              <div key={item.title} className={styles.syntaxItem}>
                <h3 className={styles.itemTitle}>{item.title}</h3>
                <p className={styles.itemDescription}>{item.description}</p>

                <div className={styles.syntaxBox}>
                  <div className={styles.syntaxLabel}>Syntax:</div>
                  <pre className={styles.syntaxCode}>{item.syntax}</pre>
                </div>

                <div className={styles.exampleBox}>
                  <div className={styles.exampleLabel}>Example:</div>
                  <pre className={styles.exampleCode}>{item.example}</pre>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
