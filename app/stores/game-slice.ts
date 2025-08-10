import { StateCreator } from "zustand";

export type Years = { [key: number]: number };

export interface GameSlice {
  difficulty: number;
  ids: string[];
  years: Years;
  add: (id: string) => void;
  setDifficulty: (difficulty: number) => void;
  setYears: (years: Years) => void;
}

const createGameSlice: StateCreator<GameSlice> = (set) => ({
  difficulty: 0,
  ids: [],
  years: {},
  add: (id: string) =>
    set((state) => ({ ids: [...new Set([...state.ids, id])] })),
  setDifficulty: (difficulty: number) => set(() => ({ difficulty })),
  setYears: (years: Years) => set(() => ({ years })),
});

export default createGameSlice;
