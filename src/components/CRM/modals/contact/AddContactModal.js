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
import { CommunicationStore } from "@/stores/crm/domains/CommunicationStore";

// Zod şeması
const communicationSchema = z
  .object({
    customer: z.string().min(1, "Müşteri seçimi zorunludur"),
    type: z.enum(["telefon", "email", "toplanti", "whatsapp"]),
    subject: z.string().min(1, "Konu zorunludur"),
    date: z.string().min(1, "Tarih zorunludur"),
    time: z.string().min(1, "Saat zorunludur"),
    duration: z.string().optional(),
    notes: z.string().optional(),
    meetingType: z.string().optional(), // Başlangıçta isteğe bağlı yapıldı
  })
  .refine(
    (data) => {
      // Eğer iletişim türü 'toplanti' ise ve meetingType boşsa hata döndür
      if (data.type === "toplanti") {
        return data.meetingType && data.meetingType.length > 0;
      }
      return true; // 'toplanti' değilse meetingType kontrolüne gerek yok
    },
    {
      message: "Toplantı türü seçimi zorunludur",
      path: ["meetingType"], // Hatanın hangi alana ait olduğunu belirtir
    }
  );

export default function AddContactModal() {
  const {
    isCommunicationModalOpen,
    setIsCommunicationModalOpen,
    communicationsLoading,
    handleCommunicationSubmit,
  } = CommunicationStore();

  const { customers } = CustomerStore();

  const {
    register,
    handleSubmit,
    reset,
    control,
    watch, // watch hook'unu ekle
    formState: { errors },
  } = useForm({
    resolver: zodResolver(communicationSchema),
    defaultValues: {
      customer: "",
      type: "",
      subject: "",
      date: "",
      time: "",
      duration: "",
      notes: "",
      meetingType: "", // Yeni alanı varsayılan değerlere ekle
    },
  });

  const selectedCommunicationType = watch("type"); // 'type' alanını izle

  const onSubmit = (data) => {
    handleCommunicationSubmit(data);
    reset();
    setIsCommunicationModalOpen(false);
  };

  return (
    <Dialog
      open={isCommunicationModalOpen}
      onOpenChange={setIsCommunicationModalOpen}
    >
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-dark-gray">
            Yeni İletişim Ekle
          </DialogTitle>
          <DialogDescription>
            Müşteri ile yapılan iletişimi kaydedin.
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
              <Label>İletişim Türü *</Label>
              <Controller
                name="type"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Tür seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="telefon">Telefon</SelectItem>
                      <SelectItem value="email">E-posta</SelectItem>
                      <SelectItem value="toplanti">Toplantı</SelectItem>
                      <SelectItem value="whatsapp">WhatsApp</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.type && (
                <p className="text-sm text-red-500">{errors.type.message}</p>
              )}
            </div>
          </div>
          {selectedCommunicationType === "toplanti" && (
            <div className="space-y-2">
              <Label>Toplantı Türü *</Label>
              <Controller
                name="meetingType"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Toplantı platformu seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="teams">Microsoft Teams</SelectItem>
                      <SelectItem value="zoom">Zoom</SelectItem>
                      <SelectItem value="google-meet">Google Meet</SelectItem>
                      <SelectItem value="skype">Skype</SelectItem>
                      <SelectItem value="other">Diğer</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.meetingType && (
                <p className="text-sm text-red-500">
                  {errors.meetingType.message}
                </p>
              )}
            </div>
          )}
          <div className="space-y-2">
            <Label>Konu *</Label>
            <Input {...register("subject")} placeholder="İletişim konusu" />
            {errors.subject && (
              <p className="text-sm text-red-500">{errors.subject.message}</p>
            )}
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Tarih *</Label>
              <Input {...register("date")} type="date" />
              {errors.date && (
                <p className="text-sm text-red-500">{errors.date.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label>Saat *</Label>
              <Input {...register("time")} type="time" />
              {errors.time && (
                <p className="text-sm text-red-500">{errors.time.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label>Süre</Label>
              <Input {...register("duration")} placeholder="25 dk" />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Notlar *</Label>
            <Textarea
              {...register("notes")}
              placeholder="İletişim detayları ve notlar..."
              rows={4}
            />
            {errors.notes && (
              <p className="text-sm text-red-500">{errors.notes.message}</p>
            )}
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsCommunicationModalOpen(false)}
            >
              İptal
            </Button>
            <Button
              type="submit"
              className="bg-orange hover:bg-orange/90"
              disabled={communicationsLoading}
            >
              {communicationsLoading ? "Ekleniyor..." : "İletişim Ekle"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
