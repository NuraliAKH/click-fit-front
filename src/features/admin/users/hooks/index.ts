import { Identifier } from "../../../../types/Identifier";
import { createCrudHooks, CrudHooksConfig } from "../../../../utils/crudHooksFactory";
import { userService } from "../services/userService";

const USER_QUERY_KEY = "User";

export const useUserHooks = () => {
  const UserConfig: CrudHooksConfig<any> = {
    service: userService,
    queryKey: USER_QUERY_KEY,
  };

  return createCrudHooks(UserConfig);
};

export const useCreateUser = () => useUserHooks().useCreate();
export const useUpdateUser = (id: Identifier) => useUserHooks().useUpdate(id);
export const useDeleteUser = () => useUserHooks().useDelete();
export const useFetchAllUser = (filters?: string) => useUserHooks().useFetchAll(filters);
export const useFetchUserById = (id: Identifier) => useUserHooks().useFetchById(id);
