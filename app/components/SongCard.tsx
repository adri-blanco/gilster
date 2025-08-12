import { Image, View } from "react-native";
import Text from "./Text";
import { Song } from "../db/schema";

function SongCard({ song }: { song: Song }) {
  return (
    <View className="p-4 rounded-lg items-center">
      <Text className="text-9xl">{song.release}</Text>
      <Image
        className="rounded-lg"
        source={{ uri: song.cover }}
        style={{ width: 300, height: 300 }}
      />
      <View className="mt-8 items-center">
        <Text className="text-3xl font-bold">{song.title}</Text>
        <Text className="text-3xl">{song.artist}</Text>
      </View>
    </View>
  );
}

export default SongCard;
