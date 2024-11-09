import { create } from "zustand";

type State = {
  results: any[];
};

type Action = {
  setResults: (results: any[]) => void;
};

type Store = State & Action;

const useSearchStore = create<Store>((set) => ({
  results: [],
  setResults: (results) => set({ results }),
}));

export default useSearchStore;
