import { Text, View } from "react-native";

interface DeviceConnectionProps {
  device: SpotifyApi.UserDevice | null;
}

export default function DeviceConnection({ device }: DeviceConnectionProps) {
  return (
    <View className="absolute bottom-0 right-0 p-4 flex flex-row items-center gap-2">
      <Text className="italic text-gray-400">
        {device ? device.name : "No device"}
      </Text>
      <View
        className={`${device ? "bg-green-300" : "bg-red-300"} w-2 h-2 rounded-full`}
      />
    </View>
  );
}
