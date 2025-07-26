import { Identifier } from "../../../../types/Identifier";
import { createCrudHooks, CrudHooksConfig } from "../../../../utils/crudHooksFactory";
import { bookingService } from "../services/bookingService";

const DIFFICULTY_LEVEL_QUERY_KEY = "difficulty-level";

export const useBookingHooks = () => {
  const bookingConfig: CrudHooksConfig<any> = {
    service: bookingService,
    queryKey: DIFFICULTY_LEVEL_QUERY_KEY,
  };

  return createCrudHooks(bookingConfig);
};

export const useCreateBooking = () => useBookingHooks().useCreate();
export const useUpdateBooking = (id: Identifier) => useBookingHooks().useUpdate(id);
export const useDeleteBooking = () => useBookingHooks().useDelete();
export const useFetchAllBooking = (filters?: string) => useBookingHooks().useFetchAll(filters);
export const useFetchBookingById = (id: Identifier) => useBookingHooks().useFetchById(id);
