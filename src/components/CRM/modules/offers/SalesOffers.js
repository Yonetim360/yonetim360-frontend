import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCRMStore } from "@/stores/useCRMStore";
import {
  FileText,
  TrendingUp,
  DollarSign,
  Users,
  ArrowRight,
} from "lucide-react";

export default function SalesOffers() {
  const { offers, setActiveSubModule } = useCRMStore();

  // Basit istatistikler
  const totalOffers = offers.length;
  const approvedOffers = offers.filter(
    (offer) => offer.status === "Onaylandı"
  ).length;
  const pendingOffers = offers.filter(
    (offer) => offer.status === "Bekleyen"
  ).length;

  return (
    <div className="space-y-6">
      {/* Başlık */}
      <div>
        <h3 className="text-2xl font-bold text-dark-gray">
          Satış ve Teklif Yönetimi
        </h3>
        <p className="text-gray-600">
          Tekliflerinizi yönetin ve satış sürecinizi takip edin
        </p>
      </div>

      {/* İstatistik Kartları */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-3">
              <FileText className="h-8 w-8 text-blue-500" />
              <div>
                <p className="text-sm text-gray-600">Toplam Teklif</p>
                <p className="text-2xl font-bold text-dark-gray">
                  {totalOffers}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-3">
              <TrendingUp className="h-8 w-8 text-green-500" />
              <div>
                <p className="text-sm text-gray-600">Onaylanan</p>
                <p className="text-2xl font-bold text-primary-green">
                  {approvedOffers}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-3">
              <DollarSign className="h-8 w-8 text-orange-500" />
              <div>
                <p className="text-sm text-gray-600">Bekleyen</p>
                <p className="text-2xl font-bold text-orange">
                  {pendingOffers}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-3">
              <Users className="h-8 w-8 text-purple-500" />
              <div>
                <p className="text-sm text-gray-600">Bu Ay</p>
                <p className="text-2xl font-bold text-purple-600">8</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alt Modül Butonları */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card
          className="hover:shadow-lg transition-shadow cursor-pointer"
          onClick={() => setActiveSubModule("offers")}
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <FileText className="h-8 w-8 text-blue-600" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-dark-gray">
                    Teklif Yönetimi
                  </h4>
                  <p className="text-gray-600">
                    Tekliflerinizi oluşturun ve takip edin
                  </p>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                <ArrowRight className="h-5 w-5" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card
          className="hover:shadow-lg transition-shadow cursor-pointer"
          onClick={() => setActiveSubModule("sales")}
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-green-100 rounded-lg">
                  <TrendingUp className="h-8 w-8 text-green-600" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-dark-gray">
                    Satış Yönetimi
                  </h4>
                  <p className="text-gray-600">
                    Satışlarınızı takip edin ve yönetin
                  </p>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                <ArrowRight className="h-5 w-5" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
