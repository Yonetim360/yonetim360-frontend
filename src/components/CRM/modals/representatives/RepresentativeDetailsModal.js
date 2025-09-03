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
import { toast } from "sonner";
import { RepresentativeStore } from "@/stores/crm/domains/RepresentativeStore";

const representativeSchema = z.object({
  firstName: z.string().min(1, "Ad zorunludur"),
  lastName: z.string().min(1, "Soyadı zorunludur"),
  email: z.email("Geçerli bir e-posta adresi giriniz"),
  phoneNumber: z.string().min(1, "Telefon zorunludur"),
  department: z.number().min(0).max(2, "Geçerli bir departman seçiniz"),
  notes: z.string().optional(),
});

export default function RepresentativeDetailsModal() {
  const {
    isRepresentativeDetailsModalOpen,
    setIsRepresentativeDetailsModalOpen,
    selectedRepresentative,
    representativesLoading,
    updateRepresentative,
  } = RepresentativeStore();

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(representativeSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      department: 0,
      notes: "",
    },
  });

  const onSubmit = async (data) => {
    if (!selectedRepresentative.id) {
      toast.error("Temsilci bilgileri alınamadı");
    } else {
      const dataToSend = {
        ...data,
        id: selectedRepresentative.id,
        firstName: data.firstName || selectedRepresentative.firstName,
        lastName: data.lastName || selectedRepresentative.lastName,
        email: data.email || selectedRepresentative.email,
        phoneNumber: data.phoneNumber || selectedRepresentative.phoneNumber,
        department: data.department ?? selectedRepresentative.department,
        notes: data.notes || selectedRepresentative.notes,
      };
      await updateRepresentative(selectedRepresentative.id, dataToSend);
    }
    reset(); // formu sıfırla
    setIsRepresentativeDetailsModalOpen(false); // modal kapat
  };

  useEffect(() => {
    if (selectedRepresentative) {
      reset({
        firstName: selectedRepresentative.firstName || "",
        lastName: selectedRepresentative.lastName || "",
        email: selectedRepresentative.email || "",
        phoneNumber: selectedRepresentative.phoneNumber || "",
        department: selectedRepresentative.department ?? 0,
        notes: selectedRepresentative.notes || "",
      });
    }
  }, [reset, selectedRepresentative]);

  return (
    <Dialog
      open={isRepresentativeDetailsModalOpen}
      onOpenChange={setIsRepresentativeDetailsModalOpen}
    >
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-dark-gray">
            Temsilci Bilgilerini Düzenle
          </DialogTitle>
          <DialogDescription>
            Temsilci bilgilerini düzenleyin ve kaydedin.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
          noValidate
        >
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Temsilci Adı</Label>
              <Input {...register("firstName")} placeholder="Selim" />
              {errors.firstName && (
                <p className="text-red-500 text-sm">
                  {errors.firstName.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label>Soyadı</Label>
              <Input {...register("lastName")} placeholder="Bugün" />
              {errors.lastName && (
                <p className="text-red-500 text-sm">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>E-posta</Label>
              <Input
                {...register("email")}
                type="email"
                placeholder="ahmet@abc.com"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label>Telefon</Label>
              <Input
                {...register("phoneNumber")}
                placeholder="+90 555 555 55 55"
              />
              {errors.phoneNumber && (
                <p className="text-red-500 text-sm">
                  {errors.phoneNumber.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Departman</Label>
              <Controller
                control={control}
                name="department"
                render={({ field }) => (
                  <Select
                    value={field.value?.toString()}
                    onValueChange={(val) => field.onChange(Number(val))}
                    name="department"
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Departman" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">Satış</SelectItem>
                      <SelectItem value="1">Pazarlama</SelectItem>
                      <SelectItem value="2">Destek</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.department && (
                <p className="text-red-500 text-sm">
                  {errors.department.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Notlar</Label>
            <Textarea {...register("notes")} placeholder="Notlar..." rows={3} />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsRepresentativeDetailsModalOpen(false)}
            >
              İptal
            </Button>
            <Button
              type="submit"
              className="bg-primary-green hover:bg-primary-green/90"
              disabled={representativesLoading}
            >
              {representativesLoading
                ? "Güncelleniyor..."
                : "Temsilciyi Düzenle"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
