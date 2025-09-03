import InputError from "@/components/common/InputError";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import { RepresentativeStore } from "@/stores/crm/domains/RepresentativeStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { add } from "date-fns";
import { addRequestMeta } from "next/dist/server/request-meta";
import { Controller, useForm } from "react-hook-form";
import z from "zod";

const representativeSchema = z.object({
  firstName: z.string().min(1, "Ad zorunludur"),
  lastName: z.string().min(1, "Soyadı zorunludur"),
  email: z.email("Geçerli bir e-posta adresi giriniz"),
  phoneNumber: z.string().min(1, "Telefon zorunludur"),
  department: z.union([z.literal(0), z.literal(1), z.literal(2)]),
  notes: z.string().optional(),
});

export default function AddRepresentativeModal() {
  const {
    isRepresentativesModalOpen,
    setIsRepresentativesModalOpen,
    representativesLoading,
    addRepresentative,
  } = RepresentativeStore();

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(representativeSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      notes: "",
      department: "",
    },
  });

  const onSubmit = (data) => {
    addRepresentative(data);
    reset();
    setIsRepresentativesModalOpen(false);
  };

  const handleClose = () => {
    reset();
    setIsRepresentativesModalOpen(false);
  };

  return (
    <Dialog
      open={isRepresentativesModalOpen}
      onOpenChange={setIsRepresentativesModalOpen}
    >
      <DialogContent className="max-w-2xl">
        <DialogHeader className="relative">
          <DialogTitle className="text-xl font-semibold text-dark-gray">
            Yeni Temsilci Oluştur
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            Temsilci ekleyin ve temsilcilerinizi yönetin
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
          noValidate
        >
          {/* Name Surname*/}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label
                htmlFor="firstName"
                className="text-sm font-medium text-dark-gray"
              >
                Temsilcinin Adı
              </Label>
              <Input
                {...register("firstName")}
                id="firstName"
                name="firstName"
                autoComplete="given-name"
                placeholder="Temsilci Adı"
                className="col-span-2"
                aria-describedby={
                  errors.firstName ? "firstName-error" : undefined
                }
                aria-invalid={errors.firstName ? "true" : "false"}
              />
              {errors.firstName && (
                <div id="firstName-error">
                  <InputError message={errors.firstName.message} />
                </div>
              )}
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="lastName"
                className="text-sm font-medium text-dark-gray"
              >
                Temsilcinin Soyadı
              </Label>
              <Input
                {...register("lastName")}
                id="lastName"
                name="lastName"
                autoComplete="family-name"
                placeholder="Temsilci Soyadı"
                className="col-span-2"
                aria-describedby={
                  errors.lastName ? "lastName-error" : undefined
                }
                aria-invalid={errors.lastName ? "true" : "false"}
              />
              {errors.lastName && (
                <div id="lastName-error">
                  <InputError message={errors.lastName.message} />
                </div>
              )}
            </div>
          </div>

          {/* email and phone */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-sm font-medium text-dark-gray"
              >
                E-posta Adresi
              </Label>
              <Input
                {...register("email")}
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="E-posta Adresi"
                className="col-span-2"
                aria-describedby={errors.email ? "email-error" : undefined}
                aria-invalid={errors.email ? "true" : "false"}
              />
              {errors.email && (
                <div id="email-error">
                  <InputError message={errors.email.message} />
                </div>
              )}
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="phoneNumber"
                className="text-sm font-medium text-dark-gray"
              >
                Telefon Numarası
              </Label>
              <Input
                {...register("phoneNumber")}
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                autoComplete="tel"
                placeholder="Telefon Numarası"
                className="col-span-2"
                aria-describedby={
                  errors.phoneNumber ? "phoneNumber-error" : undefined
                }
                aria-invalid={errors.phoneNumber ? "true" : "false"}
              />
              {errors.phoneNumber && (
                <div id="phoneNumber-error">
                  <InputError message={errors.phoneNumber.message} />
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="department"
              className="text-sm font-medium text-dark-gray"
            >
              Departman
            </Label>
            <Controller
              name="department"
              control={control}
              render={({ field }) => (
                <Select
                  value={field.value?.toString()}
                  onValueChange={(val) => field.onChange(Number(val))}
                  name="department"
                >
                  <SelectTrigger
                    className="col-span-2"
                    id="department"
                    aria-describedby={
                      errors.department ? "department-error" : undefined
                    }
                    aria-invalid={errors.department ? "true" : "false"}
                  >
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
              <div id="department-error">
                <InputError message={errors.department.message} />
              </div>
            )}
          </div>

          {/* Notlar */}
          <div className="space-y-2">
            <Label
              htmlFor="notes"
              className="text-sm font-medium text-dark-gray"
            >
              Notlar
            </Label>
            <Textarea
              {...register("notes")}
              id="notes"
              name="notes"
              placeholder="Teklif detayları ve özel notlar..."
              rows={3}
              className="resize-none"
              aria-describedby={errors.notes ? "notes-error" : undefined}
              aria-invalid={errors.notes ? "true" : "false"}
            />
            {errors.notes && (
              <div id="notes-error">
                <InputError message={errors.notes.message} />
              </div>
            )}
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
              className="bg-customRed hover:bg-customRed/90 text-white px-6"
              disabled={representativesLoading}
            >
              {representativesLoading ? "Oluşturuluyor..." : "Temsilci Oluştur"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
