import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { OfferStore } from "@/stores/crm/domains/OfferStore";

export default function EndingOfferModal() {
  const { isEndingOfferModalOpen, setIsEndingOfferModalOpen, selectedOffer } =
    OfferStore();
  return (
    <Dialog
      open={isEndingOfferModalOpen}
      onOpenChange={setIsEndingOfferModalOpen}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Teklifi Sonuçlandır</DialogTitle>
          <DialogDescription>
            <span className="font-semibold">{selectedOffer?.customer}</span>{" "}
            firmasına yapılan teklifi sonuçlandır
          </DialogDescription>
          <Separator />

          <div className="flex gap-2 justify-start items-center">
            <Button className={"bg-yellow-600 hover:bg-yellow-600/180"}>
              Reddedildi
            </Button>
            <Button className={"bg-customRed hover:bg-customRed/180"}>
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
