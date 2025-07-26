import { Api } from "../../../api/Api";

class AuthService extends Api {
  async fetchProfile() {
    return this.get<{
      email: string;
      name: string;
      id: number;
      roles: {
        id: number;
        name: string;
        roleId: number;
      }[];
    }>("/api/auth/profile");
  }

  async logout() {
    return this.post("/api/auth/signout");
  }
}

export const authService = new AuthService();
