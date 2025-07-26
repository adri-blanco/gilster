import { Button, Text, View } from "react-native";

export default function Game() {
  return (
    <View>
      <Text>Game page</Text>
      <Button title="Start Game" onPress={() => console.log("Game started")} />
    </View>
  );
}
