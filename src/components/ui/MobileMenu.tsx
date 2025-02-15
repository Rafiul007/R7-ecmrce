"use client";

import { IMenu } from "@/types/app";
import { FC } from "react";

interface MobileMenuProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  menuData: IMenu[];
}

export const MobileMenu: FC<MobileMenuProps> = ({ isOpen, setIsOpen, menuData }) => {
  return (
    <>
      {/* Overlay Background */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsOpen(false)}
      ></div>

      {/* Sidebar Menu */}
      <div
        className={`fixed left-0 top-0 w-64 h-full bg-white shadow-lg z-50 transform transition-transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Menu</h2>
          <button onClick={() => setIsOpen(false)} className="btn btn-ghost btn-circle">
            ✕
          </button>
        </div>

        {/* Menu Items */}
        <nav className="flex flex-col space-y-4 p-4">
          {menuData.map((menu) => (
            <a key={menu.name} href={menu.link} className="btn btn-ghost btn-block text-left">
              {menu.name}
            </a>
          ))}
        </nav>
      </div>
    </>
  );
};
