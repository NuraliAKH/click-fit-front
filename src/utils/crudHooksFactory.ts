import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { CRUDService } from "../services/CRUDService";
import { Identifier } from "../types/Identifier";

export interface CrudHooksConfig<T extends { id: Identifier }> {
  service: CRUDService<T>;
  queryKey: string;
  invalidateQueryKeys?: string[];
  navigatePaths?: {
    afterCreate?: (response: T) => string; // screen name
    afterUpdate?: (response: T) => string; // screen name
  };
}

export function createCrudHooks<T extends { id: Identifier }>({
  service,
  queryKey,
  navigatePaths,
  invalidateQueryKeys,
}: CrudHooksConfig<T>) {
  const useCreate = () => {
    const queryClient = useQueryClient();
    const navigation = useNavigation<any>();

    return useMutation({
      mutationFn: async (payload: Omit<T, "id">) => {
        const data = await service.create(payload);
        return data.data;
      },
      onSuccess: (data: T) => {
        queryClient.invalidateQueries({ queryKey: [queryKey] });
        if (invalidateQueryKeys) {
          invalidateQueryKeys.forEach(key => queryClient.invalidateQueries({ queryKey: [key] }));
        }
        if (navigatePaths?.afterCreate) {
          navigation.navigate(navigatePaths.afterCreate(data));
        }
        Toast.show({ type: "success", text1: "Created successfully" });
      },
      onError: (err: any) => {
        Toast.show({ type: "error", text1: err?.response?.data?.detail || "Create failed" });
      },
    });
  };

  const useUpdate = (id: Identifier) => {
    const queryClient = useQueryClient();
    const navigation = useNavigation<any>();

    return useMutation<T, Error, Partial<Omit<T, "id">>>({
      mutationFn: async payload => {
        const result = await service.update(id, payload);
        return result.data as T;
      },
      onSuccess: data => {
        queryClient.invalidateQueries({ queryKey: [queryKey] });
        queryClient.invalidateQueries({ queryKey: [queryKey, id] });
        if (navigatePaths?.afterUpdate) {
          navigation.navigate(navigatePaths.afterUpdate(data));
        }
        Toast.show({ type: "success", text1: "Updated successfully" });
      },
      onError: (err: any) => {
        Toast.show({ type: "error", text1: err?.response?.data?.detail || "Update failed" });
      },
    });
  };

  const useDelete = () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: (id: Identifier) => service.remove(id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [queryKey] });
        Toast.show({ type: "success", text1: "Deleted successfully" });
      },
      onError: (err: any) => {
        Toast.show({ type: "error", text1: err?.response?.data?.detail || "Delete failed" });
      },
    });
  };

  const useFetchAll = (filters?: string) => {
    return useQuery({
      queryKey: [queryKey, filters],
      queryFn: () => service.fetchAll(filters),
    });
  };

  const useFetchById = (id: Identifier) => {
    return useQuery({
      queryKey: [queryKey, id],
      queryFn: () => service.fetchById(id),
    });
  };

  return {
    useCreate,
    useUpdate,
    useDelete,
    useFetchAll,
    useFetchById,
  };
}
