import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Strip HTML tags from a string
 */
export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '');
}

/**
 * Truncate text to a specified number of words
 * @param text - The text to truncate
 * @param wordLimit - Maximum number of words to show
 * @returns Truncated text with [...] if truncated
 */
export function truncateWords(text: string, wordLimit: number = 20): string {
  if (!text) return '';

  // Strip HTML tags first
  const plainText = stripHtml(text);

  // Split into words
  const words = plainText.trim().split(/\s+/);

  // If text is shorter than limit, return as is
  if (words.length <= wordLimit) {
    return plainText;
  }

  // Truncate and add [...]
  return words.slice(0, wordLimit).join(' ') + ' ...';
}
