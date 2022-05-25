import { defineStore } from "pinia";
import { AuthService } from "@/services/auth.service";
import type { Token } from "@/models/Token";

const authService: AuthService = new AuthService();
const userId = "userId";
const name = "name";
const token = "Token";

export const AuthStore = defineStore({
  id: "authStore",
  state: () => ({
    loggedInUser: { token: "", user: "" } as Token,
  }),
  getters: {
    loggedIn: (state) => {
      if (state.loggedInUser != undefined) return state.loggedInUser;
      return {} as Token;
    },
    getUserName(): string {
      const userName = localStorage.getItem(name);
      if (userName) {
        return userName;
      }
      return "";
    },
    getUserid: (state) => {
      if (state.loggedInUser != undefined) return state.loggedInUser.user;
      else return "";
    },
    isAuthenticated: (state) => {
      if (state.loggedInUser.token != undefined)
        return state.loggedInUser.token;
      else null;
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
            if (response && response.token) {
              this.loggedInUser = response;
              console.log(response);
              localStorage.setItem(name, userName);
              localStorage.setItem(userId, this.loggedInUser.user);
              localStorage.setItem(token, this.loggedInUser.token);
              resolve(response);
            }
          })
          .catch((error) => {
            console.log(error);
            localStorage.removeItem(token),
              localStorage.removeItem(userName),
              localStorage.removeItem(userId),
              reject(error);
          });
      });
    },

    logout() {
      localStorage.removeItem(token);
      localStorage.removeItem(name);
      localStorage.removeItem(userId);
    },
  },
});
