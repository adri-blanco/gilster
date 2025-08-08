import { Text, TouchableOpacity, View } from "react-native";
import { getDevice } from "../services/spotify-services";

interface DeviceConnectionProps {
  device: SpotifyApi.UserDevice | null;
  setDevice: (device: SpotifyApi.UserDevice | null) => void;
}

export default function DeviceConnection({
  device,
  setDevice,
}: DeviceConnectionProps) {
  const onPress = () => {
    getDevice()
      .then((device) => {
        setDevice(device);
      })
      .catch((error) => {
        console.error("Error fetching device:", error);
      });
  };

  return (
    <TouchableOpacity
      className="absolute bottom-0 right-0 p-4 flex flex-row items-center gap-2"
      onPress={onPress}
    >
      <Text className="italic text-gray-400">
        {device ? device.name : "No device"}
      </Text>
      <View
        className={`${device ? "bg-green-300" : "bg-red-300"} w-2 h-2 rounded-full`}
      />
    </TouchableOpacity>
  );
}
