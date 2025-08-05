import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { useCRMStore } from "@/stores/useCRMStore";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";

export default function EndingOfferModal() {
  const { isEndingOfferModalOpen, setIsEndingOfferModalOpen, selectedOffer } =
    useCRMStore();
  return (
    <Dialog
      open={isEndingOfferModalOpen}
      onOpenChange={setIsEndingOfferModalOpen}
    >
      <DialogContent>
        Teklifi Sonuçlandır
        <Separator />
        <DialogHeader>
          <DialogTitle>
            <span className="font-semibold">{selectedOffer?.customer}</span>{" "}
            firmasına yapılan teklifi sonuçlandır
          </DialogTitle>

          <div className="flex gap-2 justify-start items-center">
            <Button className={"bg-yellow-600 hover:bg-yellow-600/180"}>
              Reddedildi
            </Button>
            <Button className={"bg-red hover:bg-red/180"}>
              Görüşmeler Durduruldu
            </Button>
            <Button className={"bg-primary-green hover:bg-primary-green/180"}>
              Onaylandı
            </Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
