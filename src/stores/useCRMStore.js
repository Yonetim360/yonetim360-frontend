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

export const useCRMStore = create((set) => ({
  activeModule: "overview",
  isLoading: false,
  selectedOffer: null,
  selectedCustomer: null,
  selectedSupport: null,
  selectedOffer: null,
  selectedSale: null,
  activeSubModule: "",

  /*Initial datas*/

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

  customers: [
    {
      id: 1,
      name: "ABC Teknoloji A.Ş.",
      contact: "Ahmet Yılmaz",
      email: "ahmet@abcteknoloji.com",
      phone: "+90 212 555 0123",
      segment: "Kurumsal",
      status: "Aktif",
      address: "123 Main St, City, Country",
      notes: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      lastContact: "2024-01-15",
    },
    {
      id: 2,
      name: "XYZ İnşaat Ltd.",
      contact: "Fatma Demir",
      email: "fatma@xyzinsaat.com",
      phone: "+90 216 555 0456",
      segment: "kobi",
      status: "Potansiyel",
      address: "456 Elm St, City, Country",
      notes: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      lastContact: "2024-01-12",
    },
    {
      id: 3,
      name: "DEF Danışmanlık",
      contact: "Mehmet Kaya",
      email: "mehmet@defdanismanlik.com",
      phone: "+90 312 555 0789",
      segment: "Bireysel",
      status: "Aktif",
      address: "789 Oak St, City, Country",
      notes: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      lastContact: "2024-01-10",
    },
  ],

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
  isCustomerModalOpen: false,
  isCommunicationModalOpen: false,
  isOfferModalOpen: false,
  isSupportModalOpen: false,
  isOfferDetailsModalOpen: false,
  isCustomerDetailsModalOpen: false,
  isViewCustomerModalOpen: false,
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

  //   // 2. Fonksiyonlar
  //   fetchCustomers: async () => {
  //     set({ isLoading: true, error: null })
  //     try {
  //       const res = await fetch('/api/customers')
  //       const data = await res.json()
  //       set({ customers: data, isLoading: false })
  //     } catch (err) {
  //       set({ error: err.message, isLoading: false })
  //     }
  //   },

  // State Güncelleyiciler
  setActiveModule: (module) => set({ activeModule: module }),
  setActiveSubModule: (module) => set({ activeSubModule: module }),
  setIsLoading: (isLoading) => set({ isLoading }),

  setSupportForm: (form) => set({ supportForm: form }),
  setCustomerForm: (form) => set({ customerForm: form }),
  setCommunicationForm: (form) => set({ communicationForm: form }),
  setOfferForm: (form) => set({ offerForm: form }),

  setCustomerModalOpen: (val) => set({ isCustomerModalOpen: val }),
  setCommunicationModalOpen: (val) => set({ isCommunicationModalOpen: val }),
  setOfferModalOpen: (val) => set({ isOfferModalOpen: val }),
  setSupportModalOpen: (val) => set({ isSupportModalOpen: val }),

  setIsCustomerModalOpen: (val) => set({ isCustomerModalOpen: val }),
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
  setSelectedCustomer: (customer) => set({ selectedCustomer: customer }),
  setSelectedSupport: (support) => set({ selectedSupport: support }),
  setSelectedSale: (sale) => set({ selectedSale: sale }),

  // Handlers
  handleCustomerSubmit: async (formdata) => {
    try {
      set({ isLoading: true });
      console.log(formdata);
      toast.success("Müşteri başarıyla oluşturuldu.");
    } catch (error) {
      toast.error(error);
    } finally {
      set({ isLoading: false });
    }
  },
  handleCommunicationSubmit: async (formdata) => {
    try {
      set({ isLoading: true });
      console.log(formdata);
    } catch (error) {
      console.log(error);
    } finally {
      set({ isLoading: false });
    }
  },
  handleOfferSubmit: async (formdata) => {
    try {
      set({ isLoading: true });
      console.log(formdata);
    } catch (error) {
      console.log(error);
    } finally {
      set({ isLoading: false });
    }
  },
  handleSupportSubmit: async (formdata) => {
    try {
      set({ isLoading: true });
      console.log(formdata);
    } catch (error) {
      console.log(error);
    } finally {
      set({ isLoading: false });
    }
  },
}));
