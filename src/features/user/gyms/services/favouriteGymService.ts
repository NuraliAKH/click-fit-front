import { CRUDService, DateFields } from "../../../../services/CRUDService";

class FavouriteGymService extends CRUDService<any> {
  protected dateFields: DateFields<any>[] = [];

  protected fileFields: DateFields<any>[] = [];
  constructor() {
    super("/user-favourite-gyms");
  }
}

const favouriteGymService = new FavouriteGymService();
export { favouriteGymService };
