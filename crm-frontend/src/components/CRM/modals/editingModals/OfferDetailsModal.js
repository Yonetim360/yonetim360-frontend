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
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useCRMStore } from "@/stores/useCRMStore";
import * as z from "zod";
import { Textarea } from "@/components/ui/textarea";
import { useEffect } from "react";

// Zod şeması
const offerSchema = z.object({
  customer: z.string().min(1, "Firma adı zorunludur"),
  status: z.enum(["beklemede", "Onaylandı", "reddedildi"]),
  workDescription: z.string().min(1, "Yapılacak iş açıklaması zorunludur"),
  offer: z.string().min(1, "Ücret zorunludur"),
  validityDate: z.string().min(1, "Geçerlilik tarihi zorunludur"),
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
    formState: { errors },
  } = useForm({
    resolver: zodResolver(offerSchema),
    defaultValues: {
      customer: "",
      status: "",
      workDescription: "",
      offer: "",
      validityDate: "",
      notes: "",
    },
  });

  useEffect(() => {
    if (selectedOffer) {
      reset({
        customer: selectedOffer.customer || "",
        status: selectedOffer.status?.toLowerCase().replace("ı", "i") || "",
        workDescription: selectedOffer.products || "",
        offer: selectedOffer.amount || "",
        validityDate: selectedOffer.validUntil || "",
        notes: selectedOffer.notes || "",
      });
    }
  }, [selectedOffer, reset]);

  const onSubmit = (data) => {
    console.log(data);
    reset();
    setIsOfferDetailsModalOpen(false);
  };

  return (
    <Dialog
      open={isOfferDetailsModalOpen}
      onOpenChange={setIsOfferDetailsModalOpen}
    >
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-gray-900">Teklif Detayları</DialogTitle>
          <DialogDescription className="text-gray-600">
            Teklif bilgilerini girin ve kaydedin.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
          noValidate
        >
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Müşteri *</Label>
              <Controller
                name="customer"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Müşteri seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      {customers.map((customer) => (
                        <SelectItem key={customer.id} value={customer.name}>
                          {customer.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.customer && (
                <p className="text-sm text-red-500">
                  {errors.customer.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label>Durum *</Label>
              <Controller
                control={control}
                name="status"
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
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
            </div>
          </div>

          <div className="space-y-4">
            <Label>Ürün ve Hizmetler *</Label>
            <Textarea {...register("workDescription")} rows={3} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Ücret ₺ *</Label>
              <Input {...register("offer")} type="text" />
            </div>
            <div className="space-y-2">
              <Label>Geçerlilik Tarihi *</Label>
              <Input
                {...register("validityDate")}
                type="date"
                className={
                  errors.validityDate
                    ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                    : ""
                }
              />
            </div>
          </div>

          <div className=" gap-4">
            <div className="space-y-2">
              <Label>Notlar</Label>
              <Textarea
                {...register("notes")}
                placeholder="Teklif detayları ve özel notlar..."
                rows={4}
              />
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOfferDetailsModalOpen(false)}
            >
              İptal
            </Button>
            <Button
              type="submit"
              className="bg-primary-green hover:bg-primary-green/90"
            >
              Teklif Kaydet
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
