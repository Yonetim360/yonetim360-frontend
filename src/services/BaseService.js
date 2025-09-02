import useAuthStore from "@/stores/shared/AuthStore";

class BaseService {
  constructor() {
    this.baseURL = `${process.env.NEXT_PUBLIC_FRONTEND_BASE_URL}/api`;
    this.cache = null;
    this.cacheTime = null;
    this.isLoading = false;
  }

  getAuthenticatedFetch() {
    return useAuthStore.getState().authenticatedFetch;
  }

  getUserId() {
    console.log(useAuthStore.getState().accessToken);

    return useAuthStore.getState().user.userId;
  }

  // Token'ın geçerli olduğundan emin ol
  async ensureAuth() {
    const { ensureValidToken, isAuthenticated, user } = useAuthStore.getState();

    // Eğer user yoksa, token'ı yenilemeye çalış
    if (!user || !isAuthenticated) {
      try {
        await ensureValidToken();

        // Token yenilendikten sonra user kontrolü
        const updatedState = useAuthStore.getState();
        if (!updatedState.user || !updatedState.isAuthenticated) {
          throw new Error("Authentication required");
        }
      } catch (error) {
        throw new Error("Authentication failed: " + error.message);
      }
    }
  }

  // Cache kontrolü
  isCacheValid() {
    if (!this.cache || !this.cacheTime) return false;

    // 5 dakika cache süresi
    const CACHE_DURATION = 5 * 60 * 1000;
    return Date.now() - this.cacheTime < CACHE_DURATION;
  }

  // Cache'i temizle
  clearCache() {
    this.cache = null;
    this.cacheTime = null;
  }
}

export default BaseService;
