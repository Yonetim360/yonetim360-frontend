import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { CustomerStore } from "@/stores/crm/domains/CustomerStore";
import { AlertTriangle, Trash2 } from "lucide-react";

export default function DeleteCustomerModal() {
  const {
    isDeleteCustomerModalOpen,
    setIsDeleteCustomerModalOpen,
    selectedCustomer,
    setSelectedCustomer,
    deleteCustomer,
  } = CustomerStore();

  if (selectedCustomer) {
    return (
      <Dialog
        open={isDeleteCustomerModalOpen}
        onOpenChange={setIsDeleteCustomerModalOpen}
      >
        <DialogContent className="max-w-md border-red-200 shadow-2xl">
          {/* Critical Warning Header */}
          <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full">
            <AlertTriangle className="w-8 h-8 text-red-600" />
          </div>

          <DialogHeader className="text-center space-y-3">
            <DialogTitle className="text-2xl font-bold text-red-700 flex items-center justify-center gap-2">
              <Trash2 className="w-6 h-6" />
              Tehlikeli İşlem
            </DialogTitle>
            <DialogDescription className="text-gray-700 text-base leading-relaxed">
              <div className="bg-red-50 p-4 rounded-lg border border-red-200 mb-4">
                <p className="font-semibold text-red-800 mb-2">
                  ⚠️ Bu işlem geri alınamaz!
                </p>
                <p>
                  <span className="font-bold text-red-900">
                    &quot;{selectedCustomer.companyName}&quot;
                  </span>{" "}
                  firmasını ve tüm ilişkili verilerini kalıcı olarak
                  sileceksiniz.
                </p>
              </div>
              <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded border-l-4 border-gray-400">
                <p>Bu işlem şunları siler:</p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Müşteri bilgileri</li>
                  <li>Geçmiş işlemler</li>
                  <li>İletişim kayıtları</li>
                  <li>İlişkili dökümanlar</li>
                </ul>
              </div>
            </DialogDescription>
          </DialogHeader>

          <Separator className="bg-red-200" />

          {/* Action Buttons */}
          <div className="flex flex-col-reverse sm:flex-row gap-3 pt-2">
            <Button
              variant="outline"
              className="flex-1 border-gray-300 hover:bg-gray-50 font-medium"
              onClick={() => (
                setSelectedCustomer(null), setIsDeleteCustomerModalOpen(false)
              )}
            >
              İptal Et
            </Button>
            <Button
              className="flex-1 bg-red hover:bg-red/180 text-white font-bold shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2"
              onClick={() => (
                deleteCustomer(selectedCustomer.id),
                setIsDeleteCustomerModalOpen(false)
              )}
            >
              <Trash2 className="w-4 h-4" />
              Kalıcı Olarak Sil
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }
}
