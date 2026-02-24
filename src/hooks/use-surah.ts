import { useEffect, useState } from "react";
import type { SurahDetail } from "@/types/quran";

export function useSurah(number: string | undefined) {
  const [data, setData] = useState<{
    surah: SurahDetail | null;
    fetchedFor: string | null;
    error: boolean;
  }>({ surah: null, fetchedFor: null, error: false });

  useEffect(() => {
    if (!number) return;
    let cancelled = false;

    fetch(`https://api.alquran.cloud/v1/surah/${number}`)
      .then((res) => res.json())
      .then((result) => {
        if (!cancelled) {
          setData({ surah: result.data, fetchedFor: number, error: false });
        }
      })
      .catch(() => {
        if (!cancelled) {
          setData({ surah: null, fetchedFor: number, error: true });
        }
      });

    return () => {
      cancelled = true;
    };
  }, [number]);

  const loading = data.fetchedFor !== number;

  return { surah: data.surah, loading, error: data.error };
}
