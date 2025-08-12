import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import {
  useFonts,
  Truculenta_600SemiBold,
} from "@expo-google-fonts/truculenta";
import { Zain_400Regular, Zain_700Bold } from "@expo-google-fonts/zain";
import { Stack } from "expo-router";
import { StatusBar, Text } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import migrations from "../drizzle/migrations";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import { db } from "../db";
import "./global.css";

const Theme: ReactNavigation.Theme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: "rgb(252,167,44)",
    background: "#291554",
    text: "#ffffff",
  },
};

export default function RootLayout() {
  const { success, error } = useMigrations(db, migrations);
  useFonts({
    Truculenta_600SemiBold,
    Zain_400Regular,
    Zain_700Bold,
  });

  if (error) {
    return (
      <SafeAreaView>
        <Text>Migration error: {error.message}</Text>
      </SafeAreaView>
    );
  }
  if (!success) {
    return (
      <SafeAreaView>
        <Text>Migration is in progress...</Text>
      </SafeAreaView>
    );
  }

  return (
    <ThemeProvider value={Theme}>
      <StatusBar />
      <SafeAreaProvider>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="game" options={{ headerShown: false }} />
        </Stack>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}
