import { useEffect, useState } from "react";
import { View, Image } from "react-native";
import { pause, play, getDevice } from "../services/spotify-services";
import DeviceConnection from "../components/DeviceConnection";
import { getYears } from "../services/db-services";
import { Song } from "../db/schema";
import useAppStore from "../stores/app-store";
import { getNextSong } from "../business/game-business";
import Button from "../components/Button";
import PlaybackControl from "../components/PlaybackControl";
import SongCard from "../components/SongCard";

export default function Game() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showSong, setShowSong] = useState(false);
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [device, setDevice] = useState<SpotifyApi.UserDevice | null>(null);
  const appStore = useAppStore();

  useEffect(() => {
    getDevice()
      .then((device) => {
        setDevice(device);
      })
      .catch((error) => {
        console.error("Error fetching device:", error);
      });

    getYears().then((years) => {
      appStore.setYears(years);

      getNextSong().then((initial) => setCurrentSong(initial));
    });
  }, []);

  const togglePlay = async () => {
    if (!isPlaying && device && currentSong) {
      play(currentSong.spotify_uri, device.id || undefined)
        .catch((error) => {
          console.error("Error playing track:", error);
        })
        .then(() => {
          if (appStore.difficulty > 0) {
            setTimeout(() => {
              pause();
              setIsPlaying(false);
            }, appStore.difficulty * 1000);
          }
        });
    } else {
      pause();
    }
    setIsPlaying(!isPlaying);
  };

  const onNextSong = async () => {
    try {
      if (isPlaying) {
        await pause();
        setIsPlaying(false);
      }
      setShowSong(false);
      const nextSong = await getNextSong();
      setCurrentSong(nextSong);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <View className="flex-1 px-8">
      <View className="items-space-between flex-1 mb-12">
        <View className="flex-1 items-center justify-center gap-16">
          {showSong && currentSong ? (
            <SongCard song={currentSong} />
          ) : (
            <PlaybackControl isPlaying={isPlaying} togglePlay={togglePlay} />
          )}
        </View>
        {!showSong ? (
          <Button
            className="items-end"
            title="See answer"
            onPress={() => {
              setShowSong(!showSong);
            }}
          />
        ) : (
          <Button title="Next song" onPress={onNextSong} />
        )}
      </View>
      <DeviceConnection device={device} setDevice={setDevice} />
    </View>
  );
}
