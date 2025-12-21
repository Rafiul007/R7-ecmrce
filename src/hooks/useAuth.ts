"use client";

import { useEffect, useState } from "react";

export type User = {
  id: string;
  name: string;
  email: string;
};

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 🔁 replace later with API / NextAuth / JWT
    const fakeUser = {
      id: "1",
      name: "Danish",
      email: "danish@example.com",
    };

    // simulate auth check
    setTimeout(() => {
      setUser(fakeUser); // or null
      setLoading(false);
    }, 300);
  }, []);

  const logout = () => {
    setUser(null);
  };

  return {
    user,
    loading,
    isAuthenticated: !!user,
    logout,
  };
};
