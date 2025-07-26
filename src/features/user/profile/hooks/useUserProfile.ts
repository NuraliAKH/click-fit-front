import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "../services/profileService";

export const useUserProfile = () => {
  return useQuery({
    queryKey: ["user-profile"],
    queryFn: getUserProfile,
  });
};
