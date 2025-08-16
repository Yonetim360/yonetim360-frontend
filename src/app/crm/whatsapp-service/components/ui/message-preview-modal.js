"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Send,
  X,
  CheckCheck,
  Clock,
  Users,
  User,
  MessageSquare,
} from "lucide-react";

export function MessagePreviewModal({
  isOpen,
  onClose,
  onSend,
  message,
  selectedCustomers,
  selectedGroup,
  customers,
  groups,
}) {
  const [currentTime] = useState(
    new Date().toLocaleTimeString("tr-TR", {
      hour: "2-digit",
      minute: "2-digit",
    })
  );

  const getRecipients = () => {
    if (selectedGroup) {
      const group = groups.find((g) => g.id === selectedGroup);
      return {
        type: "group",
        name: group?.name || "",
        count: group?.count || 0,
        customers: customers.filter(
          (c) =>
            c.group.toLowerCase() === selectedGroup ||
            (selectedGroup === "inactive" && c.status === "inactive")
        ),
      };
    } else {
      const selectedCustomerData = customers.filter((c) =>
        selectedCustomers.includes(c.id)
      );
      return {
        type: "individual",
        name:
          selectedCustomerData.length === 1
            ? selectedCustomerData[0].name
            : `${selectedCustomerData.length} Müşteri`,
        count: selectedCustomerData.length,
        customers: selectedCustomerData,
      };
    }
  };

  const recipients = getRecipients();

  // Replace template variables with actual customer name for preview
  const getPreviewMessage = (customerName) => {
    return message.replace(/{MüşteriAdı}/g, customerName);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0">
        <DialogHeader className="p-6 pb-4 border-b">
          <DialogTitle className="flex items-center text-xl">
            <MessageSquare className="mr-2 h-5 w-5" />
            Mesaj Önizlemesi
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col lg:flex-row h-[70vh]">
          {/* Sol Panel - Alıcı Bilgileri */}
          <div className="lg:w-1/3 border-r bg-gray-50 p-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">Alıcı Bilgileri</h3>
                <Badge variant="outline" className="flex items-center">
                  {recipients.type === "group" ? (
                    <Users className="mr-1 h-3 w-3" />
                  ) : (
                    <User className="mr-1 h-3 w-3" />
                  )}
                  {recipients.count} kişi
                </Badge>
              </div>

              <div className="p-3 bg-white rounded-lg border">
                <div className="font-medium text-sm mb-2">
                  {recipients.type === "group"
                    ? "Grup Gönderimi"
                    : "Bireysel Gönderim"}
                </div>
                <div className="text-lg font-semibold text-blue-600">
                  {recipients.name}
                </div>
              </div>

              <div>
                <h4 className="font-medium text-sm text-gray-700 mb-2">
                  Alıcı Listesi
                </h4>
                <ScrollArea className="h-64">
                  <div className="space-y-2">
                    {recipients.customers.map((customer) => (
                      <div
                        key={customer.id}
                        className="p-2 bg-white rounded border text-sm"
                      >
                        <div className="font-medium">{customer.name}</div>
                        <div className="text-gray-500 text-xs">
                          {customer.phone}
                        </div>
                        <div className="flex items-center gap-1 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {customer.group}
                          </Badge>
                          {customer.status === "inactive" && (
                            <Badge
                              variant="outline"
                              className="text-xs text-red-600"
                            >
                              Pasif
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            </div>
          </div>

          {/* Sağ Panel - WhatsApp Önizlemesi */}
          <div className="lg:w-2/3 p-4">
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900">WhatsApp Görünümü</h3>

              {/* WhatsApp Benzeri Önizleme */}
              <div className="bg-gradient-to-b from-green-100 to-green-50 rounded-lg p-4 border">
                <div className="bg-white rounded-lg shadow-sm">
                  {/* WhatsApp Header */}
                  <div className="flex items-center p-3 bg-green-600 text-white rounded-t-lg">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3">
                      <User className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-sm">
                        {recipients.customers[0]?.name || "Örnek Müşteri"}
                      </div>
                      <div className="text-xs text-green-100">çevrimiçi</div>
                    </div>
                  </div>

                  {/* Chat Area */}
                  <div className="p-4 bg-gray-50 min-h-[300px] rounded-b-lg">
                    <div className="space-y-3">
                      {/* Gönderilen Mesaj */}
                      <div className="flex justify-end">
                        <div className="max-w-xs lg:max-w-md">
                          <div className="bg-green-500 text-white p-3 rounded-lg rounded-br-sm shadow-sm">
                            <div className="text-sm whitespace-pre-wrap">
                              {getPreviewMessage(
                                recipients.customers[0]?.name || "Örnek Müşteri"
                              )}
                            </div>
                            <div className="flex items-center justify-end mt-2 text-xs text-green-100">
                              <span className="mr-1">{currentTime}</span>
                              <CheckCheck className="h-3 w-3" />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Sistem Mesajı */}
                      <div className="flex justify-center">
                        <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs">
                          Bu mesaj {recipients.count} kişiye gönderilecek
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mesaj İstatistikleri */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-blue-50 p-3 rounded-lg text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {recipients.count}
                  </div>
                  <div className="text-xs text-blue-600">Alıcı</div>
                </div>
                <div className="bg-green-50 p-3 rounded-lg text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {message.length}
                  </div>
                  <div className="text-xs text-green-600">Karakter</div>
                </div>
                <div className="bg-purple-50 p-3 rounded-lg text-center">
                  <div className="text-2xl font-bold text-purple-600">1</div>
                  <div className="text-xs text-purple-600">Mesaj</div>
                </div>
              </div>

              {/* Uyarılar */}
              {recipients.customers.some((c) => c.status === "inactive") && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                  <div className="flex items-center text-yellow-800">
                    <Clock className="h-4 w-4 mr-2" />
                    <span className="text-sm font-medium">Dikkat!</span>
                  </div>
                  <div className="text-sm text-yellow-700 mt-1">
                    Seçilen alıcılar arasında pasif müşteriler bulunmaktadır. Bu
                    müşterilere mesaj gönderilmeyebilir.
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Alt Butonlar */}
        <div className="flex items-center justify-between p-6 border-t bg-gray-50">
          <div className="text-sm text-gray-600">
            Toplam {recipients.count} alıcıya mesaj gönderilecek
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={onClose}>
              <X className="mr-2 h-4 w-4" />
              İptal
            </Button>
            <Button
              onClick={onSend}
              className="bg-green-600 hover:bg-green-700"
            >
              <Send className="mr-2 h-4 w-4" />
              Mesajı Gönder
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
