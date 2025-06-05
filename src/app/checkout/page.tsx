"use client";

import React from "react";
import { Resolver, useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";

import CartSummary from "@/components/ui/cartSummary";
import { shippingFieldsConfig } from "@/constants/checkout-fields";
import { CheckoutFormValues } from "@/types/checkout";
import RHFTextField from "@/components/ui/Rhf-TextFields";
import { useCartStore } from "@/store/cartStore";
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
  const router = useRouter();
  const clearCart = useCartStore((state) => state.clearCart);
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm<CheckoutFormValues>({
    mode: "onChange",
    resolver: yupResolver(
      checkoutSchema
    ) as unknown as Resolver<CheckoutFormValues>,
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      company: "",
      address: "",
      apartment: "",
      city: "",
      state: "",
      zipCode: "",
      phone: "",
      subscribe: false,
    },
  });

  const onSubmit = (data: CheckoutFormValues) => {
    const cartItems = useCartStore.getState().cart;

    const orderPayload = {
      customer: { ...data },
      items: cartItems.map((item) => ({
        id: item.id,
        title: item.title,
        quantity: item.quantity,
        price: item.price,
      })),
      totalAmount: cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      ),
    };

    console.log("📦 Order Payload:", orderPayload);

    reset();
    clearCart();
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

          <RHFTextField
            name="email"
            control={control}
            placeholder="Email"
            label="Email Address"
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
              <RHFTextField
                key={field.name as string}
                name={field.name as keyof CheckoutFormValues}
                control={control}
                placeholder={field.placeholder}
              />
            ))}
          </div>
        </section>

        {/* Button Group */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => router.push("/shop")}
            className="btn btn-outline btn-sm w-full"
          >
            Continue Shopping
          </button>
          <button
            type="submit"
            className="btn btn-primary btn-sm w-full"
            disabled={!isValid}
          >
            Place Order
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Note: By placing your order, you agree to our{" "}
          <a href="#" className="text-blue-500">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="text-blue-500">
            Privacy Policy
          </a>
          .
        </p>
      </div>

      {/* Right Column - Cart Summary */}
      <div className="w-full lg:w-1/3 px-0 lg:px-4 py-2 lg:py-0">
        <CartSummary />
      </div>
    </form>
  );
};

export default CheckoutPage;

// Test for lint and prettier on pr
