import { useEffect, useState } from "react";
import { Button, Text, View } from "react-native";
import { pause, play, getDevice } from "../services/spotify-services";
import DeviceConnection from "../components/DeviceConnection";

export default function Game() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showSong, setShowSong] = useState(false);
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

  const togglePlay = () => {
    if (!isPlaying && device) {
      play(
        "spotify:track:68BTFws92cRztMS1oQ7Ewj",
        device.id || undefined
      ).catch((error) => {
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

      {showSong && (
        <View>
          <Text>Now Playing: "Track Name"</Text>
          <Text>Artist: "Artist Name"</Text>
        </View>
      )}

      <DeviceConnection device={device} />
    </View>
  );
}
