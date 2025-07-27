import { create } from "zustand";
import { combine, devtools } from "zustand/middleware";

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

const useAuthStore = create<AuthStore>()((set) => ({
  accessToken: null,
  refreshToken: null,
  expiresAt: 0,
  setAuth: (accessToken: string, refreshToken: string, expiresAt: number) =>
    set(() => ({ accessToken, refreshToken, expiresAt })),
}));

export default useAuthStore;
