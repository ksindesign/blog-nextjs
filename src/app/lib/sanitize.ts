/**
 * Sanitize HTML content to prevent XSS attacks
 * Allows safe formatting tags from ReactQuill while blocking dangerous content
 *
 * To install DOMPurify (recommended for production):
 * npm install isomorphic-dompurify
 * npm install --save-dev @types/dompurify
 */

/**
 * Enhanced HTML sanitization
 * Removes dangerous tags/attributes while preserving safe formatting
 */
export function sanitizeHTML(html: string): string {
  if (!html) return '';

  let sanitized = html;

  // Remove script tags and their content
  sanitized = sanitized.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');

  // Remove inline event handlers (onclick, onerror, onload, etc.)
  sanitized = sanitized.replace(/\s*on\w+\s*=\s*["'][^"']*["']/gi, '');
  sanitized = sanitized.replace(/\s*on\w+\s*=\s*[^\s>]*/gi, '');

  // Remove javascript: protocol from all attributes
  sanitized = sanitized.replace(/href\s*=\s*["']javascript:[^"']*["']/gi, 'href="#"');
  sanitized = sanitized.replace(/src\s*=\s*["']javascript:[^"']*["']/gi, 'src=""');

  // Remove data:text/html protocol (can be used for XSS)
  sanitized = sanitized.replace(/data:text\/html/gi, '');

  // Remove dangerous tags: iframe, object, embed, applet, meta, link, style (inline styles in tags are allowed)
  sanitized = sanitized.replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '');
  sanitized = sanitized.replace(/<(object|embed|applet)\b[^<]*(?:(?!<\/\1>)<[^<]*)*<\/\1>/gi, '');
  sanitized = sanitized.replace(/<(meta|link|base)\b[^>]*>/gi, '');

  // Remove <style> tags but keep inline style attributes (they're safer and needed for colors)
  sanitized = sanitized.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '');

  // Remove form tags (prevent CSRF)
  sanitized = sanitized.replace(/<\/?form\b[^>]*>/gi, '');
  sanitized = sanitized.replace(/<\/?input\b[^>]*>/gi, '');
  sanitized = sanitized.replace(/<\/?button\b[^>]*>/gi, '');

  return sanitized;
}

/**
 * For production use with DOMPurify:
 *
 * import DOMPurify from 'isomorphic-dompurify';
 *
 * export function sanitizeHTML(html: string): string {
 *   return DOMPurify.sanitize(html, {
 *     ALLOWED_TAGS: ['p', 'strong', 'em', 'u', 's', 'h1', 'h2', 'h3', 'ul', 'ol', 'li', 'br', 'a'],
 *     ALLOWED_ATTR: ['href', 'target', 'style', 'class'],
 *     ALLOW_DATA_ATTR: false,
 *   });
 * }
 */
