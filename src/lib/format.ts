/** Escape text for safe use inside set:html. */
export function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Editors can wrap words in *asterisks* in headings to emphasise them
 * (rendered as the accent colour / beige underline).
 */
export function emphasize(s: string): string {
  return escapeHtml(s).replace(/\*(.+?)\*/g, '<em class="em">$1</em>');
}

/** Same text without the asterisks — for <title>, aria-labels, etc. */
export function plain(s: string): string {
  return s.replace(/\*(.+?)\*/g, '$1');
}
