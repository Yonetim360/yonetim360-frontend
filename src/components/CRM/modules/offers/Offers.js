import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Edit, Eye, Handshake, Plus } from "lucide-react";
import OfferDetailsModal from "../../modals/offerSales/OfferDetailsModal";
import ViewOfferModal from "../../modals/offerSales/ViewOfferModal";
import CurrencyFormatter from "@/components/common/CurrencyFormatter";
import EndingOfferModal from "../../modals/offerSales/EndingOfferModal";
import { OfferStore } from "@/stores/crm/domains/OfferStore";
import { useEffect, useState } from "react";
import { CustomerStore } from "@/stores/crm/domains/CustomerStore";
import { RepresentativeStore } from "@/stores/crm/domains/RepresentativeStore";

export default function Offers() {
  const {
    offers,
    setIsOfferModalOpen,
    setIsOfferDetailsModalOpen,
    setIsViewOfferModalOpen,
    setSelectedOffer,
    setIsEndingOfferModalOpen,
    fetchOffers,
  } = OfferStore();

  const { getCustomerById } = CustomerStore();
  const { getRepresentativeById } = RepresentativeStore();

  const [offersWithNames, setOffersWithNames] = useState([]);

  useEffect(() => {
    fetchOffers();
  }, [fetchOffers]);

  useEffect(() => {
    const loadOffersWithCustomerNames = async () => {
      const offersWithNames = await Promise.all(
        offers.map(async (offer) => {
          try {
            // const customer = await getCustomerById(offer.customerId);
            // const representative = await getRepresentativeById(
            //   offer.representativeId
            // );
            const customer = { companyName: "Demo Müşteri" };
            const representative = { firstName: "Demo", lastName: "Kullanıcı" };
            return {
              ...offer,
              customerName: `${customer.companyName}`,
              representativeName: `${representative.firstName} ${representative.lastName}`,
            };
          } catch (error) {
            console.error(
              `Error fetching customer ${offer.customerId}:`,
              error
            );
            return {
              ...offer,
              customerName: "Unknown Customer",
            };
          }
        })
      );
      setOffersWithNames(offersWithNames);
    };

    if (offers.length > 0) {
      loadOffersWithCustomerNames();
    }
  }, [offers, getCustomerById, getRepresentativeById]);

  // --- Handlers ---
  const handleAddOffer = () => {
    setIsOfferModalOpen(true);
  };

  const handleViewOffer = (offer) => {
    setIsViewOfferModalOpen(true);
    setSelectedOffer(offer);
  };

  const handleEditOffer = (offer) => {
    setIsOfferDetailsModalOpen(true);
    setSelectedOffer(offer);
  };

  const handleEndOffer = (offer) => {
    setIsEndingOfferModalOpen(true);
    setSelectedOffer(offer);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-bold text-dark-gray">Teklif Takibi</h3>
          <p className="text-gray-600">
            Tekliflerinizi yönetin ve satış sürecinizi takip edin
          </p>
        </div>
        <Button
          className="bg-customRed hover:bg-customRed/90"
          onClick={handleAddOffer}
        >
          <Plus className="mr-2 h-4 w-4" />
          Yeni Teklif
        </Button>
      </div>

      {/* Özet Kartlar */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-gray-600">Toplam Teklif</p>
              <p className="text-2xl font-bold text-dark-gray">15</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-gray-600">Onaylanan</p>
              <p className="text-2xl font-bold text-primary-green">8</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-gray-600">Bekleyen</p>
              <p className="text-2xl font-bold text-orange">5</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-gray-600">Reddedilen</p>
              <p className="text-2xl font-bold text-red">2</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Teklif Listesi */}
      <Card>
        <CardHeader>
          <CardTitle>Teklifler</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {offers.length === 0 ? (
              <div className="text-center py-8">
                <Handshake className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">
                  Henüz bir teklif bulunmamaktadır
                </p>
              </div>
            ) : (
              offersWithNames.map((offer) => (
                <div
                  key={offer.id}
                  className="p-4 border border-gray-200 rounded-lg"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-semibold text-dark-gray">
                        {offer.customerName}
                      </h4>
                      <h5 className=" text-dark-gray">
                        Temsilci: {offer.representativeName}
                      </h5>
                      <p className="text-sm text-gray-600">
                        Hizmet: {offer.serviceExplanation}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-dark-gray">
                        <CurrencyFormatter
                          amount={offer.amount}
                          currency={offer.currency}
                        />
                      </p>
                      <Badge
                        variant={
                          offer.offerStatus === 0
                            ? "default"
                            : offer.offerStatus === 1
                            ? "success"
                            : "danger"
                        }
                        className={
                          offer.offerStatus === 0
                            ? "bg-orange"
                            : offer.offerStatus === 1
                            ? "bg-primary-green"
                            : "bg-customRed"
                        }
                      >
                        {
                          {
                            0: "Bekliyor",
                            1: "Onaylandı",
                            2: "Reddedildi",
                          }[offer.offerStatus]
                        }
                      </Badge>
                      <div className="mt-2">
                        <Button
                          onClick={() => handleViewOffer(offer)}
                          variant="ghost"
                          size="sm"
                          className="text-primary-green hover:text-primary-green/80"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          onClick={() => handleEditOffer(offer)}
                          variant="ghost"
                          size="sm"
                          className="text-orange hover:text-orange/80"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="ml-1"
                          onClick={() => handleEndOffer(offer)}
                        >
                          Sonuçlandır
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>Tarih: {offer.date}</span>
                    <span>
                      Geçerlilik:{" "}
                      {new Date(offer.validityDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Modals */}
      <OfferDetailsModal />
      <ViewOfferModal />
      <EndingOfferModal />
    </div>
  );
}
