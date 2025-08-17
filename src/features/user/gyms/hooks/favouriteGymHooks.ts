import { Identifier } from "../../../../types/Identifier";
import { createCrudHooks, CrudHooksConfig } from "../../../../utils/crudHooksFactory";
import { favouriteGymService } from "../services/favouriteGymService";

const FAVOURITE_GYM_QUERY_KEY = "favourite-gym";

export const useFavouriteGymHooks = () => {
  const FavouriteGymConfig: CrudHooksConfig<any> = {
    service: favouriteGymService,
    queryKey: FAVOURITE_GYM_QUERY_KEY,
  };

  return createCrudHooks(FavouriteGymConfig);
};

export const useCreateFavouriteGym = () => useFavouriteGymHooks().useCreate();
export const useUpdateFavouriteGym = (id: Identifier) => useFavouriteGymHooks().useUpdate(id);
export const useDeleteFavouriteGym = () => useFavouriteGymHooks().useDelete();
export const useFetchAllFavouriteGym = (filters?: string) => useFavouriteGymHooks().useFetchAll(filters);
export const useFetchFavouriteGymById = (id: Identifier) => useFavouriteGymHooks().useFetchById(id);
