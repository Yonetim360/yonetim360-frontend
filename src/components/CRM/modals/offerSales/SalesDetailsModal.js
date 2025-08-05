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

export default function SalesDetailsModal() {
  const {
    isSalesDetailsModalOpen,
    setIsSalesDetailsModalOpen,
    customers,
    selectedSale,
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
    if (selectedSale) {
      reset({
        customer: selectedSale.customer || "",
        status:
          selectedSale.status?.toLowerCase().replace("ı", "i") || "beklemede",
        workDescription:
          selectedSale.products || selectedSale.workDescription || "",
        currency: selectedSale.currency || "TRY",
        offer: selectedSale.amount || selectedSale.offer || "",
        validityDate:
          selectedSale.validUntil || selectedSale.validityDate || "",
        discountType: selectedSale.discountType || "percentage",
        discountValue: selectedSale.discountValue || "",
        vatIncluded: selectedSale.vatIncluded || false,
        notes: selectedSale.notes || "",
      });
    }
  }, [selectedSale, reset]);

  const onSubmit = (data) => {
    console.log(data);
    reset();
    setIsSalesDetailsModalOpen(false);
  };

  const handleClose = () => {
    reset();
    setIsSalesDetailsModalOpen(false);
  };

  return (
    <Dialog
      open={isSalesDetailsModalOpen}
      onOpenChange={setIsSalesDetailsModalOpen}
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
              <p>{selectedSale.customer}</p>
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
                      <SelectItem value="imzalandı">İmzalandı</SelectItem>
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
              Satış Durumunu Kaydet
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
