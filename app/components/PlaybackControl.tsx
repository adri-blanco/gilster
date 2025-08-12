import { useRef, useEffect } from "react";
import { TouchableOpacity, Animated, Easing } from "react-native";

const PlayIcon = require("../assets/play.png");
const PauseIcon = require("../assets/pause.png");

interface PlaybackControlProps {
  isPlaying: boolean;
  togglePlay: () => void;
}

function PlaybackControl({ isPlaying, togglePlay }: PlaybackControlProps) {
  const bounceAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isPlaying) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(bounceAnim, {
            toValue: -5,
            duration: 600,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
          Animated.timing(bounceAnim, {
            toValue: 0,
            duration: 600,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
          Animated.timing(bounceAnim, {
            toValue: 5,
            duration: 600,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
          Animated.timing(bounceAnim, {
            toValue: 0,
            duration: 600,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      bounceAnim.stopAnimation();
      bounceAnim.setValue(0);
    }
  }, [isPlaying, bounceAnim]);

  return (
    <TouchableOpacity
      className="flex-row items-center justify-between p-4"
      onPress={togglePlay}
    >
      <Animated.Image
        source={isPlaying ? PauseIcon : PlayIcon}
        style={{
          width: 300,
          height: 300,
          transform: [{ translateY: bounceAnim }],
        }}
      />
    </TouchableOpacity>
  );
}

export default PlaybackControl;
