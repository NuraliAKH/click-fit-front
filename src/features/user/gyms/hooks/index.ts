import { useQuery } from "@tanstack/react-query";
import { fetchGyms } from "../services/gymService";

export const useGyms = () => {
  return useQuery({
    queryKey: ["gyms"],
    queryFn: fetchGyms,
  });
};
