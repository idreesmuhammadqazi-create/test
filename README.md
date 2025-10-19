# IGCSE/A-LEVELS Pseudocode Editor

A web-based pseudocode editor that supports Cambridge IGCSE Computer Science (0478/0984) and A-Level (9618) pseudocode syntax. Features real-time syntax validation, error detection, and animated execution output.

## Features

- ✅ Full IGCSE/A-LEVELS pseudocode syntax support
- ✅ Real-time syntax validation (500ms debounced)
- ✅ Animated execution output (300ms between lines)
- ✅ Code editor with line numbers and syntax highlighting
- ✅ Error detection with line numbers (syntax and runtime)
- ✅ Auto-save to browser LocalStorage
- ✅ Download/Upload code as .txt files
- ✅ 8 built-in example programs
- ✅ Responsive design (desktop and mobile)

## Supported Syntax

### Data Types
- INTEGER, REAL, STRING, CHAR, BOOLEAN
- Single and multi-dimensional ARRAY

### Control Structures
- IF/THEN/ELSE IF/ELSE/ENDIF
- WHILE/DO/ENDWHILE
- REPEAT/UNTIL
- FOR/TO/STEP/NEXT
- CASE/OF/OTHERWISE/ENDCASE

### Features
- PROCEDURE and FUNCTION with parameters (BYVAL/BYREF)
- INPUT/OUTPUT statements
- Built-in functions: LENGTH, SUBSTRING, UCASE, LCASE, INT, REAL, STRING, ROUND, RANDOM
- Operators: Arithmetic (+, -, *, /, DIV, MOD), Comparison (=, <>, <, >, <=, >=), Logical (AND, OR, NOT), String (&)
- Assignment: Both ← and <- supported
- Comments: // single-line

## Getting Started

### Installation

```bash
cd test
npm install
```

### Development

```bash
npm run dev
```

Opens at http://localhost:3000

### Build

```bash
npm run build
```

Output in `dist/` directory

### Preview Production Build

```bash
npm run preview
```

## Usage

1. **Write Code**: Type your IGCSE/A-LEVELS pseudocode in the left editor panel
2. **Validation**: Errors appear automatically after 500ms of typing pause
3. **Run**: Click "Run" to execute your code
4. **Output**: Watch animated output appear line-by-line in the right panel
5. **Input**: Browser prompts will appear for INPUT statements
6. **Save**: Code auto-saves to LocalStorage every second
7. **Examples**: Click "Examples" dropdown to load sample programs

## Example Code

```
DECLARE counter : INTEGER

FOR counter <- 1 TO 10
    OUTPUT counter
NEXT counter

OUTPUT "Done!"
```

## Error Handling

The editor detects:
- Syntax errors (missing ENDIF, undeclared variables, etc.)
- Runtime errors (division by zero, array bounds, type mismatches)
- Infinite loops (timeout after 10,000 iterations)
- Maximum recursion (limit of 1,000 depth)

## Technologies

- React 18
- TypeScript
- Vite
- CodeMirror 6
- CSS Modules

## License

MIT
