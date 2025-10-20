# 🎓 IGCSE/A-LEVELS Pseudocode Editor

<div align="center">

**A powerful web-based pseudocode editor for Cambridge IGCSE Computer Science (0478/0984) and A-Level (9618)**

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen?style=for-the-badge)](https://pseudocode-runner.netlify.app)
[![Netlify Status](https://api.netlify.com/api/v1/badges/your-badge-id/deploy-status)](https://pseudocode-runner.netlify.app)

**[🚀 Try it Live](https://pseudocode-runner.netlify.app)** | [📚 Examples](#examples) | [💻 Local Setup](#local-development)

---

*Built with* [**Compyle**](https://compyle.com) *- AI-powered development platform*

</div>

## ✨ Features

### 🎯 Core Functionality
- ✅ **Full IGCSE/A-LEVELS Syntax Support** - 100% compliant with Cambridge syllabus
- ✅ **Real-time Validation** - Syntax errors detected as you type (500ms debounced)
- ✅ **Animated Execution** - Watch output appear line-by-line (300ms between lines)
- ✅ **Line Numbers** - Easy navigation and error reference
- ✅ **Syntax Highlighting** - Keywords, operators, and data types color-coded
- ✅ **Error Detection** - Detailed syntax and runtime error messages with line numbers
- ✅ **Auto-save** - Code persists in browser LocalStorage
- ✅ **File Operations** - Download/upload code as .txt files
- ✅ **15 Built-in Examples** - Learn from comprehensive sample programs
- ✅ **Responsive Design** - Works on desktop, tablet, and mobile

### 🎨 User Experience
- 🖱️ **Split-view Editor** - Code on left, output on right
- ⚡ **Instant Feedback** - See errors before you run
- 🎬 **Step-by-step Output** - Animated execution helps understand flow
- 💾 **Persistent Code** - Never lose your work
- 📱 **Mobile Friendly** - Code on the go

## 🎓 Supported Syntax

### 📊 Data Types
```
INTEGER     - Whole numbers
REAL        - Decimal numbers
STRING      - Text values
CHAR        - Single character
BOOLEAN     - TRUE or FALSE
ARRAY       - Single and multi-dimensional arrays
```

### 🔀 Control Structures

#### Conditionals
```pseudocode
IF condition THEN
    statements
ELSE IF condition THEN
    statements
ELSE
    statements
ENDIF
```

```pseudocode
CASE OF variable
    value1 : statement
    value2 : statement
    OTHERWISE : statement
ENDCASE
```

#### Loops
```pseudocode
FOR counter <-- start TO end STEP increment
    statements
NEXT counter

WHILE condition DO
    statements
ENDWHILE

REPEAT
    statements
UNTIL condition
```

### 🔧 Functions & Procedures

#### Functions
```pseudocode
FUNCTION Name(param : TYPE) RETURNS TYPE
    DECLARE local : TYPE
    // function body
    RETURN value
ENDFUNCTION
```

#### Procedures
```pseudocode
PROCEDURE Name(BYVAL param1 : TYPE, BYREF param2 : TYPE)
    DECLARE local : TYPE
    // procedure body
ENDPROCEDURE

CALL Name(arg1, arg2)
```

### 📥 Input/Output
```pseudocode
INPUT variable
OUTPUT expression, "text", variable
```

### 🧮 Operators

**Arithmetic:** `+` `-` `*` `/` `DIV` `MOD`
**Comparison:** `=` `<>` `<` `>` `<=` `>=`
**Logical:** `AND` `OR` `NOT`
**String:** `&` (concatenation)
**Assignment:** `<--` or `←`

### 📚 Built-in Functions

**String Functions:**
- `LENGTH(string)` - Returns string length
- `SUBSTRING(string, start, length)` - Extracts substring (1-indexed)
- `UCASE(string)` - Converts to uppercase
- `LCASE(string)` - Converts to lowercase

**Type Conversion:**
- `INT(x)` - Converts to integer (truncates)
- `REAL(x)` - Converts to real number
- `STRING(x)` - Converts to string

**Math Functions:**
- `ROUND(x, decimals)` - Rounds to decimal places
- `RANDOM()` - Returns random 0.0 to 1.0

### 💬 Comments
```pseudocode
// Single-line comments
```

## 📚 Examples

The editor includes **15 comprehensive examples** covering:

1. **Basic Input/Output** - Simple I/O operations
2. **IF Statement** - Grade calculator with multiple conditions
3. **FOR Loop** - Counter demonstration
4. **WHILE Loop** - Sum calculation
5. **Arrays** - 1D array manipulation
6. **Functions** - Factorial calculation
7. **Procedures** - Menu display system
8. **String Manipulation** - String function showcase
9. **2D Arrays** - Student grades matrix
10. **Bubble Sort** - Complete sorting algorithm
11. **Linear Search** - Search with boolean flags
12. **CASE Statement** - Calculator implementation
13. **REPEAT UNTIL** - Number guessing game
14. **BYREF Parameters** - Swap procedure demonstration
15. **Nested Loops** - Pattern generation

## 🚀 Quick Start

### Online (Recommended)

Simply visit **[https://pseudocode-runner.netlify.app](https://pseudocode-runner.netlify.app)** and start coding immediately!

### Local Development

```bash
# Clone the repository
git clone https://github.com/idreesmuhammadqazi-create/test.git
cd test

# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:3000
```

### Build for Production

```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

## 📖 Usage Guide

### Writing Code

1. **Type your pseudocode** in the left editor panel
2. **Syntax highlighting** helps identify keywords and structure
3. **Line numbers** help reference code locations
4. **Auto-save** keeps your work safe (saves every second)

### Running Code

1. **Click "Run"** button to execute
2. **Watch output** appear line-by-line with animation
3. **INPUT prompts** appear as browser dialogs
4. **Errors** show in the error panel with line numbers

### Managing Code

- **Clear** - Remove all code (with confirmation)
- **Download** - Save code as timestamped .txt file
- **Upload** - Load code from .txt file
- **Examples** - Load any of 15 sample programs

### Learning Features

- **Real-time validation** - See errors before running
- **Detailed error messages** - Understand what went wrong
- **Line number references** - Jump directly to problems
- **Example programs** - Learn by studying working code

## 🎯 IGCSE/A-LEVELS Compliance

This editor strictly follows Cambridge IGCSE/A-LEVELS pseudocode standards:

✅ **Syntax Rules**
- Keywords in UPPERCASE
- Case-sensitive identifiers
- No semicolons required
- One statement per line

✅ **Array Behavior**
- Static array bounds (literal numbers only)
- Custom index ranges (e.g., ARRAY[1:10] or ARRAY[0:9])
- Multi-dimensional support
- Bounds checking at runtime

✅ **Variable Scoping**
- Global and local scope support
- FOR loop variables auto-declared
- Parameter passing (BYVAL/BYREF)

✅ **Error Handling**
- Division by zero detection
- Uninitialized variable checks
- Type mismatch detection
- Array bounds validation
- Infinite loop protection (10,000 iteration limit)
- Recursion depth limit (1,000 calls)

## 🛠️ Technologies

- **React 18** - Modern UI framework
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **CodeMirror 6** - Professional code editor
- **CSS Modules** - Scoped styling
- **Netlify** - Production hosting

## 🎨 Architecture

```
src/
├── components/          # React UI components
│   ├── Editor/         # CodeMirror editor with syntax highlighting
│   ├── OutputPanel/    # Animated output display
│   ├── ErrorDisplay/   # Error message panel
│   └── Toolbar/        # Control buttons
├── interpreter/        # Core execution engine
│   ├── lexer.ts       # Tokenization
│   ├── parser.ts      # AST generation
│   ├── interpreter.ts # Code execution
│   └── types.ts       # Type definitions
├── validator/          # Real-time syntax validation
├── utils/             # Helper functions
└── constants/         # Example programs
```

## 📝 Example Code

```pseudocode
// Bubble Sort Algorithm
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

// Display sorted array
OUTPUT "Sorted array:"
FOR index <-- 1 TO 5
    OUTPUT nums[index]
NEXT index
```

## 🐛 Error Detection

The editor detects and reports:

### Syntax Errors
- Missing ENDIF, ENDWHILE, etc.
- Undeclared variables
- Invalid identifier names
- Mismatched FOR/NEXT variables
- Invalid array declarations

### Runtime Errors
- Division by zero
- Array index out of bounds
- Type mismatches
- Uninitialized variables
- Invalid function parameters

## 🌟 Use Cases

- 📚 **Learning** - Practice IGCSE/A-LEVELS pseudocode
- 📝 **Exam Prep** - Test algorithms before exams
- 👨‍🏫 **Teaching** - Demonstrate concepts in class
- 🔬 **Algorithm Testing** - Verify logic before implementation
- 💡 **Quick Prototyping** - Test ideas rapidly

## 🎯 Roadmap

Future enhancements:
- [ ] Dark mode
- [ ] Syntax highlighting customization
- [ ] Share code via URL
- [ ] Step-by-step debugger
- [ ] More example programs
- [ ] Export to PDF
- [ ] Collaborative editing

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests
- Improve documentation

## 📄 License

MIT License - feel free to use in your projects!

## 🙏 Acknowledgments

- **Cambridge International** - For the IGCSE/A-LEVELS pseudocode specification
- **CodeMirror** - For the excellent code editor
- **Netlify** - For reliable hosting
- **Compyle** - For AI-powered development tools

---

<div align="center">

**Made with ❤️ using [Compyle](https://compyle.com)**

*Compyle - Build software faster with AI-powered development*

[![Visit Compyle](https://img.shields.io/badge/Powered%20by-Compyle-blue?style=for-the-badge)](https://compyle.com)

[🌐 Live Demo](https://pseudocode-runner.netlify.app) • [⭐ Star on GitHub](https://github.com/idreesmuhammadqazi-create/test) • [🐛 Report Bug](https://github.com/idreesmuhammadqazi-create/test/issues)

</div>
