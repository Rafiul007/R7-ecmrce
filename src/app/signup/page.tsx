"use client";

import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler, Resolver } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useUserStore } from "@/store/userStore";

import RHFTextField from "@/components/ui/Rhf-TextFields";

// ======================
// Interface (SOURCE OF TRUTH)
// ======================
export type SignupFormData = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone?: string;
};

// ======================
// Schema (typed to interface)
// ======================
const signupSchema = yup.object().shape({
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
interface ISignupPage {
  name: keyof SignupFormData;
  label: string;
  placeholder: string;
  type?: string;
  autoComplete?: string;
}
const fields: ISignupPage[] = [
  {
    name: "fullName",
    label: "Full Name",
    placeholder: "Enter your full name",
    autoComplete: "name",
  },
  {
    name: "email",
    label: "Email Address",
    placeholder: "Enter your email",
    type: "email",
    autoComplete: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Create a password",
    type: "password",
    autoComplete: "new-password",
  },
  {
    name: "confirmPassword",
    label: "Confirm Password",
    placeholder: "Re-enter your password",
    type: "password",
    autoComplete: "new-password",
  },
  {
    name: "phone",
    label: "Phone Number (optional)",
    placeholder: "Enter your phone number",
    type: "tel",
    autoComplete: "tel",
  },
];

const SignupPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { control, handleSubmit, reset } = useForm<SignupFormData>({
    resolver: yupResolver(signupSchema) as unknown as Resolver<SignupFormData>,
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "", // normalize optional field
    },
  });

  const router = useRouter();
  const setUser = useUserStore((s) => s.setUser);
  const user = useUserStore((s) => s.user);

  useEffect(() => {
    if (user) router.replace("/");
  }, [user, router]);

  const onSubmit: SubmitHandler<SignupFormData> = async (data) => {
    setIsLoading(true);
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { confirmPassword: _confirmPassword, ...payload } = data;

      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.message || "Signup failed");

      setUser(json.user, json.token);
      toast.success("Account created successfully!");
      router.push("/");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      toast.error(msg || "Something went wrong");
    } finally {
      setIsLoading(false);
      reset();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body">
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-primary mb-2">
              Create Account
            </h1>
            <p className="text-base-content/60">
              Sign up to start shopping with R7 Mart
            </p>
          </div>

          {/* Form */}
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
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="loading loading-spinner loading-sm" />
                  Creating account...
                </>
              ) : (
                "Sign Up"
              )}
            </button>
          </form>

          {/* Footer */}
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
