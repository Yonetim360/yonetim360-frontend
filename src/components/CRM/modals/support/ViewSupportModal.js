"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useCRMStore } from "@/stores/useCRMStore";
import {
  Calendar,
  Mail,
  Phone,
  MapPin,
  FileText,
  User,
  Headphones,
  Users,
  Tag,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ViewSupportModal() {
  const { isViewSupportModalOpen, setIsViewSupportModalOpen, selectedSupport } =
    useCRMStore();

  if (!selectedSupport) return null;

  const formatDate = (dateString) => {
    if (!dateString) return "Belirtilmemiş";
    return new Date(dateString).toLocaleDateString("tr-TR");
  };

  return (
    <Dialog
      open={isViewSupportModalOpen}
      onOpenChange={setIsViewSupportModalOpen}
    >
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-dark-gray flex items-center gap-2">
            <Headphones className="h-5 w-5" />
            Destek Talebi Detayları
          </DialogTitle>
          <DialogDescription>Destek Talebini görüntüleyin.</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">
                {selectedSupport.customer}
              </h3>
            </div>

            <Separator />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <Users className="h-4 w-4 text-gray-500" />
                <div>
                  <p className="text-sm font-medium text-gray-700">
                    Temsilciler
                  </p>
                  <p className="text-sm text-gray-900">
                    {selectedSupport.assignedTo}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="h-4 w-4 text-gray-500" />
                <div>
                  <p className="text-sm font-medium text-gray-700">
                    Oluşturulma Tarihi
                  </p>
                  <p className="text-sm text-gray-900">
                    {formatDate(selectedSupport.createdDate)}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Tag className="h-4 w-4 text-gray-500" />
                <div>
                  <p className="text-sm font-medium text-gray-700">Konu</p>
                  <p className="text-sm text-gray-900">
                    {selectedSupport.subject}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 flex-col">
                <Badge
                  variant={
                    selectedSupport.priority === "Yüksek"
                      ? "destructive"
                      : "secondary"
                  }
                  className={
                    selectedSupport.priority === "Yüksek"
                      ? "bg-red"
                      : "bg-orange"
                  }
                >
                  Öncelik: {selectedSupport.priority}
                </Badge>
                <Badge
                  variant={
                    selectedSupport.status === "Çözüldü"
                      ? "default"
                      : "secondary"
                  }
                  className={
                    selectedSupport.status === "Çözüldü"
                      ? "bg-primary-green"
                      : "bg-gray-500"
                  }
                >
                  Talep Durumu: {selectedSupport.status}
                </Badge>
              </div>
            </div>
          </div>

          {/* description */}
          {selectedSupport.description && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-gray-500" />
                <h4 className="text-sm font-medium text-gray-700">Açıklama</h4>
              </div>
              <p className="text-sm text-gray-900 ml-6 bg-gray-50 p-3 rounded-md">
                {selectedSupport.description}
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
