import { Identifier } from "../../../../types/Identifier";
import { createCrudHooks, CrudHooksConfig } from "../../../../utils/crudHooksFactory";
import { amenityService } from "../services/amenityService";

const Amenity_QUERY_KEY = "Amenity";

export const useAmenityHooks = () => {
  const AmenityConfig: CrudHooksConfig<any> = {
    service: amenityService,
    queryKey: Amenity_QUERY_KEY,
  };

  return createCrudHooks(AmenityConfig);
};

export const useCreateAmenity = () => useAmenityHooks().useCreate();
export const useUpdateAmenity = (id: Identifier) => useAmenityHooks().useUpdate(id);
export const useDeleteAmenity = () => useAmenityHooks().useDelete();
export const useFetchAllAmenity = (filters?: string) => useAmenityHooks().useFetchAll(filters);
export const useFetchAmenityById = (id: Identifier) => useAmenityHooks().useFetchById(id);
