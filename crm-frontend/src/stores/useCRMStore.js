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
} from "lucide-react";
import { create } from "zustand";

export const useCRMStore = create((set) => ({
  activeModule: "overview",
  isLoading: false,

  /*Initial datas*/

  modules: [
    {
      id: "overview",
      name: "Genel Bakış",
      icon: BarChart3,
      color: "text-dark-gray",
      bgColor: "bg-dark-gray/10",
    },
    {
      id: "customer-info",
      name: "Müşteri Bilgileri Takibi",
      icon: Users,
      color: "text-primary-green",
      bgColor: "bg-primary-green/10",
    },
    {
      id: "communication",
      name: "İletişim ve Görüşme Takibi",
      icon: Phone,
      color: "text-orange",
      bgColor: "bg-orange/10",
    },
    {
      id: "sales-offers",
      name: "Teklif ve Satış Takibi",
      icon: FileText,
      color: "text-red",
      bgColor: "bg-red/10",
    },
    {
      id: "support",
      name: "Müşteri Destek Talep Takip",
      icon: Headphones,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      id: "whatsapp",
      name: "WhatsApp Hatırlatma",
      icon: MessageCircle,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      id: "calendar",
      name: "Takvim / Görev",
      icon: CalendarDays,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      id: "announcements",
      name: "Duyuru / Talep",
      icon: Megaphone,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100",
    },
    {
      id: "solution-center",
      name: "Çözüm Merkezi",
      icon: HelpCircle,
      color: "text-indigo-600",
      bgColor: "bg-indigo-100",
    },
  ],

  customers: [
    {
      id: 1,
      name: "ABC Teknoloji A.Ş.",
      contact: "Ahmet Yılmaz",
      email: "ahmet@abcteknoloji.com",
      phone: "+90 212 555 0123",
      status: "Aktif",
      lastContact: "2024-01-15",
      value: "₺125,000",
      segment: "Kurumsal",
    },
    {
      id: 2,
      name: "XYZ İnşaat Ltd.",
      contact: "Fatma Demir",
      email: "fatma@xyzinsaat.com",
      phone: "+90 216 555 0456",
      status: "Potansiyel",
      lastContact: "2024-01-12",
      value: "₺85,000",
      segment: "KOBİ",
    },
    {
      id: 3,
      name: "DEF Danışmanlık",
      contact: "Mehmet Kaya",
      email: "mehmet@defdanismanlik.com",
      phone: "+90 312 555 0789",
      status: "Aktif",
      lastContact: "2024-01-10",
      value: "₺200,000",
      segment: "Kurumsal",
    },
  ],

  communications: [
    {
      id: 1,
      customer: "ABC Teknoloji A.Ş.",
      type: "Telefon",
      date: "2024-01-15",
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
      amount: "₺125,000",
      status: "Onaylandı",
      validUntil: "2024-02-10",
      products: "Web Sitesi + Mobil Uygulama",
    },
    {
      id: 2,
      customer: "XYZ İnşaat Ltd.",
      offerNo: "TKL-2024-002",
      date: "2024-01-12",
      amount: "₺85,000",
      status: "Beklemede",
      validUntil: "2024-02-12",
      products: "ERP Sistemi",
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
      assignedTo: "Teknik Ekip",
    },
    {
      id: 2,
      customer: "DEF Danışmanlık",
      ticketNo: "DES-2024-002",
      subject: "Rapor hatası",
      priority: "Orta",
      status: "Çözüldü",
      createdDate: "2024-01-14",
      assignedTo: "Geliştirme Ekibi",
    },
  ],

  // Modallar
  isCustomerModalOpen: false,
  isCommunicationModalOpen: false,
  isOfferModalOpen: false,
  isSupportModalOpen: false,

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

  // Handlers
  handleCustomerSubmit: async (formdata) => {
    try {
      set({ isLoading: true });
      console.log(formdata);
    } catch (error) {
      console.log(error);
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
