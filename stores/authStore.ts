import { create } from "zustand";
import cookies from "cookiejs";

type AuthStore = {
	isAuth: boolean;
	login: () => void;
	logout: () => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
	isAuth: false,
	login: () => set(() => ({ isAuth: true })),
	logout: () => set(() => ({ isAuth: false })),
}));
