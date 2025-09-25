"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Settings,
  Bell,
  Lock,
  Globe,
  Palette,
  Monitor,
  Sun,
  Moon,
  Shield,
  Database,
  Users,
  Mail,
  Smartphone,
  Eye,
  EyeOff,
  Save,
  Download,
  Upload,
  Trash2,
  AlertTriangle,
  CheckCircle,
  Info,
  FileText,
} from "lucide-react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Settings states
  const [generalSettings, setGeneralSettings] = useState({
    language: "tr",
    timezone: "Europe/Istanbul",
    dateFormat: "DD/MM/YYYY",
    currency: "TRY",
    theme: "system",
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    systemAlerts: true,
    marketingEmails: false,
    weeklyReports: true,
    taskReminders: true,
    meetingReminders: true,
    customerUpdates: true,
    systemMaintenance: true,
  });

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    sessionTimeout: "30",
    passwordExpiry: "90",
    loginAlerts: true,
    deviceTracking: true,
  });

  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: "team",
    activityTracking: true,
    dataSharing: false,
    analyticsOptIn: true,
    cookiePreferences: "essential",
  });

  const tabs = [
    {
      id: "general",
      name: "Genel Ayarlar",
      icon: Settings,
      color: "text-dark-gray",
      bgColor: "bg-dark-gray/10",
      description: "Dil, saat dilimi ve görünüm ayarları",
    },
    {
      id: "notifications",
      name: "Bildirimler",
      icon: Bell,
      color: "text-orange",
      bgColor: "bg-orange/10",
      description: "E-posta, push ve SMS bildirimleri",
    },
    {
      id: "security",
      name: "Güvenlik",
      icon: Lock,
      color: "text-red",
      bgColor: "bg-red/10",
      description: "Şifre ve güvenlik ayarları",
    },
    {
      id: "privacy",
      name: "Gizlilik",
      icon: Shield,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      description: "Veri gizliliği ve paylaşım ayarları",
    },
    {
      id: "data",
      name: "Veri Yönetimi",
      icon: Database,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
      description: "Veri yedekleme ve dışa aktarma",
    },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "general":
        return (
          <div className="space-y-6">
            {/* Dil ve Bölge Ayarları */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-dark-gray">
                  <Globe className="mr-2 h-5 w-5" />
                  Dil ve Bölge Ayarları
                </CardTitle>
                <CardDescription>
                  Uygulamanın dilini ve bölgesel ayarlarını yapılandırın
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="language">Dil</Label>
                    <Select
                      value={generalSettings.language}
                      onValueChange={(value) =>
                        setGeneralSettings({
                          ...generalSettings,
                          language: value,
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tr">Türkçe</SelectItem>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="de">Deutsch</SelectItem>
                        <SelectItem value="fr">Français</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Saat Dilimi</Label>
                    <Select
                      value={generalSettings.timezone}
                      onValueChange={(value) =>
                        setGeneralSettings({
                          ...generalSettings,
                          timezone: value,
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Europe/Istanbul">
                          İstanbul (GMT+3)
                        </SelectItem>
                        <SelectItem value="Europe/London">
                          Londra (GMT+0)
                        </SelectItem>
                        <SelectItem value="America/New_York">
                          New York (GMT-5)
                        </SelectItem>
                        <SelectItem value="Asia/Tokyo">
                          Tokyo (GMT+9)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="dateFormat">Tarih Formatı</Label>
                    <Select
                      value={generalSettings.dateFormat}
                      onValueChange={(value) =>
                        setGeneralSettings({
                          ...generalSettings,
                          dateFormat: value,
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                        <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                        <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="currency">Para Birimi</Label>
                    <Select
                      value={generalSettings.currency}
                      onValueChange={(value) =>
                        setGeneralSettings({
                          ...generalSettings,
                          currency: value,
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="TRY">Türk Lirası (₺)</SelectItem>
                        <SelectItem value="USD">US Dollar ($)</SelectItem>
                        <SelectItem value="EUR">Euro (€)</SelectItem>
                        <SelectItem value="GBP">British Pound (£)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Görünüm Ayarları */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-dark-gray">
                  <Palette className="mr-2 h-5 w-5" />
                  Görünüm Ayarları
                </CardTitle>
                <CardDescription>
                  Tema ve görsel tercihlerinizi ayarlayın
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <Label>Tema Seçimi</Label>
                  <div className="grid grid-cols-3 gap-3">
                    <button
                      onClick={() =>
                        setGeneralSettings({
                          ...generalSettings,
                          theme: "light",
                        })
                      }
                      className={`p-4 border-2 rounded-lg flex flex-col items-center space-y-2 transition-colors ${
                        generalSettings.theme === "light"
                          ? "border-primary-green bg-primary-green/10"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <Sun className="h-6 w-6" />
                      <span className="text-sm font-medium">Açık</span>
                    </button>
                    <button
                      onClick={() =>
                        setGeneralSettings({
                          ...generalSettings,
                          theme: "dark",
                        })
                      }
                      className={`p-4 border-2 rounded-lg flex flex-col items-center space-y-2 transition-colors ${
                        generalSettings.theme === "dark"
                          ? "border-primary-green bg-primary-green/10"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <Moon className="h-6 w-6" />
                      <span className="text-sm font-medium">Koyu</span>
                    </button>
                    <button
                      onClick={() =>
                        setGeneralSettings({
                          ...generalSettings,
                          theme: "system",
                        })
                      }
                      className={`p-4 border-2 rounded-lg flex flex-col items-center space-y-2 transition-colors ${
                        generalSettings.theme === "system"
                          ? "border-primary-green bg-primary-green/10"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <Monitor className="h-6 w-6" />
                      <span className="text-sm font-medium">Sistem</span>
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Button className="bg-primary-green hover:bg-primary-green/90">
                <Save className="mr-2 h-4 w-4" />
                Ayarları Kaydet
              </Button>
            </div>
          </div>
        );

      case "notifications":
        return (
          <div className="space-y-6">
            {/* E-posta Bildirimleri */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-orange">
                  <Mail className="mr-2 h-5 w-5" />
                  E-posta Bildirimleri
                </CardTitle>
                <CardDescription>
                  E-posta ile alacağınız bildirimleri yönetin
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>E-posta Bildirimleri</Label>
                    <p className="text-sm text-gray-500">
                      Tüm e-posta bildirimlerini etkinleştir/devre dışı bırak
                    </p>
                  </div>
                  <Switch
                    checked={notificationSettings.emailNotifications}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({
                        ...notificationSettings,
                        emailNotifications: checked,
                      })
                    }
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Haftalık Raporlar</Label>
                    <p className="text-sm text-gray-500">
                      Haftalık performans ve aktivite raporları
                    </p>
                  </div>
                  <Switch
                    checked={notificationSettings.weeklyReports}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({
                        ...notificationSettings,
                        weeklyReports: checked,
                      })
                    }
                    disabled={!notificationSettings.emailNotifications}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Müşteri Güncellemeleri</Label>
                    <p className="text-sm text-gray-500">
                      Müşteri aktiviteleri ve değişiklikleri
                    </p>
                  </div>
                  <Switch
                    checked={notificationSettings.customerUpdates}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({
                        ...notificationSettings,
                        customerUpdates: checked,
                      })
                    }
                    disabled={!notificationSettings.emailNotifications}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Pazarlama E-postaları</Label>
                    <p className="text-sm text-gray-500">
                      Ürün güncellemeleri ve promosyonlar
                    </p>
                  </div>
                  <Switch
                    checked={notificationSettings.marketingEmails}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({
                        ...notificationSettings,
                        marketingEmails: checked,
                      })
                    }
                    disabled={!notificationSettings.emailNotifications}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Push ve SMS Bildirimleri */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-orange">
                  <Smartphone className="mr-2 h-5 w-5" />
                  Push ve SMS Bildirimleri
                </CardTitle>
                <CardDescription>
                  Mobil ve SMS bildirimlerini yapılandırın
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Push Bildirimleri</Label>
                    <p className="text-sm text-gray-500">
                      Tarayıcı ve mobil push bildirimleri
                    </p>
                  </div>
                  <Switch
                    checked={notificationSettings.pushNotifications}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({
                        ...notificationSettings,
                        pushNotifications: checked,
                      })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>SMS Bildirimleri</Label>
                    <p className="text-sm text-gray-500">
                      Kritik durumlar için SMS bildirimleri
                    </p>
                  </div>
                  <Switch
                    checked={notificationSettings.smsNotifications}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({
                        ...notificationSettings,
                        smsNotifications: checked,
                      })
                    }
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Görev Hatırlatıcıları</Label>
                    <p className="text-sm text-gray-500">
                      Yaklaşan görevler için hatırlatmalar
                    </p>
                  </div>
                  <Switch
                    checked={notificationSettings.taskReminders}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({
                        ...notificationSettings,
                        taskReminders: checked,
                      })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Toplantı Hatırlatıcıları</Label>
                    <p className="text-sm text-gray-500">
                      Yaklaşan toplantılar için hatırlatmalar
                    </p>
                  </div>
                  <Switch
                    checked={notificationSettings.meetingReminders}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({
                        ...notificationSettings,
                        meetingReminders: checked,
                      })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Sistem Uyarıları</Label>
                    <p className="text-sm text-gray-500">
                      Sistem bakımı ve güncelleme bildirimleri
                    </p>
                  </div>
                  <Switch
                    checked={notificationSettings.systemMaintenance}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({
                        ...notificationSettings,
                        systemMaintenance: checked,
                      })
                    }
                  />
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Button className="bg-orange hover:bg-orange/90">
                <Save className="mr-2 h-4 w-4" />
                Bildirim Ayarlarını Kaydet
              </Button>
            </div>
          </div>
        );

      case "security":
        return (
          <div className="space-y-6">
            {/* Şifre Değiştirme */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-red">
                  <Lock className="mr-2 h-5 w-5" />
                  Şifre Değiştirme
                </CardTitle>
                <CardDescription>
                  Hesap şifrenizi güvenli bir şekilde değiştirin
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Mevcut Şifre</Label>
                  <div className="relative">
                    <Input
                      id="currentPassword"
                      type={showCurrentPassword ? "text" : "password"}
                      placeholder="Mevcut şifrenizi girin"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                      onClick={() =>
                        setShowCurrentPassword(!showCurrentPassword)
                      }
                    >
                      {showCurrentPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="newPassword">Yeni Şifre</Label>
                  <div className="relative">
                    <Input
                      id="newPassword"
                      type={showNewPassword ? "text" : "password"}
                      placeholder="Yeni şifrenizi girin"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                    >
                      {showNewPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  <div className="text-sm text-gray-500">
                    Şifreniz en az 8 karakter olmalı ve büyük harf, küçük harf,
                    sayı içermelidir.
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Yeni Şifre Tekrar</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Yeni şifrenizi tekrar girin"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>

                <Button className="bg-red hover:bg-red/90">
                  Şifreyi Değiştir
                </Button>
              </CardContent>
            </Card>

            {/* İki Faktörlü Doğrulama */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-red">
                  <Shield className="mr-2 h-5 w-5" />
                  İki Faktörlü Doğrulama (2FA)
                </CardTitle>
                <CardDescription>
                  Hesabınızın güvenliğini artırmak için 2FA&apos;yı
                  etkinleştirin
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>İki Faktörlü Doğrulama</Label>
                    <p className="text-sm text-gray-500">
                      Giriş yaparken telefon numaranıza gönderilen kod ile
                      doğrulama yapın
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge
                      variant={
                        securitySettings.twoFactorAuth ? "default" : "secondary"
                      }
                      className="bg-red"
                    >
                      {securitySettings.twoFactorAuth ? "Aktif" : "Pasif"}
                    </Badge>
                    <Switch
                      checked={securitySettings.twoFactorAuth}
                      onCheckedChange={(checked) =>
                        setSecuritySettings({
                          ...securitySettings,
                          twoFactorAuth: checked,
                        })
                      }
                    />
                  </div>
                </div>

                {securitySettings.twoFactorAuth && (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <p className="text-sm text-green-800">
                        İki faktörlü doğrulama aktif. Telefon numaranız: +90 532
                        *** ** 67
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Oturum Ayarları */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-red">
                  <Monitor className="mr-2 h-5 w-5" />
                  Oturum Ayarları
                </CardTitle>
                <CardDescription>
                  Oturum güvenliği ve zaman aşımı ayarları
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="sessionTimeout">
                      Oturum Zaman Aşımı (dakika)
                    </Label>
                    <Select
                      value={securitySettings.sessionTimeout}
                      onValueChange={(value) =>
                        setSecuritySettings({
                          ...securitySettings,
                          sessionTimeout: value,
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15">15 dakika</SelectItem>
                        <SelectItem value="30">30 dakika</SelectItem>
                        <SelectItem value="60">1 saat</SelectItem>
                        <SelectItem value="120">2 saat</SelectItem>
                        <SelectItem value="480">8 saat</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="passwordExpiry">
                      Şifre Geçerlilik Süresi (gün)
                    </Label>
                    <Select
                      value={securitySettings.passwordExpiry}
                      onValueChange={(value) =>
                        setSecuritySettings({
                          ...securitySettings,
                          passwordExpiry: value,
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="30">30 gün</SelectItem>
                        <SelectItem value="60">60 gün</SelectItem>
                        <SelectItem value="90">90 gün</SelectItem>
                        <SelectItem value="180">180 gün</SelectItem>
                        <SelectItem value="365">1 yıl</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Giriş Uyarıları</Label>
                    <p className="text-sm text-gray-500">
                      Yeni cihazdan giriş yapıldığında e-posta gönder
                    </p>
                  </div>
                  <Switch
                    checked={securitySettings.loginAlerts}
                    onCheckedChange={(checked) =>
                      setSecuritySettings({
                        ...securitySettings,
                        loginAlerts: checked,
                      })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Cihaz Takibi</Label>
                    <p className="text-sm text-gray-500">
                      Giriş yapılan cihazları takip et ve kaydet
                    </p>
                  </div>
                  <Switch
                    checked={securitySettings.deviceTracking}
                    onCheckedChange={(checked) =>
                      setSecuritySettings({
                        ...securitySettings,
                        deviceTracking: checked,
                      })
                    }
                  />
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Button className="bg-red hover:bg-red/90">
                <Save className="mr-2 h-4 w-4" />
                Güvenlik Ayarlarını Kaydet
              </Button>
            </div>
          </div>
        );

      case "privacy":
        return (
          <div className="space-y-6">
            {/* Profil Gizliliği */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-blue-600">
                  <Users className="mr-2 h-5 w-5" />
                  Profil Gizliliği
                </CardTitle>
                <CardDescription>
                  Profil bilgilerinizin görünürlüğünü kontrol edin
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="profileVisibility">Profil Görünürlüğü</Label>
                  <Select
                    value={privacySettings.profileVisibility}
                    onValueChange={(value) =>
                      setPrivacySettings({
                        ...privacySettings,
                        profileVisibility: value,
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">Herkese Açık</SelectItem>
                      <SelectItem value="company">Sadece Şirket</SelectItem>
                      <SelectItem value="team">Sadece Ekip</SelectItem>
                      <SelectItem value="private">Özel</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-gray-500">
                    Profil bilgilerinizi kimler görebileceğini belirleyin
                  </p>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Aktivite Takibi</Label>
                    <p className="text-sm text-gray-500">
                      Sistem içindeki aktivitelerinizin kaydedilmesi
                    </p>
                  </div>
                  <Switch
                    checked={privacySettings.activityTracking}
                    onCheckedChange={(checked) =>
                      setPrivacySettings({
                        ...privacySettings,
                        activityTracking: checked,
                      })
                    }
                  />
                </div>
              </CardContent>
            </Card>

            {/* Veri Paylaşımı */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-blue-600">
                  <Database className="mr-2 h-5 w-5" />
                  Veri Paylaşımı ve Analitik
                </CardTitle>
                <CardDescription>
                  Verilerinizin nasıl kullanıldığını kontrol edin
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Üçüncü Taraf Veri Paylaşımı</Label>
                    <p className="text-sm text-gray-500">
                      Verilerinizin üçüncü taraf hizmetlerle paylaşılması
                    </p>
                  </div>
                  <Switch
                    checked={privacySettings.dataSharing}
                    onCheckedChange={(checked) =>
                      setPrivacySettings({
                        ...privacySettings,
                        dataSharing: checked,
                      })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Analitik Veriler</Label>
                    <p className="text-sm text-gray-500">
                      Ürün geliştirme için anonim kullanım verilerinin
                      toplanması
                    </p>
                  </div>
                  <Switch
                    checked={privacySettings.analyticsOptIn}
                    onCheckedChange={(checked) =>
                      setPrivacySettings({
                        ...privacySettings,
                        analyticsOptIn: checked,
                      })
                    }
                  />
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label htmlFor="cookiePreferences">Çerez Tercihleri</Label>
                  <Select
                    value={privacySettings.cookiePreferences}
                    onValueChange={(value) =>
                      setPrivacySettings({
                        ...privacySettings,
                        cookiePreferences: value,
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="essential">Sadece Gerekli</SelectItem>
                      <SelectItem value="functional">
                        Gerekli + İşlevsel
                      </SelectItem>
                      <SelectItem value="all">Tüm Çerezler</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-gray-500">
                    Web sitesinde hangi çerezlerin kullanılacağını belirleyin
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* KVKK Bilgilendirmesi */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-blue-600">
                  <Info className="mr-2 h-5 w-5" />
                  KVKK ve Veri Koruma
                </CardTitle>
                <CardDescription>
                  Kişisel verilerinizin korunması hakkında bilgiler
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-800">
                    Kişisel verileriniz 6698 sayılı Kişisel Verilerin Korunması
                    Kanunu kapsamında işlenmekte ve korunmaktadır. Detaylı bilgi
                    için{" "}
                    <a href="#" className="underline font-medium">
                      Gizlilik Politikamızı
                    </a>{" "}
                    inceleyebilirsiniz.
                  </p>
                </div>

                <div className="space-y-2">
                  <Button
                    variant="outline"
                    className="w-full justify-start bg-transparent"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Kişisel Verilerimi İndir
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start bg-transparent text-red border-red hover:bg-red hover:text-white"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Hesabımı ve Verilerimi Sil
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Save className="mr-2 h-4 w-4" />
                Gizlilik Ayarlarını Kaydet
              </Button>
            </div>
          </div>
        );

      case "data":
        return (
          <div className="space-y-6">
            {/* Veri Yedekleme */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-purple-600">
                  <Database className="mr-2 h-5 w-5" />
                  Veri Yedekleme
                </CardTitle>
                <CardDescription>
                  Verilerinizi yedekleyin ve geri yükleyin
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <h4 className="font-medium text-dark-gray mb-2">
                      Otomatik Yedekleme
                    </h4>
                    <p className="text-sm text-gray-500 mb-3">
                      Verileriniz her gün otomatik olarak yedeklenir
                    </p>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm text-green-600">Aktif</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-2">
                      Son yedekleme: 2 saat önce
                    </p>
                  </div>

                  <div className="p-4 border border-gray-200 rounded-lg">
                    <h4 className="font-medium text-dark-gray mb-2">
                      Manuel Yedekleme
                    </h4>
                    <p className="text-sm text-gray-500 mb-3">
                      İstediğiniz zaman manuel yedekleme yapın
                    </p>
                    <Button variant="outline" className="w-full bg-transparent">
                      <Download className="mr-2 h-4 w-4" />
                      Şimdi Yedekle
                    </Button>
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <h4 className="font-medium text-dark-gray">
                    Yedekleme Geçmişi
                  </h4>
                  <div className="space-y-2">
                    {[
                      {
                        date: "2024-01-20 14:30",
                        size: "2.4 MB",
                        type: "Otomatik",
                      },
                      {
                        date: "2024-01-19 14:30",
                        size: "2.3 MB",
                        type: "Otomatik",
                      },
                      {
                        date: "2024-01-18 09:15",
                        size: "2.1 MB",
                        type: "Manuel",
                      },
                    ].map((backup, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <div>
                          <p className="text-sm font-medium text-dark-gray">
                            {backup.date}
                          </p>
                          <p className="text-xs text-gray-500">
                            {backup.size} • {backup.type}
                          </p>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="bg-transparent"
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Veri Dışa Aktarma */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-purple-600">
                  <Upload className="mr-2 h-5 w-5" />
                  Veri Dışa Aktarma
                </CardTitle>
                <CardDescription>
                  Verilerinizi farklı formatlarda dışa aktarın
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button
                    variant="outline"
                    className="h-20 flex-col bg-transparent"
                  >
                    <FileText className="h-6 w-6 mb-2" />
                    <span className="text-sm">Excel (.xlsx)</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-20 flex-col bg-transparent"
                  >
                    <Database className="h-6 w-6 mb-2" />
                    <span className="text-sm">CSV (.csv)</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-20 flex-col bg-transparent"
                  >
                    <FileText className="h-6 w-6 mb-2" />
                    <span className="text-sm">PDF (.pdf)</span>
                  </Button>
                </div>

                <Separator />

                <div className="space-y-3">
                  <h4 className="font-medium text-dark-gray">
                    Dışa Aktarma Seçenekleri
                  </h4>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        className="rounded"
                        defaultChecked
                      />
                      <span className="text-sm">Müşteri Bilgileri</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        className="rounded"
                        defaultChecked
                      />
                      <span className="text-sm">İletişim Geçmişi</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm">Finansal Veriler</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm">Sistem Logları</span>
                    </label>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tehlikeli Alan */}
            <Card className="border-red-200">
              <CardHeader>
                <CardTitle className="flex items-center text-red">
                  <AlertTriangle className="mr-2 h-5 w-5" />
                  Tehlikeli Alan
                </CardTitle>
                <CardDescription>
                  Bu işlemler geri alınamaz. Dikkatli olun!
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="h-5 w-5 text-red mt-0.5" />
                    <div>
                      <h4 className="font-medium text-red mb-1">
                        Tüm Verileri Sil
                      </h4>
                      <p className="text-sm text-red-700 mb-3">
                        Bu işlem tüm verilerinizi kalıcı olarak siler ve geri
                        alınamaz.
                      </p>
                      <Button
                        variant="outline"
                        className="bg-transparent text-red border-red hover:bg-red hover:text-white"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Tüm Verileri Sil
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Button className="bg-purple-600 hover:bg-purple-700">
                <Save className="mr-2 h-4 w-4" />
                Veri Ayarlarını Kaydet
              </Button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-dark-gray">Sistem Ayarları</h2>
          <p className="text-gray-600 mt-2">
            Uygulama tercihlerinizi ve güvenlik ayarlarınızı yönetin
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar - Tabs */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-dark-gray">
                  Ayar Kategorileri
                </CardTitle>
                <CardDescription>
                  Yapılandırmak istediğiniz kategoriyi seçin
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-1">
                  {tabs.map((tab) => {
                    const IconComponent = tab.icon;
                    const isActive = activeTab === tab.id;

                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full text-left p-3 rounded-lg transition-colors ${
                          isActive
                            ? `${tab.bgColor} ${tab.color} border-l-4 border-current`
                            : "hover:bg-gray-50 text-gray-700"
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <IconComponent className="h-5 w-5" />
                          <div>
                            <div className="text-sm font-medium">
                              {tab.name}
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                              {tab.description}
                            </div>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Sistem Durumu */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-dark-gray">Sistem Durumu</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Sistem Sağlığı</span>
                  <Badge className="bg-primary-green text-white">
                    Mükemmel
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Son Güncelleme</span>
                  <span className="text-sm text-dark-gray">2 gün önce</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Veri Kullanımı</span>
                  <span className="text-sm text-dark-gray">2.4 GB</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Sürüm</span>
                  <span className="text-sm text-dark-gray">v2.1.0</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Content Area */}
          <div className="lg:col-span-3">{renderTabContent()}</div>
        </div>
      </div>
    </div>
  );
}
