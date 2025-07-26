import { CRUDService, DateFields } from "../../../../services/CRUDService";

class GroupService extends CRUDService<any> {
  protected dateFields: DateFields<any>[] = [];

  protected fileFields: DateFields<any>[] = [];
  constructor() {
    super("/bookings");
  }
}

const bookingService = new GroupService();
export { bookingService };
