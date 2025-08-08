import { useEffect, useState } from "react";
import { Button, Text, View, Image } from "react-native";
import { pause, play, getDevice } from "../services/spotify-services";
import DeviceConnection from "../components/DeviceConnection";
import { getSong } from "../services/db-services";
import { Song } from "../db/schema";

export default function Game() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showSong, setShowSong] = useState(false);
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [device, setDevice] = useState<SpotifyApi.UserDevice | null>(null);

  useEffect(() => {
    getDevice()
      .then((device) => {
        setDevice(device);
      })
      .catch((error) => {
        console.error("Error fetching device:", error);
      });
  }, []);

  const togglePlay = async () => {
    if (!isPlaying && device) {
      const song = await getSong();
      if (!song) {
        console.error("No song found to play");
        return;
      }
      setCurrentSong(song);
      play(song.spotify_uri, device.id || undefined).catch((error) => {
        console.error("Error playing track:", error);
      });
    } else {
      pause();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <View className="flex-1 items-center justify-center gap-16">
      <Text>Game page</Text>
      <Button title={isPlaying ? "Pause" : "Play"} onPress={togglePlay} />
      <Button
        title="See answer"
        onPress={() => {
          setShowSong(!showSong);
        }}
      />

      {showSong && currentSong && (
        <View>
          <Image
            className="w-32 h-32 rounded-lg"
            source={{ uri: currentSong.cover }}
            alt={`Cover art for ${currentSong.title}`}
          />
          <Text>Now Playing: {currentSong.title}</Text>
          <Text>Artist: {currentSong.artist}</Text>
          <Text>Year: {currentSong.release}</Text>
        </View>
      )}

      <DeviceConnection device={device} />
    </View>
  );
}
