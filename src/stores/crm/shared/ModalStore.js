import { create } from "zustand";
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

export const ModalStore = create((set, get) => ({
  activeModule: "overview",
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

  // State Güncelleyiciler
  setActiveModule: (module) => set({ activeModule: module }),
  setActiveSubModule: (module) => set({ activeSubModule: module }),
}));
