const { default: BaseService } = require("../BaseService");

class SupportService extends BaseService {
  constructor() {
    super("support");
  }

  async getSupportTickets(forceRefresh = false) {
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
      const response = await authenticatedFetch(`${this.baseURL}/support`);

      if (!response.ok) throw new Error("Failed to fetch support tickets");

      const data = await response.json();
      this.cache = data;
      this.cacheTime = Date.now();

      return data;
    } catch (error) {
      console.error("Destek talepleri yüklenemedi:", error);
      throw error;
    } finally {
      this.isLoading = false;
    }
  }

  async getSupportTicketById(id) {
    await this.ensureAuth();

    try {
      const authenticatedFetch = this.getAuthenticatedFetch();
      const response = await authenticatedFetch(
        `${this.baseURL}/support/${id}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const ticket = await response.json();
      return ticket;
    } catch (error) {
      console.error("Destek talebi verileri yüklenemedi:", error);
      throw error;
    }
  }

  async createSupportTicket(supportTicketData) {
    await this.ensureAuth();

    try {
      const authenticatedFetch = this.getAuthenticatedFetch();
      const userId = this.getUserId();

      if (!userId) {
        throw new Error(
          "You are not authorized to create a new support ticket."
        );
      }

      const dataToSend = {
        ...supportTicketData,
        userId,
      };

      const response = await authenticatedFetch(`${this.baseURL}/support`, {
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
      return data;
    } catch (error) {
      console.error("Destek talebi oluşturulamadı:", error);
      throw error;
    }
  }

  async updateSupportTicket(supportTicketData) {
    await this.ensureAuth();

    try {
      const userId = this.getUserId();

      if (!userId) {
        throw new Error(
          "You are not authorized to update this support ticket."
        );
      }
      const dataToSend = {
        ...supportTicketData,
        userId,
      };
      const authenticatedFetch = this.getAuthenticatedFetch();
      const response = await authenticatedFetch(`${this.baseURL}/support`, {
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
      return data;
    } catch (error) {
      console.error("Destek Talebi güncellenemedi:", error);
      throw error;
    }
  }

  async deleteSupportTicket(id) {
    await this.ensureAuth();

    try {
      const authenticatedFetch = this.getAuthenticatedFetch();
      const response = await authenticatedFetch(
        `${this.baseURL}/support/${id}`,
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
      console.error("Destek talebi silinemedi:", error);
      throw error;
    }
  }
}

export const supportService = new SupportService();
