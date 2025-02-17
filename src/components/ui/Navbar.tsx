"use client";

import { FC, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { CartButton } from "./CartButton";
import { MobileMenu } from "./MobileMenu";
import { IMenu } from "@/types/app";

const menuData: IMenu[] = [
  { name: "Home", link: "/" },
  { name: "Shop", link: "/shop" },
];

export const Navbar: FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full border-b bg-base-100">
      <div className="navbar max-w-7xl mx-auto bg-base-100 px-4">
        {/* 🔹 Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(true)}
            className="btn btn-ghost btn-circle"
          >
            <MenuIcon sx={{ fontSize: 28 }} />
          </button>
        </div>
        {/* 🔹 Logo Section */}
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">R7 Mart</a>
        </div>
        {/* 🔹 Desktop Menu */}
        <div className="hidden md:flex space-x-4">
          {menuData.map((menu) => (
            <a
              key={menu.name}
              href={menu.link}
              className="btn btn-ghost btn-sm rounded-btn"
            >
              {menu.name}
            </a>
          ))}
        </div>
        {/* 🔹 Cart Button */}
        <CartButton cartItemCount={8} />
      </div>
      {/* 🔹 Mobile Sidebar Menu */}
      <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen} menuData={menuData} />
    </div>
  );
};

export default Navbar;
