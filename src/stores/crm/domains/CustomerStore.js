import { customerService } from "@/services/CRM/CustomerService";
import { create } from "zustand";

export const CustomerStore = create((set, get) => ({
  selectedCustomer: null,
  customers: [],
  customersLoading: false,
  customersError: null,
  customersLoaded: false, // Veri daha önce yüklendi mi?

  isDeleteCustomerModalOpen: false,
  isCustomerModalOpen: false,
  isCustomerDetailsModalOpen: false,
  isViewCustomerModalOpen: false,

  setCustomerForm: (form) => set({ customerForm: form }),
  setIsCustomerModalOpen: (val) => set({ isCustomerModalOpen: val }),
  setSelectedCustomer: (customer) => set({ selectedCustomer: customer }),

  setIsViewCustomerModalOpen: (val) => set({ isViewCustomerModalOpen: val }),
  setIsCustomerDetailsModalOpen: (val) =>
    set({ isCustomerDetailsModalOpen: val }),

  setIsDeleteCustomerModalOpen: (val) =>
    set({ isDeleteCustomerModalOpen: val }),

  customerForm: {
    name: "",
    contact: "",
    email: "",
    phone: "",
    segment: "",
    status: "",
    address: "",
    notes: "",
    lastContact: "",
  },

  // Müşterileri yükle
  fetchCustomers: async (forceRefresh = false) => {
    const { customersLoaded, customersLoading } = get();

    // Eğer zaten yüklenmişse ve force refresh yoksa, çık
    if (customersLoaded && !forceRefresh) {
      return;
    }

    // Zaten yükleniyorsa, çık
    if (customersLoading) {
      return;
    }

    set({ customersLoading: true, customersError: null });

    try {
      const customers = await customerService.getCustomers(forceRefresh);

      set({
        customers: customers,
        customersLoaded: true,
        customersLoading: false,
        customersError: null,
      });
    } catch (error) {
      set({
        customersError: error.message || "Müşteri verileri yüklenemedi",
        customersLoading: false,
      });
    }
  },

  getCustomerById: async (id) => {
    set({ customersLoading: true, customersError: null });

    try {
      const customer = await customerService.getCustomerById(id);
      return customer;
    } catch (error) {
      set({
        customersError: error.message || "Müşteri verileri yüklenemedi",
        customersLoading: false,
      });
    }
  },

  // Yeni müşteri ekle
  addCustomer: async (customerData) => {
    set({ customersLoading: true, customersError: null });

    try {
      const newCustomer = await customerService.createCustomer(customerData);

      // Store'daki müşteri listesine ekle
      set((state) => ({
        customers: [...state.customers, newCustomer],
        customersLoading: false,
      }));

      return newCustomer;
    } catch (error) {
      set({
        customersError: error.message || "Müşteri eklenemedi",
        customersLoading: false,
      });
      throw error;
    }
  },

  // Müşteri güncelle
  updateCustomer: async (id, customerData) => {
    set({ customersLoading: true, customersError: null });

    try {
      const updatedCustomer = await customerService.updateCustomer(
        customerData
      );

      // 2. Güncellenmiş veriyi tekrar çek
      const refreshedCustomer = await customerService.getCustomerById(id);
      console.log("refreshedCustomer", refreshedCustomer);

      if (!refreshedCustomer) {
        throw new Error("Müşteri bilgileri alınamadı");
      }

      // Store'da ilgili müşteriyi güncelle
      set((state) => ({
        customers: state.customers.map((customer) =>
          customer.id === id ? { ...refreshedCustomer } : customer
        ),
        customersLoading: false,
      }));

      return updatedCustomer;
    } catch (error) {
      set({
        customersError: error.message || "Müşteri güncellenemedi",
        customersLoading: false,
      });
      throw error;
    }
  },

  // Müşteri sil
  deleteCustomer: async (id) => {
    set({ customersLoading: true, customersError: null });

    try {
      await customerService.deleteCustomer(id);

      // Store'dan müşteriyi kaldır
      set((state) => ({
        customers: state.customers.filter((customer) => customer.id !== id),
        customersLoading: false,
      }));
    } catch (error) {
      set({
        customersError: error.message || "Müşteri silinemedi",
        customersLoading: false,
      });
      throw error;
    }
  },

  // Müşteri verilerini yenile
  refreshCustomers: async () => {
    const { fetchCustomers } = get();
    await fetchCustomers(true); // Force refresh
  },

  // Error'ı temizle
  clearCustomersError: () => {
    set({ customersError: null });
  },
}));
