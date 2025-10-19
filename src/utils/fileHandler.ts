/**
 * File download and upload utilities
 */

const MAX_FILE_SIZE = 1024 * 1024; // 1MB

/**
 * Download code as a text file
 */
export function downloadCode(code: string): void {
  const timestamp = new Date().toISOString()
    .replace(/:/g, '-')
    .replace(/\..+/, '')
    .replace('T', '_');
  const filename = `pseudocode_${timestamp}.txt`;

  const blob = new Blob([code], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();

  // Clean up
  URL.revokeObjectURL(url);
}

/**
 * Read a text file and return its contents
 */
export function readFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    // Check file type
    if (!file.name.endsWith('.txt')) {
      reject(new Error('Invalid file type. Only .txt files are supported.'));
      return;
    }

    // Check file size
    if (file.size > MAX_FILE_SIZE) {
      reject(new Error('File too large. Maximum size is 1MB.'));
      return;
    }

    const reader = new FileReader();

    reader.onload = (event) => {
      const content = event.target?.result;
      if (typeof content === 'string') {
        resolve(content);
      } else {
        reject(new Error('Could not read file. Please try again.'));
      }
    };

    reader.onerror = () => {
      reject(new Error('Could not read file. Please try again.'));
    };

    reader.readAsText(file);
  });
}
