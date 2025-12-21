import { create } from "zustand";
import { persist } from "zustand/middleware";

interface IUser {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
}
interface UserState {
  user: IUser | null;
  token: string | null;
  setUser: (user: IUser, token: string) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      setUser: (user, token) => set({ user, token }),
      clearUser: () => set({ user: null, token: null }),
    }),
    { name: "user-storage" }
  )
);
