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
import { useEffect } from "react";
import { CustomerStore } from "@/stores/crm/domains/CustomerStore";

// 1. Zod şeması
const customerSchema = z.object({
  name: z.string().min(1, "Şirket adı zorunludur"),
  contact: z.string().min(1, "İletişim kişisi zorunludur"),
  email: z.email("Geçerli bir e-posta girin"),
  phone: z.string().min(5, "Telefon numarası zorunludur"),
  segment: z.enum(["kurumsal", "kobi", "bireysel"]),
  status: z.enum(["aktif", "potansiyel", "pasif"]),
  address: z.string().optional(),
  notes: z.string().optional(),
});

export default function CustomerDetailsModal() {
  const {
    isCustomerDetailsModalOpen,
    setIsCustomerDetailsModalOpen,
    selectedCustomer,
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
      name: "",
      contact: "",
      email: "",
      phone: "",
      segment: "",
      status: "",
      address: "",
      notes: "",
    },
  });

  const onSubmit = (data) => {
    console.log(data);

    reset(); // formu sıfırla
    setIsCustomerDetailsModalOpen(false); // modal kapat
  };

  useEffect(() => {
    if (selectedCustomer) {
      reset({
        name: selectedCustomer.companyName || "",
        contact: selectedCustomer.contactPerson || "",
        email: selectedCustomer.email || "",
        phone: selectedCustomer.phoneNumber || "",
        segment: selectedCustomer.segment || "",
        status: selectedCustomer.state || "",
        address: selectedCustomer.address || "",
        notes: selectedCustomer.note || "",
        lastContact: selectedCustomer.lastContact || "",
      });
    }
  }, [reset, selectedCustomer]);

  return (
    <Dialog
      open={isCustomerDetailsModalOpen}
      onOpenChange={setIsCustomerDetailsModalOpen}
    >
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-dark-gray">
            Müşteri Bilgilerini Düzenle
          </DialogTitle>
          <DialogDescription>
            Müşteri bilgilerini düzenleyin ve kaydedin.
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
              <Input {...register("name")} placeholder="ABC Teknoloji A.Ş." />
            </div>
            <div className="space-y-2">
              <Label>İletişim Kişisi *</Label>
              <Input {...register("contact")} placeholder="Ahmet Yılmaz" />
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
              <Input {...register("phone")} placeholder="+90 555 555 55 55" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Segment</Label>
              <Controller
                control={control}
                name="segment"
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Segment seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={0}>Kurumsal</SelectItem>
                      <SelectItem value={1}>KOBİ</SelectItem>
                      <SelectItem value={2}>Bireysel</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            <div className="space-y-2">
              <Label>Durum</Label>
              <Controller
                control={control}
                name="status"
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Durum seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={0}>Aktif</SelectItem>
                      <SelectItem value={1}>Potansiyel</SelectItem>
                      <SelectItem value={2}>Pasif</SelectItem>
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
            <Textarea {...register("notes")} placeholder="Notlar..." rows={3} />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsCustomerDetailsModalOpen(false)}
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
