import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Image, View } from "react-native";
import useSpotifyAuth from "../hooks/use-spotify-auth";
import { isLoggedIn } from "../utils/auth-utils";
import { Picker } from "@react-native-picker/picker";
import useAppStore from "../stores/app-store";
import Button from "../components/Button";

const Logo = require("../assets/logo.png");

export default function Home() {
  const router = useRouter();

  const { promptAsync } = useSpotifyAuth();
  const { difficulty, setDifficulty } = useAppStore();

  return (
    <SafeAreaView className="flex-1 items-center justify-center gap-48">
      <Image source={Logo} style={{ width: 300, height: 300 }} />

      {!isLoggedIn() ? (
        <Button title="Login with Spotify" onPress={() => promptAsync()} />
      ) : (
        <View>
          <Picker
            selectedValue={difficulty}
            style={{
              height: 50,
              width: 300,
              color: "white",
              marginBottom: 20,
            }}
            onValueChange={(itemValue) => setDifficulty(itemValue)}
            dropdownIconColor="white"
          >
            <Picker.Item label="No limit" value={0} />
            <Picker.Item label="30 seconds" value={30} />
            <Picker.Item label="15 seconds" value={15} />
            <Picker.Item label="5 seconds" value={5} />
          </Picker>
          <Button title="Start new game" onPress={() => router.push("game")} />
        </View>
      )}
    </SafeAreaView>
  );
}
