import { Identifier } from "../../../../types/Identifier";
import { createCrudHooks, CrudHooksConfig } from "../../../../utils/crudHooksFactory";
import { gymService } from "../services/gymService";
import { Gym } from "../types/Gym";

const GYM_QUERY_KEY = "gym";

export const useGymHooks = () => {
  const GymConfig: CrudHooksConfig<Gym> = {
    service: gymService,
    queryKey: GYM_QUERY_KEY,
  };

  return createCrudHooks(GymConfig);
};

export const useCreateGym = () => useGymHooks().useCreate();
export const useUpdateGym = (id: Identifier) => useGymHooks().useUpdate(id);
export const useDeleteGym = () => useGymHooks().useDelete();
export const useFetchAllGym = (filters?: string) => useGymHooks().useFetchAll(filters);
export const useFetchGymById = (id: Identifier) => useGymHooks().useFetchById(id);
