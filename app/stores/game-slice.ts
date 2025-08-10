import { StateCreator } from "zustand";

export type Years = { [key: number]: number };

export interface GameSlice {
  difficulty: number;
  usedIds: string[];
  years: Years;
  addUsedIds: (id: string) => void;
  setDifficulty: (difficulty: number) => void;
  setYears: (years: Years) => void;
}

const createGameSlice: StateCreator<GameSlice> = (set) => ({
  difficulty: 0,
  usedIds: [],
  years: {},
  addUsedIds: (id: string) =>
    set((state) => ({ usedIds: [...new Set([...state.usedIds, id])] })),
  setDifficulty: (difficulty: number) => set(() => ({ difficulty })),
  setYears: (years: Years) => set(() => ({ years })),
});

export default createGameSlice;
