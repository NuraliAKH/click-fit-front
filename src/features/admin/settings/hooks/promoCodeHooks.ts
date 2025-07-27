import { Identifier } from "../../../../types/Identifier";
import { createCrudHooks, CrudHooksConfig } from "../../../../utils/crudHooksFactory";
import { promoCodesService } from "../services/promocodeService";

const PROMO_CODE_QUERY_KEY = "PromoCode";

export const usePromoCodeHooks = () => {
  const PromoCodeConfig: CrudHooksConfig<any> = {
    service: promoCodesService,
    queryKey: PROMO_CODE_QUERY_KEY,
  };

  return createCrudHooks(PromoCodeConfig);
};

export const useCreatePromoCode = () => usePromoCodeHooks().useCreate();
export const useUpdatePromoCode = (id: Identifier) => usePromoCodeHooks().useUpdate(id);
export const useDeletePromoCode = () => usePromoCodeHooks().useDelete();
export const useFetchAllPromoCode = (filters?: string) => usePromoCodeHooks().useFetchAll(filters);
export const useFetchPromoCodeById = (id: Identifier) => usePromoCodeHooks().useFetchById(id);
