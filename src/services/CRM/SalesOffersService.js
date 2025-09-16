import BaseService from "../BaseService";

class SalesOffersService extends BaseService {
  constructor() {
    super("sales-offers");
  }

  // Müşterileri getir
  async getOffers(forceRefresh = false) {
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
      const response = await authenticatedFetch(`${this.baseURL}/offers`);

      if (!response.ok) throw new Error("Failed to fetch offers");

      const data = await response.json();
      this.cache = data;
      this.cacheTime = Date.now();

      return data;
    } catch (error) {
      console.error("Teklif verileri yüklenemedi:", error);
      throw error;
    } finally {
      this.isLoading = false;
    }
  }

  // Müşteri bilgilerini getir
  getOfferById = async (id) => {
    await this.ensureAuth();

    try {
      const authenticatedFetch = this.getAuthenticatedFetch();
      const response = await authenticatedFetch(
        `${this.baseURL}/offers/${id}`,
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
  async createOffer(offerData) {
    await this.ensureAuth();

    try {
      const authenticatedFetch = this.getAuthenticatedFetch();

      const userId = this.getUserId();

      if (!userId) {
        throw new Error("You are not authorized to create a new customer.");
      }

      const dataToSend = {
        ...offerData,
        userId,
      };

      const response = await authenticatedFetch(`${this.baseURL}/offers`, {
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
  async updateOffer(offerData) {
    await this.ensureAuth();

    try {
      const authenticatedFetch = this.getAuthenticatedFetch();

      const userId = this.getUserId();

      if (!userId) {
        throw new Error("You are not authorized to update this customer.");
      }

      const dataToSend = {
        ...offerData,
        userId,
      };

      const response = await authenticatedFetch(`${this.baseURL}/offers`, {
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
  async deleteOffer(id) {
    await this.ensureAuth();

    try {
      const authenticatedFetch = this.getAuthenticatedFetch();
      const response = await authenticatedFetch(
        `${this.baseURL}/offers/${id}`,
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
}

// Singleton instance
export const salesOffersService = new SalesOffersService();
