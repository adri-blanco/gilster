import { useFocusEffect, useRouter } from "expo-router";
import { Text } from "react-native";

export default function NotFound() {
  const router = useRouter();

  useFocusEffect(() => {
    router.replace("/");
  });

  return <Text>Redirecting to home page...</Text>;
}
