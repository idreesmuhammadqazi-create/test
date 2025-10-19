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

FOR counter <- 1 TO 10
    OUTPUT counter
NEXT counter

OUTPUT "Done!"`
  },
  {
    title: 'WHILE Loop',
    code: `// Sum of numbers
DECLARE total : INTEGER
DECLARE number : INTEGER

total <- 0
number <- 1

WHILE number <= 10 DO
    total <- total + number
    number <- number + 1
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
FOR i <- 1 TO 5
    OUTPUT "Enter number ", i, ": "
    INPUT numbers[i]
NEXT i

// Calculate sum
sum <- 0
FOR i <- 1 TO 5
    sum <- sum + numbers[i]
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

    result <- 1
    FOR i <- 1 TO n
        result <- result * i
    NEXT i

    RETURN result
ENDFUNCTION

// Main code
DECLARE num : INTEGER
DECLARE answer : INTEGER

OUTPUT "Enter a number: "
INPUT num
answer <- Factorial(num)
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

text <- "Hello World"
len <- LENGTH(text)

OUTPUT "Original: ", text
OUTPUT "Length: ", len
OUTPUT "Uppercase: ", UCASE(text)
OUTPUT "Lowercase: ", LCASE(text)
OUTPUT "Substring: ", SUBSTRING(text, 1, 5)`
  }
];
