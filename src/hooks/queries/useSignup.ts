import { register, RegisterPayload } from "@/app/api/auth/auth.api";
import { QUERY_KEYS } from "@/constants/queryKeys";
import tokenService from "@/lib/token";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useRegistration() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: RegisterPayload) => register(payload),

    onSuccess: (response) => {
      const token = response.data.data.accessToken;

      // 1️⃣ Store token
      tokenService.set(token);

      // 2️⃣ Mark auth state as stale (or fetch user later)
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.AUTH.ME,
      });
    },
  });
}
