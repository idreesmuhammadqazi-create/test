/**
 * Example pseudocode snippets for IGCSE/A-LEVELS syntax
 */

export interface Example {
  title: string;
  code: string;
}

export const EXAMPLES: Example[] = [
  {
    title: 'Basic Input/Output',
    code: `// Simple input and output
DECLARE name : STRING
DECLARE age : INTEGER

OUTPUT "Enter your name: "
INPUT name
OUTPUT "Enter your age: "
INPUT age

OUTPUT "Hello ", name
OUTPUT "You are ", age, " years old"`
  },
  {
    title: 'IF Statement',
    code: `// Grade calculator
DECLARE score : INTEGER

OUTPUT "Enter your score: "
INPUT score

IF score >= 90 THEN
    OUTPUT "Grade: A*"
ELSE IF score >= 80 THEN
    OUTPUT "Grade: A"
ELSE IF score >= 70 THEN
    OUTPUT "Grade: B"
ELSE IF score >= 60 THEN
    OUTPUT "Grade: C"
ELSE
    OUTPUT "Grade: D"
ENDIF`
  },
  {
    title: 'FOR Loop',
    code: `// Count from 1 to 10
DECLARE counter : INTEGER

FOR counter <-- 1 TO 10
    OUTPUT counter
NEXT counter

OUTPUT "Done!"`
  },
  {
    title: 'WHILE Loop',
    code: `// Sum of numbers
DECLARE total : INTEGER
DECLARE number : INTEGER

total <-- 0
number <-- 1

WHILE number <= 10 DO
    total <-- total + number
    number <-- number + 1
ENDWHILE

OUTPUT "Sum: ", total`
  },
  {
    title: 'Arrays',
    code: `// Array manipulation
DECLARE numbers : ARRAY[1:5] OF INTEGER
DECLARE i : INTEGER
DECLARE sum : INTEGER

// Fill array
FOR i <-- 1 TO 5
    OUTPUT "Enter number ", i, ": "
    INPUT numbers[i]
NEXT i

// Calculate sum
sum <-- 0
FOR i <-- 1 TO 5
    sum <-- sum + numbers[i]
NEXT i

OUTPUT "Sum: ", sum
OUTPUT "Average: ", sum / 5`
  },
  {
    title: 'Functions',
    code: `// Function to calculate factorial
FUNCTION Factorial(n : INTEGER) RETURNS INTEGER
    DECLARE result : INTEGER
    DECLARE i : INTEGER

    result <-- 1
    FOR i <-- 1 TO n
        result <-- result * i
    NEXT i

    RETURN result
ENDFUNCTION

// Main code
DECLARE num : INTEGER
DECLARE answer : INTEGER

OUTPUT "Enter a number: "
INPUT num
answer <-- Factorial(num)
OUTPUT "Factorial: ", answer`
  },
  {
    title: 'Procedures',
    code: `// Procedure to display menu
PROCEDURE DisplayMenu()
    OUTPUT "=== MENU ==="
    OUTPUT "1. Option One"
    OUTPUT "2. Option Two"
    OUTPUT "3. Exit"
    OUTPUT "============"
ENDPROCEDURE

// Main code
DECLARE choice : INTEGER

CALL DisplayMenu()
OUTPUT "Enter choice: "
INPUT choice

IF choice = 1 THEN
    OUTPUT "You selected Option One"
ELSE IF choice = 2 THEN
    OUTPUT "You selected Option Two"
ELSE
    OUTPUT "Goodbye!"
ENDIF`
  },
  {
    title: 'String Manipulation',
    code: `// String functions
DECLARE text : STRING
DECLARE len : INTEGER

text <-- "Hello World"
len <-- LENGTH(text)

OUTPUT "Original: ", text
OUTPUT "Length: ", len
OUTPUT "Uppercase: ", UCASE(text)
OUTPUT "Lowercase: ", LCASE(text)
OUTPUT "Substring: ", SUBSTRING(text, 1, 5)`
  },
  {
    title: '2D Arrays',
    code: `// 2D Array - Student grades
DECLARE grades : ARRAY[1:3, 1:4] OF INTEGER
DECLARE student, subject : INTEGER
DECLARE total, average : REAL

// Initialize grades (3 students, 4 subjects each)
grades[1, 1] <-- 85
grades[1, 2] <-- 90
grades[1, 3] <-- 78
grades[1, 4] <-- 92

grades[2, 1] <-- 76
grades[2, 2] <-- 88
grades[2, 3] <-- 91
grades[2, 4] <-- 84

grades[3, 1] <-- 95
grades[3, 2] <-- 87
grades[3, 3] <-- 89
grades[3, 4] <-- 93

// Calculate and display average for each student
FOR student <-- 1 TO 3
    total <-- 0
    FOR subject <-- 1 TO 4
        total <-- total + grades[student, subject]
    NEXT subject
    average <-- total / 4
    OUTPUT "Student ", student, " average: ", average
NEXT student`
  },
  {
    title: 'Bubble Sort',
    code: `// Bubble Sort Algorithm
DECLARE nums : ARRAY[1:5] OF INTEGER
DECLARE temp, index : INTEGER
DECLARE isSorted : BOOLEAN
DECLARE endIndex : INTEGER

// Initialize array
nums[1] <-- 64
nums[2] <-- 34
nums[3] <-- 25
nums[4] <-- 12
nums[5] <-- 22

OUTPUT "Original array:"
FOR index <-- 1 TO 5
    OUTPUT nums[index]
NEXT index

// Bubble sort
endIndex <-- 4
isSorted <-- FALSE

WHILE isSorted = FALSE DO
    isSorted <-- TRUE
    FOR index <-- 1 TO endIndex
        IF nums[index] > nums[index + 1] THEN
            temp <-- nums[index]
            nums[index] <-- nums[index + 1]
            nums[index + 1] <-- temp
            isSorted <-- FALSE
        ENDIF
    NEXT index
    endIndex <-- endIndex - 1
ENDWHILE

OUTPUT "Sorted array:"
FOR index <-- 1 TO 5
    OUTPUT nums[index]
NEXT index`
  },
  {
    title: 'Linear Search',
    code: `// Linear Search Algorithm
DECLARE numbers : ARRAY[1:8] OF INTEGER
DECLARE target, position, index : INTEGER
DECLARE found : BOOLEAN

// Initialize array
numbers[1] <-- 45
numbers[2] <-- 23
numbers[3] <-- 78
numbers[4] <-- 12
numbers[5] <-- 56
numbers[6] <-- 34
numbers[7] <-- 89
numbers[8] <-- 67

OUTPUT "Enter number to search: "
INPUT target

// Linear search
found <-- FALSE
position <-- 0

FOR index <-- 1 TO 8
    IF numbers[index] = target THEN
        found <-- TRUE
        position <-- index
    ENDIF
NEXT index

IF found = TRUE THEN
    OUTPUT "Found at position: ", position
ELSE
    OUTPUT "Not found"
ENDIF`
  },
  {
    title: 'CASE Statement',
    code: `// Calculator using CASE
DECLARE num1, num2 : REAL
DECLARE operator : STRING
DECLARE result : REAL

OUTPUT "Enter first number: "
INPUT num1
OUTPUT "Enter operator (+, -, *, /): "
INPUT operator
OUTPUT "Enter second number: "
INPUT num2

CASE OF operator
    "+" : result <-- num1 + num2
    "-" : result <-- num1 - num2
    "*" : result <-- num1 * num2
    "/" : result <-- num1 / num2
    OTHERWISE : OUTPUT "Invalid operator"
ENDCASE

OUTPUT "Result: ", result`
  },
  {
    title: 'REPEAT UNTIL Loop',
    code: `// Number guessing game
DECLARE secretNumber, guess, attempts : INTEGER

secretNumber <-- 42
attempts <-- 0

OUTPUT "Guess the number (1-100)!"

REPEAT
    OUTPUT "Enter your guess: "
    INPUT guess
    attempts <-- attempts + 1
    
    IF guess < secretNumber THEN
        OUTPUT "Too low!"
    ENDIF
    
    IF guess > secretNumber THEN
        OUTPUT "Too high!"
    ENDIF
UNTIL guess = secretNumber

OUTPUT "Correct! You guessed in ", attempts, " attempts"`
  },
  {
    title: 'BYREF Parameters',
    code: `// Pass by reference example
PROCEDURE Swap(BYREF a : INTEGER, BYREF b : INTEGER)
    DECLARE temp : INTEGER
    temp <-- a
    a <-- b
    b <-- temp
ENDPROCEDURE

// Main program
DECLARE x, y : INTEGER

x <-- 10
y <-- 20

OUTPUT "Before swap:"
OUTPUT "x = ", x
OUTPUT "y = ", y

CALL Swap(x, y)

OUTPUT "After swap:"
OUTPUT "x = ", x
OUTPUT "y = ", y`
  },
  {
    title: 'Nested Loops - Pattern',
    code: `// Print a number pattern
DECLARE row, col : INTEGER

OUTPUT "Number Triangle Pattern:"

FOR row <-- 1 TO 5
    FOR col <-- 1 TO row
        OUTPUT col
    NEXT col
    OUTPUT ""
NEXT row

OUTPUT "Multiplication Table (3x3):"

FOR row <-- 1 TO 3
    FOR col <-- 1 TO 3
        OUTPUT row * col, " "
    NEXT col
    OUTPUT ""
NEXT row`
  }
];
