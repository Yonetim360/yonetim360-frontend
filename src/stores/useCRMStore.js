import { customerService } from "@/services/CRM/CustomerService";
import {
  BarChart3,
  CalendarDays,
  FileText,
  Headphones,
  HelpCircle,
  Megaphone,
  MessageCircle,
  Phone,
  Users,
  IdCardLanyard,
} from "lucide-react";
import { toast } from "sonner";
import { create } from "zustand";

export const useCRMStore = create((set, get) => ({
  activeModule: "overview",
  isLoading: false,
  selectedOffer: null,
  selectedCustomer: null,
  selectedSupport: null,
  selectedOffer: null,
  selectedSale: null,
  activeSubModule: "",

  modules: [
    {
      id: "overview",
      name: "Genel Bakış",
      icon: BarChart3,
      color: "text-dark-gray",
      bgColor: "bg-dark-gray/10",
      subModules: [],
    },
    {
      id: "customer-info",
      name: "Müşteri Bilgileri Takibi",
      icon: Users,
      color: "text-primary-green",
      bgColor: "bg-primary-green/10",
      subModules: [],
    },
    {
      id: "agents",
      name: "Temsilci Takibi",
      icon: IdCardLanyard,
      color: "text-[#02d1a1]",
      bgColor: "bg-[#02d1a1]/10",
      subModules: [],
    },
    {
      id: "communication",
      name: "İletişim ve Görüşme Takibi",
      icon: Phone,
      color: "text-orange",
      bgColor: "bg-orange/10",
      subModules: [
        { id: "communicationHistory", name: "Görüşme Geçmişi" },
        { id: "upcomingMeetings", name: "Gelecek Görüşmeler" },
      ],
    },
    {
      id: "sales-offers",
      name: "Teklif ve Satış Takibi",
      icon: FileText,
      color: "text-red",
      bgColor: "bg-red/10",
      subModules: [
        { id: "offers", name: "Teklif Takibi" },
        { id: "sales", name: "Satış Takibi" },
      ],
    },
    {
      id: "support",
      name: "Müşteri Destek Talep Takip",
      icon: Headphones,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      subModules: [],
    },
    {
      id: "whatsapp",
      name: "WhatsApp Hatırlatma",
      icon: MessageCircle,
      color: "text-green-600",
      bgColor: "bg-green-100",
      subModules: [],
    },
    {
      id: "calendar",
      name: "Takvim",
      icon: CalendarDays,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
      subModules: [],
    },
    {
      id: "announcements",
      name: "Duyurular",
      icon: Megaphone,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100",
      subModules: [],
    },
    {
      id: "solution-center",
      name: "Çözüm Merkezi",
      icon: HelpCircle,
      color: "text-indigo-600",
      bgColor: "bg-indigo-100",
      subModules: [],
    },
  ],

  // CUSTOMER DATA STATES
  customers: [],
  customersLoading: false,
  customersError: null,
  customersLoaded: false, // Veri daha önce yüklendi mi?

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
        id,
        customerData
      );

      // Store'da ilgili müşteriyi güncelle
      set((state) => ({
        customers: state.customers.map((customer) =>
          customer.id === id ? updatedCustomer : customer
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

  isCustomerModalOpen: false,
  isCustomerDetailsModalOpen: false,
  isViewCustomerModalOpen: false,

  setCustomerForm: (form) => set({ customerForm: form }),
  setCustomerModalOpen: (val) => set({ isCustomerModalOpen: val }),
  setIsCustomerModalOpen: (val) => set({ isCustomerModalOpen: val }),
  setSelectedCustomer: (customer) => set({ selectedCustomer: customer }),

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

  //************************************* */

  communications: [
    {
      id: 1,
      customer: "ABC Teknoloji A.Ş.",
      type: "Telefon",
      date: "2026-01-15",
      time: "14:30",
      duration: "25 dk",
      subject: "Proje görüşmesi",
      notes: "Yeni proje için detaylar konuşuldu. Teklif hazırlanacak.",
      status: "Tamamlandı",
    },
    {
      id: 2,
      customer: "XYZ İnşaat Ltd.",
      type: "E-posta",
      date: "2024-01-14",
      time: "10:15",
      subject: "Teklif sunumu",
      notes: "Hazırlanan teklif e-posta ile gönderildi.",
      status: "Beklemede",
    },
  ],

  offers: [
    {
      id: 1,
      customer: "ABC Teknoloji A.Ş.",
      offerNo: "TKL-2024-001",
      date: "2024-01-10",
      amount: "125000",
      status: "Onaylandı",
      validUntil: "2024-02-10",
      products: "Web Sitesi + Mobil Uygulama",
      discountValue: "1500",
      discountType: "fixed",
      currency: "TRY",
      vatIncluded: true,
      notes: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      id: 2,
      customer: "XYZ İnşaat Ltd.",
      offerNo: "TKL-2024-002",
      date: "2024-01-12",
      amount: "85000",
      status: "Beklemede",
      validUntil: "2024-02-12",
      products: "ERP Sistemi",
      currency: "USD",
      vatIncluded: false,
      notes: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
  ],

  sales: [
    {
      id: 1,
      customer: "ABC Teknoloji A.Ş.",
      offerNo: "TKL-2024-001",
      date: "2024-01-10",
      amount: "125000",
      status: "Onaylandı",
      validUntil: "2024-02-10",
      products: "Web Sitesi + Mobil Uygulama",
      discountValue: "1500",
      discountType: "fixed",
      currency: "TRY",
      vatIncluded: true,
      notes: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      id: 2,
      customer: "BCA Teknoloji A.Ş.",
      offerNo: "TKL-2024-002",
      date: "2024-01-10",
      amount: "155000",
      status: "İmzalandı",
      validUntil: "2024-02-10",
      products: "Web Sitesi + Mobil Uygulama",
      discountValue: "1500",
      discountType: "fixed",
      currency: "TRY",
      vatIncluded: true,
      notes: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
  ],

  supportTickets: [
    {
      id: 1,
      customer: "ABC Teknoloji A.Ş.",
      ticketNo: "DES-2024-001",
      subject: "Sistem yavaşlığı",
      priority: "Yüksek",
      status: "Açık",
      createdDate: "2024-01-15",
      assignedTo: "Sadık-Turan",
      description: "İnternet problemi varmış.",
    },
    {
      id: 2,
      customer: "DEF Danışmanlık",
      ticketNo: "DES-2024-002",
      subject: "Rapor hatası",
      priority: "Orta",
      status: "cozuldu",
      createdDate: "2024-01-14",
      assignedTo: "Yeliz-Biri",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
  ],

  // Modallar
  isCommunicationModalOpen: false,
  isOfferModalOpen: false,
  isSupportModalOpen: false,
  isOfferDetailsModalOpen: false,
  isSupportDetailsModalOpen: false,
  isViewSupportModalOpen: false,
  isViewOfferModalOpen: false,
  isViewOfferDetailsModalOpen: false,
  isEndingOfferModalOpen: false,

  // Formlar
  supportForm: {
    customer: "",
    subject: "",
    description: "",
    priority: "",
    assignedTo: "",
  },

  communicationForm: {
    customer: "",
    type: "",
    subject: "",
    notes: "",
    date: "",
    time: "",
    duration: "",
  },
  offerForm: {
    customer: "",
    offerNo: "",
    date: "",
    amount: "",
    status: "",
    validUntil: "",
    products: "",
  },

  // State Güncelleyiciler
  setActiveModule: (module) => set({ activeModule: module }),
  setActiveSubModule: (module) => set({ activeSubModule: module }),
  setIsLoading: (isLoading) => set({ isLoading }),

  setSupportForm: (form) => set({ supportForm: form }),
  setCommunicationForm: (form) => set({ communicationForm: form }),
  setOfferForm: (form) => set({ offerForm: form }),

  setCommunicationModalOpen: (val) => set({ isCommunicationModalOpen: val }),
  setOfferModalOpen: (val) => set({ isOfferModalOpen: val }),
  setSupportModalOpen: (val) => set({ isSupportModalOpen: val }),

  setIsCommunicationModalOpen: (val) => set({ isCommunicationModalOpen: val }),
  setIsOfferModalOpen: (val) => set({ isOfferModalOpen: val }),
  setIsSupportModalOpen: (val) => set({ isSupportModalOpen: val }),

  setIsViewSupportModalOpen: (val) => set({ isViewSupportModalOpen: val }),
  setIsViewOfferModalOpen: (val) => set({ isViewOfferModalOpen: val }),
  setIsViewOfferDetailsModalOpen: (val) =>
    set({ isViewOfferDetailsModalOpen: val }),

  setIsViewSalesModalOpen: (val) => set({ isViewSalesModalOpen: val }),
  setIsSalesDetailsModalOpen: (val) => set({ isSalesDetailsModalOpen: val }),

  setIsOfferDetailsModalOpen: (val) => set({ isOfferDetailsModalOpen: val }),
  setIsViewCustomerModalOpen: (val) => set({ isViewCustomerModalOpen: val }),
  setIsCustomerDetailsModalOpen: (val) =>
    set({ isCustomerDetailsModalOpen: val }),
  setIsSupportDetailsModalOpen: (val) =>
    set({ isSupportDetailsModalOpen: val }),

  setIsEndingOfferModalOpen: (val) => set({ isEndingOfferModalOpen: val }),

  setSelectedOffer: (offer) => set({ selectedOffer: offer }),
  setSelectedSupport: (support) => set({ selectedSupport: support }),
  setSelectedSale: (sale) => set({ selectedSale: sale }),
}));
