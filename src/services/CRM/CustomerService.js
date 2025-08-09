class CustomerService {
  constructor() {
    this.baseURL = `${process.env.NEXT_PUBLIC_FRONTEND_BASE_URL}/api`;
    this.cache = null;
    this.cacheTime = null;
    this.isLoading = false;
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
    // Cache'den döndür (eğer geçerliyse ve force refresh yoksa)
    if (!forceRefresh && this.isCacheValid()) {
      return this.cache;
    }

    // Zaten yükleniyor mu?
    if (this.isLoading) {
      // Yüklenene kadar bekle
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

      const response = await fetch(`${this.baseURL}/customers`);

      // Cache'e kaydet
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
    try {
      const response = await fetch(`/api/customers/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

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
    try {
      const response = await fetch(`${this.baseURL}/customers`, {
        method: "POST",
        body: JSON.stringify(customerData),
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
  async updateCustomer(id, customerData) {
    const sendToData = { ...customerData, id: id };

    try {
      const response = await fetch(
        `${this.baseURL}/customers/${id}`,
        sendToData,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(customerData),
        }
      );

      // Cache'i temizle
      this.clearCache();

      return response.data;
    } catch (error) {
      console.error("Müşteri güncellenemedi:", error);
      throw error;
    }
  }

  // Müşteri sil
  async deleteCustomer(id) {
    try {
      const response = await fetch(`${this.baseURL}/customers/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Cache'i temizle
      this.clearCache();

      const data = await response.json();
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
