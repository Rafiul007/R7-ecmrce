"use client";

import { FC, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { CartButton } from "./CartButton";
import { MobileMenu } from "./MobileMenu";
import { IMenu } from "@/types/app";
import { Cart } from "./cart";
import { ICartItem } from "@/types/product";
import { usePathname } from "next/navigation";
import { cartItems as initialCartItems } from "@/data/products"; // Renamed to avoid conflict

const menuData: IMenu[] = [
  { name: "Home", link: "/" },
  { name: "Shop", link: "/shop" },
  { name: "Categories", link: "/categories" },
];

export const Navbar: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<ICartItem[]>(() => [
    ...initialCartItems,
  ]); // Corrected

  const pathname = usePathname();

  const updateCart = (item: ICartItem) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id);
      if (existingItem) {
        return prevItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        return [...prevItems, item];
      }
    });
  };

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <div className="w-full border-b bg-base-100">
      <div className="navbar max-w-7xl mx-auto bg-base-100 px-4">
        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(true)}
            className="btn btn-ghost btn-circle"
          >
            <MenuIcon sx={{ fontSize: 28 }} />
          </button>
        </div>
        {/* Logo Section */}
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">R7 Mart</a>
        </div>
        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 mx-4">
          {menuData.map((menu) => (
            <a
              key={menu.name}
              href={menu.link}
              className={`text-base text-gray-700 font-medium relative group transition-colors duration-300 py-2 ${
                pathname === menu.link ? "text-blue-600" : "hover:text-blue-500"
              }`}
            >
              {menu.name}
              {pathname === menu.link && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 rounded"></span>
              )}
            </a>
          ))}
        </div>
        {/* Cart Button */}
        <CartButton
          cartItemCount={totalItems}
          onClick={() => setCartOpen(true)}
        />
      </div>

      {/* Mobile Sidebar Menu */}
      <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen} menuData={menuData} />

      {/* Cart Component */}
      <Cart
        open={cartOpen}
        setOpen={setCartOpen}
        cartItems={cartItems}
        updateCart={updateCart}
      />
    </div>
  );
};

export default Navbar;
