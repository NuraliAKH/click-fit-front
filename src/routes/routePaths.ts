import RouteGenerator from "../utils/RouteGenerator";

export const routePaths = {
  adminIndex: new RouteGenerator("/"),
  register: new RouteGenerator("/register"),
  login: new RouteGenerator("/login"),
  private: {},
};
