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
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Users,
  Phone,
  Mail,
  Plus,
  Search,
  Filter,
  FileText,
  Headphones,
  MessageCircle,
  CalendarDays,
  Megaphone,
  HelpCircle,
  Eye,
  Edit,
  Clock,
  AlertCircle,
  BarChart3,
} from "lucide-react";
import MyCalendar from "@/components/MyCalendar";

export default function Page() {
  const [activeModule, setActiveModule] = useState("overview");
  const [isCustomerModalOpen, setIsCustomerModalOpen] = useState(false);
  const [isCommunicationModalOpen, setIsCommunicationModalOpen] =
    useState(false);
  const [isOfferModalOpen, setIsOfferModalOpen] = useState(false);
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);

  // Form states
  const [customerForm, setCustomerForm] = useState({
    name: "",
    contact: "",
    email: "",
    phone: "",
    segment: "",
    status: "",
    address: "",
    notes: "",
  });

  const [communicationForm, setCommunicationForm] = useState({
    customer: "",
    type: "",
    subject: "",
    notes: "",
    date: "",
    time: "",
    duration: "",
  });

  const [offerForm, setOfferForm] = useState({
    customer: "",
    products: "",
    amount: "",
    validUntil: "",
    notes: "",
  });

  const [supportForm, setSupportForm] = useState({
    customer: "",
    subject: "",
    description: "",
    priority: "",
    assignedTo: "",
  });

  const modules = [
    {
      id: "overview",
      name: "Genel Bakış",
      icon: BarChart3,
      color: "text-dark-gray",
      bgColor: "bg-dark-gray/10",
    },
    {
      id: "customer-info",
      name: "Müşteri Bilgileri Takibi",
      icon: Users,
      color: "text-primary-green",
      bgColor: "bg-primary-green/10",
    },
    {
      id: "communication",
      name: "İletişim ve Görüşme Takibi",
      icon: Phone,
      color: "text-orange",
      bgColor: "bg-orange/10",
    },
    {
      id: "sales-offers",
      name: "Teklif ve Satış Takibi",
      icon: FileText,
      color: "text-red",
      bgColor: "bg-red/10",
    },
    {
      id: "support",
      name: "Müşteri Destek Talep Takip",
      icon: Headphones,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      id: "whatsapp",
      name: "WhatsApp Hatırlatma",
      icon: MessageCircle,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      id: "calendar",
      name: "Takvim / Görev",
      icon: CalendarDays,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      id: "announcements",
      name: "Duyuru / Talep",
      icon: Megaphone,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100",
    },
    {
      id: "solution-center",
      name: "Çözüm Merkezi",
      icon: HelpCircle,
      color: "text-indigo-600",
      bgColor: "bg-indigo-100",
    },
  ];

  const customers = [
    {
      id: 1,
      name: "ABC Teknoloji A.Ş.",
      contact: "Ahmet Yılmaz",
      email: "ahmet@abcteknoloji.com",
      phone: "+90 212 555 0123",
      status: "Aktif",
      lastContact: "2024-01-15",
      value: "₺125,000",
      segment: "Kurumsal",
    },
    {
      id: 2,
      name: "XYZ İnşaat Ltd.",
      contact: "Fatma Demir",
      email: "fatma@xyzinsaat.com",
      phone: "+90 216 555 0456",
      status: "Potansiyel",
      lastContact: "2024-01-12",
      value: "₺85,000",
      segment: "KOBİ",
    },
    {
      id: 3,
      name: "DEF Danışmanlık",
      contact: "Mehmet Kaya",
      email: "mehmet@defdanismanlik.com",
      phone: "+90 312 555 0789",
      status: "Aktif",
      lastContact: "2024-01-10",
      value: "₺200,000",
      segment: "Kurumsal",
    },
  ];

  const communications = [
    {
      id: 1,
      customer: "ABC Teknoloji A.Ş.",
      type: "Telefon",
      date: "2024-01-15",
      time: "14:30",
      duration: "25 dk",
      subject: "Proje görüşmesi",
      notes: "Yeni proje için detaylar konuşuldu. Teklif hazırlanacak.",
      status: "Tamamlandı",
    },
    {
      id: 2,
      customer: "XYZ İnşaat Ltd.",
      type: "E-posta",
      date: "2024-01-14",
      time: "10:15",
      subject: "Teklif sunumu",
      notes: "Hazırlanan teklif e-posta ile gönderildi.",
      status: "Beklemede",
    },
  ];

  const offers = [
    {
      id: 1,
      customer: "ABC Teknoloji A.Ş.",
      offerNo: "TKL-2024-001",
      date: "2024-01-10",
      amount: "₺125,000",
      status: "Onaylandı",
      validUntil: "2024-02-10",
      products: "Web Sitesi + Mobil Uygulama",
    },
    {
      id: 2,
      customer: "XYZ İnşaat Ltd.",
      offerNo: "TKL-2024-002",
      date: "2024-01-12",
      amount: "₺85,000",
      status: "Beklemede",
      validUntil: "2024-02-12",
      products: "ERP Sistemi",
    },
  ];

  const supportTickets = [
    {
      id: 1,
      customer: "ABC Teknoloji A.Ş.",
      ticketNo: "DES-2024-001",
      subject: "Sistem yavaşlığı",
      priority: "Yüksek",
      status: "Açık",
      createdDate: "2024-01-15",
      assignedTo: "Teknik Ekip",
    },
    {
      id: 2,
      customer: "DEF Danışmanlık",
      ticketNo: "DES-2024-002",
      subject: "Rapor hatası",
      priority: "Orta",
      status: "Çözüldü",
      createdDate: "2024-01-14",
      assignedTo: "Geliştirme Ekibi",
    },
  ];

  // Form handlers
  const handleCustomerSubmit = (e) => {
    e.preventDefault();
    console.log("Yeni müşteri:", customerForm);
    // API call would go here
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

  const handleSupportSubmit = (e) => {
    e.preventDefault();
    console.log("Yeni destek talebi:", supportForm);
    setIsSupportModalOpen(false);
    setSupportForm({
      customer: "",
      subject: "",
      description: "",
      priority: "",
      assignedTo: "",
    });
  };

  const renderModuleContent = () => {
    switch (activeModule) {
      case "overview":
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-dark-gray">Genel Bakış</h3>
              <p className="text-gray-600">
                CRM sisteminizdeki genel durum ve önemli metriklerin özeti
              </p>
            </div>

            {/* Ana İstatistikler */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="border-l-4 border-l-primary-green">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Toplam Müşteri</p>
                      <p className="text-3xl font-bold text-dark-gray">1,234</p>
                      <p className="text-xs text-primary-green">+12% bu ay</p>
                    </div>
                    <Users className="h-10 w-10 text-primary-green" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-orange">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Aktif Teklifler</p>
                      <p className="text-3xl font-bold text-dark-gray">89</p>
                      <p className="text-xs text-orange">+5% bu ay</p>
                    </div>
                    <FileText className="h-10 w-10 text-orange" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-red">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Aylık Satış</p>
                      <p className="text-3xl font-bold text-dark-gray">₺2.4M</p>
                      <p className="text-xs text-red">+18% bu ay</p>
                    </div>
                    <BarChart3 className="h-10 w-10 text-red" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-blue-600">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Açık Destek</p>
                      <p className="text-3xl font-bold text-dark-gray">7</p>
                      <p className="text-xs text-blue-600">-2 bu hafta</p>
                    </div>
                    <Headphones className="h-10 w-10 text-blue-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Hızlı Aksiyonlar */}
            <Card>
              <CardHeader>
                <CardTitle className="text-dark-gray">
                  Hızlı Aksiyonlar
                </CardTitle>
                <CardDescription>Sık kullanılan işlemler</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button
                    className="h-20 flex-col bg-primary-green hover:bg-primary-green/90"
                    onClick={() => setIsCustomerModalOpen(true)}
                  >
                    <Users className="h-6 w-6 mb-2" />
                    <span className="text-sm">Yeni Müşteri</span>
                  </Button>
                  <Button
                    className="h-20 flex-col bg-orange hover:bg-orange/90"
                    onClick={() => setIsCommunicationModalOpen(true)}
                  >
                    <Phone className="h-6 w-6 mb-2" />
                    <span className="text-sm">İletişim Ekle</span>
                  </Button>
                  <Button
                    className="h-20 flex-col bg-red hover:bg-red/90"
                    onClick={() => setIsOfferModalOpen(true)}
                  >
                    <FileText className="h-6 w-6 mb-2" />
                    <span className="text-sm">Yeni Teklif</span>
                  </Button>
                  <Button
                    className="h-20 flex-col bg-blue-600 hover:bg-blue-700"
                    onClick={() => setIsSupportModalOpen(true)}
                  >
                    <Headphones className="h-6 w-6 mb-2" />
                    <span className="text-sm">Destek Talebi</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Son Aktiviteler ve Önemli Bilgiler */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Son Aktiviteler */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-dark-gray">
                    Son Aktiviteler
                  </CardTitle>
                  <CardDescription>Sistemdeki son hareketler</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4 p-3 bg-primary-green/10 rounded-lg">
                      <div className="w-2 h-2 bg-primary-green rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-dark-gray">
                          Yeni müşteri eklendi: ABC Teknoloji
                        </p>
                        <p className="text-xs text-gray-500">2 saat önce</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 p-3 bg-orange/10 rounded-lg">
                      <div className="w-2 h-2 bg-orange rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-dark-gray">
                          Teklif onaylandı: XYZ İnşaat
                        </p>
                        <p className="text-xs text-gray-500">4 saat önce</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 p-3 bg-red/10 rounded-lg">
                      <div className="w-2 h-2 bg-red rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-dark-gray">
                          Destek talebi çözüldü: DEF Danışmanlık
                        </p>
                        <p className="text-xs text-gray-500">6 saat önce</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 p-3 bg-blue-100 rounded-lg">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-dark-gray">
                          Yeni görüşme kaydedildi
                        </p>
                        <p className="text-xs text-gray-500">1 gün önce</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Yaklaşan Görevler */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-dark-gray">
                    Yaklaşan Görevler
                  </CardTitle>
                  <CardDescription>
                    Bu hafta yapılması gerekenler
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 p-3 border border-red/30 rounded-lg bg-red/5">
                      <AlertCircle className="h-5 w-5 text-red" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-dark-gray">
                          ABC Teknoloji ile toplantı
                        </p>
                        <p className="text-xs text-gray-500">Bugün 14:00</p>
                      </div>
                      <Badge className="bg-red text-white">Acil</Badge>
                    </div>
                    <div className="flex items-center space-x-3 p-3 border border-orange/30 rounded-lg bg-orange/5">
                      <Clock className="h-5 w-5 text-orange" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-dark-gray">
                          XYZ İnşaat teklif takibi
                        </p>
                        <p className="text-xs text-gray-500">Yarın 10:00</p>
                      </div>
                      <Badge className="bg-orange text-white">Önemli</Badge>
                    </div>
                    <div className="flex items-center space-x-3 p-3 border border-primary-green/30 rounded-lg bg-primary-green/5">
                      <Phone className="h-5 w-5 text-primary-green" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-dark-gray">
                          Müşteri memnuniyet araması
                        </p>
                        <p className="text-xs text-gray-500">Cuma 15:30</p>
                      </div>
                      <Badge className="bg-primary-green text-white">
                        Normal
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Performans Özeti */}
            <Card>
              <CardHeader>
                <CardTitle className="text-dark-gray">
                  Bu Ay Performans Özeti
                </CardTitle>
                <CardDescription>Ocak 2024 dönem raporu</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary-green">87%</p>
                    <p className="text-sm text-gray-600">Müşteri Memnuniyeti</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-orange">24%</p>
                    <p className="text-sm text-gray-600">
                      Teklif Dönüşüm Oranı
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-red">2.3 gün</p>
                    <p className="text-sm text-gray-600">
                      Ortalama Yanıt Süresi
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">156</p>
                    <p className="text-sm text-gray-600">Toplam İletişim</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "customer-info":
        return (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
              <div>
                <h3 className="text-2xl font-bold text-dark-gray">
                  Müşteri Bilgileri
                </h3>
                <p className="text-gray-600">
                  Müşteri bilgilerini görüntüleyin ve yönetin
                </p>
              </div>
              <Button
                className="bg-primary-green hover:bg-primary-green/90 w-full sm:w-auto"
                onClick={() => setIsCustomerModalOpen(true)}
              >
                <Plus className="mr-2 h-4 w-4" />
                Yeni Müşteri
              </Button>
            </div>

            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input placeholder="Müşteri ara..." className="pl-10" />
                  </div>
                  <Button
                    variant="outline"
                    className="w-full sm:w-auto bg-transparent"
                  >
                    <Filter className="mr-2 h-4 w-4" />
                    Filtrele
                  </Button>
                </div>

                <div className="space-y-4">
                  {customers.map((customer) => (
                    <div
                      key={customer.id}
                      className="flex flex-col lg:flex-row lg:items-center lg:justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors gap-4"
                    >
                      {/* Sol taraf - Müşteri bilgileri */}
                      <div className="flex items-start sm:items-center space-x-4 flex-1">
                        <div className="w-12 h-12 bg-primary-green/10 rounded-full flex items-center justify-center flex-shrink-0">
                          <Users className="h-6 w-6 text-primary-green" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-dark-gray text-sm sm:text-base truncate">
                            {customer.name}
                          </h4>
                          <p className="text-sm text-gray-600 truncate">
                            {customer.contact}
                          </p>
                          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mt-2 gap-1 sm:gap-0">
                            <div className="flex items-center text-xs text-gray-500 truncate">
                              <Mail className="h-3 w-3 mr-1 flex-shrink-0" />
                              <span className="truncate">{customer.email}</span>
                            </div>
                            <div className="flex items-center text-xs text-gray-500">
                              <Phone className="h-3 w-3 mr-1 flex-shrink-0" />
                              <span>{customer.phone}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Sağ taraf - Değer, durum ve aksiyonlar */}
                      <div className="flex flex-col sm:flex-row sm:items-center gap-3 lg:gap-4">
                        {/* Değer ve segment bilgisi */}
                        <div className="flex justify-between sm:block sm:text-right">
                          <div>
                            <div className="font-semibold text-dark-gray text-sm sm:text-base">
                              {customer.value}
                            </div>
                            <div className="text-xs text-gray-500">
                              {customer.segment}
                            </div>
                          </div>
                        </div>

                        {/* Durum badge'i */}
                        <div className="flex justify-start sm:justify-center">
                          <Badge
                            variant={
                              customer.status === "Aktif"
                                ? "default"
                                : "secondary"
                            }
                            className={`text-xs ${
                              customer.status === "Aktif"
                                ? "bg-primary-green hover:bg-primary-green/90"
                                : "bg-orange hover:bg-orange/90"
                            }`}
                          >
                            {customer.status}
                          </Badge>
                        </div>

                        {/* Aksiyon butonları */}
                        <div className="flex space-x-2 justify-end sm:justify-start">
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 w-8 p-0 bg-transparent"
                          >
                            <Eye className="h-4 w-4" />
                            <span className="sr-only">Görüntüle</span>
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 w-8 p-0 bg-transparent"
                          >
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Düzenle</span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Mobil için sayfalama */}
                <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4">
                  <p className="text-sm text-gray-600 text-center sm:text-left">
                    Toplam {customers.length} müşteri gösteriliyor
                  </p>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" disabled>
                      Önceki
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-primary-green text-white"
                    >
                      1
                    </Button>
                    <Button variant="outline" size="sm">
                      2
                    </Button>
                    <Button variant="outline" size="sm">
                      Sonraki
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "communication":
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-bold text-dark-gray">
                  İletişim ve Görüşme Takibi
                </h3>
                <p className="text-gray-600">
                  Müşteri iletişimlerini kaydedin ve takip edin
                </p>
              </div>
              <Button
                className="bg-orange hover:bg-orange/90"
                onClick={() => setIsCommunicationModalOpen(true)}
              >
                <Plus className="mr-2 h-4 w-4" />
                Yeni İletişim
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Bu Hafta</p>
                      <p className="text-2xl font-bold text-dark-gray">24</p>
                    </div>
                    <Phone className="h-8 w-8 text-orange" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Toplam Süre</p>
                      <p className="text-2xl font-bold text-dark-gray">
                        12.5 saat
                      </p>
                    </div>
                    <Clock className="h-8 w-8 text-primary-green" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Bekleyen</p>
                      <p className="text-2xl font-bold text-dark-gray">3</p>
                    </div>
                    <AlertCircle className="h-8 w-8 text-red" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Son İletişimler</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {communications.map((comm) => (
                    <div
                      key={comm.id}
                      className="p-4 border border-gray-200 rounded-lg"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-semibold text-dark-gray">
                            {comm.customer}
                          </h4>
                          <p className="text-sm text-gray-600">
                            {comm.subject}
                          </p>
                        </div>
                        <Badge
                          variant={
                            comm.status === "Tamamlandı"
                              ? "default"
                              : "secondary"
                          }
                        >
                          {comm.status}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-500 mb-2">
                        <span>{comm.type}</span>
                        <span>
                          {comm.date} - {comm.time}
                        </span>
                        {comm.duration && <span>{comm.duration}</span>}
                      </div>
                      <p className="text-sm text-gray-700">{comm.notes}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "sales-offers":
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-bold text-dark-gray">
                  Teklif ve Satış Takibi
                </h3>
                <p className="text-gray-600">
                  Tekliflerinizi yönetin ve satış sürecinizi takip edin
                </p>
              </div>
              <Button
                className="bg-red hover:bg-red/90"
                onClick={() => setIsOfferModalOpen(true)}
              >
                <Plus className="mr-2 h-4 w-4" />
                Yeni Teklif
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Toplam Teklif</p>
                    <p className="text-2xl font-bold text-dark-gray">15</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Onaylanan</p>
                    <p className="text-2xl font-bold text-primary-green">8</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Bekleyen</p>
                    <p className="text-2xl font-bold text-orange">5</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Reddedilen</p>
                    <p className="text-2xl font-bold text-red">2</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Teklifler</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {offers.map((offer) => (
                    <div
                      key={offer.id}
                      className="p-4 border border-gray-200 rounded-lg"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-semibold text-dark-gray">
                            {offer.customer}
                          </h4>
                          <p className="text-sm text-gray-600">
                            Teklif No: {offer.offerNo}
                          </p>
                          <p className="text-sm text-gray-600">
                            {offer.products}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-dark-gray">
                            {offer.amount}
                          </p>
                          <Badge
                            variant={
                              offer.status === "Onaylandı"
                                ? "default"
                                : "secondary"
                            }
                            className={
                              offer.status === "Onaylandı"
                                ? "bg-primary-green"
                                : "bg-orange"
                            }
                          >
                            {offer.status}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>Tarih: {offer.date}</span>
                        <span>Geçerlilik: {offer.validUntil}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "support":
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-bold text-dark-gray">
                  Müşteri Destek Talep Takip
                </h3>
                <p className="text-gray-600">
                  Destek taleplerini yönetin ve çözüm süreçlerini takip edin
                </p>
              </div>
              <Button
                className="bg-blue-600 hover:bg-blue-700"
                onClick={() => setIsSupportModalOpen(true)}
              >
                <Plus className="mr-2 h-4 w-4" />
                Yeni Talep
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Açık Talepler</p>
                    <p className="text-2xl font-bold text-red">3</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Çözülen</p>
                    <p className="text-2xl font-bold text-primary-green">12</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Ortalama Süre</p>
                    <p className="text-2xl font-bold text-dark-gray">2.5 gün</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Memnuniyet</p>
                    <p className="text-2xl font-bold text-orange">4.8/5</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Destek Talepleri</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {supportTickets.map((ticket) => (
                    <div
                      key={ticket.id}
                      className="p-4 border border-gray-200 rounded-lg"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-semibold text-dark-gray">
                            {ticket.customer}
                          </h4>
                          <p className="text-sm text-gray-600">
                            #{ticket.ticketNo} - {ticket.subject}
                          </p>
                          <p className="text-sm text-gray-500">
                            Atanan: {ticket.assignedTo}
                          </p>
                        </div>
                        <div className="text-right space-y-2">
                          <Badge
                            variant={
                              ticket.priority === "Yüksek"
                                ? "destructive"
                                : "secondary"
                            }
                            className={
                              ticket.priority === "Yüksek"
                                ? "bg-red"
                                : "bg-orange"
                            }
                          >
                            {ticket.priority}
                          </Badge>
                          <Badge
                            variant={
                              ticket.status === "Çözüldü"
                                ? "default"
                                : "secondary"
                            }
                            className={
                              ticket.status === "Çözüldü"
                                ? "bg-primary-green"
                                : "bg-gray-500"
                            }
                          >
                            {ticket.status}
                          </Badge>
                        </div>
                      </div>
                      <p className="text-sm text-gray-500">
                        Oluşturulma: {ticket.createdDate}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "calendar":
        return <MyCalendar />;
      default:
        return (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <HelpCircle className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-dark-gray mb-2">
                Modül Geliştiriliyor
              </h3>
              <p className="text-gray-600">
                Bu modül yakında kullanıma sunulacak.
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-dark-gray">
            Müşteri İlişkileri Yönetimi
          </h2>
          <p className="text-gray-600 mt-2">
            Müşteri süreçlerinizi yönetin ve ilişkilerinizi güçlendirin
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar - Modules */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-dark-gray">CRM Modülleri</CardTitle>
                <CardDescription>
                  Yönetmek istediğiniz modülü seçin
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-1">
                  {modules.map((module) => {
                    const IconComponent = module.icon;
                    return (
                      <button
                        key={module.id}
                        onClick={() => setActiveModule(module.id)}
                        className={`w-full text-left p-3 rounded-lg transition-colors ${
                          activeModule === module.id
                            ? `${module.bgColor} ${module.color} border-l-4 border-current`
                            : "hover:bg-gray-50 text-gray-700"
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <IconComponent className="h-5 w-5" />
                          <span className="text-sm font-medium">
                            {module.name}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Content Area */}
          <div className="lg:col-span-3">{renderModuleContent()}</div>
        </div>
      </div>

      {/* Modals */}
      {/* Müşteri Ekleme Modal */}
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
          <form onSubmit={handleCustomerSubmit} className="space-y-4">
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

      {/* İletişim Ekleme Modal */}
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

      {/* Teklif Ekleme Modal */}
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

      {/* Destek Talebi Ekleme Modal */}
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
          <form onSubmit={handleSupportSubmit} className="space-y-4">
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
              >
                İptal
              </Button>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                Talep Oluştur
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
