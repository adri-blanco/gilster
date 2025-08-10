import { Song } from "../db/schema";
import { getSongs } from "../services/db-services";
import useAppStore from "../stores/app-store";
import getRandomInt from "../utils/random";

export async function getNextSong(): Promise<Song> {
  const { usedIds, years, addUsedIds, setYears } = useAppStore.getState();
  const keys = Object.keys(years);
  const selectedYear = getRandomInt(0, keys.length - 1);

  const year = parseInt(keys[selectedYear]);
  const songsSelectable = await getSongs(parseInt(keys[selectedYear]), usedIds);
  const selectedIndex = getRandomInt(0, songsSelectable.length - 1);

  const newYears = { ...years };
  if (years[year] > 1) {
    newYears[year] -= 1;
  } else {
    delete newYears[year];
  }
  setYears(newYears);
  addUsedIds(songsSelectable[selectedIndex].spotify_uri);

  return songsSelectable[selectedIndex];
}
