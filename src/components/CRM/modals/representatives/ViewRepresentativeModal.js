"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import {
  FileText,
  Building,
  CircleUser,
  Mail,
  Phone,
  BriefcaseBusiness,
} from "lucide-react";
import { RepresentativeStore } from "@/stores/crm/domains/RepresentativeStore";

export default function ViewRepresentativeModal() {
  const {
    selectedRepresentative,
    isViewRepresentativeModalOpen,
    setIsViewRepresentativeModalOpen,
  } = RepresentativeStore();

  if (!selectedRepresentative) return null;

  return (
    <Dialog
      open={isViewRepresentativeModalOpen}
      onOpenChange={setIsViewRepresentativeModalOpen}
    >
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-dark-gray flex items-center gap-2">
            <Building className="h-5 w-5" />
            Temsilci Bilgileri
          </DialogTitle>
          <DialogDescription>
            Temsilcinizle ilgili detayları görüntüleyin.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Temel Bilgiler */}
          <div className="space-y-4">
            <Separator />
          </div>

          <div className="grid grid-cols-2">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <CircleUser className="h-4 w-4 text-gray-500" />
                <h4>Temsilci Adı</h4>
              </div>
              <p className="text-sm text-gray-900 m-6 bg-gray-50 rounded-md">
                {selectedRepresentative.firstName}
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <CircleUser className="h-4 w-4 text-gray-500" />
                <h4>Soyadı</h4>
              </div>
              <p className="text-sm text-gray-900 m-6 bg-gray-50 rounded-md">
                {selectedRepresentative.lastName}
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-gray-500" />
              <h4 className="text-sm font-medium text-gray-700">
                E-posta Adresi
              </h4>
            </div>
            <p className="text-sm text-gray-900 ml-6 bg-gray-50 p-3 rounded-md">
              {selectedRepresentative.email}
            </p>
          </div>

          <div className="grid grid-cols-2">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-gray-500" />
                <h4 className="text-sm font-medium text-gray-700">
                  Telefon Numarası
                </h4>
              </div>
              <p className="text-sm text-gray-900 ml-6 bg-gray-50 p-3 rounded-md">
                {selectedRepresentative.phoneNumber}
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <BriefcaseBusiness className="h-4 w-4 text-gray-500" />
                <h4 className="text-sm font-medium text-gray-700">Departman</h4>
              </div>
              <p className="text-sm text-gray-900 ml-6 bg-gray-50 p-3 rounded-md">
                {selectedRepresentative.department === 0
                  ? "Satış"
                  : selectedRepresentative.department === 1
                  ? "Pazarlama"
                  : "Destek"}
              </p>
            </div>
          </div>

          {selectedRepresentative.notes && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-gray-500" />
                <h4 className="text-sm font-medium text-gray-700">Notlar</h4>
              </div>
              <p className="text-sm text-gray-900 ml-6 bg-gray-50 p-3 rounded-md">
                {selectedRepresentative.notes}
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
