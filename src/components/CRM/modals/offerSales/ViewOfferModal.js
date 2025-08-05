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
import { useCRMStore } from "@/stores/useCRMStore";
import {
  Calendar,
  Mail,
  Phone,
  MapPin,
  FileText,
  Building,
  User,
  DollarSign,
  Percent,
  Receipt,
} from "lucide-react";
import CurrencyFormatter from "@/components/common/CurrencyFormatter";

export default function ViewOfferModal() {
  const { isViewOfferModalOpen, setIsViewOfferModalOpen, selectedOffer } =
    useCRMStore();

  if (!selectedOffer) return null;
  else console.log(selectedOffer);

  const formatDate = (dateString) => {
    if (!dateString) return "Belirtilmemiş";
    return new Date(dateString).toLocaleDateString("tr-TR");
  };

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
                {selectedOffer.customer}
              </h3>
              <div className="flex gap-2">
                <Badge
                  className={
                    selectedOffer.status === "Onaylandı"
                      ? "bg-green-500"
                      : selectedOffer.status === "Reddedildi"
                      ? "bg-red-500"
                      : "bg-yellow-500"
                  }
                >
                  {selectedOffer.status}
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
                  {selectedOffer.discountValue ? (
                    <p className="text-sm text-gray-900">
                      {selectedOffer.discountType === "fixed"
                        ? "Sabit Tutar: "
                        : "%"}{" "}
                      <CurrencyFormatter
                        amount={selectedOffer.discountValue}
                        currency={selectedOffer.currency}
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
                    KDV DAHİL{selectedOffer.vatIncluded ? "DİR" : " DEĞİLDİR"}
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
                    {formatDate(selectedOffer.validUntil)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Adres */}
          {selectedOffer.products && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-gray-500" />
                <h4 className="text-sm font-medium text-gray-700">Açıklama</h4>
              </div>
              <p className="text-sm text-gray-900 ml-6 bg-gray-50 p-3 rounded-md">
                {selectedOffer.products}
              </p>
            </div>
          )}

          {/* Notlar */}
          {selectedOffer.notes && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-gray-500" />
                <h4 className="text-sm font-medium text-gray-700">Notlar</h4>
              </div>
              <p className="text-sm text-gray-900 ml-6 bg-gray-50 p-3 rounded-md">
                {selectedOffer.notes}
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
