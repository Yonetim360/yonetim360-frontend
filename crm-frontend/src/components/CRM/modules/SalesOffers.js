import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCRMStore } from "@/stores/useCRMStore";
import { Plus } from "lucide-react";
import OfferDetailsModal from "../modals/editingModals/OfferDetailsModal";

export default function SalesOffers() {
  const {
    offers,
    setIsOfferModalOpen,
    setIsOfferDetailsModalOpen,
    setSelectedOffer,
  } = useCRMStore();
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-bold text-dark-gray">
            Teklif ve Satış Takibi
          </h3>
          <p className="text-gray-600">
            Tekliflerinizi yönetin ve satış sürecinizi takip edin
          </p>
        </div>
        <Button
          className="bg-red hover:bg-red/90"
          onClick={() => setIsOfferModalOpen(true)}
        >
          <Plus className="mr-2 h-4 w-4" />
          Yeni Teklif
        </Button>
      </div>

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

      <Card>
        <CardHeader>
          <CardTitle>Teklifler</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {offers.map((offer) => (
              <div
                key={offer.id}
                className="p-4 border border-gray-200 rounded-lg"
                onClick={() => (
                  setIsOfferDetailsModalOpen(true), setSelectedOffer(offer)
                )}
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-semibold text-dark-gray">
                      {offer.customer}
                    </h4>
                    <p className="text-sm text-gray-600">
                      Teklif No: {offer.offerNo}
                    </p>
                    <p className="text-sm text-gray-600">{offer.products}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-dark-gray">{offer.amount}</p>
                    <Badge
                      variant={
                        offer.status === "Onaylandı" ? "default" : "secondary"
                      }
                      className={
                        offer.status === "Onaylandı"
                          ? "bg-primary-green"
                          : "bg-orange"
                      }
                    >
                      {offer.status}
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>Tarih: {offer.date}</span>
                  <span>Geçerlilik: {offer.validUntil}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      <OfferDetailsModal />
    </div>
  );
}
