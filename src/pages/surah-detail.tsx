import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useSurah } from "@/hooks/use-surah";

export function SurahDetailPage() {
  const { number } = useParams<{ number: string }>();
  const { surah, loading } = useSurah(number);

  const surahNumber = Number(number);

  if (loading) {
    return (
      <div className="container mx-auto space-y-4 px-4 py-8">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-4 w-48" />
        <div className="space-y-3 pt-4">
          {Array.from({ length: 7 }).map((_, i) => (
            <Skeleton key={i} className="h-16 w-full rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  if (!surah) {
    return (
      <div className="container mx-auto flex flex-col items-center gap-4 px-4 py-20 text-center">
        <h2 className="text-2xl font-bold">Surah not found</h2>
        <Button asChild>
          <Link to="/surah">Back to Surahs</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Surah header */}
      <div className="mb-8 flex flex-col items-center gap-2 text-center">
        <h1 className="font-arabic text-4xl text-primary">{surah.name}</h1>
        <h2 className="text-2xl font-bold tracking-tight">
          {surah.englishName}
        </h2>
        <p className="text-muted-foreground">
          {surah.englishNameTranslation} &middot; {surah.numberOfAyahs} Ayahs
          &middot; {surah.revelationType}
        </p>
        <div className="flex gap-2 pt-2">
          {surahNumber > 1 && (
            <Button variant="outline" size="sm" asChild>
              <Link to={`/surah/${surahNumber - 1}`}>Previous Surah</Link>
            </Button>
          )}
          {surahNumber < 114 && (
            <Button variant="outline" size="sm" asChild>
              <Link to={`/surah/${surahNumber + 1}`}>Next Surah</Link>
            </Button>
          )}
        </div>
      </div>

      <Separator className="mb-8" />

      {/* Bismillah for all surahs except At-Tawbah (9) */}
      {surah.number !== 9 && surah.number !== 1 && (
        <p className="mb-8 text-center font-arabic text-2xl leading-loose text-primary/80">
          بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
        </p>
      )}

      {/* Ayahs */}
      <ScrollArea className="h-auto">
        <div className="space-y-4">
          {surah.ayahs.map((ayah) => (
            <Card key={ayah.number} className="p-4 md:p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                  {ayah.numberInSurah}
                </div>
                <p
                  className="flex-1 text-right font-arabic text-2xl leading-[2.5] md:text-3xl"
                  dir="rtl"
                  lang="ar"
                >
                  {ayah.text}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </ScrollArea>

      {/* Bottom navigation */}
      <div className="mt-8 flex justify-between">
        {surahNumber > 1 ? (
          <Button variant="outline" asChild>
            <Link to={`/surah/${surahNumber - 1}`}>Previous Surah</Link>
          </Button>
        ) : (
          <div />
        )}
        {surahNumber < 114 && (
          <Button variant="outline" asChild>
            <Link to={`/surah/${surahNumber + 1}`}>Next Surah</Link>
          </Button>
        )}
      </div>
    </div>
  );
}
