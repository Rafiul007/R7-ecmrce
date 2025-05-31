/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import CartSummary from "@/components/ui/cartSummary";
import TextInputField from "@/components/ui/TextFields";
import { shippingFieldsConfig } from "@/constants/checkout-fields";

export interface CheckoutFormValues {
  email: string;
  firstName: string;
  lastName: string;
  company?: string;
  address: string;
  apartment?: string;
  city: string;
  state: string;
  zipCode: string;
  phone?: string;
  subscribe?: boolean;
}

const checkoutSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  company: Yup.string().optional(),
  address: Yup.string().required("Address is required"),
  apartment: Yup.string().optional(),
  city: Yup.string().required("City is required"),
  state: Yup.string().required("State is required"),
  zipCode: Yup.string().required("ZIP code is required"),
  phone: Yup.string().optional(),
  subscribe: Yup.boolean(),
});

const CheckoutPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormValues>({
    resolver: yupResolver(checkoutSchema) as any,
    defaultValues: {
      subscribe: false,
    },
  });

  const onSubmit = (data: CheckoutFormValues) => {
    console.log("✅ Form Data:", data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="min-h-screen bg-gray-100 p-4 flex flex-col-reverse lg:flex-row"
    >
      {/* Left Column */}
      <div className="w-full lg:w-2/3 bg-white p-6 rounded shadow">
        {/* Contact Info */}
        <section className="mb-6 space-y-2">
          <div className="flex justify-between mb-1">
            <h2 className="font-semibold text-sm">Contact information</h2>
            <p className="text-xs">
              Already have an account?{" "}
              <a href="#" className="text-blue-500">
                Log in
              </a>
            </p>
          </div>

          <TextInputField
            placeholder="Email"
            registration={register("email")}
            error={errors.email}
          />

          <label className="flex items-center gap-2 mt-2 text-xs text-gray-600">
            <input
              type="checkbox"
              className="checkbox checkbox-xs"
              {...register("subscribe")}
            />
            Email me with news and offers
          </label>
        </section>

        {/* Shipping Address */}
        <section className="space-y-4">
          <h2 className="font-semibold text-sm mb-1">Shipping address</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {shippingFieldsConfig.map((field) => (
              <TextInputField
                key={field.name}
                placeholder={field.placeholder}
                registration={register(field.name)}
                error={errors[field.name]}
              />
            ))}
          </div>
        </section>

        {/* Button Group */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-3">
          <a href="/shop" className="btn btn-outline btn-sm w-full text-center">
            Continue Shopping
          </a>
          <button type="submit" className="btn btn-primary btn-sm w-full">
            Place Order
          </button>
        </div>
      </div>

      {/* Right Column - Cart */}
      <div className="w-full lg:w-1/3 px-0 lg:px-4 py-2 lg:py-0">
        <CartSummary />
      </div>
    </form>
  );
};

export default CheckoutPage;
