import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { Surah } from "@/types/quran";

export function SurahListPage() {
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("https://api.alquran.cloud/v1/surah")
      .then((res) => res.json())
      .then((data) => {
        setSurahs(data.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filtered = surahs.filter(
    (s) =>
      s.englishName.toLowerCase().includes(search.toLowerCase()) ||
      s.name.includes(search) ||
      s.number.toString() === search,
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex flex-col gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Surahs</h1>
          <p className="text-muted-foreground">
            All 114 chapters of the Holy Quran
          </p>
        </div>
        <Input
          placeholder="Search by name or number..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />
      </div>

      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 12 }).map((_, i) => (
            <Skeleton key={i} className="h-24 rounded-lg" />
          ))}
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((surah) => (
            <Link key={surah.number} to={`/surah/${surah.number}`}>
              <Card className="transition-all hover:shadow-md hover:border-primary/30">
                <CardHeader className="flex-row items-center gap-4 space-y-0 p-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-sm font-semibold text-primary">
                    {surah.number}
                  </div>
                  <div className="flex-1 space-y-0.5">
                    <CardTitle className="text-base">
                      {surah.englishName}
                    </CardTitle>
                    <CardDescription className="text-xs">
                      {surah.englishNameTranslation} &middot;{" "}
                      {surah.numberOfAyahs} Ayahs &middot; {surah.revelationType}
                    </CardDescription>
                  </div>
                  <span className="font-arabic text-xl text-primary">
                    {surah.name}
                  </span>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
