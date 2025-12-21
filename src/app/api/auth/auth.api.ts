import { api } from "@/lib/axios";

export const AUTH_ENDPOINTS = {
  REGISTER: "/iam/api/auth/register",
  LOGIN: "/iam/api/auth/login",
  ME: "/iam/api/auth/me",
} as const;

/* =====================
   Types
===================== */

export interface RegisterPayload {
  fullName: string;
  email: string;
  password: string;
  phone?: string;
}

export interface RegisterResponse {
  success: boolean;
  message: string;
  data: {
    accessToken: string;
  };
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    accessToken: string;
  };
}

/* =====================
   API functions
===================== */

export function register(payload: RegisterPayload) {
  return api.post<RegisterResponse>(AUTH_ENDPOINTS.REGISTER, payload);
}

export function login(payload: LoginPayload) {
  return api.post<LoginResponse>(AUTH_ENDPOINTS.LOGIN, payload);
}
