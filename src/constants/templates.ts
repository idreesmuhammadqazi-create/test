/**
 * Code Templates and Snippets
 * Pre-defined code patterns for quick insertion
 */

export interface CodeTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  code: string;
  cursorPosition?: number; // Position to place cursor after insertion
}

export const TEMPLATE_CATEGORIES = [
  'Input/Output',
  'Loops',
  'Conditionals',
  'Arrays',
  'Functions',
  'Procedures',
  'String Operations',
  'Common Patterns'
];

export const CODE_TEMPLATES: CodeTemplate[] = [
  // Input/Output
  {
    id: 'io-basic',
    name: 'Basic Input/Output',
    description: 'Simple input and output example',
    category: 'Input/Output',
    code: `DECLARE variable : INTEGER

OUTPUT "Enter a value: "
INPUT variable

OUTPUT "You entered: ", variable`
  },
  {
    id: 'io-multiple',
    name: 'Multiple Inputs',
    description: 'Input multiple values',
    category: 'Input/Output',
    code: `DECLARE name : STRING
DECLARE age : INTEGER

OUTPUT "Enter your name: "
INPUT name

OUTPUT "Enter your age: "
INPUT age

OUTPUT "Hello ", name, "! You are ", age, " years old."`
  },

  // Loops
  {
    id: 'loop-for',
    name: 'FOR Loop',
    description: 'Basic FOR loop structure',
    category: 'Loops',
    code: `DECLARE i : INTEGER

FOR i <- 1 TO 10
    OUTPUT i
NEXT i`
  },
  {
    id: 'loop-for-step',
    name: 'FOR Loop with STEP',
    description: 'FOR loop with custom step',
    category: 'Loops',
    code: `DECLARE i : INTEGER

FOR i <- 1 TO 10 STEP 2
    OUTPUT i
NEXT i`
  },
  {
    id: 'loop-while',
    name: 'WHILE Loop',
    description: 'Basic WHILE loop structure',
    category: 'Loops',
    code: `DECLARE count : INTEGER

count <- 1
WHILE count <= 10 DO
    OUTPUT count
    count <- count + 1
ENDWHILE`
  },
  {
    id: 'loop-repeat',
    name: 'REPEAT-UNTIL Loop',
    description: 'Basic REPEAT-UNTIL loop structure',
    category: 'Loops',
    code: `DECLARE count : INTEGER

count <- 1
REPEAT
    OUTPUT count
    count <- count + 1
UNTIL count > 10`
  },

  // Conditionals
  {
    id: 'if-basic',
    name: 'IF Statement',
    description: 'Basic IF-THEN-ELSE structure',
    category: 'Conditionals',
    code: `DECLARE number : INTEGER

OUTPUT "Enter a number: "
INPUT number

IF number > 0 THEN
    OUTPUT "Positive"
ELSE
    OUTPUT "Negative or zero"
ENDIF`
  },
  {
    id: 'if-elseif',
    name: 'IF-ELSE IF Statement',
    description: 'Multiple condition checking',
    category: 'Conditionals',
    code: `DECLARE score : INTEGER

OUTPUT "Enter score: "
INPUT score

IF score >= 90 THEN
    OUTPUT "Grade: A"
ELSE IF score >= 80 THEN
    OUTPUT "Grade: B"
ELSE IF score >= 70 THEN
    OUTPUT "Grade: C"
ELSE
    OUTPUT "Grade: F"
ENDIF`
  },
  {
    id: 'case',
    name: 'CASE Statement',
    description: 'CASE OF structure for multiple options',
    category: 'Conditionals',
    code: `DECLARE choice : INTEGER

OUTPUT "Enter choice (1-3): "
INPUT choice

CASE OF choice
    1 : OUTPUT "Option One"
    2 : OUTPUT "Option Two"
    3 : OUTPUT "Option Three"
    OTHERWISE : OUTPUT "Invalid choice"
ENDCASE`
  },

  // Arrays
  {
    id: 'array-declare',
    name: 'Array Declaration',
    description: 'Declare and initialize an array',
    category: 'Arrays',
    code: `DECLARE numbers : ARRAY[1:10] OF INTEGER
DECLARE i : INTEGER

// Fill array
FOR i <- 1 TO 10
    numbers[i] <- i * 2
NEXT i

// Display array
FOR i <- 1 TO 10
    OUTPUT numbers[i]
NEXT i`
  },
  {
    id: 'array-input',
    name: 'Array Input',
    description: 'Input values into an array',
    category: 'Arrays',
    code: `DECLARE values : ARRAY[1:5] OF INTEGER
DECLARE i : INTEGER

FOR i <- 1 TO 5
    OUTPUT "Enter value ", i, ": "
    INPUT values[i]
NEXT i

OUTPUT "Values entered: "
FOR i <- 1 TO 5
    OUTPUT values[i]
NEXT i`
  },
  {
    id: 'array-sum',
    name: 'Array Sum and Average',
    description: 'Calculate sum and average of array',
    category: 'Arrays',
    code: `DECLARE numbers : ARRAY[1:5] OF INTEGER
DECLARE i, sum : INTEGER
DECLARE average : REAL

sum <- 0
FOR i <- 1 TO 5
    OUTPUT "Enter number ", i, ": "
    INPUT numbers[i]
    sum <- sum + numbers[i]
NEXT i

average <- sum / 5

OUTPUT "Sum: ", sum
OUTPUT "Average: ", average`
  },
  {
    id: 'array-2d',
    name: '2D Array (Matrix)',
    description: 'Two-dimensional array declaration',
    category: 'Arrays',
    code: `DECLARE matrix : ARRAY[1:3, 1:3] OF INTEGER
DECLARE row, col : INTEGER

// Fill matrix
FOR row <- 1 TO 3
    FOR col <- 1 TO 3
        matrix[row, col] <- row * col
    NEXT col
NEXT row

// Display matrix
FOR row <- 1 TO 3
    FOR col <- 1 TO 3
        OUTPUT matrix[row, col], " "
    NEXT col
    OUTPUT ""
NEXT row`
  },

  // Functions
  {
    id: 'function-basic',
    name: 'Basic Function',
    description: 'Function with parameter and return value',
    category: 'Functions',
    code: `FUNCTION Square(n : INTEGER) RETURNS INTEGER
    RETURN n * n
ENDFUNCTION

DECLARE num, result : INTEGER

OUTPUT "Enter a number: "
INPUT num

result <- Square(num)
OUTPUT "Square: ", result`
  },
  {
    id: 'function-multiple',
    name: 'Function with Multiple Parameters',
    description: 'Function with multiple parameters',
    category: 'Functions',
    code: `FUNCTION Add(a : INTEGER, b : INTEGER) RETURNS INTEGER
    RETURN a + b
ENDFUNCTION

DECLARE x, y, sum : INTEGER

OUTPUT "Enter first number: "
INPUT x
OUTPUT "Enter second number: "
INPUT y

sum <- Add(x, y)
OUTPUT "Sum: ", sum`
  },

  // Procedures
  {
    id: 'procedure-basic',
    name: 'Basic Procedure',
    description: 'Procedure with parameters',
    category: 'Procedures',
    code: `PROCEDURE Greet(name : STRING)
    OUTPUT "Hello, ", name, "!"
ENDPROCEDURE

DECLARE userName : STRING

OUTPUT "Enter your name: "
INPUT userName

CALL Greet(userName)`
  },
  {
    id: 'procedure-byref',
    name: 'Procedure with BYREF',
    description: 'Procedure that modifies a parameter',
    category: 'Procedures',
    code: `PROCEDURE Increment(BYREF value : INTEGER)
    value <- value + 1
ENDPROCEDURE

DECLARE number : INTEGER

number <- 5
OUTPUT "Before: ", number

CALL Increment(number)

OUTPUT "After: ", number`
  },

  // String Operations
  {
    id: 'string-concat',
    name: 'String Concatenation',
    description: 'Combining strings',
    category: 'String Operations',
    code: `DECLARE firstName, lastName, fullName : STRING

OUTPUT "Enter first name: "
INPUT firstName

OUTPUT "Enter last name: "
INPUT lastName

fullName <- firstName & " " & lastName
OUTPUT "Full name: ", fullName`
  },
  {
    id: 'string-functions',
    name: 'String Functions',
    description: 'Using LENGTH, SUBSTRING, UCASE, LCASE',
    category: 'String Operations',
    code: `DECLARE text : STRING
DECLARE len : INTEGER

text <- "Hello World"

len <- LENGTH(text)
OUTPUT "Original: ", text
OUTPUT "Length: ", len
OUTPUT "Uppercase: ", UCASE(text)
OUTPUT "Lowercase: ", LCASE(text)
OUTPUT "Substring: ", SUBSTRING(text, 1, 5)`
  },

  // Common Patterns
  {
    id: 'pattern-counter',
    name: 'Counter Pattern',
    description: 'Count occurrences',
    category: 'Common Patterns',
    code: `DECLARE count : INTEGER
DECLARE i : INTEGER
DECLARE number : INTEGER

count <- 0

FOR i <- 1 TO 10
    OUTPUT "Enter number ", i, ": "
    INPUT number

    IF number > 0 THEN
        count <- count + 1
    ENDIF
NEXT i

OUTPUT "Positive numbers: ", count`
  },
  {
    id: 'pattern-max-min',
    name: 'Find Maximum/Minimum',
    description: 'Find largest and smallest values',
    category: 'Common Patterns',
    code: `DECLARE numbers : ARRAY[1:5] OF INTEGER
DECLARE i, max, min : INTEGER

// Input values
FOR i <- 1 TO 5
    OUTPUT "Enter number ", i, ": "
    INPUT numbers[i]
NEXT i

// Initialize max and min
max <- numbers[1]
min <- numbers[1]

// Find max and min
FOR i <- 2 TO 5
    IF numbers[i] > max THEN
        max <- numbers[i]
    ENDIF

    IF numbers[i] < min THEN
        min <- numbers[i]
    ENDIF
NEXT i

OUTPUT "Maximum: ", max
OUTPUT "Minimum: ", min`
  },
  {
    id: 'pattern-validation',
    name: 'Input Validation',
    description: 'Validate user input',
    category: 'Common Patterns',
    code: `DECLARE age : INTEGER
DECLARE valid : BOOLEAN

valid <- FALSE

REPEAT
    OUTPUT "Enter age (1-120): "
    INPUT age

    IF age >= 1 AND age <= 120 THEN
        valid <- TRUE
    ELSE
        OUTPUT "Invalid age. Try again."
    ENDIF
UNTIL valid

OUTPUT "Valid age entered: ", age`
  },
  {
    id: 'pattern-search',
    name: 'Linear Search',
    description: 'Search for a value in an array',
    category: 'Common Patterns',
    code: `DECLARE numbers : ARRAY[1:5] OF INTEGER
DECLARE i, target : INTEGER
DECLARE found : BOOLEAN

// Fill array
FOR i <- 1 TO 5
    OUTPUT "Enter number ", i, ": "
    INPUT numbers[i]
NEXT i

OUTPUT "Enter number to search: "
INPUT target

// Search
found <- FALSE
FOR i <- 1 TO 5
    IF numbers[i] = target THEN
        found <- TRUE
        OUTPUT "Found at position ", i
    ENDIF
NEXT i

IF NOT found THEN
    OUTPUT "Not found"
ENDIF`
  }
];

// Special character shortcuts helper
export const KEYBOARD_SHORTCUTS = [
  { key: 'Alt + -', char: '←', name: 'Assignment arrow' },
  { key: 'Alt + <', char: '≤', name: 'Less than or equal' },
  { key: 'Alt + >', char: '≥', name: 'Greater than or equal' },
  { key: 'Alt + =', char: '≠', name: 'Not equal' }
];
