import { CRUDService, DateFields } from "../../../../services/CRUDService";

class UserService extends CRUDService<any> {
  protected dateFields: DateFields<any>[] = [];

  protected fileFields: DateFields<any>[] = [];
  constructor() {
    super("/users");
  }
}

const userService = new UserService();
export { userService };
