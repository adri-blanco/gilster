import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Button, Text } from "react-native";
import useSpotifyAuth from "../hooks/use-spotify-auth";
import { isLoggedIn } from "../utils/auth-utils";

export default function Home() {
  const router = useRouter();

  const { promptAsync } = useSpotifyAuth();

  return (
    <SafeAreaView className="flex-1 items-center justify-center gap-16">
      <Text>Home page</Text>

      {!isLoggedIn() ? (
        <Button title="Login with Spotify" onPress={() => promptAsync()} />
      ) : (
        <Button title="Go to other place" onPress={() => router.push("game")} />
      )}
    </SafeAreaView>
  );
}
