import AsyncStorage from "@react-native-async-storage/async-storage";
import { createJSONStorage, persist } from "zustand/middleware";
import spotifyApi from "../services/spotify-api";

export interface AuthSlice {
  accessToken: string | null;
  refreshToken: string | null;
  expiresAt: number;
  setAuth: (
    accessToken: string,
    refreshToken: string,
    expiresAt: number
  ) => void;
}

const createAuthSlice = persist<AuthSlice>(
  (set) => ({
    accessToken: null,
    refreshToken: null,
    expiresAt: 0,
    setAuth: (accessToken: string, refreshToken: string, expiresAt: number) =>
      set(() => ({ accessToken, refreshToken, expiresAt })),
  }),
  {
    name: "auth-storage",
    storage: createJSONStorage(() => AsyncStorage),

    onRehydrateStorage() {
      return (state) => {
        if (state && state.accessToken) {
          spotifyApi.setAccessToken(state.accessToken);
          spotifyApi.setRefreshToken(state.refreshToken || "");
        }
      };
    },
  }
);

export default createAuthSlice;
