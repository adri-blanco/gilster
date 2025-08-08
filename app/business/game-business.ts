import { Song } from "../db/schema";
import { getSongs } from "../services/db-services";
import useAppStore from "../stores/app-store";
import getRandomInt from "../utils/random";

export async function getNextSong(): Promise<Song> {
  const { years } = useAppStore.getState();
  const keys = Object.keys(years);
  const selectedYear = getRandomInt(0, keys.length - 1);

  const songsSelectable = await getSongs(parseInt(keys[selectedYear]));
  const selectedIndex = getRandomInt(0, songsSelectable.length - 1);

  return songsSelectable[selectedIndex];
}
