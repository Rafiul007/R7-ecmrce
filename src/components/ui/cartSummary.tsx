"use client";

import React from "react";
import { useCartStore } from "@/store/cartStore"; // Adjust path if needed
import Image from "next/image";

const TextInput = ({ placeholder }: { placeholder: string }) => (
  <input
    type="text"
    placeholder={placeholder}
    className="input input-bordered input-sm w-full"
  />
);

const CartSummary = () => {
  const { cart } = useCartStore();

  const subtotal = cart
    .reduce((total, item) => total + item.price * item.quantity, 0)
    .toFixed(2);

  return (
    <div className="bg-white p-5 rounded shadow space-y-6">
      {/* Products List */}
      {cart.length === 0 ? (
        <p className="text-center text-gray-500 text-sm">Your cart is empty.</p>
      ) : (
        cart.map((item) => (
          <div key={item.id} className="flex items-center space-x-4">
            <div className="w-14 h-14 bg-gray-100 rounded overflow-hidden relative">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-xs leading-tight line-clamp-2">
                {item.title}
              </h3>
              {item.colors?.length && (
                <p className="text-gray-500 text-[11px]">
                  {item.colors.join(", ")}
                </p>
              )}
              <p className="text-[11px] text-gray-400">Qty: {item.quantity}</p>
            </div>
            <p className="font-medium text-sm">
              ${(item.price * item.quantity).toFixed(2)}
            </p>
          </div>
        ))
      )}

      {/* Gift Card Input */}
      <div className="space-y-2">
        <TextInput placeholder="Gift card" />
        <button className="btn btn-outline btn-sm w-full">Apply</button>
      </div>

      {/* Subtotal */}
      <div className="border-t pt-4 text-sm">
        <div className="flex justify-between">
          <p>Subtotal</p>
          <p>${subtotal}</p>
        </div>
        <p className="text-xs text-gray-500 mt-1">
          ** Expedited orders cannot be shipped on weekends or to PO Box.
        </p>
      </div>

      {/* Total */}
      <div className="flex justify-between items-center mt-4 font-semibold text-base">
        <p>Total</p>
        <p>USD ${subtotal}</p>
      </div>
    </div>
  );
};

export default CartSummary;
