"use client";

import useAuthStore from "@/stores/shared/AuthStore";
import { useEffect } from "react";

/**
 * useAuth Hook - Authentication işlemleri için custom hook
 *
 * Bu hook şu işlevleri sağlar:
 * 1. Auth state'ine erişim (accessToken, user, isAuthenticated, isLoading)
 * 2. Auth actions'lara erişim (login, logout, refreshToken)
 * 3. Otomatik auth durumu kontrolü (sayfa yüklendiğinde)
 * 4. Authenticated fetch fonksiyonu (otomatik token yenileme ile)
 *
 * Kullanım:
 * const { isAuthenticated, user, login, logout, authenticatedFetch } = useAuth()
 */
export function useAuth() {
  const {
    accessToken,
    user,
    loading,
    error,
    isAuthenticated,
    login,
    logout,
    refreshToken,
    initializeAuth,
    authenticatedFetch,
  } = useAuthStore();

  // Uygulama başlangıcında auth durumunu kontrol et
  useEffect(() => {
    console.log("[v0] Initializing auth on component mount");
    initializeAuth();
  }, [initializeAuth]);

  return {
    // State
    accessToken,
    user,
    isAuthenticated,
    loading,
    error,

    // Actions
    login,
    logout,
    refreshToken,
    authenticatedFetch,

    // Utility
    initializeAuth,
  };
}
