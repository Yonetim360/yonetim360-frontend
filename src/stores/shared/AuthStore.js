const { create } = require("zustand");

const useAuthStore = create((set, get) => ({
  //states
  isAuthenticated: false,
  accessToken: null,
  user: null,
  loading: false,
  error: null,

  //actions
  login: async (email, password, rememberMe) => {
    set({ loading: true });

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_FRONTEND_BASE_URL}/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
            rememberMe,
          }),
          credentials: "include",
        }
      );

      const { accessToken, user } = await response.json();

      set({ accessToken, user, isAuthenticated: true });
      console.log(accessToken);
    } catch (error) {
      set({ error });
    } finally {
      set({ loading: false });
    }
  },

  logout: async () => {
    await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    set({ isAuthenticated: false, user: null, accessToken: null });
  },

  refreshToken: async () => {
    try {
      const response = await fetch("/api/auth/refresh", {
        method: "POST",
        credentials: "include", // RefreshToken cookie gönderilir
      });

      if (response.ok) {
        const { accessToken, user } = await response.json();
        set({ accessToken, user, isAuthenticated: true });
        return accessToken;
      } else {
        // RefreshToken geçersiz, logout yap
        set({ isAuthenticated: false, user: null, accessToken: null });
        throw new Error("Refresh failed");
      }
    } catch (error) {
      set({ isAuthenticated: false, user: null, accessToken: null });
      throw error;
    }
  },
  authenticatedFetch: async (url, options = {}) => {
    const { accessToken } = get();

    const headers = {
      "Content-Type": "application/json",
      ...options.headers,
    };

    if (accessToken) {
      headers.Authorization = `Bearer ${accessToken}`;
    }

    let response = await fetch(url, {
      ...options,
      headers,
      credentials: "include",
    });

    // Token expired ise refresh et ve tekrar dene
    if (response.status === 401 && accessToken) {
      const refreshSuccess = await refreshToken();
      if (!refreshSuccess) {
        // Token yenilenemedi, kullanıcıyı logout edebilirsin veya hata throw et
        throw new Error("Access token expired and refresh failed");
      }
      const newToken = get().accessToken;
      headers.Authorization = `Bearer ${newToken}`;
      response = await fetch(url, {
        ...options,
        headers,
        credentials: "include",
      });
    }

    return response;
  },

  // Sayfa yüklendiğinde auth durumunu kontrol et
  initializeAuth: async () => {
    const success = await get().refreshToken();
    if (!success) {
      console.log("[v0] No valid refresh token found");
    }
  },
}));

export default useAuthStore;
