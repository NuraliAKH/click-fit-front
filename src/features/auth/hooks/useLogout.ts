import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authService } from "../services/AuthService";

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => {
      return authService.logout();
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["auth-user"] });
      queryClient.invalidateQueries({ queryKey: ["user-full-profile"] });
    },
  });
};
