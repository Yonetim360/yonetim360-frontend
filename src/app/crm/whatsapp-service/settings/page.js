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
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Save,
  Phone,
  MessageSquare,
  Bell,
  Shield,
  Database,
} from "lucide-react";

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    whatsappApiKey: "",
    whatsappPhoneNumber: "",
    defaultMessageTemplate: "Merhaba {name}, {message}",
    autoSendEnabled: true,
    notificationsEnabled: true,
    darkMode: false,
    language: "tr",
    timezone: "Europe/Istanbul",
    maxRetryAttempts: 3,
    retryDelay: 5,
  });

  const handleSave = () => {
    // Ayarları kaydetme işlemi
    console.log("Ayarlar kaydedildi:", settings);
  };

  const updateSetting = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Ayarlar</h1>
          <p className="text-gray-600">
            WhatsApp hatırlatma modülü ayarlarını yönetin
          </p>
        </div>

        <Tabs defaultValue="whatsapp" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="whatsapp" className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              WhatsApp
            </TabsTrigger>
            <TabsTrigger value="messages" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Mesajlar
            </TabsTrigger>
            <TabsTrigger
              value="notifications"
              className="flex items-center gap-2"
            >
              <Bell className="h-4 w-4" />
              Bildirimler
            </TabsTrigger>
            <TabsTrigger value="general" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Genel
            </TabsTrigger>
          </TabsList>

          <TabsContent value="whatsapp" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="h-5 w-5" />
                  WhatsApp API Ayarları
                </CardTitle>
                <CardDescription>
                  WhatsApp Business API bağlantı ayarlarını yapılandırın
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="apiKey">API Anahtarı</Label>
                  <Input
                    id="apiKey"
                    type="password"
                    placeholder="WhatsApp API anahtarınızı girin"
                    value={settings.whatsappApiKey}
                    onChange={(e) =>
                      updateSetting("whatsappApiKey", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phoneNumber">Telefon Numarası</Label>
                  <Input
                    id="phoneNumber"
                    placeholder="+90 555 123 45 67"
                    value={settings.whatsappPhoneNumber}
                    onChange={(e) =>
                      updateSetting("whatsappPhoneNumber", e.target.value)
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Bağlantı Durumu</Label>
                    <p className="text-sm text-muted-foreground">
                      WhatsApp API bağlantı durumu
                    </p>
                  </div>
                  <Badge variant="outline" className="text-green-600">
                    Bağlı
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="messages" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Mesaj Ayarları
                </CardTitle>
                <CardDescription>
                  Varsayılan mesaj şablonları ve gönderim ayarları
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="messageTemplate">
                    Varsayılan Mesaj Şablonu
                  </Label>
                  <Textarea
                    id="messageTemplate"
                    placeholder="Mesaj şablonunuzu girin..."
                    value={settings.defaultMessageTemplate}
                    onChange={(e) =>
                      updateSetting("defaultMessageTemplate", e.target.value)
                    }
                    rows={4}
                  />
                  <p className="text-xs text-muted-foreground">
                    Değişkenler: {"{name}"}, {"{message}"}, {"{date}"},{" "}
                    {"{time}"}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Otomatik Gönderim</Label>
                    <p className="text-sm text-muted-foreground">
                      Hatırlatmaları otomatik olarak gönder
                    </p>
                  </div>
                  <Switch
                    checked={settings.autoSendEnabled}
                    onCheckedChange={(checked) =>
                      updateSetting("autoSendEnabled", checked)
                    }
                  />
                </div>
                <Separator />
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="retryAttempts">
                      Maksimum Deneme Sayısı
                    </Label>
                    <Input
                      id="retryAttempts"
                      type="number"
                      min="1"
                      max="10"
                      value={settings.maxRetryAttempts}
                      onChange={(e) =>
                        updateSetting(
                          "maxRetryAttempts",
                          Number.parseInt(e.target.value)
                        )
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="retryDelay">Deneme Aralığı (dakika)</Label>
                    <Input
                      id="retryDelay"
                      type="number"
                      min="1"
                      max="60"
                      value={settings.retryDelay}
                      onChange={(e) =>
                        updateSetting(
                          "retryDelay",
                          Number.parseInt(e.target.value)
                        )
                      }
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Bildirim Ayarları
                </CardTitle>
                <CardDescription>
                  Sistem bildirimleri ve uyarı ayarları
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Bildirimler</Label>
                    <p className="text-sm text-muted-foreground">
                      Sistem bildirimlerini etkinleştir
                    </p>
                  </div>
                  <Switch
                    checked={settings.notificationsEnabled}
                    onCheckedChange={(checked) =>
                      updateSetting("notificationsEnabled", checked)
                    }
                  />
                </div>
                <Separator />
                <div className="space-y-4">
                  <h4 className="text-sm font-medium">Bildirim Türleri</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm">Başarılı gönderimler</Label>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label className="text-sm">Başarısız gönderimler</Label>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label className="text-sm">Sistem hataları</Label>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label className="text-sm">Günlük raporlar</Label>
                      <Switch />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="general" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Genel Ayarlar
                </CardTitle>
                <CardDescription>
                  Uygulama genel ayarları ve tercihler
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="language">Dil</Label>
                    <Select
                      value={settings.language}
                      onValueChange={(value) =>
                        updateSetting("language", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tr">Türkçe</SelectItem>
                        <SelectItem value="en">English</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Saat Dilimi</Label>
                    <Select
                      value={settings.timezone}
                      onValueChange={(value) =>
                        updateSetting("timezone", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Europe/Istanbul">
                          İstanbul
                        </SelectItem>
                        <SelectItem value="Europe/London">Londra</SelectItem>
                        <SelectItem value="America/New_York">
                          New York
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Karanlık Mod</Label>
                    <p className="text-sm text-muted-foreground">
                      Karanlık tema kullan
                    </p>
                  </div>
                  <Switch
                    checked={settings.darkMode}
                    onCheckedChange={(checked) =>
                      updateSetting("darkMode", checked)
                    }
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  Veri Yönetimi
                </CardTitle>
                <CardDescription>
                  Veri yedekleme ve temizleme işlemleri
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Veri Yedekleme</Label>
                    <p className="text-sm text-muted-foreground">
                      Tüm verileri yedekle
                    </p>
                  </div>
                  <Button variant="outline">Yedekle</Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Eski Verileri Temizle</Label>
                    <p className="text-sm text-muted-foreground">
                      30 günden eski verileri sil
                    </p>
                  </div>
                  <Button variant="outline">Temizle</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end mt-8">
          <Button onClick={handleSave} className="flex items-center gap-2">
            <Save className="h-4 w-4" />
            Ayarları Kaydet
          </Button>
        </div>
      </div>
    </div>
  );
}
