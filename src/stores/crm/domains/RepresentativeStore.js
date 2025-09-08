import { representativeService } from "@/services/CRM/RepresentativeService";
import { create } from "zustand";

export const RepresentativeStore = create((set, get) => ({
  selectedRespresentative: null,
  representatives: [],
  representativesLoading: false,
  representativesError: null,
  representativesLoaded: false,

  isRepresentativesModalOpen: false,

  isAddRepresentativeModalOpen: false,
  isDeleteRepresentativeModalOpen: false,
  isRepresentativeDetailsModalOpen: false,
  isViewRepresentativeModalOpen: false,

  representativeForm: {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    notes: "",
  },

  setRepresentativeForm: (form) => set({ representativeForm: form }),

  setIsRepresentativesModalOpen: (val) =>
    set({ isRepresentativesModalOpen: val }),

  setRepresentativesLoading: (loading) =>
    set({ representativesLoading: loading }),

  setSelectedRepresentative: (representative) =>
    set({ selectedRepresentative: representative }),

  setIsAddRepresentativeModalOpen: (val) =>
    set({ isAddRepresentativeModalOpen: val }),

  setIsDeleteRepresentativeModalOpen: (val) =>
    set({ isDeleteRepresentativeModalOpen: val }),

  setIsRepresentativeDetailsModalOpen: (val) =>
    set({ isRepresentativeDetailsModalOpen: val }),

  setIsViewRepresentativeModalOpen: (val) =>
    set({ isViewRepresentativeModalOpen: val }),

  fetchRepresentatives: async (forceRefresh = false) => {
    const { representativesLoaded, representativesLoading } = get();

    if (representativesLoaded && !forceRefresh) {
      return;
    }

    // Zaten yükleniyorsa, çık
    if (representativesLoading) {
      return;
    }

    set({ representativesLoading: true, representativesError: null });

    try {
      const representatives = await representativeService.getRepresentatives(
        forceRefresh
      );

      set({
        representatives: representatives,
        representativesLoaded: true,
        representativesLoading: false,
        representativesError: null,
      });
    } catch (error) {
      set({
        representativesError: error.message || "Temsilci verileri yüklenemedi",
        representativesLoading: false,
      });
    }
  },

  getRepresentativeById: async (id) => {
    set({ representativesLoading: true, representativesError: null });

    try {
      const representative = await representativeService.getRepresentativeById(
        id
      );
      return representative;
    } catch (error) {
      set({
        representativesError: error.message || "Temsilci verileri yüklenemedi",
        representativesLoading: false,
      });
    }
  },

  addRepresentative: async (representativeData) => {
    set({ representativesLoading: true, representativesError: null });

    try {
      const newRepresentative =
        await representativeService.createRepresentative(representativeData);

      set((state) => ({
        representatives: [...state.representatives, newRepresentative],
        representativesLoading: false,
      }));
    } catch (error) {
      set({
        representativesError: error.message || "Müşteri oluşturulamadı",
        representativesLoading: false,
      });
    }
  },

  updateRepresentative: async (id, representativeData) => {
    set({ representativesLoading: true, representativesError: null });

    try {
      const updatedRepresentative =
        await representativeService.updateRepresentative(representativeData);

      const refreshedRepresentative =
        await representativeService.getRepresentativeById(id);
      if (!refreshedRepresentative) {
        throw new Error("Temsilci bilgileri yüklenemedi");
      }

      set((state) => ({
        representatives: state.representatives.map((representative) =>
          representative.id === id
            ? { ...refreshedRepresentative }
            : representative
        ),
        representativesLoading: false,
      }));
      return updatedRepresentative;
    } catch (error) {
      set({
        representativesError: error.message || "Temsilci güncellenemedi",
        representativesLoading: false,
      });
    }
  },

  deleteRepresentative: async (id) => {
    set({ representativesLoading: true, representativesError: null });

    try {
      await representativeService.deleteRepresentative(id);

      set((state) => ({
        representatives: state.representatives.filter(
          (representative) => representative.id !== id
        ),
        representativesLoading: false,
      }));
    } catch (error) {
      set({
        representativesError: error.message || "Temsilci silinemedi",
        representativesLoading: false,
      });
      throw error;
    }
  },

  // refreshRepresentatives: async () => {
  //   const { fetchRepresentatives } = get();
  //   await fetchRepresentatives(true); // Force refresh
  // },

  clearRepresentativesError: () => set({ representativesError: null }),
}));
