import { salesOffersService } from "@/services/CRM/SalesOffersService";
import { create } from "zustand";

export const OfferStore = create((set, get) => ({
  selectedOffer: null,
  isOfferModalOpen: false,
  isOfferDetailsModalOpen: false,
  isViewOfferModalOpen: false,
  isViewOfferDetailsModalOpen: false,
  isEndingOfferModalOpen: false,

  offersLoading: false,

  offers: [],
  offersLoaded: false,

  offerForm: {
    customer: "",
    offerNo: "",
    date: "",
    amount: "",
    status: "",
    validUntil: "",
    products: "",
  },

  setOfferForm: (form) => set({ offerForm: form }),

  setOfferModalOpen: (val) => set({ isOfferModalOpen: val }),
  setIsOfferModalOpen: (val) => set({ isOfferModalOpen: val }),
  setIsViewOfferModalOpen: (val) => set({ isViewOfferModalOpen: val }),
  setIsViewOfferDetailsModalOpen: (val) =>
    set({ isViewOfferDetailsModalOpen: val }),
  setIsOfferDetailsModalOpen: (val) => set({ isOfferDetailsModalOpen: val }),
  setIsEndingOfferModalOpen: (val) => set({ isEndingOfferModalOpen: val }),

  setSelectedOffer: (offer) => set({ selectedOffer: offer }),

  fetchOffers: async (forceRefresh = false) => {
    const { offersLoaded, offersLoading } = get();

    // Eğer zaten yüklenmişse ve force refresh yoksa, çık
    if (offersLoaded && !forceRefresh) {
      return;
    }

    // Zaten yükleniyorsa, çık
    if (offersLoading) {
      return;
    }

    set({ offersLoading: true, offersError: null });

    try {
      const offers = await salesOffersService.getOffers(forceRefresh);

      set({
        offers: offers,
        offersLoaded: true,
        offersLoading: false,
        offersError: null,
      });
    } catch (error) {
      set({
        offersError: error.message || "Müşteri verileri yüklenemedi",
        offersLoading: false,
      });
    }
  },

  addOffer: async (offerData) => {
    set({ offersLoading: true, offersError: null });

    try {
      const newOffer = await salesOffersService.createOffer(offerData);

      set((state) => ({
        offers: [...state.offers, newOffer],
        offersLoading: false,
      }));
    } catch (error) {
      set({
        offersError: error.message || "Müşteri oluşturulamadı",
        offersLoading: false,
      });
    }
  },
  updateOffer: async (id, offerData) => {
    set({ offersLoading: true, offersError: null });

    try {
      const updatedOffer = await offerservice.updateoffer(offerData);

      const refreshedOffer = await offerservice.getofferById(id);
      if (!refreshedOffer) {
        throw new Error("Müşteri bilgileri yüklenemedi");
      }

      set((state) => ({
        offers: state.offers.map((offer) =>
          offer.id === id ? { ...refreshedOffer } : offer
        ),
        offersLoading: false,
      }));
      return updatedOffer;
    } catch (error) {
      set({
        offersError: error.message || "Müşteri güncellenemedi",
        offersLoading: false,
      });
    }
  },
  deleteOffer: async (id) => {
    set({ offersLoading: true, offersError: null });

    try {
      await offerservice.deleteoffer(id);

      set((state) => ({
        offers: state.offers.filter((offer) => offer.id !== id),
        offersLoading: false,
      }));
    } catch (error) {
      set({
        offersError: error.message || "Müşteri silinemedi",
        offersLoading: false,
      });
      throw error;
    }
  },
  clearOffersError: () => {
    set({ offersError: null });
  },
}));
