import type { User } from "@/models/User";
import { defineStore } from "pinia";
import { AuthService } from "@/services/auth.service";

const authService: AuthService = new AuthService();

export const AuthStore = defineStore({
  id: "authStore",
  state: () => ({
    loggedInUser: { userName: "" } as User,
  }),
  getters: {
    loggedIn: (state) => {
      if (state.loggedInUser != undefined) return state.loggedInUser;
      return {} as User;
    },
    userName: (state) => {
      if (state.loggedInUser.userName != undefined)
        return state.loggedInUser.userName;
      else return "";
    },
  },
  actions: {
    registerUser(userName: string, password: string) {
      authService.register(userName, password);
    },

    loginUser(userName: string, password: string) {
      authService.login(userName, password);
    },
  },
});
