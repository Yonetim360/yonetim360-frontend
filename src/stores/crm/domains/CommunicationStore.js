import { communicationService } from "@/services/CRM/CommunicationService";
import { create } from "zustand";

export const CommunicationStore = create((set, get) => ({
  communications: [],
  selectedCommunication: null,
  communicationsLoading: false,
  communicationsLoaded: false,
  isCommunicationModalOpen: false,
  isViewCommunicationModalOpen: false,
  isCommunicationDetailsModalOpen: false,
  isDeleteCommunicationModalOpen: false,
  communicationsError: null,

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

  setCommunicationsError: (val) => set({ communicationsError: val }),

  setSelectedCommunication: (comm) => set({ selectedCommunication: comm }),

  setIsViewCommunicationModalOpen: (val) =>
    set({ isViewCommunicationModalOpen: val }),

  setIsDeleteCommunicationModalOpen: (val) =>
    set({ isDeleteCommunicationModalOpen: val }),

  setIsCommunicationDetailsModalOpen: (val) =>
    set({ isCommunicationDetailsModalOpen: val }),

  //
  //

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
        communicationsError: error.message || "İletişim verileri yüklenemedi",
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
        communicationsError: error.message || "Görüşme oluşturulamadı",
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
        communicationsError: error.message || "Görüşme oluşturulamadı",
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
        communicationsError: error.message || "Görüşme silinemedi",
        communicationsLoading: false,
      });
      throw error;
    }
  },

  clearCommunicationsError: () => set({ communicationsError: null }),
}));
