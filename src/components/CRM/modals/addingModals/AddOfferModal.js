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
import { useCRMStore } from "@/stores/useCRMStore";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// Zod şeması
const offerSchema = z.object({
  customer: z.string().min(1, "Müşteri seçimi zorunludur"),
  products: z.string().min(1, "Ürün/hizmet bilgisi zorunludur"),
  amount: z
    .string()
    .min(1, "Tutar bilgisi zorunludur")
    .regex(/^₺?\d+(,\d{3})*(\.\d{2})?$/, "Geçerli bir tutar girin"),
  validUntil: z.string().min(1, "Geçerlilik tarihi zorunludur"),
  notes: z.string().optional(),
});

export default function AddOfferModal() {
  const {
    isOfferModalOpen,
    setIsOfferModalOpen,
    customers,
    handleOfferSubmit,
    isLoading,
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
      products: "",
      amount: "",
      validUntil: "",
      notes: "",
    },
  });

  const onSubmit = (data) => {
    handleOfferSubmit(data);
    reset();
    setIsOfferModalOpen(false);
  };

  return (
    <Dialog open={isOfferModalOpen} onOpenChange={setIsOfferModalOpen}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-dark-gray">
            Yeni Teklif Oluştur
          </DialogTitle>
          <DialogDescription>
            Müşteri için yeni bir teklif hazırlayın.
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
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

          <div className="space-y-2">
            <Label>Ürün/Hizmetler *</Label>
            <Textarea
              {...register("products")}
              placeholder="Web Sitesi + Mobil Uygulama"
              rows={3}
            />
            {errors.products && (
              <p className="text-sm text-red-500">{errors.products.message}</p>
            )}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Tutar *</Label>
              <Input {...register("amount")} placeholder="₺125,000" />
              {errors.amount && (
                <p className="text-sm text-red-500">{errors.amount.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label>Geçerlilik Tarihi *</Label>
              <Input {...register("validUntil")} type="date" />
              {errors.validUntil && (
                <p className="text-sm text-red-500">
                  {errors.validUntil.message}
                </p>
              )}
            </div>
          </div>
          <div className="space-y-2">
            <Label>Notlar</Label>
            <Textarea
              {...register("notes")}
              placeholder="Teklif detayları ve özel notlar..."
              rows={3}
            />
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOfferModalOpen(false)}
            >
              İptal
            </Button>
            <Button
              type="submit"
              className="bg-red hover:bg-red/90"
              disabled={isLoading}
            >
              {isLoading ? "Oluşturuluyor..." : "Teklif Oluştur"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
