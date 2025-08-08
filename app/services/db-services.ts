import { db } from "../db";
import { songs, Song } from "../db/schema";

export async function getSong(): Promise<Song | null> {
  const res = await db.select().from(songs).limit(1);

  return res[0];
}
