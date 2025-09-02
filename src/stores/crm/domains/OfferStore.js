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
      const offers = await offerservice.getoffers(forceRefresh);

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
}));
