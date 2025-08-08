import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { Text, useColorScheme } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import migrations from "../drizzle/migrations";
import { useEffect } from "react";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import { db } from "../db";
import "./global.css";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const { success, error } = useMigrations(db, migrations);

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
    <ThemeProvider value={colorScheme == "dark" ? DarkTheme : DefaultTheme}>
      <SafeAreaProvider>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="game" />
        </Stack>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}
