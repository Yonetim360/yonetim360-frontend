"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { PhoneInput } from "../components/ui/phone-input";
import { MessagePreviewModal } from "../components/ui/message-preview-modal";
import { Send, MessageSquare, Users, Clock } from "lucide-react";

export default function Page() {
  const [recipient, setRecipient] = useState("");
  const [message, setMessage] = useState("");
  const [template, setTemplate] = useState("");
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const templates = [
    {
      id: "appointment",
      name: "Randevu Hatırlatması",
      content: "Merhaba {name}, randevunuz {date} tarihinde {time} saatinde.",
    },
    {
      id: "payment",
      name: "Ödeme Hatırlatması",
      content:
        "Sayın {name}, ödeme tarihiniz yaklaşmaktadır. Lütfen {amount} TL tutarındaki ödemenizi yapınız.",
    },
    {
      id: "meeting",
      name: "Toplantı Hatırlatması",
      content:
        "Merhaba {name}, toplantımız {date} tarihinde {time} saatinde başlayacaktır.",
    },
  ];

  const recentMessages = [
    {
      id: 1,
      recipient: "Ahmet Yılmaz",
      phone: "+90 532 123 4567",
      message: "Randevunuz yarın saat 14:00'da",
      sentTime: "2024-01-15 10:30",
      status: "delivered",
    },
    {
      id: 2,
      recipient: "Fatma Kaya",
      phone: "+90 533 987 6543",
      message: "Ödeme hatırlatması",
      sentTime: "2024-01-15 09:15",
      status: "sent",
    },
    {
      id: 3,
      recipient: "Mehmet Demir",
      phone: "+90 534 555 1234",
      message: "Toplantı hatırlatması",
      sentTime: "2024-01-15 08:45",
      status: "failed",
    },
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case "sent":
        return (
          <Badge
            variant="outline"
            className="text-yellow-600 border-yellow-200"
          >
            Gönderildi
          </Badge>
        );
      case "delivered":
        return (
          <Badge variant="outline" className="text-green-600 border-green-200">
            Teslim Edildi
          </Badge>
        );
      case "failed":
        return (
          <Badge variant="outline" className="text-red-600 border-red-200">
            Başarısız
          </Badge>
        );
      default:
        return <Badge variant="outline">Bilinmiyor</Badge>;
    }
  };

  const handleTemplateSelect = (templateId) => {
    const selectedTemplate = templates.find((t) => t.id === templateId);
    if (selectedTemplate) {
      setMessage(selectedTemplate.content);
      setTemplate(templateId);
    }
  };

  const handleSendMessage = () => {
    // Mesaj gönderme işlemi
    console.log("Mesaj gönderiliyor:", { recipient, message });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Manuel Mesaj Gönder
          </h1>
          <p className="text-gray-600">
            Müşterilerinize anında WhatsApp mesajı gönderin
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Mesaj Gönderme Formu */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Send className="h-5 w-5" />
                Yeni Mesaj
              </CardTitle>
              <CardDescription>
                Alıcı bilgilerini girin ve mesajınızı yazın
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="recipient">Alıcı Adı</Label>
                <Input
                  id="recipient"
                  placeholder="Müşteri adını girin"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Telefon Numarası</Label>
                <PhoneInput />
              </div>

              <div className="space-y-2">
                <Label htmlFor="template">Şablon Seç (İsteğe Bağlı)</Label>
                <Select value={template} onValueChange={handleTemplateSelect}>
                  <SelectTrigger>
                    <SelectValue placeholder="Bir şablon seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    {templates.map((template) => (
                      <SelectItem key={template.id} value={template.id}>
                        {template.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Mesaj İçeriği</Label>
                <Textarea
                  id="message"
                  placeholder="Mesajınızı yazın..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={6}
                />
                <p className="text-xs text-muted-foreground">
                  Değişkenler: {"{name}"}, {"{date}"}, {"{time}"}, {"{amount}"}
                </p>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={() => setIsPreviewOpen(true)}
                  variant="outline"
                  className="flex-1"
                >
                  Önizleme
                </Button>
                <Button onClick={handleSendMessage} className="flex-1">
                  <Send className="mr-2 h-4 w-4" />
                  Gönder
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Son Gönderilen Mesajlar */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Son Mesajlar
              </CardTitle>
              <CardDescription>
                Yakın zamanda gönderilen mesajlar
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentMessages.map((msg) => (
                  <div key={msg.id} className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-medium text-sm">{msg.recipient}</div>
                      {getStatusBadge(msg.status)}
                    </div>
                    <div className="text-xs text-gray-600 mb-1">
                      {msg.phone}
                    </div>
                    <div className="text-sm text-gray-800 mb-2 line-clamp-2">
                      {msg.message}
                    </div>
                    <div className="text-xs text-gray-500">{msg.sentTime}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* İstatistikler */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Bugün Gönderilen
              </CardTitle>
              <Send className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">+12% dünden</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Teslim Edilen
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">22</div>
              <p className="text-xs text-muted-foreground">
                %91.7 başarı oranı
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Ortalama Süre
              </CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2.3s</div>
              <p className="text-xs text-muted-foreground">Gönderim süresi</p>
            </CardContent>
          </Card>
        </div>

        <MessagePreviewModal
          isOpen={isPreviewOpen}
          onClose={() => setIsPreviewOpen(false)}
          customers={[
            {
              id: 1,
              name: recipient || "Müşteri",
              phone: "", // You can add phone input value here if needed
              group: "",
              status: "active",
            },
          ]}
          selectedCustomers={[1]}
          groups={[]}
          selectedGroup={null}
          message={message}
        />
      </div>
    </div>
  );
}
