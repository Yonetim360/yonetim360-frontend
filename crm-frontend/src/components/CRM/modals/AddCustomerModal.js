"use client";
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

export default function AddCustomerModal({
  isCustomerModalOpen,
  setIsCustomerModalOpen,
  customers,
  onSubmit,
  customerForm,
  setCustomerForm,
  isLoading = false,
}) {
  const handleCustomerSubmit = (e) => {
    e.preventDefault();
    onSubmit(customerForm);
    setIsCustomerModalOpen(false);
    setCustomerForm({
      name: "",
      contact: "",
      email: "",
      phone: "",
      segment: "",
      status: "",
      address: "",
      notes: "",
    });
  };

  return (
    <Dialog open={isCustomerModalOpen} onOpenChange={setIsCustomerModalOpen}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-dark-gray">
            Yeni Müşteri Ekle
          </DialogTitle>
          <DialogDescription>
            Yeni müşteri bilgilerini girin ve kaydedin.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleCustomerSubmit} className="space-y-4" noValidate>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="company-name">Şirket Adı *</Label>
              <Input
                id="company-name"
                value={customerForm.name}
                onChange={(e) =>
                  setCustomerForm({ ...customerForm, name: e.target.value })
                }
                placeholder="ABC Teknoloji A.Ş."
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact-person">İletişim Kişisi *</Label>
              <Input
                id="contact-person"
                value={customerForm.contact}
                onChange={(e) =>
                  setCustomerForm({
                    ...customerForm,
                    contact: e.target.value,
                  })
                }
                placeholder="Ahmet Yılmaz"
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">E-posta *</Label>
              <Input
                id="email"
                type="email"
                value={customerForm.email}
                onChange={(e) =>
                  setCustomerForm({ ...customerForm, email: e.target.value })
                }
                placeholder="ahmet@abcteknoloji.com"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Telefon *</Label>
              <Input
                id="phone"
                value={customerForm.phone}
                onChange={(e) =>
                  setCustomerForm({ ...customerForm, phone: e.target.value })
                }
                placeholder="+90 212 555 0123"
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="segment">Segment</Label>
              <Select
                value={customerForm.segment}
                onValueChange={(value) =>
                  setCustomerForm({ ...customerForm, segment: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Segment seçin" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="kurumsal">Kurumsal</SelectItem>
                  <SelectItem value="kobi">KOBİ</SelectItem>
                  <SelectItem value="bireysel">Bireysel</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Durum</Label>
              <Select
                value={customerForm.status}
                onValueChange={(value) =>
                  setCustomerForm({ ...customerForm, status: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Durum seçin" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="aktif">Aktif</SelectItem>
                  <SelectItem value="potansiyel">Potansiyel</SelectItem>
                  <SelectItem value="pasif">Pasif</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Adres</Label>
            <Textarea
              id="address"
              value={customerForm.address}
              onChange={(e) =>
                setCustomerForm({ ...customerForm, address: e.target.value })
              }
              placeholder="Şirket adresi..."
              rows={3}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="notes">Notlar</Label>
            <Textarea
              id="notes"
              value={customerForm.notes}
              onChange={(e) =>
                setCustomerForm({ ...customerForm, notes: e.target.value })
              }
              placeholder="Müşteri hakkında notlar..."
              rows={3}
            />
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsCustomerModalOpen(false)}
            >
              İptal
            </Button>
            <Button
              type="submit"
              className="bg-primary-green hover:bg-primary-green/90"
            >
              Müşteri Ekle
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
