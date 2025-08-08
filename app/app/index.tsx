import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Button, Text } from "react-native";
import useSpotifyAuth from "../hooks/use-spotify-auth";
import { isLoggedIn } from "../utils/auth-utils";
import { useState } from "react";
import { db } from "../db";
import { songs } from "../db/schema";
import { count } from "drizzle-orm";

export default function Home() {
  const router = useRouter();
  const [songsCount, setSongsCount] = useState(0);

  const { promptAsync } = useSpotifyAuth();

  db.select({ count: count() })
    .from(songs)
    .then((result) => {
      setSongsCount(result[0].count);
    });

  return (
    <SafeAreaView className="flex-1 items-center justify-center gap-16">
      <Text>Home page</Text>
      <Text className="text-lg">{songsCount} songs</Text>

      {!isLoggedIn() ? (
        <Button title="Login with Spotify" onPress={() => promptAsync()} />
      ) : (
        <Button title="Go to other place" onPress={() => router.push("game")} />
      )}
    </SafeAreaView>
  );
}
