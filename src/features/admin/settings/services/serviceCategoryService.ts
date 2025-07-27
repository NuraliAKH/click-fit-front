import { CRUDService, DateFields } from "../../../../services/CRUDService";

class ServiceCategoryService extends CRUDService<any> {
  protected dateFields: DateFields<any>[] = [];

  protected fileFields: DateFields<any>[] = [];
  constructor() {
    super("/service-categories");
  }
}

const serviceCategoryService = new ServiceCategoryService();
export { serviceCategoryService };
