import { create } from "zustand";

export const CommunicationStore = create((set, get) => ({
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

  communicationsLoading: false,
  isCommunicationModalOpen: false,

  communicationForm: {
    customer: "",
    type: "",
    subject: "",
    notes: "",
    date: "",
    time: "",
    duration: "",
  },

  setCommunicationForm: (form) => set({ communicationForm: form }),

  setIsCommunicationModalOpen: (val) => set({ isCommunicationModalOpen: val }),

  handleCommunicationSubmit: (data) => {
    console.log(data);
  },
}));
