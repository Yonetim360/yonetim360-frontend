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

export default function AddSupportModal({
  isSupportModalOpen,
  setIsSupportModalOpen,
  customers,
  onSubmit,
  supportForm,
  setSupportForm,
  isLoading = false,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(supportForm);
    setIsSupportModalOpen(false);
    setSupportForm({
      customer: "",
      subject: "",
      description: "",
      priority: "",
      assignedTo: "",
    });
  };

  return (
    <Dialog open={isSupportModalOpen} onOpenChange={setIsSupportModalOpen}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-dark-gray">
            Yeni Destek Talebi
          </DialogTitle>
          <DialogDescription>
            Müşteri destek talebi oluşturun ve takip edin.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div className="space-y-2">
            <Label htmlFor="support-customer">Müşteri *</Label>
            <Select
              value={supportForm.customer}
              onValueChange={(value) =>
                setSupportForm({ ...supportForm, customer: value })
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
            <Label htmlFor="support-subject">Konu *</Label>
            <Input
              id="support-subject"
              value={supportForm.subject}
              onChange={(e) =>
                setSupportForm({ ...supportForm, subject: e.target.value })
              }
              placeholder="Sistem yavaşlığı"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="support-description">Açıklama *</Label>
            <Textarea
              id="support-description"
              value={supportForm.description}
              onChange={(e) =>
                setSupportForm({
                  ...supportForm,
                  description: e.target.value,
                })
              }
              placeholder="Sorunun detaylı açıklaması..."
              rows={4}
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="support-priority">Öncelik *</Label>
              <Select
                value={supportForm.priority}
                onValueChange={(value) =>
                  setSupportForm({ ...supportForm, priority: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Öncelik seçin" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="düşük">Düşük</SelectItem>
                  <SelectItem value="orta">Orta</SelectItem>
                  <SelectItem value="yüksek">Yüksek</SelectItem>
                  <SelectItem value="kritik">Kritik</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="support-assigned">Atanan Kişi</Label>
              <Select
                value={supportForm.assignedTo}
                onValueChange={(value) =>
                  setSupportForm({ ...supportForm, assignedTo: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Kişi seçin" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="teknik-ekip">Teknik Ekip</SelectItem>
                  <SelectItem value="geliştirme-ekibi">
                    Geliştirme Ekibi
                  </SelectItem>
                  <SelectItem value="müşteri-hizmetleri">
                    Müşteri Hizmetleri
                  </SelectItem>
                  <SelectItem value="satış-ekibi">Satış Ekibi</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsSupportModalOpen(false)}
              disabled={isLoading}
            >
              İptal
            </Button>
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700"
              disabled={isLoading}
            >
              {isLoading ? "Talep Oluşturuluyor..." : "Talep Oluştur"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
