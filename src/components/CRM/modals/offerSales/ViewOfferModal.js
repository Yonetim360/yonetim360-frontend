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
import { OfferStore } from "@/stores/crm/domains/OfferStore";

export default function ViewOfferModal() {
  const { isViewOfferModalOpen, setIsViewOfferModalOpen, selectedOffer } =
    OfferStore();

  if (!selectedOffer) return null;

  const formatDate = (dateString) => {
    if (!dateString) return "Belirtilmemiş";
    return new Date(dateString).toLocaleDateString("tr-TR");
  };

  // Status için yardımcı fonksiyon
  const getStatusConfig = (status) => {
    switch (status) {
      case 2:
        return { className: "bg-green-500", text: "Onaylandı" };
      case 1:
        return { className: "bg-yellow-500", text: "Beklemede" };
      case 3:
        return { className: "bg-red-500", text: "Reddedildi" };
      default:
        return { className: "bg-gray-500", text: "Bilgi Yok" };
    }
  };

  const statusConfig = getStatusConfig(selectedOffer.offerStatus);
  const hasDiscount =
    selectedOffer.discountValue && selectedOffer.discountValue !== 0;

  return (
    <Dialog open={isViewOfferModalOpen} onOpenChange={setIsViewOfferModalOpen}>
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
                {selectedOffer.customerName}
              </h3>
              <div className="flex gap-2">
                <Badge className={statusConfig.className}>
                  {statusConfig.text}
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
                  <p className="text-sm text-gray-900">
                    {selectedOffer.representativeName}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <DollarSign className="h-4 w-4 text-gray-500" />
                <div>
                  <p className="text-sm font-medium text-gray-700">Teklif</p>
                  <p className="text-sm text-gray-900">
                    <CurrencyFormatter
                      amount={selectedOffer.amount}
                      currency={selectedOffer.currency}
                    />
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Percent className="h-4 w-4 text-gray-500" />
                <div>
                  <p className="text-sm font-medium text-gray-700">İndirim</p>
                  {hasDiscount ? (
                    <p className="text-sm text-gray-900">
                      {selectedOffer.discountType === 1 ? (
                        `% ${selectedOffer.discountValue}`
                      ) : (
                        <>
                          Sabit Tutar:{" "}
                          <CurrencyFormatter
                            amount={selectedOffer.discountValue}
                            currency={selectedOffer.currency}
                          />
                        </>
                      )}
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
                    KDV DAHİL
                    {selectedOffer.taxIncluded === 1 ? "DİR" : " DEĞİLDİR"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <DollarSign className="h-4 w-4 text-gray-500" />
                <div>
                  <p className="text-sm font-medium text-gray-700">Son Fiyat</p>
                  <p className="text-sm text-gray-900">
                    <CurrencyFormatter
                      amount={
                        hasDiscount
                          ? selectedOffer.finalAmount
                          : selectedOffer.amount
                      }
                      currency={selectedOffer.currency}
                    />
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Calendar className="h-4 w-4 text-gray-500" />
                <div>
                  <p className="text-sm font-medium text-gray-700">
                    Teklifin Başlangıç Tarihi
                  </p>
                  <p className="text-sm text-gray-900">
                    {formatDate(selectedOffer.startDate)}
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
                    {formatDate(selectedOffer.validityDate)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Hizmet Açıklaması */}
          {selectedOffer.serviceExplanation && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-gray-500" />
                <h4 className="text-sm font-medium text-gray-700">Açıklama</h4>
              </div>
              <p className="text-sm text-gray-900 ml-6 bg-gray-50 p-3 rounded-md">
                {selectedOffer.serviceExplanation}
              </p>
            </div>
          )}

          {/* Notlar */}
          {selectedOffer.note && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-gray-500" />
                <h4 className="text-sm font-medium text-gray-700">Notlar</h4>
              </div>
              <p className="text-sm text-gray-900 ml-6 bg-gray-50 p-3 rounded-md">
                {selectedOffer.note}
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
