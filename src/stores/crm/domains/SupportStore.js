import { supportService } from "@/services/CRM/SupportService";
import { create } from "zustand";

export const SupportStore = create((set, get) => ({
  selectedSupport: null,
  supportsLoading: false,
  supportsLoaded: false,

  isSupportModalOpen: false,
  isSupportDetailsModalOpen: false,
  isViewSupportModalOpen: false,
  isDeleteSupportModalOpen: false,

  supportTickets: [],

  supportForm: {
    customer: "",
    subject: "",
    explanation: "",
    priority: "",
    assignedTo: "",
  },

  setSupportForm: (form) => set({ supportForm: form }),
  setSupportModalOpen: (val) => set({ isSupportModalOpen: val }),
  setIsSupportModalOpen: (val) => set({ isSupportModalOpen: val }),

  setIsViewSupportModalOpen: (val) => set({ isViewSupportModalOpen: val }),
  setIsSupportDetailsModalOpen: (val) =>
    set({ isSupportDetailsModalOpen: val }),

  setIsDeleteSupportModalOpen: (val) => set({ isDeleteSupportModalOpen: val }),

  setSupportsLoading: (val) => set({ supportsLoading: val }),

  setSelectedSupport: (support) => set({ selectedSupport: support }),

  fetchSupportTickets: async (forceRefresh = false) => {
    const { supportsLoaded, supportsLoading } = get();

    if (supportsLoaded && !forceRefresh) {
      return;
    }

    if (supportsLoading) {
      return;
    }

    set({ supportsLoading: true });

    try {
      const supportTickets = await supportService.getSupportTickets(
        forceRefresh
      );

      set({
        supportTickets: supportTickets,
        supportsLoaded: true,
        supportsLoading: false,
      });
    } catch (error) {
      set({
        supportsError: error.message || "Destek talebi verileri yüklenemedi",
        supportsLoading: false,
      });
    }
  },

  getSupportTicketById: async (id) => {
    set({ supportsLoading: true, supportsError: null });

    try {
      const supportTicket = await supportService.getSupportTicketById(id);
      return supportTicket;
    } catch (error) {
      set({
        supportsError: error.message || "Destek talebi verileri yüklenemedi",
        supportsLoading: false,
      });
    }
  },

  addSupportTicket: async (supportData) => {
    set({ supportsLoading: true, supportsError: null });

    try {
      const newSupportTicket = await supportService.createSupportTicket(
        supportData
      );

      set((state) => ({
        supportTickets: [...state.supportTickets, newSupportTicket],
        supportsLoading: false,
      }));
    } catch (error) {
      set({
        supportsError: error.message || "Destek talebi verileri yüklenemedi",
        supportsLoading: false,
      });
    }
  },

  updateSupportTicket: async (id, supportData) => {
    set({ supportsLoading: true, supportsError: null });

    try {
      const updatedSupportTicket = await supportService.updateSupportTicket(
        supportData
      );

      const refreshedSupportTicket = await supportService.getSupportTicketById(
        id
      );

      if (!refreshedSupportTicket) {
        throw new Error("Destek talebi verileri yüklenemedi");
      }

      set((state) => ({
        supportTickets: state.supportTickets.map((support) =>
          support.id === id ? { ...updatedSupportTicket } : support
        ),
        supportsLoading: false,
      }));
    } catch (error) {
      set({
        supportsError: error.message || "Destek talebi verileri yüklenemedi",
        supportsLoading: false,
      });
    }
  },

  deleteSupportTicket: async (id) => {
    set({ supportsLoading: true, supportsError: null });

    try {
      await supportService.deleteSupportTicket(id);

      set((state) => ({
        supportTickets: state.supportTickets.filter(
          (support) => support.id !== id
        ),
        supportsLoading: false,
      }));
    } catch (error) {
      set({
        supportsError: error.message || "Destek talebi verileri yüklenemedi",
        supportsLoading: false,
      });
      throw error;
    }
  },
}));
