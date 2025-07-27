import { CRUDService, DateFields } from "../../../../services/CRUDService";

class PromoCodesService extends CRUDService<any> {
  protected dateFields: DateFields<any>[] = [];

  protected fileFields: DateFields<any>[] = [];
  constructor() {
    super("/promo-codes");
  }
}

const promoCodesService = new PromoCodesService();
export { promoCodesService };
