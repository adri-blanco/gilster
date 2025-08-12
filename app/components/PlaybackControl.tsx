import { Image, TouchableOpacity } from "react-native";

const PlayIcon = require("../assets/play.png");
const PauseIcon = require("../assets/pause.png");

interface PlaybackControlProps {
  isPlaying: boolean;
  togglePlay: () => void;
}

function PlaybackControl({ isPlaying, togglePlay }: PlaybackControlProps) {
  return (
    <TouchableOpacity
      className="flex-row items-center justify-between p-4"
      onPress={togglePlay}
    >
      <Image
        source={isPlaying ? PauseIcon : PlayIcon}
        style={{ width: 300, height: 300 }}
      />
    </TouchableOpacity>
  );
}

export default PlaybackControl;
