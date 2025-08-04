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
import { useEffect } from "react";

const supportSchema = z.object({
  customer: z.string().min(1, "Müşteri seçimi zorunludur"),
  subject: z.string().min(5, "Konu en az 5 karakter olmalıdır"),
  description: z.string().min(10, "Açıklama en az 10 karakter olmalıdır"),
  priority: z.enum(["düşük", "orta", "yüksek", "kritik"]),
  status: z.enum(["acik", "çözüldü", "bekliyor"]),
  assignedTo: z.enum([
    "Mehmet Yılmaz",
    "Ahmet Yalçın",
    "Yeliz Biri",
    "Sadık Turan",
  ]),
  createdDate: z
    .string()
    .optional()
    .transform((val) => (val ? new Date(val) : undefined)),
});

export default function SupportDetailsModal() {
  const {
    customers,
    isSupportDetailsModalOpen,
    setIsSupportDetailsModalOpen,
    selectedSupport,
    isLoading,
    handleSupportSubmit,
  } = useCRMStore();

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(supportSchema),
    defaultValues: {
      customer: "",
      subject: "",
      description: "",
      priority: "",
      assignedTo: "",
      status: "",
      createdDate: "",
    },
  });

  useEffect(() => {
    if (selectedSupport) {
      reset({
        customer: selectedSupport.customer || "",
        ticketNo: selectedSupport.ticketNo || "",
        subject: selectedSupport.subject || "",
        priority:
          selectedSupport.priority.toLowerCase().replaceAll("ı", "i") || "",
        status:
          selectedSupport.status
            .toLowerCase()
            .replaceAll("ı", "i")
            .replaceAll("ç", "c") || "",
        subject: selectedSupport.subject || "",
        assignedTo:
          selectedSupport.assignedTo.toLowerCase().replaceAll("ı", "i") || "",
        createdDate: selectedSupport.createdDate || "",
        description: selectedSupport.description || "",
      });
    }
  }, [isSupportDetailsModalOpen, reset, selectedSupport]);

  const onSubmit = (data) => {
    handleSupportSubmit(data);
    reset();
    setIsSupportDetailsModalOpen(false);
  };

  return (
    <Dialog
      open={isSupportDetailsModalOpen}
      onOpenChange={setIsSupportDetailsModalOpen}
    >
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-dark-gray">
            Destek Talebini Düzenle
          </DialogTitle>
          <DialogDescription>
            Müşteri destek talebinı düzenleyin ve takip edin.
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
          noValidate
        >
          <div className="space-y-2">
            <Label>Müşteri *</Label>
            <Controller
              {...register("customer")}
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
              <p className="text-sm text-red-500">{errors.customer.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Konu *</Label>
            <Input {...register("subject")} placeholder="Sistem yavaşlığı" />
            {errors.subject && (
              <p className="text-sm text-red-500">{errors.subject.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Açıklama *</Label>
            <Textarea
              {...register("description")}
              placeholder="Sorunun detaylı açıklaması..."
              rows={4}
            />
            {errors.description && (
              <p className="text-sm text-red-500">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Öncelik *</Label>
              <Controller
                {...register("priority")}
                name="priority"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Öncelik seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="düşük">Düşük</SelectItem>
                      <SelectItem value="orta">Orta</SelectItem>
                      <SelectItem value="yüksek">Yüksek</SelectItem>
                      <SelectItem value="kritik">Kritik</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.priority && (
                <p className="text-sm text-red-500">
                  {errors.priority.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Atanan Temsilci</Label>
              <Controller
                {...register("assignedTo")}
                name="assignedTo"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Kişi seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mehmet-yilmaz">
                        Mehmet Yılmaz
                      </SelectItem>
                      <SelectItem value="ahmet-yalcin">Ahmet Yalçın</SelectItem>
                      <SelectItem value="yeliz-biri">Yeliz Biri</SelectItem>
                      <SelectItem value="sadik-turan">Sadık Turan</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.assignedTo && (
                <p className="text-sm text-red-500">
                  {errors.assignedTo.message}
                </p>
              )}

              <Label className="mt-4">Talep Durumu</Label>
              <Controller
                {...register("status")}
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Durum seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="acik">Açık</SelectItem>
                      <SelectItem value="cozuldu">Çözüldü</SelectItem>
                      <SelectItem value="bekliyor">Beklemede</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.status && (
                <p className="text-sm text-red-500">{errors.status.message}</p>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsSupportDetailsModalOpen(false)}
              disabled={isLoading}
            >
              İptal
            </Button>
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700"
              disabled={isLoading}
            >
              {isLoading ? "Talep Oluşturuluyor..." : "Talep Oluştur"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
