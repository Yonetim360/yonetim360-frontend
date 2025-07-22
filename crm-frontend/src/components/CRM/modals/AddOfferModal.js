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
import { useState } from "react";

export default function AddOfferModal({
  isOfferModalOpen,
  setIsOfferModalOpen,
  customers,
}) {
  const [offerForm, setOfferForm] = useState({
    customer: "",
    products: "",
    amount: "",
    validUntil: "",
    notes: "",
  });

  const handleOfferSubmit = (e) => {
    e.preventDefault();
    console.log("Yeni teklif:", offerForm);
    setIsOfferModalOpen(false);
    setOfferForm({
      customer: "",
      products: "",
      amount: "",
      validUntil: "",
      notes: "",
    });
  };

  return (
    <Dialog open={isOfferModalOpen} onOpenChange={setIsOfferModalOpen}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-dark-gray">
            Yeni Teklif Oluştur
          </DialogTitle>
          <DialogDescription>
            Müşteri için yeni bir teklif hazırlayın.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleOfferSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="offer-customer">Müşteri *</Label>
            <Select
              value={offerForm.customer}
              onValueChange={(value) =>
                setOfferForm({ ...offerForm, customer: value })
              }
            >
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
          </div>
          <div className="space-y-2">
            <Label htmlFor="offer-products">Ürün/Hizmetler *</Label>
            <Textarea
              id="offer-products"
              value={offerForm.products}
              onChange={(e) =>
                setOfferForm({ ...offerForm, products: e.target.value })
              }
              placeholder="Web Sitesi + Mobil Uygulama"
              rows={3}
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="offer-amount">Tutar *</Label>
              <Input
                id="offer-amount"
                value={offerForm.amount}
                onChange={(e) =>
                  setOfferForm({ ...offerForm, amount: e.target.value })
                }
                placeholder="₺125,000"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="offer-valid">Geçerlilik Tarihi *</Label>
              <Input
                id="offer-valid"
                type="date"
                value={offerForm.validUntil}
                onChange={(e) =>
                  setOfferForm({ ...offerForm, validUntil: e.target.value })
                }
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="offer-notes">Notlar</Label>
            <Textarea
              id="offer-notes"
              value={offerForm.notes}
              onChange={(e) =>
                setOfferForm({ ...offerForm, notes: e.target.value })
              }
              placeholder="Teklif detayları ve özel notlar..."
              rows={3}
            />
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOfferModalOpen(false)}
            >
              İptal
            </Button>
            <Button type="submit" className="bg-red hover:bg-red/90">
              Teklif Oluştur
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
