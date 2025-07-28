import { StateCreator } from "zustand";

export interface GameSlice {
  ids: string[];
  add: (id: string) => void;
}

const createGameSlice: StateCreator<GameSlice> = (set) => ({
  ids: [],
  add: (id: string) =>
    set((state) => ({ ids: [...new Set([...state.ids, id])] })),
});

export default createGameSlice;
