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

// Zod schema for support ticket validation
const supportSchema = z.object({
  customer: z.string().min(1, "Müşteri seçimi zorunludur"),
  subject: z.string().min(5, "Konu en az 5 karakter olmalıdır"),
  description: z.string().min(10, "Açıklama en az 10 karakter olmalıdır"),
  priority: z.enum(["düşük", "orta", "yüksek", "kritik"]),
  assignedTo: z.string().optional(),
});

export default function AddSupportModal() {
  const {
    isSupportModalOpen,
    setIsSupportModalOpen,
    customers,
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
    },
  });

  const onSubmit = (data) => {
    handleSupportSubmit(data);
    reset();
    setIsSupportModalOpen(false);
  };

  return (
    <Dialog open={isSupportModalOpen} onOpenChange={setIsSupportModalOpen}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-dark-gray">
            Yeni Destek Talebi
          </DialogTitle>
          <DialogDescription>
            Müşteri destek talebi oluşturun ve takip edin.
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
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsSupportModalOpen(false)}
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
