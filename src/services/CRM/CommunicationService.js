const { default: BaseService } = require("../BaseService");

class CommunicationService extends BaseService {
  constructor() {
    super("communications");
  }

  async getCommunications(forceRefresh = false) {
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
        `${this.baseURL}/communications`
      );

      if (!response.ok) throw new Error("Failed to fetch communications");

      const data = await response.json();
      this.cache = data;
      this.isLoading = false;
      return data;
    } catch (error) {
      console.error("Müşteriler getirilemedi:", error);
      throw error;
    } finally {
      this.isLoading = false;
    }
  }

  async getCommunicationById(id) {
    await this.ensureAuth();

    try {
      const authenticatedFetch = this.getAuthenticatedFetch();
      const response = await authenticatedFetch(
        `${this.baseURL}/communications/${id}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const communication = await response.json();

      if (!communication || !communication.id) {
        throw new Error("Invalid communication data received");
      }

      return communication;
    } catch (error) {
      console.error("Müşteri verileri yüklenemedi:", error);
      throw error;
    } finally {
      this.isLoading = false;
    }
  }

  async createCommunication(communicationData) {
    await this.ensureAuth();

    try {
      const authenticatedFetch = this.getAuthenticatedFetch();

      const userId = this.getUserId();

      if (!userId) {
        throw new Error(
          "You are not authorized to create a new communication."
        );
      }

      const dataToSend = {
        ...communicationData,
        userId,
      };
      const response = await authenticatedFetch(
        `${this.baseURL}/communications`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToSend),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const communication = await response.json();

      this.clearCache();

      return communication;
    } catch (error) {
      console.error("Müşteri oluşturulamadı:", error);
      throw error;
    } finally {
      this.isLoading = false;
    }
  }

  async updateCommunication(id, communicationData) {
    await this.ensureAuth();

    try {
      const authenticatedFetch = this.getAuthenticatedFetch();

      const userId = this.getUserId();

      if (!userId) {
        throw new Error("You are not authorized to update this communication.");
      }

      const dataToSend = {
        ...communicationData,
        userId,
      };

      const response = await authenticatedFetch(
        `${this.baseURL}/communications/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToSend),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const communication = await response.json();

      this.clearCache();

      return communication;
    } catch (error) {
      console.error("Müşteri güncellenemedi:", error);
      throw error;
    } finally {
      this.isLoading = false;
    }
  }

  async deleteCommunication(id) {
    await this.ensureAuth();

    try {
      const authenticatedFetch = this.getAuthenticatedFetch();
      const response = await authenticatedFetch(
        `${this.baseURL}/communications/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      this.clearCache();

      return data;
    } catch (error) {
      console.error("Müşteri silinemedi:", error);
      throw error;
    } finally {
      this.isLoading = false;
    }
  }
}

export const communicationService = new CommunicationService();
