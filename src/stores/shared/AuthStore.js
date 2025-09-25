const { create } = require("zustand");

const useAuthStore = create((set, get) => ({
  //states
  isAuthenticated: false,
  accessToken: null,
  user: null,
  loading: false,
  error: null,
  isRefreshing: false, // Token yenileme durumunu takip et

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

  // Me endpoint'i için yeni action
  fetchUser: async () => {
    try {
      const response = await get().authenticatedFetch("/api/auth/me", {
        method: "GET",
      });

      if (response.ok) {
        const { user } = await response.json();
        console.log("Fetched user!!!!");

        set({ user });
        return user;
      } else {
        throw new Error("Failed to fetch user");
      }
    } catch (error) {
      console.error("Fetch user error:", error);
      throw error;
    }
  },

  refreshToken: async () => {
    const { isRefreshing, logout } = get();

    // Eğer zaten refresh işlemi devam ediyorsa, bekle
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        const checkRefresh = () => {
          const state = get();
          if (!state.isRefreshing) {
            if (state.accessToken) {
              resolve(state.accessToken);
            } else {
              reject(new Error("Refresh failed"));
            }
          } else {
            setTimeout(checkRefresh, 100);
          }
        };
        checkRefresh();
      });
    }

    set({ isRefreshing: true });

    try {
      const response = await fetch("/api/auth/refresh", {
        method: "POST",
        credentials: "include", // RefreshToken cookie gönderilir
      });

      if (response.ok) {
        const { accessToken, user } = await response.json();
        set({
          accessToken,
          user,
          isAuthenticated: true,
          isRefreshing: false,
        });
        return accessToken;
      } else {
        // RefreshToken geçersiz, logout yap
        set({
          isAuthenticated: false,
          user: null,
          accessToken: null,
          isRefreshing: false,
        });
        throw new Error("Refresh failed");
      }
    } catch (error) {
      logout();
      set({
        isAuthenticated: false,
        user: null,
        accessToken: null,
        isRefreshing: false,
      });
      throw error;
    }
  },

  authenticatedFetch: async (url, options = {}) => {
    let { accessToken } = get();
    const { refreshToken } = get();

    const makeRequest = async (token) => {
      const headers = {
        "Content-Type": "application/json",
        ...options.headers,
      };

      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      return await fetch(url, {
        ...options,
        headers,
        credentials: "include",
      });
    };

    // İlk deneme - mevcut token ile
    if (accessToken) {
      const response = await makeRequest(accessToken);

      // Eğer token geçerliyse, response'u döndür
      if (response.status !== 401) {
        return response;
      }
    }

    // Token yoksa veya 401 geldiyse, refresh token ile yenile
    try {
      console.log("Token yenileniyor...");
      const newToken = await refreshToken();
      console.log("Yeni token alındı:", !!newToken);

      // Yeni token ile tekrar dene
      return await makeRequest(newToken);
    } catch (refreshError) {
      console.error("Token yenileme başarısız:", refreshError);
      throw new Error("Access token expired and refresh failed");
    }
  },

  // Sayfa yüklendiğinde auth durumunu kontrol et
  initializeAuth: async () => {
    const { accessToken, user, isRefreshing } = get();

    // Eğer zaten token ve user varsa, initialize etmeye gerek yok
    if (accessToken && user) {
      set({ isAuthenticated: true });
      return;
    }

    // Eğer refresh işlemi devam ediyorsa, bekle
    if (isRefreshing) {
      return;
    }

    try {
      set({ loading: true });
      const newToken = await get().refreshToken();
      if (newToken) {
        console.log("[v0] Auth initialized successfully");
      }
    } catch (error) {
      console.log("[v0] Auth initialization failed:", error);
    } finally {
      set({ loading: false });
    }
  },

  // Token'ın geçerli olup olmadığını kontrol et
  ensureValidToken: async () => {
    const { accessToken, user } = get();

    // Token ve user varsa, geçerli kabul et
    if (accessToken && user) {
      return accessToken;
    }

    // Token yoksa veya user yoksa, refresh et
    return await get().refreshToken();
  },
}));

export default useAuthStore;
