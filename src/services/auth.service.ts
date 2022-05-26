import http from "./http.client";
import type { User } from "@/models/User";
import type { Token } from "@/models/Token";

export class AuthService {
  async register(userName: string, password: string): Promise<User> {
    const res = await http.post("/auth/register", {
      userName: userName,
      password: password,
    });
    return res.data;
  }

  async login(userName: string, password: string): Promise<Token> {
    const res = await http.post<Token>("/auth/login", {
      userName: userName,
      password: password,
    });
    return res.data;
  }
}
