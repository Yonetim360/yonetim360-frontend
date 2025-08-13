class SalesOffersService {
  constructor() {
    this.baseURL = `${process.env.NEXT_PUBLIC_FRONTEND_BASE_URL}/api`;
    this.cache = null;
    this.cacheTime = null;
    this.isLoading = false;
  }

  async getSalesOffers(forceRefresh = false) {
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

      const response = await fetch(`${this.baseURL}/sales-offers`);

      const data = await response.json();
      this.cache = data;
      this.cacheTime = Date.now();
      this.isLoading = false;
      return data;
    } catch (error) {
      console.error("Sales Offers verileri alınamadı:", error);
      throw error;
    }
  }
}
