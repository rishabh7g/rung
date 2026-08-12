/**
 * Bytes for a human, the way the prototype prints them — "2.4 MB", "7.1 KB" — from real numbers
 * (#107, PRD §17: "storage figures are illustrative; compute them").
 *
 * 1024-based, because these numbers come from `navigator.storage.estimate()` and file sizes and
 * they are compared against what devtools shows. One decimal below 100, whole above — "477 KB"
 * rather than a decimal that pretends the fifth significant digit means something — and the
 * trailing `.0` is dropped, so an exact 12 MB reads "12 MB". Never a percent sign: the Settings
 * sweep asserts the screen says counts, and a byte count is one.
 */
const UNITS = ['KB', 'MB', 'GB', 'TB'] as const;

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;

  let value = bytes;
  let unit: (typeof UNITS)[number] = 'KB';
  for (const next of UNITS) {
    unit = next;
    value /= 1024;
    if (value < 1024) break;
  }

  const printed = value >= 100 ? String(Math.round(value)) : String(Math.round(value * 10) / 10);
  return `${printed} ${unit}`;
}
