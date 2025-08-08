"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Calendar,
  Mail,
  Phone,
  MapPin,
  FileText,
  Building,
  User,
} from "lucide-react";
import { CustomerStore } from "@/stores/crm/domains/CustomerStore";

export default function ViewCustomerModal() {
  const {
    isViewCustomerModalOpen,
    setIsViewCustomerModalOpen,
    selectedCustomer,
  } = CustomerStore();

  if (!selectedCustomer) return null;

  const formatDate = (dateString) => {
    if (!dateString) return "Belirtilmemiş";
    return new Date(dateString).toLocaleDateString("tr-TR");
  };

  return (
    <Dialog
      open={isViewCustomerModalOpen}
      onOpenChange={setIsViewCustomerModalOpen}
    >
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-dark-gray flex items-center gap-2">
            <Building className="h-5 w-5" />
            Müşteri Detayları
          </DialogTitle>
          <DialogDescription>
            Müşteri bilgilerini görüntüleyin.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Temel Bilgiler */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">
                {selectedCustomer.companyName}
              </h3>
              <div className="flex gap-2">
                <Badge
                  className={
                    selectedCustomer.status === 0
                      ? "bg-green-500"
                      : selectedCustomer.status === 1
                      ? "bg-red-500"
                      : "bg-yellow-500"
                  }
                >
                  {selectedCustomer.status}
                </Badge>
                <Badge className={"bg-blue-500"}>
                  {selectedCustomer.segment === "kobi"
                    ? "KOBİ"
                    : selectedCustomer.segment}
                </Badge>
              </div>
            </div>

            <Separator />

            {/* İletişim Bilgileri */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <User className="h-4 w-4 text-gray-500" />
                <div>
                  <p className="text-sm font-medium text-gray-700">
                    İletişim Kişisi
                  </p>
                  <p className="text-sm text-gray-900">
                    {selectedCustomer.contactPerson}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-gray-500" />
                <div>
                  <p className="text-sm font-medium text-gray-700">E-posta</p>
                  <p className="text-sm text-gray-900">
                    {selectedCustomer.email}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-gray-500" />
                <div>
                  <p className="text-sm font-medium text-gray-700">Telefon</p>
                  <p className="text-sm text-gray-900">
                    {selectedCustomer.phoneNumber}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Calendar className="h-4 w-4 text-gray-500" />
                <div>
                  <p className="text-sm font-medium text-gray-700">
                    Son İletişim
                  </p>
                  <p className="text-sm text-gray-900">
                    {formatDate(selectedCustomer.lastContact)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Adres */}
          {selectedCustomer.address && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gray-500" />
                <h4 className="text-sm font-medium text-gray-700">Adres</h4>
              </div>
              <p className="text-sm text-gray-900 ml-6 bg-gray-50 p-3 rounded-md">
                {selectedCustomer.address}
              </p>
            </div>
          )}

          {/* Notlar */}
          {selectedCustomer.note && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-gray-500" />
                <h4 className="text-sm font-medium text-gray-700">Notlar</h4>
              </div>
              <p className="text-sm text-gray-900 ml-6 bg-gray-50 p-3 rounded-md">
                {selectedCustomer.note}
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
