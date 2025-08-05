import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCRMStore } from "@/stores/useCRMStore";
import { Edit, Eye } from "lucide-react";
import CurrencyFormatter from "@/components/common/CurrencyFormatter";
import ViewSalesModal from "../../modals/offerSales/ViewSalesModal";
import SalesDetailsModal from "../../modals/offerSales/SalesDetailsModal";

export default function Sales() {
  const {
    sales,
    setIsSalesDetailsModalOpen,
    setIsViewSalesModalOpen,
    setSelectedSale,
  } = useCRMStore();
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-bold text-dark-gray">Satış Takibi</h3>
          <p className="text-gray-600">Satış süreçlerinizi takip edin</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Satışlar</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {sales.map((sale) => (
              <div
                key={sale.id}
                className="p-4 border border-gray-200 rounded-lg"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-semibold text-dark-gray">
                      {sale.customer}
                    </h4>
                    <p className="text-sm text-gray-600">
                      Teklif No: {sale.offerNo}
                    </p>
                    <p className="text-sm text-gray-600">{sale.products}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-dark-gray">
                      <CurrencyFormatter
                        amount={sale.amount}
                        currency={sale.currency}
                      />
                    </p>
                    <Badge
                      variant={
                        sale.status === "Onaylandı" ? "default" : "secondary"
                      }
                      className={
                        sale.status === "Onaylandı"
                          ? "bg-primary-green"
                          : "bg-orange"
                      }
                    >
                      {sale.status}
                    </Badge>
                    <div className="mt-2">
                      <Button
                        onClick={() => (
                          setIsViewSalesModalOpen(true), setSelectedSale(sale)
                        )}
                        variant="ghost"
                        size="sm"
                        className="text-primary-green hover:text-primary-green/80"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        onClick={() => (
                          setIsSalesDetailsModalOpen(true),
                          setSelectedSale(sale)
                        )}
                        variant="ghost"
                        size="sm"
                        className="text-orange hover:text-orange/80"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>Tarih: {sale.date}</span>
                  <span>Geçerlilik: {sale.validUntil}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      <ViewSalesModal />
      <SalesDetailsModal />
    </div>
  );
}
