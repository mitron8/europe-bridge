/**
 * Utility functions for formatting dates and timestamps in EuroBridge live chat & support.
 */

/**
 * Returns a human-friendly timestamp including date and time.
 * e.g., "Today, 02:45 PM", "Yesterday, 10:15 AM", "4 Nov, 02:45 PM", or "4 Nov 2025, 02:45 PM"
 */
export function formatChatTimestamp(dateStr: string | Date | undefined | null): string {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return '';

  const now = new Date();
  const time = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  if (date.toDateString() === now.toDateString()) {
    return `Today, ${time}`;
  }

  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  if (date.toDateString() === yesterday.toDateString()) {
    return `Yesterday, ${time}`;
  }

  const isCurrentYear = date.getFullYear() === now.getFullYear();
  const datePart = date.toLocaleDateString([], {
    day: 'numeric',
    month: 'short',
    year: isCurrentYear ? undefined : 'numeric',
  });

  return `${datePart}, ${time}`;
}

/**
 * Returns a full verbose string for hover tooltips.
 * e.g., "Saturday, 7 Nov 2026, 02:45:10 PM"
 */
export function formatFullTimestamp(dateStr: string | Date | undefined | null): string {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return '';
  return date.toLocaleString([], {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
}

/**
 * Returns a date divider label for grouping messages by day.
 * e.g., "Today", "Yesterday", "Wed, 4 Nov, 2026"
 */
export function formatDateDivider(dateStr: string | Date | undefined | null): string {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return '';

  const now = new Date();
  if (date.toDateString() === now.toDateString()) return 'Today';

  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  if (date.toDateString() === yesterday.toDateString()) return 'Yesterday';

  const isCurrentYear = date.getFullYear() === now.getFullYear();
  return date.toLocaleDateString([], {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: isCurrentYear ? undefined : 'numeric',
  });
}

/**
 * Returns true if two date strings fall on different calendar days.
 */
export function isDifferentDay(
  prevDateStr: string | Date | undefined | null,
  currDateStr: string | Date | undefined | null,
): boolean {
  if (!prevDateStr || !currDateStr) return true;
  const d1 = new Date(prevDateStr);
  const d2 = new Date(currDateStr);
  if (isNaN(d1.getTime()) || isNaN(d2.getTime())) return true;
  return d1.toDateString() !== d2.toDateString();
}

