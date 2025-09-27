"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useEffect, useMemo, useState } from "react";
import { OfferStore } from "@/stores/crm/domains/OfferStore";

// Zod şeması
const offerSchema = z.object({
  representativeId: z.string().optional(),
  offerStatus: z.number().min(1).max(4, "Durum seçimi zorunludur"),
  serviceExplanation: z.string().min(1, "Ürün/hizmet bilgisi zorunludur"),
  currency: z.number().min(0).max(3, "Para birimi seçimi zorunludur"),
  amount: z.number().min(1, "Tutar bilgisi zorunludur"),
  validityDate: z.string().min(1, "Geçerlilik tarihi zorunludur"),
  discountType: z.number().min(0).max(2, "İndirim türü zorunludur"),
  discountValue: z.number().optional(),
  taxIncluded: z.number().min(0).max(1, "KDV bilgisi zorunludur"),
  note: z.string().optional(),
});

export default function OfferDetailsModal() {
  const {
    isOfferDetailsModalOpen,
    setIsOfferDetailsModalOpen,
    selectedOffer,
    setSelectedOffer,
    updateOffer,
  } = OfferStore();

  // Fiyat değiştirme durumu
  const [isPriceEditEnabled, setIsPriceEditEnabled] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    control,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(offerSchema),
    defaultValues: {
      offerStatus: 1,
      serviceExplanation: "",
      currency: 0,
      amount: 0,
      validityDate: "",
      discountType: 1,
      discountValue: 0,
      taxIncluded: 0,
      note: "",
    },
  });

  useEffect(() => {
    if (selectedOffer) {
      reset({
        offerStatus: selectedOffer.offerStatus ?? 1,
        serviceExplanation: selectedOffer.serviceExplanation ?? "",
        currency: selectedOffer.currency ?? 0,
        amount: selectedOffer.amount ?? 0,
        validityDate: selectedOffer.validityDate
          ? new Date(selectedOffer.validityDate).toISOString().split("T")[0]
          : "",
        discountType: selectedOffer.discountType ?? 1,
        discountValue: selectedOffer.discountValue ?? 0,
        taxIncluded: selectedOffer.taxIncluded,
        note: selectedOffer.note ?? "",
      });
    }
  }, [selectedOffer, reset]);

  // Watch form değerleri
  const currency = watch("currency");
  const amount = watch("amount");
  const discountValue = watch("discountValue");
  const discountType = watch("discountType");
  const taxIncluded = watch("taxIncluded");

  // Para birimi simgesi fonksiyonu
  const getCurrencySymbol = (currencyCode) => {
    const symbols = {
      0: "₺",
      1: "$",
      2: "€",
      3: "£",
    };
    return symbols[currencyCode] || "₺";
  };

  // Toplam tutar hesaplama - isPriceEditEnabled durumundan bağımsız
  const totalAmount = useMemo(() => {
    const baseAmount = amount || 0;
    const discount = discountValue || 0;
    const discType = discountType || 1;

    let discountedAmount = baseAmount;

    // İndirim hesaplama
    if (discount > 0) {
      if (discType === 1) {
        // Yüzde indirim
        discountedAmount = baseAmount - (baseAmount * discount) / 100;
      } else if (discType === 2) {
        // Sabit tutar indirim
        discountedAmount = baseAmount - discount;
      }
    }

    // KDV hesaplama (KDV dahil değilse %20 ekle)
    let finalAmount = discountedAmount;
    if (taxIncluded === 0 && discountedAmount > 0) {
      finalAmount = discountedAmount * 1.2;
    }

    return Math.max(0, finalAmount);
  }, [amount, discountValue, discountType, taxIncluded]);

  const onSubmit = async (data) => {
    const dataToSend = {
      ...data,
      id: selectedOffer.id,
      representativeId: data.representativeId || selectedOffer.representativeId,
      customerId: selectedOffer.customerId,
      title: "changed offer title",
      documentUrl: "notnullable!!1",
    };

    await updateOffer(selectedOffer.id, dataToSend);
    reset();
    setIsPriceEditEnabled(false);
    setIsOfferDetailsModalOpen(false);
  };

  const handleClose = () => {
    reset();
    setIsPriceEditEnabled(false);
    setSelectedOffer(null);
    setIsOfferDetailsModalOpen(false);
  };

  return (
    <Dialog
      open={isOfferDetailsModalOpen}
      onOpenChange={setIsOfferDetailsModalOpen}
    >
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="relative">
          <DialogTitle className="text-xl font-semibold text-dark-gray">
            Teklif Detayları
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            Teklif bilgilerini girin ve kaydedin.
          </DialogDescription>
        </DialogHeader>

        {selectedOffer ? (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
            noValidate
          >
            {/* Müşteri ve Durum */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="text-sm font-medium text-dark-gray">
                  Müşteri
                </div>
                <div>{selectedOffer.customerName}</div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-dark-gray">
                  Durum <span className="text-customRed">*</span>
                </Label>
                <Controller
                  control={control}
                  name="offerStatus"
                  render={({ field }) => (
                    <Select
                      value={field.value?.toString()}
                      onValueChange={(val) => field.onChange(Number(val))}
                    >
                      <SelectTrigger className="h-11">
                        <SelectValue placeholder="Teklif Durumu" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Beklemede</SelectItem>
                        <SelectItem value="2">Onaylandı</SelectItem>
                        <SelectItem value="3">Reddedildi</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.offerStatus && (
                  <p className="text-sm text-customRed">
                    {errors.offerStatus.message}
                  </p>
                )}
              </div>
            </div>

            {/* Ürün/Hizmetler */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-dark-gray">
                Ürün/Hizmetler <span className="text-customRed">*</span>
              </Label>
              <Textarea
                {...register("serviceExplanation")}
                placeholder="Web Sitesi + Mobil Uygulama"
                rows={3}
                className="resize-none"
              />
              {errors.serviceExplanation && (
                <p className="text-sm text-customRed">
                  {errors.serviceExplanation.message}
                </p>
              )}
            </div>

            {/* Fiyat Değiştirme Seçeneği */}
            <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
              <Checkbox
                id="priceEditEnabled"
                checked={isPriceEditEnabled}
                onCheckedChange={setIsPriceEditEnabled}
              />
              <Label
                htmlFor="priceEditEnabled"
                className="text-sm font-medium text-dark-gray cursor-pointer"
              >
                Fiyatı değiştirmek istiyorum
              </Label>
            </div>

            {/* Tutar ve Geçerlilik Tarihi */}
            <div className="grid grid-cols-2 gap-4">
              {/* Tutar - sadece fiyat değiştirme aktifken görünür */}
              {isPriceEditEnabled && (
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-dark-gray">
                    Tutar <span className="text-customRed">*</span>
                  </Label>
                  <div className="flex">
                    <Controller
                      name="currency"
                      control={control}
                      render={({ field }) => (
                        <Select
                          value={field.value?.toString()}
                          onValueChange={(val) => field.onChange(Number(val))}
                        >
                          <SelectTrigger className="w-20 rounded-r-none border-r-0">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="0">₺</SelectItem>
                            <SelectItem value="1">$</SelectItem>
                            <SelectItem value="2">€</SelectItem>
                            <SelectItem value="3">£</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                    <Input
                      {...register("amount", { valueAsNumber: true })}
                      placeholder="125.000"
                      className="rounded-l-none flex-1"
                    />
                  </div>
                  {errors.amount && (
                    <p className="text-sm text-customRed">
                      {errors.amount.message}
                    </p>
                  )}
                </div>
              )}

              <div className="space-y-2">
                <Label className="text-sm font-medium text-dark-gray">
                  Geçerlilik Tarihi <span className="text-customRed">*</span>
                </Label>
                <Input
                  {...register("validityDate")}
                  type="date"
                  placeholder="gg.aa.yyyy"
                  className="h-11"
                />
                {errors.validityDate && (
                  <p className="text-sm text-customRed">
                    {errors.validityDate.message}
                  </p>
                )}
              </div>
            </div>

            {/* İndirim - sadece fiyat değiştirme aktifken görünür */}
            {isPriceEditEnabled && (
              <div className="space-y-3">
                <Label className="text-sm font-medium text-dark-gray">
                  İndirim
                </Label>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Controller
                      name="discountType"
                      control={control}
                      render={({ field }) => (
                        <Select
                          value={field.value?.toString()}
                          onValueChange={(val) => field.onChange(Number(val))}
                        >
                          <SelectTrigger className="w-32">
                            <SelectValue placeholder="Tür" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="0">Yok</SelectItem>
                            <SelectItem value="1">Yüzde (%)</SelectItem>
                            <SelectItem value="2">Sabit Tutar</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                    <Input
                      {...register("discountValue", { valueAsNumber: true })}
                      placeholder="10"
                      className="w-20"
                    />
                  </div>

                  <div className="flex items-center justify-center gap-2">
                    <Controller
                      name="taxIncluded"
                      control={control}
                      render={({ field }) => (
                        <Checkbox
                          id="taxIncluded"
                          checked={field.value === 1}
                          onCheckedChange={(checked) =>
                            field.onChange(checked ? 1 : 0)
                          }
                        />
                      )}
                    />
                    <Label
                      htmlFor="taxIncluded"
                      className="text-sm font-medium text-dark-gray cursor-pointer"
                    >
                      KDV Dahil
                    </Label>
                  </div>
                </div>

                {/* İndirim bilgisi göster */}
                {discountValue > 0 && (
                  <div className="text-sm text-green-600">
                    İndirim:{" "}
                    {discountType === 1
                      ? `%${discountValue}`
                      : `${getCurrencySymbol(
                          currency
                        )} ${discountValue.toLocaleString("tr-TR")}`}
                  </div>
                )}
              </div>
            )}

            {/* Toplam Tutar - Her zaman görünür */}
            <div className="space-y-2 flex flex-row gap-5 items-center">
              <div className="text-sm font-medium text-dark-gray">
                Toplam Tutar
              </div>
              <div className="font-semibold text-lg text-green-600">
                {getCurrencySymbol(currency)}{" "}
                {totalAmount.toLocaleString("tr-TR", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </div>
            </div>

            {/* Notlar */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-dark-gray">
                Notlar
              </Label>
              <Textarea
                {...register("note")}
                placeholder="Teklif detayları ve özel notlar..."
                rows={4}
                className="resize-none"
              />
            </div>

            {/* Footer Buttons */}
            <DialogFooter className="flex justify-end space-x-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                className="px-6 bg-transparent"
              >
                İptal
              </Button>
              <Button
                type="submit"
                className="bg-customRed hover:bg-customRed/90 text-white px-6"
              >
                Teklifi Düzenle
              </Button>
            </DialogFooter>
          </form>
        ) : (
          <div className="flex justify-center items-center h-full">
            <p className="text-lg text-muted-foreground">Teklif bulunamadı</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
