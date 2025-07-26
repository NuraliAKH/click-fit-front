import { CRUDService, DateFields } from "../../../../services/CRUDService";
import { Identifier } from "../../../../types/Identifier";
import { Gym } from "../types/Gym";

class GymService extends CRUDService<Gym> {
  protected dateFields: DateFields<Gym>[] = [];

  protected fileFields: DateFields<Gym>[] = [];
  constructor() {
    super("/gyms");
  }
}

const gymService = new GymService();
export { gymService };
