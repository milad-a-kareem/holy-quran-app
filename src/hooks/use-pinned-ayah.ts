import { useCallback, useSyncExternalStore } from "react";

const STORAGE_KEY = "holy-quran-pinned-ayah";

export interface PinnedAyah {
  surahNumber: number;
  ayahIndex: number;
  ayahNumberInSurah: number;
  surahName: string;
}

// Cache the parsed value so useSyncExternalStore gets a stable reference
let cachedRaw: string | null = null;
let cachedValue: PinnedAyah | null = null;

function getSnapshot(): PinnedAyah | null {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw !== cachedRaw) {
    cachedRaw = raw;
    try {
      cachedValue = raw ? (JSON.parse(raw) as PinnedAyah) : null;
    } catch {
      cachedValue = null;
    }
  }
  return cachedValue;
}

function getServerSnapshot(): PinnedAyah | null {
  return null;
}

const listeners = new Set<() => void>();

function subscribe(callback: () => void) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

function emitChange() {
  for (const listener of listeners) {
    listener();
  }
}

export function usePinnedAyah() {
  const pinnedAyah = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const pinAyah = useCallback((pin: PinnedAyah) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(pin));
    emitChange();
  }, []);

  const unpinAyah = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    emitChange();
  }, []);

  const togglePin = useCallback(
    (pin: PinnedAyah) => {
      const current = getSnapshot();
      if (
        current &&
        current.surahNumber === pin.surahNumber &&
        current.ayahIndex === pin.ayahIndex
      ) {
        unpinAyah();
      } else {
        pinAyah(pin);
      }
    },
    [pinAyah, unpinAyah],
  );

  return { pinnedAyah, pinAyah, unpinAyah, togglePin };
}

export function getPinnedAyah(): PinnedAyah | null {
  return getSnapshot();
}
