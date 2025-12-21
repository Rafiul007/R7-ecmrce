"use client";

import { FC, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { CartButton } from "./CartButton";
import { MobileMenu } from "./MobileMenu";
import { Cart } from "./cart";

import { IMenu } from "@/types/app";
import { useCartStore } from "@/store/cartStore";
import { useAuth } from "@/hooks/useAuth";

const menuData: IMenu[] = [
  { name: "Home", link: "/" },
  { name: "Shop", link: "/shop" },
  { name: "Categories", link: "/categories" },
];

export const Navbar: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const pathname = usePathname();
  const { user, logout } = useAuth();

  // Cart state (Zustand)
  const cartItems = useCartStore((state) => state.cart);
  const updateCart = useCartStore((state) => state.updateItem);

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <header className="w-full border-b bg-base-100">
      <div className="navbar max-w-7xl mx-auto px-4">
        {/* ===== LEFT ===== */}
        <div className="navbar-start">
          {/* Mobile menu */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(true)}
              className="btn btn-ghost btn-circle"
            >
              <MenuIcon sx={{ fontSize: 28 }} />
            </button>
          </div>

          {/* Logo */}
          <Link href="/" className="btn btn-ghost text-xl">
            R7 Mart
          </Link>
        </div>

        {/* ===== CENTER ===== */}
        <div className="navbar-center hidden md:flex">
          <nav className="flex space-x-6">
            {menuData.map((menu) => (
              <Link
                key={menu.name}
                href={menu.link}
                className={`relative py-2 font-medium transition-colors ${
                  pathname === menu.link
                    ? "text-blue-600"
                    : "text-gray-700 hover:text-blue-500"
                }`}
              >
                {menu.name}
                {pathname === menu.link && (
                  <span className="absolute bottom-0 left-0 h-0.5 w-full bg-blue-600 rounded" />
                )}
              </Link>
            ))}
          </nav>
        </div>

        {/* ===== RIGHT ===== */}
        <div className="navbar-end flex items-center gap-4">
          {/* Cart */}
          <CartButton
            cartItemCount={totalItems}
            onClick={() => setCartOpen(true)}
          />

          {/* Auth */}
          {user ? (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-9 rounded-full bg-neutral text-neutral-content flex items-center justify-center">
                  <span className="text-sm font-semibold">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                </div>
              </label>

              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box shadow mt-3 w-48"
              >
                <li className="px-4 py-2 text-sm font-medium">{user.name}</li>
                <li>
                  <Link href="/profile">Profile</Link>
                </li>
                <li>
                  <button onClick={logout}>Logout</button>
                </li>
              </ul>
            </div>
          ) : (
            <>
              <Link href="/login" className="btn btn-outline btn-sm">
                Login
              </Link>
              <Link href="/signup" className="btn btn-primary btn-sm">
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>

      {/* ===== OVERLAYS ===== */}
      <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen} menuData={menuData} />

      <Cart
        open={cartOpen}
        setOpen={setCartOpen}
        cartItems={cartItems}
        updateCart={updateCart}
      />
    </header>
  );
};

export default Navbar;
