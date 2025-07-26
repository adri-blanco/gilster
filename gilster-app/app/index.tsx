import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Button, Text } from "react-native";

export default function Home() {
  const router = useRouter();

  return (
    <SafeAreaView>
      <Text>Home page</Text>
      <Button
        title="Go to other place"
        onPress={() => router.replace("game")}
      />
    </SafeAreaView>
  );
}
