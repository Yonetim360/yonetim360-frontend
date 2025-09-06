import { create } from "zustand";

export const SaleStore = create((set, get) => ({
  selectedSale: null,
  salesLoading: false,
  sales: [],

  setIsViewSalesModalOpen: (val) => set({ isViewSalesModalOpen: val }),
  setIsSalesDetailsModalOpen: (val) => set({ isSalesDetailsModalOpen: val }),
  setSelectedSale: (sale) => set({ selectedSale: sale }),

  fetchSales: async (forceRefresh = false) => {
    const { salesLoaded, salesLoading } = get();

    if (salesLoaded && !forceRefresh) {
      return;
    }

    if (salesLoading) {
      return;
    }

    set({ salesLoading: true, salesError: null });

    try {
      const sales = await saleservice.getsales(forceRefresh);

      set({
        sales: sales,
        salesLoaded: true,
        salesLoading: false,
        salesError: null,
      });
    } catch (error) {
      set({
        salesError: error.message || "Müşteri verileri yüklenemedi",
        salesLoading: false,
      });
    }
  },
  addSale: async (saleData) => {
    set({ salesLoading: true, salesError: null });

    try {
      const newSale = await saleservice.createSale(saleData);

      set((state) => ({
        sales: [...state.sales, newSale],
        salesLoading: false,
      }));
    } catch (error) {
      set({
        salesError: error.message || "Müşteri oluşturulamadı",
        salesLoading: false,
      });
    }
  },
  updateSale: async (id, saleData) => {
    set({ salesLoading: true, salesError: null });

    try {
      const updatedSale = await saleservice.updateSale(saleData);

      const refreshedSale = await saleservice.getSaleById(id);
      if (!refreshedSale) {
        throw new Error("Müşteri bilgileri yüklenemedi");
      }

      set((state) => ({
        sales: state.sales.map((sale) =>
          sale.id === id ? { ...refreshedSale } : sale
        ),
        salesLoading: false,
      }));
      return updatedSale;
    } catch (error) {
      set({
        salesError: error.message || "Müşteri güncellenemedi",
        salesLoading: false,
      });
    }
  },
  deleteSale: async (id) => {
    set({ salesLoading: true, salesError: null });

    try {
      await saleservice.deleteSale(id);

      set((state) => ({
        sales: state.sales.filter((sale) => sale.id !== id),
        salesLoading: false,
      }));
    } catch (error) {
      set({
        salesError: error.message || "Müşteri silinemedi",
        salesLoading: false,
      });
      throw error;
    }
  },

  clearSalesError: () =>
    set({
      salesError: null,
    }),
}));
