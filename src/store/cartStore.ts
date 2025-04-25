import { ICartItem } from "@/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartState {
  cart: ICartItem[];
  notification: string | null;
  addToCart: (item: ICartItem) => void;
  removeFromCart: (id: number) => void;
  updateItem: (item: ICartItem) => void;
  clearCart: () => void;
  clearNotification: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],
      notification: null,

      addToCart: (item) => {
        const { cart } = get();
        const existingItem = cart.find((i) => i.id === item.id);

        if (existingItem) {
          set({
            cart: cart.map((i) =>
              i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
            ),
          });
        } else {
          set({ cart: [...cart, { ...item, quantity: 1 }] });
        }

        set({ notification: `${item.title} added to cart!` });
        setTimeout(() => set({ notification: null }), 3000);
      },

      removeFromCart: (id) => {
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== id),
        }));
      },

      updateItem: (item) => {
        set((state) => {
          if (item.quantity <= 0) {
            return {
              cart: state.cart.filter((i) => i.id !== item.id),
            };
          }

          const updatedCart = state.cart.map((cartItem) =>
            cartItem.id === item.id
              ? { ...cartItem, quantity: item.quantity }
              : cartItem
          );

          console.log("🧠 Final updated cart:", updatedCart);

          return {
            cart: updatedCart,
          };
        });
      },

      clearCart: () => set({ cart: [] }),
      clearNotification: () => set({ notification: null }),
    }),
    {
      name: "cart-storage",
    }
  )
);
