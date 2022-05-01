import type { User } from "@/models/User";
import { defineStore } from "pinia";
import { AuthService } from "@/services/auth.service";

const authService: AuthService = new AuthService();

export const AuthStore = defineStore({
  id: "authStore",
  state: () => ({
    loggedInUser: { username: "" } as User,
  }),
  getters: {
    loggedIn: (state) => {
      if (state.loggedInUser != undefined) return state.loggedInUser;
      return {} as User;
    },
    userName: (state) => {
      if (state.loggedInUser.username != undefined)
        return state.loggedInUser.username;
      else return "";
    },
  },
  actions: {
    registerUser(userName: string, password: string) {
      authService.register(userName, password);
    },
  },
});
