import { communicationService } from "@/services/CRM/CommunicationService";
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
  communicationsLoaded: false,
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

  setCommunicationsLoading: (val) => set({ communicationsLoading: val }),

  setCommunications: (val) => set({ communications: val }),

  fetchCommunications: async (forceRefresh = false) => {
    const { communicationsLoaded, communicationsLoading } = get();

    if (communicationsLoaded && !forceRefresh) {
      return;
    }

    if (communicationsLoading) {
      return;
    }

    set({ communicationsLoading: true, communicationsError: null });

    try {
      const communications = await communicationService.getCommunications(
        forceRefresh
      );

      set({
        communications: communications,
        communicationsLoaded: true,
        communicationsLoading: false,
        communicationsError: null,
      });
    } catch (error) {
      set({
        communicationsError: error.message || "Müşteri verileri yüklenemedi",
        communicationsLoading: false,
      });
    }
  },

  addCommunication: async (communicationData) => {
    set({ communicationsLoading: true, communicationsError: null });
    try {
      const newCommunication = await communicationService.createCommunication(
        communicationData
      );
      set((state) => ({
        communications: [...state.communications, newCommunication],
        communicationsLoading: false,
      }));
    } catch (error) {
      set({
        communicationsError: error.message || "Müşteri oluşturulamadı",
        communicationsLoading: false,
      });
    }
  },

  updateCommunication: async (id, communicationData) => {
    set({ communicationsLoading: true, communicationsError: null });
    try {
      const updatedCommunication =
        await communicationService.updateCommunication(communicationData);
      const refreshedCommunication =
        await communicationService.getCommunicationById(id);

      if (!refreshedCommunication)
        throw new Error("Görüşme verileri yüklenemedi");

      set((state) => ({
        communications: state.communications.map((communication) =>
          communication.id === id
            ? { ...refreshedCommunication }
            : communication
        ),
        communicationsLoading: false,
      }));
      return updatedCommunication;
    } catch (error) {
      set({
        communicationsError: error.message || "Müşteri oluşturulamadı",
        communicationsLoading: false,
      });
    }
  },

  deleteCommunication: async (id) => {
    set({ communicationsLoading: true, communicationsError: null });
    try {
      await communicationService.deleteCommunication(id);
      set((state) => ({
        communications: state.communications.filter(
          (communication) => communication.id !== id
        ),
        communicationsLoading: false,
      }));
    } catch (error) {
      set({
        communicationsError: error.message || "Müşteri silinemedi",
        communicationsLoading: false,
      });
      throw error;
    }
  },

  clearCommunicationsError: () => set({ communicationsError: null }),
}));
