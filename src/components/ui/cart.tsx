"use client";

import Image from "next/image";
import { ICartItem } from "@/types";
import { FC } from "react";
import { useRouter } from "next/navigation";
interface CartProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  cartItems: ICartItem[];
  updateCart: (item: ICartItem) => void;
}

export const Cart: FC<CartProps> = ({
  open,
  setOpen,
  cartItems,
  updateCart,
}) => {
  const router = useRouter();
  const subtotal = cartItems
    .reduce((total, item) => total + item.price * item.quantity, 0)
    .toFixed(2);

  const handleQuantityChange = (item: ICartItem, change: number) => {
    const newQty = item.quantity + change;

    const updatedItem: ICartItem = {
      ...item,
      quantity: newQty,
    };

    updateCart(updatedItem);
  };

  //navigate to checkout page
  const handleNavigateToCheckout = () => {
    setOpen(false);
    router.push("/checkout");
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-end transition-opacity ${
        open ? "visible opacity-100" : "invisible opacity-0"
      }`}
    >
      <div
        className="fixed inset-0 bg-gray-500 bg-opacity-75"
        onClick={() => setOpen(false)}
      ></div>

      <div
        className={`w-full sm:w-96 bg-white shadow-xl p-6 flex flex-col h-full transition-transform transform ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center border-b pb-4">
          <h2 className="text-lg font-medium">Shopping Cart</h2>
          <button
            onClick={() => setOpen(false)}
            className="btn btn-ghost btn-circle"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto mt-4">
          {cartItems.length === 0 ? (
            <p className="text-center text-gray-500">Your cart is empty.</p>
          ) : (
            <ul className="space-y-4">
              {cartItems.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center space-x-4 border-b pb-4"
                >
                  <div className="relative w-16 h-16 rounded-md border overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{item.title}</h3>
                    <p className="text-sm text-gray-500">
                      {item.colors?.join(", ")}
                    </p>
                    <div className="flex items-center space-x-2 mt-1">
                      {item.quantity > 1 ? (
                        <button
                          onClick={() => handleQuantityChange(item, -1)}
                          className="btn btn-sm btn-outline"
                        >
                          -
                        </button>
                      ) : (
                        <button
                          onClick={() => updateCart({ ...item, quantity: 0 })}
                          className="btn btn-sm btn-outline"
                        >
                          x
                        </button>
                      )}
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(item, 1)}
                        className="btn btn-sm btn-outline"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <p className="font-medium">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="border-t pt-4 mt-4">
          <div className="flex justify-between text-lg font-medium">
            <p>Subtotal</p>
            <p>${subtotal}</p>
          </div>
          <button
            className="btn btn-primary w-full mt-4 hover:bg-primary/90"
            onClick={handleNavigateToCheckout}
          >
            Checkout
          </button>
          <button
            onClick={() => setOpen(false)}
            className="btn btn-outline w-full mt-2"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
