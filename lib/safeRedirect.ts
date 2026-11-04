/**
 * Safe Relative URL Redirect Validation
 * Protects against Open Redirects (CWE-601), Protocol-Relative URLs, and Backslash Bypasses.
 */

export function isSafeRedirectUrl(url: unknown): url is string {
  if (typeof url !== 'string') return false;

  const trimmed = url.trim();
  if (!trimmed) return false;

  // Must begin with a single '/' and cannot begin with '//'
  if (!trimmed.startsWith('/') || trimmed.startsWith('//')) {
    return false;
  }

  // Reject any backslashes which browsers treat as path separators
  if (trimmed.includes('\\')) {
    return false;
  }

  // Check decoded string for encoded protocol-relative paths or backslashes
  try {
    const decoded = decodeURIComponent(trimmed);
    if (decoded.startsWith('//') || decoded.includes('\\')) {
      return false;
    }
    // Reject ASCII control chars (CR, LF, null byte)
    if (/[\u0000-\u001F\u007F]/.test(decoded)) {
      return false;
    }
  } catch {
    // Malformed URI encoding
    return false;
  }

  // Strict URL parser verification using a dummy origin
  try {
    const dummyOrigin = 'http://localhost';
    const parsed = new URL(trimmed, dummyOrigin);

    // Origin must remain localhost and protocol must match
    if (parsed.origin !== dummyOrigin) {
      return false;
    }

    // Path must start with single '/'
    if (!parsed.pathname.startsWith('/') || parsed.pathname.startsWith('//')) {
      return false;
    }

    return true;
  } catch {
    return false;
  }
}

/**
 * Returns the validated relative redirect URL, or the fallback URL if unsafe or missing.
 */
export function getSafeRedirectUrl(target: unknown, fallback: string): string {
  if (isSafeRedirectUrl(target)) {
    return target.trim();
  }
  return fallback;
}

