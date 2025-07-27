import { useState } from "react";
import { Button, Text, View } from "react-native";
import { pause, play } from "../services/spotify-api";

export default function Game() {
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    if (isPlaying) {
      play("spotify:track:68BTFws92cRztMS1oQ7Ewj").catch((error) => {
        console.error("Error playing track:", error);
      });
    } else {
      pause();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <View>
      <Text>Game page</Text>
      <Button title={isPlaying ? "Playing" : "Paused"} onPress={togglePlay} />
    </View>
  );
}
