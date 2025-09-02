import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { RepresentativeStore } from "@/stores/crm/domains/RepresentativeStore";
import { AlertTriangle, Trash2 } from "lucide-react";
import { useCallback } from "react";

export default function DeleteRepresentativeModal() {
  const {
    isDeleteRepresentativeModalOpen,
    setIsDeleteRepresentativeModalOpen,
    selectedRepresentative,
    setSelectedRepresentative,
    deleteRepresentative,
  } = RepresentativeStore();

  const handleCancel = useCallback(() => {
    setSelectedRepresentative(null);
    setIsDeleteRepresentativeModalOpen(false);
  }, [setIsDeleteRepresentativeModalOpen, setSelectedRepresentative]);

  const handleDelete = useCallback(
    (rep) => {
      deleteRepresentative(rep.id);
      setIsDeleteRepresentativeModalOpen(false);
    },
    [deleteRepresentative, setIsDeleteRepresentativeModalOpen]
  );

  if (selectedRepresentative) {
    return (
      <Dialog
        open={isDeleteRepresentativeModalOpen}
        onOpenChange={setIsDeleteRepresentativeModalOpen}
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
            <DialogDescription className="sr-only">
              Temsilci silme onay diyalogu
            </DialogDescription>
          </DialogHeader>

          {/* Warning Details */}
          <div className="space-y-4">
            <div className="bg-red-50 p-4 rounded-lg border border-red-200">
              <p className="font-semibold text-red-800 mb-2">
                ⚠️ Bu işlem geri alınamaz!
              </p>
              <p className="text-red-700">
                <span className="font-bold text-red-900">
                  &quot;{selectedRepresentative.firstName}{" "}
                  {selectedRepresentative.lastName}&quot;
                </span>{" "}
                adlı temsilcinizi ve tüm ilişkili verilerini kalıcı olarak
                sileceksiniz.
              </p>
            </div>
          </div>

          <Separator className="bg-red-200" />

          {/* Action Buttons */}
          <div className="flex flex-col-reverse sm:flex-row gap-3 pt-2">
            <Button
              variant="outline"
              className="flex-1 border-gray-300 hover:bg-gray-50 font-medium"
              onClick={() => handleCancel()}
            >
              İptal Et
            </Button>
            <Button
              className="flex-1 bg-customRed hover:bg-customRed/90 text-white font-bold shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2"
              onClick={() => handleDelete(selectedRepresentative)}
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
