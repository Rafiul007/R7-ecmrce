"use client";

import { FC } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

interface CartButtonProps {
  cartItemCount: number;
}

export const CartButton: FC<CartButtonProps> = ({ cartItemCount }) => {
  return (
    <div className="relative">
      <button className="btn btn-ghost btn-circle btn-sm">
        <ShoppingCartIcon />
      </button>

      {/* 🔹 Cart Item Count Badge */}
      {cartItemCount > 0 && (
        <span className="absolute top-0 right-0 -mt-1 -mr-1 bg-brand text-white text-xs font-bold px-1 py-0 rounded-full">
          {cartItemCount}
        </span>
      )}
    </div>
  );
};
