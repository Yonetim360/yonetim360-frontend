import { create } from "zustand";

export const OfferStore = create((set, get) => ({
  selectedOffer: null,
  isOfferModalOpen: false,
  isOfferDetailsModalOpen: false,
  isViewOfferModalOpen: false,
  isViewOfferDetailsModalOpen: false,
  isEndingOfferModalOpen: false,

  offersLoading: false,

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

  offers: [
    {
      id: 1,
      customer: "ABC Teknoloji A.Ş.",
      offerNo: "TKL-2024-001",
      date: "2024-01-10",
      amount: "125000",
      status: "Onaylandı",
      validUntil: "2024-02-10",
      products: "Web Sitesi + Mobil Uygulama",
      discountValue: "1500",
      discountType: "fixed",
      currency: "TRY",
      vatIncluded: true,
      notes: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      id: 2,
      customer: "XYZ İnşaat Ltd.",
      offerNo: "TKL-2024-002",
      date: "2024-01-12",
      amount: "85000",
      status: "Beklemede",
      validUntil: "2024-02-12",
      products: "ERP Sistemi",
      currency: "USD",
      vatIncluded: false,
      notes: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
  ],
}));
