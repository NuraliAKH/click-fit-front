import { CRUDService, DateFields } from "../../../../services/CRUDService";
import { Identifier } from "../../../../types/Identifier";
import { GymService } from "../types/Service";

class ServiceService extends CRUDService<GymService> {
  protected dateFields: DateFields<GymService>[] = [];

  protected fileFields: DateFields<GymService>[] = [];
  constructor() {
    super("/gym-services");
  }
}

const serviceService = new ServiceService();
export { serviceService };
