"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Calendar,
  FileText,
  Building,
  User,
  DollarSign,
  Percent,
  Receipt,
} from "lucide-react";
import CurrencyFormatter from "@/components/common/CurrencyFormatter";
import { SaleStore } from "@/stores/crm/domains/SaleStore";

export default function ViewSalesModal() {
  const { isViewSalesModalOpen, setIsViewSalesModalOpen, selectedSale } =
    SaleStore();

  if (!selectedSale) return null;

  const formatDate = (dateString) => {
    if (!dateString) return "Belirtilmemiş";
    return new Date(dateString).toLocaleDateString("tr-TR");
  };

  return (
    <Dialog open={isViewSalesModalOpen} onOpenChange={setIsViewSalesModalOpen}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-dark-gray flex items-center gap-2">
            <Building className="h-5 w-5" />
            Teklif Detayları
          </DialogTitle>
          <DialogDescription>
            Teklif detaylarını görüntüleyin.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Temel Bilgiler */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">
                {selectedSale.customer}
              </h3>
              <div className="flex gap-2">
                <Badge
                  className={
                    selectedSale.status === "Onaylandı"
                      ? "bg-green-500"
                      : selectedSale.status === "Reddedildi"
                      ? "bg-customRed-500"
                      : "bg-yellow-500"
                  }
                >
                  {selectedSale.status}
                </Badge>
              </div>
            </div>

            <Separator />

            {/* İletişim Bilgileri */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <User className="h-4 w-4 text-gray-500" />
                <div>
                  <p className="text-sm font-medium text-gray-700">Temsilci</p>
                  <p className="text-sm text-gray-900">Temsilci</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <DollarSign className="h-4 w-4 text-gray-500" />
                <div>
                  <p className="text-sm font-medium text-gray-700">Teklif</p>
                  <p className="text-sm text-gray-900">
                    <CurrencyFormatter
                      amount={selectedSale.amount}
                      currency={selectedSale.currency}
                    />
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Percent className="h-4 w-4 text-gray-500" />
                <div>
                  <p className="text-sm font-medium text-gray-700">İndirim</p>
                  {selectedSale.discountValue ? (
                    <p className="text-sm text-gray-900">
                      {selectedSale.discountType === "fixed"
                        ? "Sabit Tutar: "
                        : "%"}{" "}
                      <CurrencyFormatter
                        amount={selectedSale.discountValue}
                        currency={selectedSale.currency}
                      />
                    </p>
                  ) : (
                    <p className="text-sm text-gray-900">Yok</p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Receipt className="h-4 w-4 text-gray-500" />
                <div>
                  <p className="text-sm font-medium text-gray-700">
                    KDV Durumu
                  </p>
                  <p className="text-sm text-gray-900">
                    KDV DAHİL{selectedSale.vatIncluded ? "DİR" : " DEĞİLDİR"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Calendar className="h-4 w-4 text-gray-500" />
                <div>
                  <p className="text-sm font-medium text-gray-700">
                    Teklifin Son Geçerlilik Tarihi
                  </p>
                  <p className="text-sm text-gray-900">
                    {formatDate(selectedSale.validUntil)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Adres */}
          {selectedSale.products && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-gray-500" />
                <h4 className="text-sm font-medium text-gray-700">Açıklama</h4>
              </div>
              <p className="text-sm text-gray-900 ml-6 bg-gray-50 p-3 rounded-md">
                {selectedSale.products}
              </p>
            </div>
          )}

          {/* Notlar */}
          {selectedSale.notes && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-gray-500" />
                <h4 className="text-sm font-medium text-gray-700">Notlar</h4>
              </div>
              <p className="text-sm text-gray-900 ml-6 bg-gray-50 p-3 rounded-md">
                {selectedSale.notes}
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
