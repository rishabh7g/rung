/**
 * formatBytes (#107) — the storage section's one number formatter. The cases are the section's
 * real inputs: file sums in KB, estimates in MB/GB, and a first-run progress document in bytes.
 */
import { describe, expect, it } from 'vitest';
import { formatBytes } from './formatBytes.ts';

describe('formatBytes', () => {
  it('prints bytes below 1 KiB as bytes', () => {
    expect(formatBytes(0)).toBe('0 B');
    expect(formatBytes(1023)).toBe('1023 B');
  });

  it('prints one decimal below 100, the prototype’s register', () => {
    expect(formatBytes(2.4 * 1024 * 1024)).toBe('2.4 MB');
    expect(formatBytes(7271)).toBe('7.1 KB');
  });

  it('drops the noise: whole numbers at or above 100, no trailing .0', () => {
    expect(formatBytes(477 * 1024)).toBe('477 KB');
    expect(formatBytes(12 * 1024 * 1024)).toBe('12 MB');
    expect(formatBytes(1024 ** 3)).toBe('1 GB');
  });

  it('never prints a percent sign or a unitless number', () => {
    for (const bytes of [0, 1, 1024, 5 * 1024 ** 2, 3 * 1024 ** 4]) {
      expect(formatBytes(bytes)).toMatch(/^\d+(\.\d)? (B|KB|MB|GB|TB)$/);
    }
  });
});
