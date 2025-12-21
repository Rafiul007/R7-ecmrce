import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login, LoginPayload } from "@/app/api/auth/auth.api";
import tokenService from "@/lib/token";
import { QUERY_KEYS } from "@/constants/queryKeys";

export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: LoginPayload) => login(payload),

    onSuccess: (response) => {
      const token = response.data.data.accessToken;

      // Store access token (if you still use it client-side)
      tokenService.set(token);

      // Refresh auth state
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.AUTH.ME,
      });
    },
  });
}
