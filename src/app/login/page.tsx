"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Link from "next/link";
import RHFTextField from "@/components/ui/Rhf-TextFields";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useLogin } from "@/hooks/queries/useLogin";

const loginSchema = yup.object({
  email: yup
    .string()
    .email("Please enter a valid email address")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

interface LoginFormData {
  email: string;
  password: string;
}

export const LoginPage = () => {
  const router = useRouter();
  const { mutate: loginUser, isPending } = useLogin();

  const { control, handleSubmit } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginFormData) => {
    loginUser(data, {
      onSuccess: () => {
        toast.success("Signed in successfully");
        router.replace("/");
      },
      onError: (error: unknown) => {
        const message =
          error instanceof Error ? error.message : "Invalid credentials";
        toast.error(message);
      },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-primary mb-2">
              Welcome Back
            </h1>
            <p className="text-base-content/60">
              Sign in to your account to continue shopping
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <RHFTextField
              name="email"
              control={control}
              label="Email Address"
              placeholder="Enter your email"
              type="email"
              autoComplete="email"
              className="input-md"
            />

            <RHFTextField
              name="password"
              control={control}
              label="Password"
              placeholder="Enter your password"
              type="password"
              autoComplete="current-password"
              className="input-md"
            />

            <div className="text-right">
              <Link
                href="/forgot-password"
                className="text-sm text-primary hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <span className="loading loading-spinner loading-sm" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
