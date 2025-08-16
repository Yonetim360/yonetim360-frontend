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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { PhoneInput } from "../../components/ui/phone-input";
import {
  CalendarIcon,
  Clock,
  User,
  MessageSquare,
  Send,
  Eye,
  Phone,
  Calendar as CalendarTemplate,
} from "lucide-react";
import { format } from "date-fns";
import { tr } from "date-fns/locale";

export default function CreateReminderPage() {
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [customMessage, setCustomMessage] = useState("");
  const [sendType, setSendType] = useState("now");
  const [scheduledDate, setScheduledDate] = useState();
  const [scheduledTime, setScheduledTime] = useState("");
  const [templateDate, setTemplateDate] = useState();
  const [templateTime, setTemplateTime] = useState("");
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isManualEntry, setIsManualEntry] = useState(false);
  const [manualPhone, setManualPhone] = useState("");
  const [manualName, setManualName] = useState("");

  const customers = [
    { id: "1", name: "Ahmet Yılmaz", phone: "+90 532 123 45 67", group: "VIP" },
    {
      id: "2",
      name: "Fatma Kaya",
      phone: "+90 533 987 65 43",
      group: "Normal",
    },
    { id: "3", name: "Mehmet Demir", phone: "+90 534 555 12 34", group: "VIP" },
    {
      id: "4",
      name: "Ayşe Özkan",
      phone: "+90 535 777 88 88",
      group: "Normal",
    },
    {
      id: "5",
      name: "Can Yıldız",
      phone: "+90 536 999 00 00",
      group: "Premium",
    },
  ];

  const templates = [
    {
      id: "custom",
      name: "Özel Mesaj Oluştur",
      content: "",
      hasDateVariables: false,
    },
    {
      id: "1",
      name: "Randevu Hatırlatması",
      content:
        "Merhaba {MüşteriAdı}, {Tarih} tarihinde saat {Saat}'da randevunuz bulunmaktadır. Lütfen zamanında gelin.",
      hasDateVariables: true,
    },
    {
      id: "2",
      name: "Ödeme Hatırlatması",
      content:
        "Sayın {MüşteriAdı}, {Tarih} tarihli ödemenizin vadesi geçmiştir. Lütfen en kısa sürede ödemenizi yapın.",
      hasDateVariables: true,
    },
    {
      id: "3",
      name: "Toplantı Hatırlatması",
      content:
        "Merhaba {MüşteriAdı}, {Tarih} tarihinde saat {Saat}'da toplantımız var. Görüşmek üzere.",
      hasDateVariables: true,
    },
    {
      id: "4",
      name: "Sipariş Hazır",
      content:
        "Merhaba {MüşteriAdı}, siparişiniz hazır! Mağazamızdan teslim alabilirsiniz.",
      hasDateVariables: false,
    },
  ];

  const selectedCustomerData = customers.find((c) => c.id === selectedCustomer);
  const selectedTemplateData = templates.find((t) => t.id === selectedTemplate);

  const getCurrentCustomer = () => {
    if (isManualEntry) {
      return { name: manualName, phone: manualPhone };
    }
    return selectedCustomerData;
  };

  const generatePreview = () => {
    let message = "";

    if (selectedTemplate === "custom") {
      message = customMessage;
    } else if (selectedTemplateData && selectedTemplate !== "custom") {
      message = selectedTemplateData.content;
    } else {
      message = customMessage;
    }

    const currentCustomer = getCurrentCustomer();

    if (
      currentCustomer &&
      selectedTemplateData &&
      selectedTemplate !== "custom"
    ) {
      message = message
        .replace("{MüşteriAdı}", currentCustomer.name)
        .replace(
          "{Tarih}",
          templateDate
            ? format(templateDate, "dd/MM/yyyy", { locale: tr })
            : "DD/MM/YYYY"
        )
        .replace("{Saat}", templateTime || "HH:MM");
    }

    return message;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const currentCustomer = getCurrentCustomer();
    console.log({
      customer: isManualEntry
        ? { name: manualName, phone: manualPhone }
        : selectedCustomer,
      template: selectedTemplate,
      message: customMessage,
      templateDate,
      templateTime,
      sendType,
      scheduledDate,
      scheduledTime,
    });
    alert("Hatırlatma başarıyla oluşturuldu!");
  };

  const isFormValid = () => {
    if (isManualEntry) {
      if (selectedTemplate === "custom") {
        return manualName.trim() && manualPhone.trim() && customMessage.trim();
      }
      return (
        manualName.trim() &&
        manualPhone.trim() &&
        (selectedTemplate || customMessage.trim())
      );
    }
    if (selectedTemplate === "custom") {
      return selectedCustomer && customMessage.trim();
    }
    return selectedCustomer && (selectedTemplate || customMessage.trim());
  };

  const templateHasDateVariables =
    selectedTemplateData?.hasDateVariables || false;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Yeni Hatırlatma Oluştur
          </h1>
          <p className="text-gray-600">
            Müşterilerinize WhatsApp hatırlatması gönderin
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Müşteri Seçimi */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <User className="mr-2 h-5 w-5" />
                    Müşteri Seçimi
                  </CardTitle>
                  <CardDescription>
                    Hatırlatma gönderilecek müşteriyi seçin veya manuel girin
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <RadioGroup
                    value={isManualEntry ? "manual" : "existing"}
                    onValueChange={(value) => {
                      setIsManualEntry(value === "manual");
                      if (value === "existing") {
                        setManualName("");
                        setManualPhone("");
                      } else {
                        setSelectedCustomer("");
                      }
                    }}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="existing" id="existing" />
                      <Label htmlFor="existing">Mevcut Müşteri</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="manual" id="manual" />
                      <Label htmlFor="manual">Manuel Giriş</Label>
                    </div>
                  </RadioGroup>

                  {!isManualEntry ? (
                    <Select
                      value={selectedCustomer}
                      onValueChange={setSelectedCustomer}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Müşteri seçin..." />
                      </SelectTrigger>
                      <SelectContent>
                        {customers.map((customer) => (
                          <SelectItem key={customer.id} value={customer.id}>
                            <div className="flex items-center justify-between w-full">
                              <div className="flex flex-col items-start">
                                <span className="font-medium">
                                  {customer.name}
                                </span>
                                <div className="flex items-center gap-2 mt-1">
                                  <Phone className="h-3 w-3 text-gray-400" />
                                  <span className="text-sm text-gray-600">
                                    {customer.phone}
                                  </span>
                                </div>
                              </div>
                              <Badge variant="outline" className="text-xs ml-4">
                                {customer.group}
                              </Badge>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="manual-name">Müşteri Adı</Label>
                        <Input
                          id="manual-name"
                          placeholder="Müşteri adını girin..."
                          value={manualName}
                          onChange={(e) => setManualName(e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="manual-phone">Telefon Numarası</Label>
                        <PhoneInput
                          id="manual-phone"
                          value={manualPhone}
                          onChange={setManualPhone}
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Türkiye telefon numarası formatında girin (örn: +90
                          5XX XXX XX XX)
                        </p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Mesaj İçeriği */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MessageSquare className="mr-2 h-5 w-5" />
                    Mesaj İçeriği
                  </CardTitle>
                  <CardDescription>
                    Şablon seçin veya özel mesaj yazın
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="template">Mesaj Şablonu</Label>
                    <Select
                      value={selectedTemplate}
                      onValueChange={setSelectedTemplate}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Şablon seçin..." />
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

                  <div>
                    <Label htmlFor="message">Mesaj Metni</Label>
                    <Textarea
                      id="message"
                      placeholder={
                        selectedTemplate === "custom"
                          ? "Özel mesajınızı yazın..."
                          : "Mesajınızı yazın..."
                      }
                      value={
                        selectedTemplate === "custom"
                          ? customMessage
                          : selectedTemplateData
                          ? selectedTemplateData.content
                          : customMessage
                      }
                      onChange={(e) => setCustomMessage(e.target.value)}
                      rows={4}
                      disabled={
                        selectedTemplate && selectedTemplate !== "custom"
                      }
                    />
                    {selectedTemplate && selectedTemplate !== "custom" && (
                      <p className="text-xs text-gray-500 mt-1">
                        Şablon seçildiğinde mesaj otomatik doldurulur.
                        Değişkenler: {"{MüşteriAdı}"}, {"{Tarih}"}, {"{Saat}"}
                      </p>
                    )}
                    {selectedTemplate === "custom" && (
                      <p className="text-xs text-gray-500 mt-1">
                        Özel mesajınızı yazın. Değişkenler kullanmak isterseniz:{" "}
                        {"{MüşteriAdı}"}, {"{Tarih}"}, {"{Saat}"}
                      </p>
                    )}
                    {!selectedTemplate && (
                      <p className="text-xs text-gray-500 mt-1">
                        Şablon seçmeden de özel mesaj yazabilirsiniz.
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Template Date/Time section for message content variables */}
              {templateHasDateVariables && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <CalendarTemplate className="mr-2 h-5 w-5" />
                      Şablon Tarih Bilgileri
                    </CardTitle>
                    <CardDescription>
                      Mesajda kullanılacak tarih ve saat bilgilerini girin
                      (randevu tarihi, ödeme vadesi vb.)
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>Tarih ({"{Tarih}"} değişkeni)</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className="w-full justify-start text-left font-normal bg-transparent"
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {templateDate
                                ? format(templateDate, "dd/MM/yyyy", {
                                    locale: tr,
                                  })
                                : "Tarih seçin"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={templateDate}
                              onSelect={setTemplateDate}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <p className="text-xs text-gray-500 mt-1">
                          Bu tarih mesajdaki {"{Tarih}"} değişkeninin yerine
                          geçecek
                        </p>
                      </div>
                      <div>
                        <Label htmlFor="template-time">
                          Saat ({"{Saat}"} değişkeni)
                        </Label>
                        <Input
                          id="template-time"
                          type="time"
                          value={templateTime}
                          onChange={(e) => setTemplateTime(e.target.value)}
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Bu saat mesajdaki {"{Saat}"} değişkeninin yerine
                          geçecek
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Gönderim Zamanı */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Clock className="mr-2 h-5 w-5" />
                    Gönderim Zamanı
                  </CardTitle>
                  <CardDescription>
                    Hatırlatma mesajının ne zaman gönderileceğini belirleyin
                    {templateHasDateVariables &&
                      " (yukarıdaki tarihten farklı olabilir)"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <RadioGroup value={sendType} onValueChange={setSendType}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="now" id="now" />
                      <Label htmlFor="now">Hemen Gönder</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="scheduled" id="scheduled" />
                      <Label htmlFor="scheduled">Zamanla Gönder</Label>
                    </div>
                  </RadioGroup>

                  {sendType === "scheduled" && (
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>Gönderim Tarihi</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className="w-full justify-start text-left font-normal bg-transparent"
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {scheduledDate
                                ? format(scheduledDate, "dd/MM/yyyy", {
                                    locale: tr,
                                  })
                                : "Tarih seçin"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={scheduledDate}
                              onSelect={setScheduledDate}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <p className="text-xs text-gray-500 mt-1">
                          Mesajın gönderileceği tarih
                        </p>
                      </div>
                      <div>
                        <Label htmlFor="time">Gönderim Saati</Label>
                        <Input
                          id="time"
                          type="time"
                          value={scheduledTime}
                          onChange={(e) => setScheduledTime(e.target.value)}
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Mesajın gönderileceği saat
                        </p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Butonlar */}
              <div className="flex gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsPreviewOpen(true)}
                >
                  <Eye className="mr-2 h-4 w-4" />
                  Önizleme
                </Button>
                <Button type="submit" disabled={!isFormValid()}>
                  <Send className="mr-2 h-4 w-4" />
                  Hatırlatma Oluştur
                </Button>
              </div>
            </form>
          </div>

          {/* Önizleme */}
          <div className="lg:col-span-1">
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle>Mesaj Önizlemesi</CardTitle>
                <CardDescription>Gönderilecek mesajın görünümü</CardDescription>
              </CardHeader>
              <CardContent>
                {getCurrentCustomer() ? (
                  <div className="space-y-4">
                    <div className="p-3 bg-gray-100 rounded-lg">
                      <div className="text-sm font-medium mb-1">Alıcı:</div>
                      <div className="text-sm font-medium">
                        {getCurrentCustomer()?.name}
                      </div>
                      <div className="flex items-center gap-1 mt-1">
                        <Phone className="h-3 w-3 text-gray-500" />
                        <span className="text-xs text-gray-500">
                          {getCurrentCustomer()?.phone}
                        </span>
                      </div>
                    </div>

                    <div className="p-3 bg-green-100 rounded-lg">
                      <div className="text-sm font-medium mb-2">Mesaj:</div>
                      <div className="text-sm whitespace-pre-wrap">
                        {generatePreview() ||
                          "Mesaj içeriği burada görünecek..."}
                      </div>
                    </div>

                    {templateHasDateVariables &&
                      (templateDate || templateTime) && (
                        <div className="p-3 bg-purple-100 rounded-lg">
                          <div className="text-sm font-medium mb-1">
                            Mesaj İçeriği Tarihi:
                          </div>
                          <div className="text-sm">
                            {templateDate &&
                              format(templateDate, "dd/MM/yyyy", {
                                locale: tr,
                              })}
                            {templateDate && templateTime && " - "}
                            {templateTime}
                          </div>
                          <div className="text-xs text-gray-600 mt-1">
                            (Randevu/ödeme tarihi - mesajda görünecek)
                          </div>
                        </div>
                      )}

                    {sendType === "scheduled" &&
                      scheduledDate &&
                      scheduledTime && (
                        <div className="p-3 bg-blue-100 rounded-lg">
                          <div className="text-sm font-medium mb-1">
                            Gönderim Zamanı:
                          </div>
                          <div className="text-sm">
                            {format(scheduledDate, "dd/MM/yyyy", {
                              locale: tr,
                            })}{" "}
                            - {scheduledTime}
                          </div>
                          <div className="text-xs text-gray-600 mt-1">
                            (Mesajın gönderileceği zaman)
                          </div>
                        </div>
                      )}
                  </div>
                ) : (
                  <div className="text-center text-gray-500 py-8">
                    Önizleme için müşteri bilgilerini girin
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
