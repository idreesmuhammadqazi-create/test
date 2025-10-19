/**
 * Error types for validation
 */

export interface ValidationError {
  line: number;
  message: string;
  type: 'syntax' | 'runtime';
}
