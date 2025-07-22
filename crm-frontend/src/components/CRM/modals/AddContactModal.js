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

export default function AddContactModal({
  isCommunicationModalOpen,
  setIsCommunicationModalOpen,
  customers,
}) {
  const handleCommunicationSubmit = (e) => {
    e.preventDefault();
    console.log("Yeni iletişim:", communicationForm);
    setIsCommunicationModalOpen(false);
    setCommunicationForm({
      customer: "",
      type: "",
      subject: "",
      notes: "",
      date: "",
      time: "",
      duration: "",
    });
  };
  const [communicationForm, setCommunicationForm] = useState({
    customer: "",
    type: "",
    subject: "",
    notes: "",
    date: "",
    time: "",
    duration: "",
  });
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
        <form onSubmit={handleCommunicationSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="comm-customer">Müşteri *</Label>
              <Select
                value={communicationForm.customer}
                onValueChange={(value) =>
                  setCommunicationForm({
                    ...communicationForm,
                    customer: value,
                  })
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
              <Label htmlFor="comm-type">İletişim Türü *</Label>
              <Select
                value={communicationForm.type}
                onValueChange={(value) =>
                  setCommunicationForm({ ...communicationForm, type: value })
                }
              >
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
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="comm-subject">Konu *</Label>
            <Input
              id="comm-subject"
              value={communicationForm.subject}
              onChange={(e) =>
                setCommunicationForm({
                  ...communicationForm,
                  subject: e.target.value,
                })
              }
              placeholder="İletişim konusu"
              required
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="comm-date">Tarih *</Label>
              <Input
                id="comm-date"
                type="date"
                value={communicationForm.date}
                onChange={(e) =>
                  setCommunicationForm({
                    ...communicationForm,
                    date: e.target.value,
                  })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="comm-time">Saat *</Label>
              <Input
                id="comm-time"
                type="time"
                value={communicationForm.time}
                onChange={(e) =>
                  setCommunicationForm({
                    ...communicationForm,
                    time: e.target.value,
                  })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="comm-duration">Süre</Label>
              <Input
                id="comm-duration"
                value={communicationForm.duration}
                onChange={(e) =>
                  setCommunicationForm({
                    ...communicationForm,
                    duration: e.target.value,
                  })
                }
                placeholder="25 dk"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="comm-notes">Notlar *</Label>
            <Textarea
              id="comm-notes"
              value={communicationForm.notes}
              onChange={(e) =>
                setCommunicationForm({
                  ...communicationForm,
                  notes: e.target.value,
                })
              }
              placeholder="İletişim detayları ve notlar..."
              rows={4}
              required
            />
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsCommunicationModalOpen(false)}
            >
              İptal
            </Button>
            <Button type="submit" className="bg-orange hover:bg-orange/90">
              İletişim Ekle
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
