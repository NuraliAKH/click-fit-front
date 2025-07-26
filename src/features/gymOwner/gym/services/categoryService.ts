import { CRUDService, DateFields } from "../../../../services/CRUDService";

class CategoryService extends CRUDService<any> {
  protected dateFields: DateFields<any>[] = [];

  protected fileFields: DateFields<any>[] = [];
  constructor() {
    super("/service-categories");
  }
}

const categoryService = new CategoryService();
export { categoryService };
