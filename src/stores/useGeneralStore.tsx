import { create } from "zustand";

type State = {
  globalIsLoading: boolean;
};

type Action = {
  setGlobalIsLoading: (globalIsLoading: boolean) => void;
};

type Store = State & Action;

const useGeneralStore = create<Store>((set) => ({
    globalIsLoading: false,
    setGlobalIsLoading: (globalIsLoading) => set({ globalIsLoading }),
}));

export default useGeneralStore;
