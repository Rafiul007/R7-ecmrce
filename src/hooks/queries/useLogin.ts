// import { login, LoginPayload } from "@/app/api/auth/auth.api";
// import { QUERY_KEYS } from "@/constants/queryKeys";
// import { useMutation, useQueryClient } from "@tanstack/react-query";

// export function useLogin() {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: (payload: LoginPayload) => login(payload),

//     onSuccess: (response) => {
//       // Store authenticated user in cache
//       queryClient.setQueryData(QUERY_KEYS.AUTH.ME, response.data);
//     },
//   });
// }
