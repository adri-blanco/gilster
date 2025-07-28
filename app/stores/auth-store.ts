import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface AuthStore {
  accessToken: string | null;
  refreshToken: string | null;
  expiresAt: number;
  setAuth: (
    accessToken: string,
    refreshToken: string,
    expiresAt: number
  ) => void;
}

const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      expiresAt: 0,
      setAuth: (accessToken: string, refreshToken: string, expiresAt: number) =>
        set(() => ({ accessToken, refreshToken, expiresAt })),
    }),
    { name: "auth-storage", storage: createJSONStorage(() => AsyncStorage) }
  )
);

export default useAuthStore;
