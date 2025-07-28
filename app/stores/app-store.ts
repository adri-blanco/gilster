import { create } from "zustand";
import createAuthSlice, { AuthSlice } from "./auth-slice";
import createGameSlice, { GameSlice } from "./game-slice";

type AppStore = AuthSlice & GameSlice;

const useAppStore = create<AppStore>((...a) => ({
  ...createAuthSlice(...a),
  ...createGameSlice(...a),
}));

export default useAppStore;
