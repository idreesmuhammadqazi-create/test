/**
 * Validator for IGCSE/A-LEVELS pseudocode
 * Validates syntax without execution
 */

import { tokenize } from '../interpreter/lexer';
import { parse } from '../interpreter/parser';
import { ValidationError } from './errorTypes';

export function validate(code: string): ValidationError[] {
  const errors: ValidationError[] = [];

  if (!code.trim()) {
    return errors;
  }

  try {
    // Tokenize
    const tokens = tokenize(code);

    // Parse
    parse(tokens);

    // If we get here, code is syntactically valid
    return errors;
  } catch (error) {
    // Extract line number from error message if present
    const errorMessage = (error as Error).message;
    let line = 1;

    const lineMatch = errorMessage.match(/line (\d+)/);
    if (lineMatch) {
      line = parseInt(lineMatch[1]);
    }

    errors.push({
      line,
      message: errorMessage,
      type: 'syntax'
    });

    return errors;
  }
}
