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
import { useCRMStore } from "@/stores/useCRMStore";
import * as z from "zod";
import { useEffect } from "react";
import { X } from "lucide-react";

// Zod şeması
const offerSchema = z.object({
  customer: z.string().min(1, "Müşteri seçimi zorunludur"),
  status: z.string().min(1, "Durum seçimi zorunludur"),
  workDescription: z.string().min(1, "Ürün/hizmet bilgisi zorunludur"),
  currency: z.string().min(1, "Para birimi seçimi zorunludur"),
  offer: z.string().min(1, "Tutar bilgisi zorunludur"),
  validityDate: z.string().min(1, "Geçerlilik tarihi zorunludur"),
  discountType: z.string().optional(),
  discountValue: z.string().optional(),
  vatIncluded: z.boolean().optional(),
  notes: z.string().optional(),
});

export default function OfferDetailsModal() {
  const {
    isOfferDetailsModalOpen,
    setIsOfferDetailsModalOpen,
    customers,
    selectedOffer,
  } = useCRMStore();

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
      customer: "",
      status: "beklemede",
      workDescription: "",
      currency: "TRY",
      offer: "",
      validityDate: "",
      discountType: "percentage",
      discountValue: "",
      vatIncluded: false,
      notes: "",
    },
  });

  useEffect(() => {
    if (selectedOffer) {
      reset({
        customer: selectedOffer.customer || "",
        status:
          selectedOffer.status?.toLowerCase().replace("ı", "i") || "beklemede",
        workDescription:
          selectedOffer.products || selectedOffer.workDescription || "",
        currency: selectedOffer.currency || "TRY",
        offer: selectedOffer.amount || selectedOffer.offer || "",
        validityDate:
          selectedOffer.validUntil || selectedOffer.validityDate || "",
        discountType: selectedOffer.discountType || "percentage",
        discountValue: selectedOffer.discountValue || "",
        vatIncluded: selectedOffer.vatIncluded || false,
        notes: selectedOffer.notes || "",
      });
    }
  }, [selectedOffer, reset]);

  const onSubmit = (data) => {
    console.log(data);
    reset();
    setIsOfferDetailsModalOpen(false);
  };

  const handleClose = () => {
    reset();
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

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
          noValidate
        >
          {/* Müşteri ve Durum */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-dark-gray">
                Müşteri <span className="text-red">*</span>
              </Label>
              <Controller
                name="customer"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="h-11">
                      <SelectValue placeholder="Müşteri seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      {customers?.map((customer) => (
                        <SelectItem key={customer.id} value={customer.name}>
                          {customer.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.customer && (
                <p className="text-sm text-red">{errors.customer.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-dark-gray">
                Durum <span className="text-red">*</span>
              </Label>
              <Controller
                control={control}
                name="status"
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="h-11">
                      <SelectValue placeholder="Teklif Durumu" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beklemede">Beklemede</SelectItem>
                      <SelectItem value="onaylandi">Onaylandı</SelectItem>
                      <SelectItem value="reddedildi">Reddedildi</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.status && (
                <p className="text-sm text-red">{errors.status.message}</p>
              )}
            </div>
          </div>

          {/* Ürün/Hizmetler */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-dark-gray">
              Ürün/Hizmetler <span className="text-red">*</span>
            </Label>
            <Textarea
              {...register("workDescription")}
              placeholder="Web Sitesi + Mobil Uygulama"
              rows={3}
              className="resize-none"
            />
            {errors.workDescription && (
              <p className="text-sm text-red">
                {errors.workDescription.message}
              </p>
            )}
          </div>

          {/* Tutar ve Geçerlilik Tarihi */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-dark-gray">
                Tutar <span className="text-red">*</span>
              </Label>
              <div className="flex">
                <Controller
                  name="currency"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-20 rounded-r-none border-r-0">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="TRY">₺</SelectItem>
                        <SelectItem value="USD">$</SelectItem>
                        <SelectItem value="EUR">€</SelectItem>
                        <SelectItem value="GBP">£</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                <Input
                  {...register("offer")}
                  placeholder="125.000"
                  className="rounded-l-none flex-1"
                />
              </div>
              {errors.offer && (
                <p className="text-sm text-red">{errors.offer.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-dark-gray">
                Geçerlilik Tarihi <span className="text-red">*</span>
              </Label>
              <Input
                {...register("validityDate")}
                type="date"
                placeholder="gg.aa.yyyy"
                className="h-11"
              />
              {errors.validityDate && (
                <p className="text-sm text-red">
                  {errors.validityDate.message}
                </p>
              )}
            </div>
          </div>

          {/* İndirim */}
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
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Tür" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="percentage">Yüzde (%)</SelectItem>
                        <SelectItem value="fixed">Sabit Tutar</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                <Input
                  {...register("discountValue")}
                  placeholder="10"
                  className="w-20"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Controller
                  name="vatIncluded"
                  control={control}
                  render={({ field }) => (
                    <Checkbox
                      id="vatIncluded"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
                <Label
                  htmlFor="vatIncluded"
                  className="text-sm font-medium text-dark-gray cursor-pointer"
                >
                  KDV Dahil
                </Label>
              </div>
            </div>
          </div>

          {/* Notlar */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-dark-gray">Notlar</Label>
            <Textarea
              {...register("notes")}
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
              className="bg-red hover:bg-red/90 text-white px-6"
            >
              Teklif Kaydet
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
