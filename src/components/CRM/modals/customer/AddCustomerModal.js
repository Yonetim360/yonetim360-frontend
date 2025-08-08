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

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CustomerStore } from "@/stores/crm/domains/CustomerStore";

// 1. Zod şeması
const customerSchema = z.object({
  companyName: z.string().min(1, "Şirket adı zorunludur"),
  contactPerson: z.string().min(1, "İletişim kişisi zorunludur"),
  email: z.email("Geçerli bir e-posta girin"),
  phoneNumber: z.string().min(5, "Telefon numarası zorunludur"),
  segment: z.union([z.literal(1), z.literal(2), z.literal(3)]),
  state: z.union([z.literal(1), z.literal(2), z.literal(3)]),
  address: z.string().optional(),
  note: z.string().optional(),
});

export default function AddCustomerModal() {
  const {
    isCustomerModalOpen,
    setIsCustomerModalOpen,
    addCustomer,
    customersLoading,
  } = CustomerStore();

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(customerSchema),
    defaultValues: {
      companyName: "",
      contactPerson: "",
      email: "",
      phoneNumber: "",
      segment: "",
      status: "",
      address: "",
      note: "",
    },
  });

  const onSubmit = (data) => {
    addCustomer(data);
    reset(); // formu sıfırla
    setIsCustomerModalOpen(false); // modal kapat
  };

  return (
    <Dialog open={isCustomerModalOpen} onOpenChange={setIsCustomerModalOpen}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-dark-gray">
            Yeni Müşteri Ekle
          </DialogTitle>
          <DialogDescription>
            Yeni müşteri bilgilerini girin ve kaydedin.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
          noValidate
        >
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Şirket Adı *</Label>
              <Input
                {...register("companyName")}
                placeholder="ABC Teknoloji A.Ş."
              />
            </div>
            <div className="space-y-2">
              <Label>İletişim Kişisi *</Label>
              <Input
                {...register("contactPerson")}
                placeholder="Ahmet Yılmaz"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>E-posta *</Label>
              <Input
                {...register("email")}
                type="email"
                placeholder="ahmet@abc.com"
              />
            </div>
            <div className="space-y-2">
              <Label>Telefon *</Label>
              <Input
                {...register("phoneNumber")}
                placeholder="+90 555 555 55 55"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Segment</Label>
              <Controller
                control={control}
                name="segment"
                render={({ field }) => (
                  <Select
                    value={field.value?.toString()}
                    onValueChange={(val) => field.onChange(Number(val))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Segment seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Kurumsal</SelectItem>
                      <SelectItem value="2">KOBİ</SelectItem>
                      <SelectItem value="3">Bireysel</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            <div className="space-y-2">
              <Label>Durum</Label>
              <Controller
                control={control}
                name="state"
                render={({ field }) => (
                  <Select
                    value={field.value?.toString()}
                    onValueChange={(val) => field.onChange(Number(val))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Durum seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Aktif</SelectItem>
                      <SelectItem value="2">Potansiyel</SelectItem>
                      <SelectItem value="3">Pasif</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Adres</Label>
            <Textarea
              {...register("address")}
              placeholder="Adres girin..."
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label>Notlar</Label>
            <Textarea {...register("note")} placeholder="Notlar..." rows={3} />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsCustomerModalOpen(false)}
            >
              İptal
            </Button>
            <Button
              type="submit"
              className="bg-primary-green hover:bg-primary-green/90"
              disabled={customersLoading}
            >
              {customersLoading ? "Ekleniyor..." : "Müşteri Ekle"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
