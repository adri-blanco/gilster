import { Animated, Image, View } from "react-native";
import Text from "./Text";
import { Song } from "../db/schema";
import { useEffect, useRef } from "react";

function SongCard({ song }: { song: Song }) {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [opacity]);

  return (
    <Animated.View className="p-4 rounded-lg items-center" style={{ opacity }}>
      <Text className="text-9xl">{song.release}</Text>
      <Image
        className="rounded-lg"
        source={{ uri: song.cover }}
        style={{ width: 300, height: 300 }}
      />
      <View className="mt-8 items-center gap-4">
        <Text className="text-3xl font-bold">{song.title}</Text>
        <Text className="text-3xl">{song.artist}</Text>
      </View>
    </Animated.View>
  );
}

export default SongCard;
