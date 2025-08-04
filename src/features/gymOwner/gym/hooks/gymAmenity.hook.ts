import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Identifier } from "../../../../types/Identifier";
import { createCrudHooks, CrudHooksConfig } from "../../../../utils/crudHooksFactory";
import { gymAmenityService } from "../services/gymAmenityService";

const GYMAMENITY_QUERY_KEY = "gymAmenity";

export const useGymAmenityHooks = () => {
  const GymAmenityConfig: CrudHooksConfig<any> = {
    service: gymAmenityService,
    queryKey: GYMAMENITY_QUERY_KEY,
  };

  return createCrudHooks(GymAmenityConfig);
};

export const useCreateGymAmenity = () => useGymAmenityHooks().useCreate();
export const useUpdateGymAmenity = (id: Identifier) => useGymAmenityHooks().useUpdate(id);
export const useFetchAllGymAmenity = (filters?: string) => useGymAmenityHooks().useFetchAll(filters);
export const useFetchGymAmenityById = (id: Identifier) => useGymAmenityHooks().useFetchById(id);
export const useDeleteGymAmenity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ gymId, amenityId }: { gymId: number; amenityId: number }) => {
      return gymAmenityService.deleteA(gymId, amenityId);
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: [GYMAMENITY_QUERY_KEY] });
    },
  });
};
