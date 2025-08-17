import { CRUDService, DateFields } from "../../../../services/CRUDService";
import { Identifier } from "../../../../types/Identifier";

class GymAmenityService extends CRUDService<any> {
  protected dateFields: DateFields<any>[] = [];

  protected fileFields: DateFields<any>[] = [];
  constructor() {
    super("/gym-amenities");
  }
  async deleteA(gymId: Identifier, amenityId: Identifier): Promise<any> {
    return this.delete(`/gym-amenities/${gymId}/${amenityId}`);
  }
}

const gymAmenityService = new GymAmenityService();
export { gymAmenityService };
