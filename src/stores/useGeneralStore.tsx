import { User } from "@/types/entities/user";
import { create } from "zustand";

type State = {
  globalIsLoading: boolean;
  userNameFirstLetter: string;
  user: User | null;
};

type Action = {
  setGlobalIsLoading: (globalIsLoading: boolean) => void;
  setUserNameFirstLetter: (userNameFirstLetter: string) => void;
  setUser: (user: User) => void;
};

type Store = State & Action;

const useGeneralStore = create<Store>((set) => ({
  globalIsLoading: false,
  setGlobalIsLoading: (globalIsLoading) => set({ globalIsLoading }),
  userNameFirstLetter: "",
  setUserNameFirstLetter: (userNameFirstLetter) => set({ userNameFirstLetter }),
  user: null,
  setUser: (user) => set({ user }),
}));

export default useGeneralStore;
