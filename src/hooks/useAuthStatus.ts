"use client";

import { useEffect, useState } from "react";

export function useAuthStatus() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // localStorage is browser-only
    const token = localStorage.getItem("access_token");

    setIsAuthenticated(Boolean(token));
    setLoading(false);
  }, []);

  return {
    isAuthenticated,
    loading,
  };
}
