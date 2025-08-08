import { create } from "zustand";

export const SupportStore = create((set, get) => ({
  selectedSupport: null,
  supportsLoading: false,
  isSupportModalOpen: false,
  isSupportDetailsModalOpen: false,
  isViewSupportModalOpen: false,

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

  supportForm: {
    customer: "",
    subject: "",
    description: "",
    priority: "",
    assignedTo: "",
  },

  setSupportForm: (form) => set({ supportForm: form }),
  setSupportModalOpen: (val) => set({ isSupportModalOpen: val }),
  setIsSupportModalOpen: (val) => set({ isSupportModalOpen: val }),

  setIsViewSupportModalOpen: (val) => set({ isViewSupportModalOpen: val }),
  setIsSupportDetailsModalOpen: (val) =>
    set({ isSupportDetailsModalOpen: val }),

  setSelectedSupport: (support) => set({ selectedSupport: support }),
}));
