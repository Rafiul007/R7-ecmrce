"use client";

import { createContext, useState, useEffect } from "react";

interface ThemeContextType {
  theme: string;
  changeTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<string>("cupcake");

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") || "cupcake";
    setTheme(storedTheme);
    document.documentElement.setAttribute("data-theme", storedTheme);
  }, []);

  const changeTheme = () => {
    setTheme((prev) => {
      const nextTheme = prev === "cupcake" ? "cupcakeDark" : "cupcake";
      localStorage.setItem("theme", nextTheme);
      document.documentElement.setAttribute("data-theme", nextTheme);
      return nextTheme;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
