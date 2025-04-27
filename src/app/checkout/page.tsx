"use client";

import CartSummary from "@/components/ui/cartSummary";
import React from "react";

// Reusable Input (small)
const TextInput = ({ placeholder }: { placeholder: string }) => (
  <input
    type="text"
    placeholder={placeholder}
    className="input input-bordered input-sm w-full"
  />
);

function CheckoutPage() {
  // 📦 List of fields for mapping
  const shippingFields = [
    "First name",
    "Last name",
    "Company (optional)",
    "Address",
    "Apartment, suite, etc. (optional)",
    "City",
    "State",
    "ZIP code",
    "Phone (optional)",
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex flex-col lg:flex-row">
      {/* Left Side - Form */}
      <div className="w-full lg:w-2/3 bg-white p-6 rounded shadow">
        {/* Logo and Steps */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold">allbirds</h1>
          <p className="text-xs text-gray-500 mt-1">
            Information &gt; Shipping &gt; Payment
          </p>
        </div>

        {/* Express Checkout */}
        <div className="space-y-4 mb-6">
          <h2 className="font-semibold text-sm">Express checkout</h2>
          <div className="flex flex-wrap gap-2">
            <button className="btn btn-sm bg-purple-600 text-white">
              Shop Pay
            </button>
            <button className="btn btn-sm bg-yellow-400 text-black">
              Amazon Pay
            </button>
            <button className="btn btn-sm bg-black text-white">
              Apple Pay
            </button>
            <button className="btn btn-sm bg-blue-600 text-white">
              PayPal
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-grow h-px bg-gray-300"></div>
          <span className="px-4 text-gray-400 text-xs">OR</span>
          <div className="flex-grow h-px bg-gray-300"></div>
        </div>

        {/* Contact Information */}
        <div className="mb-6 space-y-2">
          <div className="flex justify-between mb-1">
            <h2 className="font-semibold text-sm">Contact information</h2>
            <p className="text-xs">
              Already have an account?{" "}
              <a href="#" className="text-blue-500">
                Log in
              </a>
            </p>
          </div>
          <TextInput placeholder="Email" />
          <div className="flex items-center mt-1">
            <input type="checkbox" className="checkbox checkbox-xs" />
            <span className="ml-2 text-xs text-gray-600">
              Email me with news and offers
            </span>
          </div>
        </div>

        {/* Shipping Address */}
        <div className="space-y-4">
          <h2 className="font-semibold text-sm mb-1">Shipping address</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {shippingFields.map((field, index) => (
              <TextInput key={index} placeholder={field} />
            ))}
          </div>
        </div>

        {/* Continue Button */}
        <div className="mt-6">
          <button className="btn btn-primary btn-sm w-full">
            Continue to Shipping
          </button>
        </div>
      </div>

      {/* Right Side - Cart Summary */}
      <div className="w-full lg:w-1/3 p-6">
        <CartSummary />
      </div>
    </div>
  );
}

export default CheckoutPage;
