import useAuthStore from "@/stores/shared/AuthStore";

class CustomerService {
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

  // Müşterileri getir
  async getCustomers(forceRefresh = false) {
    // Önce authentication'ı kontrol et
    await this.ensureAuth();

    if (!forceRefresh && this.isCacheValid()) {
      return this.cache;
    }

    if (this.isLoading) {
      await new Promise((resolve) => {
        const checkLoading = () => {
          if (!this.isLoading) {
            resolve();
          } else {
            setTimeout(checkLoading, 100);
          }
        };
        checkLoading();
      });
      return this.cache;
    }

    try {
      this.isLoading = true;

      const authenticatedFetch = this.getAuthenticatedFetch();
      const response = await authenticatedFetch(`${this.baseURL}/customers`);

      if (!response.ok) throw new Error("Failed to fetch customers");

      const data = await response.json();
      this.cache = data;
      this.cacheTime = Date.now();

      return data;
    } catch (error) {
      console.error("Müşteri verileri yüklenemedi:", error);
      throw error;
    } finally {
      this.isLoading = false;
    }
  }

  // Müşteri bilgilerini getir
  getCustomerById = async (id) => {
    await this.ensureAuth();

    try {
      const authenticatedFetch = this.getAuthenticatedFetch();
      const response = await authenticatedFetch(
        `${this.baseURL}/customers/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const customer = await response.json();

      // Validate the response structure
      if (!customer || !customer.id) {
        throw new Error("Invalid customer data received");
      }

      return customer;
    } catch (error) {
      console.error("Error fetching customer:", error);
      throw error;
    }
  };

  // Yeni müşteri oluştur
  async createCustomer(customerData) {
    await this.ensureAuth();

    try {
      const authenticatedFetch = this.getAuthenticatedFetch();

      const userId = this.getUserId();

      if (!userId) {
        throw new Error("You are not authorized to create a new customer.");
      }

      const dataToSend = {
        ...customerData,
        userId,
      };

      const response = await authenticatedFetch(`${this.baseURL}/customers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        throw new Error(`Sunucu hatası: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);

      // Cache'i temizle (yeni veri var)
      this.clearCache();

      return data;
    } catch (error) {
      console.error("Müşteri oluşturulamadı:", error);
      throw error;
    }
  }

  // Müşteri güncelle
  async updateCustomer(customerData) {
    await this.ensureAuth();

    try {
      const authenticatedFetch = this.getAuthenticatedFetch();

      const userId = this.getUserId();

      if (!userId) {
        throw new Error("You are not authorized to update this customer.");
      }

      const dataToSend = {
        ...customerData,
        userId,
      };

      const response = await authenticatedFetch(`${this.baseURL}/customers`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        throw new Error(`Sunucu hatası: ${response.status}`);
      }

      const data = await response.json();

      // Cache'i temizle
      this.clearCache();

      return data;
    } catch (error) {
      console.error("Müşteri güncellenemedi:", error);
      throw error;
    }
  }

  // Müşteri sil
  async deleteCustomer(id) {
    await this.ensureAuth();

    try {
      const authenticatedFetch = this.getAuthenticatedFetch();
      const response = await authenticatedFetch(
        `${this.baseURL}/customers/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Sunucu hatası: ${response.status}`);
      }

      const data = await response.json();

      // Cache'i temizle
      this.clearCache();

      return data;
    } catch (error) {
      console.error("Müşteri silinemedi:", error);
      throw error;
    }
  }

  // Cache'i temizle
  clearCache() {
    this.cache = null;
    this.cacheTime = null;
  }
}

// Singleton instance
export const customerService = new CustomerService();
