import { Identifier } from "../../../../types/Identifier";
import { createCrudHooks, CrudHooksConfig } from "../../../../utils/crudHooksFactory";
import { serviceService } from "../services/serviceService";
import { GymService } from "../types/Service";

const SERVICE_QUERY_KEY = "gym-service";

export const useServiceHooks = () => {
  const ServiceConfig: CrudHooksConfig<GymService> = {
    service: serviceService,
    queryKey: SERVICE_QUERY_KEY,
  };

  return createCrudHooks(ServiceConfig);
};

export const useCreateService = () => useServiceHooks().useCreate();
export const useUpdateService = (id: Identifier) => useServiceHooks().useUpdate(id);
export const useDeleteService = () => useServiceHooks().useDelete();
export const useFetchAllService = (filters?: string) => useServiceHooks().useFetchAll(filters);
export const useFetchServiceById = (id: Identifier) => useServiceHooks().useFetchById(id);
