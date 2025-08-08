import { count, eq, max, min } from "drizzle-orm";
import { db } from "../db";
import { songs, Song } from "../db/schema";
import { Years } from "../stores/game-slice";

export async function getSong(): Promise<Song | null> {
  const res = await db.select().from(songs).limit(1);

  return res[0];
}

export async function getYears(): Promise<Years> {
  const res = await db
    .select({ count: count(), year: songs.release })
    .from(songs)
    .groupBy(songs.release)
    .orderBy(songs.release);

  const output: Years = {};
  res.forEach((item) => {
    output[item.year] = item.count;
  });

  return output;
}

export async function getSongs(year: number): Promise<Song[]> {
  const res = await db
    .select()
    .from(songs)
    .where(eq(songs.release, year))
    .orderBy(songs.title);

  return res;
}
