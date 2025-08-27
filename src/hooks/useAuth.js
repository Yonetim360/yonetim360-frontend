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
    isRefreshing,
    login,
    logout,
    refreshToken,
    initializeAuth,
    authenticatedFetch,
    ensureValidToken,
  } = useAuthStore();

  // Uygulama başlangıcında auth durumunu kontrol et
  useEffect(() => {
    // Eğer zaten token ve user varsa, initialize etmeye gerek yok
    if (accessToken && user) {
      return;
    }

    console.log("[v0] Initializing auth on component mount");
    initializeAuth();
  }, []); // sadece mountta çalışacak

  // Auth durumunu izle ve gerekirse user bilgisini al
  useEffect(() => {
    const handleAuthState = async () => {
      // Eğer token var ama user yok ve refresh işlemi devam etmiyorsa
      if (accessToken && !user && !isRefreshing && !loading) {
        console.log("[v0] Token var ama user yok, token yeniliyor...");
        try {
          await ensureValidToken();
        } catch (error) {
          console.error("[v0] Token yenileme hatası:", error);
        }
      }
    };

    handleAuthState();
  }, [accessToken, user, isRefreshing, loading, ensureValidToken]);

  return {
    // State
    accessToken,
    user,
    isAuthenticated,
    loading,
    error,
    isRefreshing, // Token yenileme durumu

    // Actions
    login,
    logout,
    refreshToken,
    authenticatedFetch,

    // Utility
    initializeAuth,
    ensureValidToken,
  };
}
