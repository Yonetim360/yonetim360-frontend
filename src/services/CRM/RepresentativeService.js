const { default: BaseService } = require("../BaseService");

class RepresentativeService extends BaseService {
  constructor() {
    super("representatives");
  }

  async getRepresentatives(forceRefresh = false) {
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
      const response = await authenticatedFetch(
        `${this.baseURL}/representatives`
      );

      if (!response.ok) throw new Error("Failed to fetch representatives");

      const data = await response.json();
      this.cache = data;
      this.cacheTime = Date.now();

      return data;
    } catch (error) {
      console.error("Temsilci verileri yüklenemedi:", error);
      throw error;
    } finally {
      this.isLoading = false;
    }
  }

  async getRepresentativeById(id) {
    await this.ensureAuth();

    try {
      const authenticatedFetch = this.getAuthenticatedFetch();
      const response = await authenticatedFetch(
        `${this.baseURL}/representative/${id}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const representative = await response.json();
      return representative;
    } catch (error) {
      console.error("Temsilci verileri yüklenemedi:", error);
      throw error;
    }
  }

  async createRepresentative(representativeData) {
    await this.ensureAuth();

    try {
      const authenticatedFetch = this.getAuthenticatedFetch();
      const userId = this.getUserId();

      if (!userId) {
        throw new Error(
          "You are not authorized to create a new representative."
        );
      }

      const dataToSend = {
        ...representativeData,
        userId,
      };

      const response = await authenticatedFetch(
        `${this.baseURL}/representatives`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToSend),
        }
      );

      if (!response.ok) {
        throw new Error(`Sunucu hatası: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Temsilci oluşturulamadı:", error);
      throw error;
    }
  }

  async updateRepresentative(representativeData) {
    await this.ensureAuth();

    try {
      const authenticatedFetch = this.getAuthenticatedFetch();
      const response = await authenticatedFetch(
        `${this.baseURL}/representative`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(representativeData),
        }
      );

      if (!response.ok) {
        throw new Error(`Sunucu hatası: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Temsilci güncellenemedi:", error);
      throw error;
    }
  }

  async deleteRepresentative(id) {
    await this.ensureAuth();

    try {
      const authenticatedFetch = this.getAuthenticatedFetch();
      const response = await authenticatedFetch(
        `${this.baseURL}/representatives/${id}`,
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
      return data;
    } catch (error) {
      console.error("Temsilci silinemedi:", error);
      throw error;
    }
  }
}

export const representativeService = new RepresentativeService();
