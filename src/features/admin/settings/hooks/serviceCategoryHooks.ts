import { Identifier } from "../../../../types/Identifier";
import { createCrudHooks, CrudHooksConfig } from "../../../../utils/crudHooksFactory";
import { serviceCategoryService } from "../services/serviceCategoryService";

const SERVICE_CATEGORY_QUERY_KEY = "ServiceCategory";

export const useServiceCategoryHooks = () => {
  const ServiceCategoryConfig: CrudHooksConfig<any> = {
    service: serviceCategoryService,
    queryKey: SERVICE_CATEGORY_QUERY_KEY,
  };

  return createCrudHooks(ServiceCategoryConfig);
};

export const useCreateServiceCategory = () => useServiceCategoryHooks().useCreate();
export const useUpdateServiceCategory = (id: Identifier) => useServiceCategoryHooks().useUpdate(id);
export const useDeleteServiceCategory = () => useServiceCategoryHooks().useDelete();
export const useFetchAllServiceCategory = (filters?: string) => useServiceCategoryHooks().useFetchAll(filters);
export const useFetchServiceCategoryById = (id: Identifier) => useServiceCategoryHooks().useFetchById(id);
