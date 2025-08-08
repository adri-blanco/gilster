import { StateCreator } from "zustand";

export type Years = { [key: number]: number };

export interface GameSlice {
  ids: string[];
  years: Years;
  setYears: (years: Years) => void;
  add: (id: string) => void;
}

const createGameSlice: StateCreator<GameSlice> = (set) => ({
  ids: [],
  years: {},
  add: (id: string) =>
    set((state) => ({ ids: [...new Set([...state.ids, id])] })),
  setYears: (years: Years) => set(() => ({ years })),
});

export default createGameSlice;
