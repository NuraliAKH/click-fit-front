import { CRUDService, DateFields } from "../../../../services/CRUDService";

class AmenityService extends CRUDService<any> {
  protected dateFields: DateFields<any>[] = [];

  protected fileFields: DateFields<any>[] = [];
  constructor() {
    super("/amenities");
  }
}

const amenityService = new AmenityService();
export { amenityService };
