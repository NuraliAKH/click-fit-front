import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserRole } from "../services/userSerive";

export function useGiveRole() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ userId, role }: { userId: number; role: string }) => updateUserRole({ userId, role }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["User"] });
    },
  });
}
