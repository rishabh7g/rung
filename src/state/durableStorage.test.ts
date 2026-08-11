/**
 * Storage durability (#90; design/pwa-checklist.md §3.5).
 *
 * The thing under test is an *order* and a *count*: the write lands first, the browser is asked
 * once, and nothing the browser answers — including throwing — can cost the learner a save. All
 * three are invisible in the app; a granted request looks exactly like a denied one until the day
 * a ladder is evicted.
 */
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  durableLocalStorage,
  requestPersistence,
  resetPersistenceRequest,
} from './durableStorage.ts';

/** Swaps in a StorageManager whose `persist()` this test owns; restores the real one after. */
function stubStorageManager(persist: unknown): void {
  Object.defineProperty(navigator, 'storage', {
    value: persist === undefined ? undefined : { persist },
    configurable: true,
  });
}

const KEY = 'rung:state';

beforeEach(() => {
  resetPersistenceRequest();
  localStorage.clear();
  vi.spyOn(console, 'info').mockImplementation(() => {});
});

afterEach(() => {
  vi.restoreAllMocks();
  stubStorageManager(undefined);
});

describe('the write', () => {
  it('round-trips through localStorage, unchanged', () => {
    stubStorageManager(vi.fn().mockResolvedValue(true));

    durableLocalStorage.setItem(KEY, '{"stateVersion":6}');

    expect(durableLocalStorage.getItem(KEY)).toBe('{"stateVersion":6}');
    expect(localStorage.getItem(KEY)).toBe('{"stateVersion":6}');

    durableLocalStorage.removeItem(KEY);
    expect(localStorage.getItem(KEY)).toBeNull();
  });

  it('saves even when the browser has no StorageManager at all', () => {
    stubStorageManager(undefined);

    expect(() => durableLocalStorage.setItem(KEY, '{}')).not.toThrow();
    expect(localStorage.getItem(KEY)).toBe('{}');
  });

  it('saves even when persist() throws on the spot', () => {
    stubStorageManager(() => {
      throw new Error('nope');
    });

    // The request is a log line. A save that a log line could cancel is the bug this prevents.
    expect(() => durableLocalStorage.setItem(KEY, '{}')).not.toThrow();
    expect(localStorage.getItem(KEY)).toBe('{}');
  });
});

describe('the request', () => {
  it('happens after the first save — never before there is anything to keep', () => {
    const order: string[] = [];
    const persist = vi.fn(() => {
      order.push(`persist:${localStorage.getItem(KEY) ?? 'nothing stored'}`);
      return Promise.resolve(true);
    });
    stubStorageManager(persist);

    durableLocalStorage.setItem(KEY, '{"stateVersion":6}');

    expect(order).toEqual(['persist:{"stateVersion":6}']);
  });

  it('happens once, however many rungs the learner climbs', () => {
    const persist = vi.fn().mockResolvedValue(true);
    stubStorageManager(persist);

    for (let write = 0; write < 5; write += 1) durableLocalStorage.setItem(KEY, `{"n":${write}}`);
    requestPersistence();

    expect(persist).toHaveBeenCalledTimes(1);
  });

  it('logs what the browser answered — the explanation on the day a ladder vanishes', async () => {
    const info = vi.spyOn(console, 'info').mockImplementation(() => {});
    stubStorageManager(vi.fn().mockResolvedValue(false));

    durableLocalStorage.setItem(KEY, '{}');
    await vi.waitFor(() => expect(info).toHaveBeenCalled());

    expect(info.mock.calls[0]?.[0]).toContain('denied');
  });

  it('says so when the browser cannot be asked, rather than staying silent', () => {
    const info = vi.spyOn(console, 'info').mockImplementation(() => {});
    stubStorageManager(undefined);

    durableLocalStorage.setItem(KEY, '{}');

    expect(info.mock.calls[0]?.[0]).toContain('unavailable');
  });
});
