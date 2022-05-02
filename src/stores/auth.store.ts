import type { User } from "@/models/User";
import { defineStore } from "pinia";
import { AuthService } from "@/services/auth.service";
import router from "@/router";

const authService: AuthService = new AuthService();

export const AuthStore = defineStore({
  id: "authStore",
  state: () => ({
    token: null,
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
      return new Promise((resolve, reject) => {
        authService
          .login(userName, password)
          .then((response) => {
            if (response) {
              console.log(response);
              resolve(response);
            }
          })
          .catch((error) => {
            console.log(error);
            reject(error);
          });
      });
    },
  },
});
