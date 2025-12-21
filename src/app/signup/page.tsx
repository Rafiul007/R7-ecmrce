"use client";

import React from "react";
import { useForm, SubmitHandler, Resolver } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

import RHFTextField from "@/components/ui/Rhf-TextFields";
import { RegisterPayload } from "@/app/api/auth/auth.api";
import { useRegistration } from "@/hooks/queries/useSignup";

// ======================
// Types
// ======================
export type SignupFormData = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone?: string;
};

// ======================
// Schema
// ======================
const signupSchema = yup.object({
  fullName: yup.string().required("Full name is required"),
  email: yup
    .string()
    .email("Please enter a valid email address")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords do not match")
    .required("Confirm password is required"),
  phone: yup.string().notRequired(),
});

// ======================
// Field config
// ======================
const fields: {
  name: keyof SignupFormData;
  label: string;
  placeholder: string;
  type?: string;
  autoComplete?: string;
}[] = [
  { name: "fullName", label: "Full Name", placeholder: "Enter your full name" },
  {
    name: "email",
    label: "Email Address",
    placeholder: "Enter your email",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Create a password",
    type: "password",
  },
  {
    name: "confirmPassword",
    label: "Confirm Password",
    placeholder: "Re-enter your password",
    type: "password",
  },
  {
    name: "phone",
    label: "Phone Number (optional)",
    placeholder: "Enter your phone number",
    type: "tel",
  },
];

const SignupPage = () => {
  const router = useRouter();
  const { mutate: registerUser, isPending } = useRegistration();

  const { control, handleSubmit, reset } = useForm<SignupFormData>({
    resolver: yupResolver(signupSchema) as unknown as Resolver<SignupFormData>,
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
    },
  });

  const onSubmit: SubmitHandler<SignupFormData> = (data) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirmPassword, ...payload } = data;

    registerUser(payload as RegisterPayload, {
      onSuccess: () => {
        toast.success("Account created successfully!");
        reset();
        router.replace("/");
      },
      onError: (error: unknown) => {
        const message =
          error instanceof Error ? error.message : "Signup failed";
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
              Create Account
            </h1>
            <p className="text-base-content/60">
              Sign up to start shopping with R7 Mart
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {fields.map((field) => (
              <RHFTextField
                key={field.name}
                name={field.name}
                control={control}
                label={field.label}
                placeholder={field.placeholder}
                type={field.type}
                autoComplete={field.autoComplete}
                className="input-md"
              />
            ))}

            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <span className="loading loading-spinner loading-sm" />
                  Creating account...
                </>
              ) : (
                "Sign Up"
              )}
            </button>
          </form>

          <div className="text-center mt-6">
            <p className="text-sm text-base-content/60">
              Already have an account?{" "}
              <Link href="/login" className="text-primary hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
