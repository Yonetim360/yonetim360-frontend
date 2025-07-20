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
import { Badge } from "@/components/ui/badge";
import {
  BarChart3,
  CreditCard,
  Package,
  ShoppingCart,
  Factory,
  Calculator,
  Shield,
  Wrench,
  FileText,
  TrendingUp,
  ChevronDown,
  ChevronRight,
  Plus,
  AlertTriangle,
  Clock,
  DollarSign,
  Settings,
} from "lucide-react";

export default function Page() {
  const [activeModule, setActiveModule] = useState("overview");
  const [activeSubModule, setActiveSubModule] = useState("");
  const [expandedModules, setExpandedModules] = useState(["overview"]);

  const modules = [
    {
      id: "overview",
      name: "Genel Bakış",
      icon: BarChart3,
      color: "text-dark-gray",
      bgColor: "bg-dark-gray/10",
      subModules: [],
    },
    {
      id: "accounting",
      name: "Cari Hesaplar",
      icon: CreditCard,
      color: "text-orange",
      bgColor: "bg-orange/10",
      subModules: [
        { id: "bank-transactions", name: "Banka Hareketleri" },
        { id: "income-expense", name: "Gelir Gider Takibi" },
        { id: "cash-operations", name: "Kasa İşlemleri" },
        { id: "invoice-management", name: "Fatura Yönetimi" },
        { id: "tax-tracking", name: "KDV, Vergi, Döviz Takibi" },
        { id: "profit-loss", name: "Kar Zarar Grafik" },
      ],
    },
    {
      id: "inventory",
      name: "Stok ve Depo Yönetimi",
      icon: Package,
      color: "text-primary-green",
      bgColor: "bg-primary-green/10",
      subModules: [
        { id: "warehouse-operations", name: "Depo Giriş/Çıkış İşlemleri" },
        { id: "stock-levels", name: "Stok Seviyeleri ve Alarm Sistemleri" },
        { id: "inventory-control", name: "Sayım ve Envanter Kontrolü" },
      ],
    },
    {
      id: "purchasing",
      name: "Satın Alma Yönetimi",
      icon: ShoppingCart,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      subModules: [
        {
          id: "purchase-requests",
          name: "Satın Alma Talepleri ve Onay Süreci",
        },
        { id: "order-creation", name: "Sipariş Oluşturma" },
        { id: "price-comparison", name: "Tedarikçi Bazlı Fiyat Karşılaştırma" },
        { id: "supplier-reports", name: "Tedarikçi Performans Raporları" },
      ],
    },
    {
      id: "production",
      name: "Üretim Yönetimi",
      icon: Factory,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
      subModules: [
        { id: "bom", name: "Üretim reçeteleri (BOM)" },
        { id: "work-orders", name: "İş Emri Oluşturma ve Takibi" },
        { id: "material-consumption", name: "Hammadde Düşümü / Ürün Çıkışı" },
        { id: "production-planning", name: "Üretim Planlama" },
        { id: "production-costing", name: "Üretim Maliyet Hesaplama" },
      ],
    },
    {
      id: "mrp",
      name: "Malzeme İhtiyaç Planlama",
      icon: Calculator,
      color: "text-red",
      bgColor: "bg-red/10",
      subModules: [
        { id: "material-requirements", name: "Hammadde İhtiyacı Hesaplama" },
        {
          id: "auto-purchase-suggestions",
          name: "Otomatik Satın Alma Önerileri",
        },
      ],
    },
    {
      id: "quality",
      name: "Kalite Kontrol",
      icon: Shield,
      color: "text-green-600",
      bgColor: "bg-green-100",
      subModules: [
        {
          id: "quality-control",
          name: "Gelen Malzeme ve Üretim Sonrası Kalite Kontrol",
        },
        { id: "non-conformance", name: "Uygunsuzluk Takibi" },
      ],
    },
    {
      id: "maintenance",
      name: "Bakım ve Teknik Servis",
      icon: Wrench,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100",
      subModules: [
        { id: "equipment-tracking", name: "Ekipman Takibi" },
        { id: "maintenance-planning", name: "Periyodik Bakım Planlama" },
        { id: "maintenance-records", name: "Arıza/Bakım Kayıtları" },
      ],
    },
    {
      id: "e-document",
      name: "e-Belge Modülü",
      icon: FileText,
      color: "text-indigo-600",
      bgColor: "bg-indigo-100",
      subModules: [{ id: "e-invoice", name: "e-Fatura, e-İrsaliye, e-Arşiv" }],
    },
    {
      id: "reporting",
      name: "Raporlama",
      icon: TrendingUp,
      color: "text-pink-600",
      bgColor: "bg-pink-100",
      subModules: [
        { id: "stock-reports", name: "Anlık Stok Raporu" },
        { id: "financial-summary", name: "Finansal Durum Özeti" },
        { id: "order-analysis", name: "Sipariş Durumu, Tedarikçi Analizi" },
        { id: "cost-analysis", name: "Satın Alma Maliyet Analizleri" },
      ],
    },
  ];

  const toggleModule = (moduleId) => {
    if (expandedModules.includes(moduleId)) {
      setExpandedModules(expandedModules.filter((id) => id !== moduleId));
    } else {
      setExpandedModules([...expandedModules, moduleId]);
    }
  };

  const handleModuleClick = (moduleId, subModuleId = "") => {
    setActiveModule(moduleId);
    setActiveSubModule(subModuleId);

    // Ana modül tıklandığında genişlet
    if (!expandedModules.includes(moduleId)) {
      setExpandedModules([...expandedModules, moduleId]);
    }
  };

  const renderModuleContent = () => {
    switch (activeModule) {
      case "overview":
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-dark-gray">
                ERP Genel Bakış
              </h3>
              <p className="text-gray-600">
                Kurumsal kaynak planlama sisteminizdeki genel durum ve önemli
                metriklerin özeti
              </p>
            </div>

            {/* Ana İstatistikler */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="border-l-4 border-l-orange">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Toplam Ciro</p>
                      <p className="text-3xl font-bold text-dark-gray">₺3.8M</p>
                      <p className="text-xs text-orange">+18% bu ay</p>
                    </div>
                    <DollarSign className="h-10 w-10 text-orange" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-primary-green">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Stok Kalemleri</p>
                      <p className="text-3xl font-bold text-dark-gray">2,456</p>
                      <p className="text-xs text-primary-green">+5% bu ay</p>
                    </div>
                    <Package className="h-10 w-10 text-primary-green" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-blue-600">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">
                        Bekleyen Siparişler
                      </p>
                      <p className="text-3xl font-bold text-dark-gray">67</p>
                      <p className="text-xs text-blue-600">-3 bu hafta</p>
                    </div>
                    <ShoppingCart className="h-10 w-10 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-purple-600">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Üretim Emirleri</p>
                      <p className="text-3xl font-bold text-dark-gray">24</p>
                      <p className="text-xs text-purple-600">+2 bu hafta</p>
                    </div>
                    <Factory className="h-10 w-10 text-purple-600" />
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
                  <Button className="h-20 flex-col bg-orange hover:bg-orange/90">
                    <Plus className="h-6 w-6 mb-2" />
                    <span className="text-sm">Yeni Fatura</span>
                  </Button>
                  <Button className="h-20 flex-col bg-primary-green hover:bg-primary-green/90">
                    <Package className="h-6 w-6 mb-2" />
                    <span className="text-sm">Stok Girişi</span>
                  </Button>
                  <Button className="h-20 flex-col bg-blue-600 hover:bg-blue-700">
                    <ShoppingCart className="h-6 w-6 mb-2" />
                    <span className="text-sm">Satın Alma</span>
                  </Button>
                  <Button className="h-20 flex-col bg-purple-600 hover:bg-purple-700">
                    <Factory className="h-6 w-6 mb-2" />
                    <span className="text-sm">Üretim Emri</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Kritik Uyarılar ve Önemli Bilgiler */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Kritik Uyarılar */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-dark-gray flex items-center">
                    <AlertTriangle className="mr-2 h-5 w-5 text-red" />
                    Kritik Uyarılar
                  </CardTitle>
                  <CardDescription>
                    Acil müdahale gereken durumlar
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4 p-3 bg-red/10 rounded-lg border border-red/20">
                      <AlertTriangle className="h-5 w-5 text-red" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-dark-gray">
                          Kritik Stok Seviyesi
                        </p>
                        <p className="text-xs text-gray-500">
                          15 ürün minimum stok seviyesinin altında
                        </p>
                      </div>
                      <Badge className="bg-red text-white">Acil</Badge>
                    </div>
                    <div className="flex items-center space-x-4 p-3 bg-orange/10 rounded-lg border border-orange/20">
                      <Clock className="h-5 w-5 text-orange" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-dark-gray">
                          Geciken Siparişler
                        </p>
                        <p className="text-xs text-gray-500">
                          8 sipariş teslimat tarihini geçti
                        </p>
                      </div>
                      <Badge className="bg-orange text-white">Önemli</Badge>
                    </div>
                    <div className="flex items-center space-x-4 p-3 bg-yellow-100 rounded-lg border border-yellow-300">
                      <Wrench className="h-5 w-5 text-yellow-600" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-dark-gray">
                          Bakım Zamanı
                        </p>
                        <p className="text-xs text-gray-500">
                          3 ekipman periyodik bakım bekliyor
                        </p>
                      </div>
                      <Badge className="bg-yellow-600 text-white">Planlı</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

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
                          Stok girişi yapıldı: Hammadde A
                        </p>
                        <p className="text-xs text-gray-500">1 saat önce</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 p-3 bg-blue-100 rounded-lg">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-dark-gray">
                          Satın alma siparişi onaylandı
                        </p>
                        <p className="text-xs text-gray-500">3 saat önce</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 p-3 bg-purple-100 rounded-lg">
                      <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-dark-gray">
                          Üretim emri tamamlandı: Ürün X
                        </p>
                        <p className="text-xs text-gray-500">5 saat önce</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 p-3 bg-orange/10 rounded-lg">
                      <div className="w-2 h-2 bg-orange rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-dark-gray">
                          Fatura oluşturuldu: #FAT-2024-001
                        </p>
                        <p className="text-xs text-gray-500">1 gün önce</p>
                      </div>
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
                    <p className="text-2xl font-bold text-orange">₺3.8M</p>
                    <p className="text-sm text-gray-600">Toplam Ciro</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary-green">94%</p>
                    <p className="text-sm text-gray-600">Stok Devir Hızı</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">2.1 gün</p>
                    <p className="text-sm text-gray-600">Ortalama Teslimat</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-purple-600">98.5%</p>
                    <p className="text-sm text-gray-600">Üretim Verimliliği</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "accounting":
        return renderAccountingContent();
      case "inventory":
        return renderInventoryContent();
      case "purchasing":
        return renderPurchasingContent();
      case "production":
        return renderProductionContent();
      case "mrp":
        return renderMRPContent();
      case "quality":
        return renderQualityContent();
      case "maintenance":
        return renderMaintenanceContent();
      case "e-document":
        return renderEDocumentContent();
      case "reporting":
        return renderReportingContent();

      default:
        return (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Settings className="h-8 w-8 text-gray-400" />
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

  const renderAccountingContent = () => {
    if (!activeSubModule) {
      return (
        <div className="space-y-6">
          <div>
            <h3 className="text-2xl font-bold text-dark-gray">Cari Hesaplar</h3>
            <p className="text-gray-600">
              Finansal işlemlerinizi yönetin ve takip edin
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => setActiveSubModule("bank-transactions")}
            >
              <CardHeader>
                <CardTitle className="text-orange flex items-center">
                  <CreditCard className="mr-2 h-5 w-5" />
                  Banka Hareketleri
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Banka hesap hareketlerini takip edin
                </p>
              </CardContent>
            </Card>

            <Card
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => setActiveSubModule("income-expense")}
            >
              <CardHeader>
                <CardTitle className="text-orange flex items-center">
                  <TrendingUp className="mr-2 h-5 w-5" />
                  Gelir Gider Takibi
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Gelir ve giderlerinizi analiz edin
                </p>
              </CardContent>
            </Card>

            <Card
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => setActiveSubModule("invoice-management")}
            >
              <CardHeader>
                <CardTitle className="text-orange flex items-center">
                  <FileText className="mr-2 h-5 w-5" />
                  Fatura Yönetimi
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Faturalarınızı oluşturun ve yönetin
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      );
    }

    switch (activeSubModule) {
      case "bank-transactions":
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-bold text-dark-gray">
                  Banka Hareketleri
                </h3>
                <p className="text-gray-600">
                  Banka hesap hareketlerinizi görüntüleyin ve yönetin
                </p>
              </div>
              <Button className="bg-orange hover:bg-orange/90">
                <Plus className="mr-2 h-4 w-4" />
                Yeni Hareket
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Toplam Bakiye</p>
                    <p className="text-2xl font-bold text-primary-green">
                      ₺485,250
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Bu Ay Gelen</p>
                    <p className="text-2xl font-bold text-blue-600">₺125,000</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Bu Ay Giden</p>
                    <p className="text-2xl font-bold text-red">₺89,500</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Bekleyen</p>
                    <p className="text-2xl font-bold text-orange">₺15,750</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Son Hareketler</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      id: 1,
                      date: "2024-01-15",
                      description: "ABC Teknoloji - Ödeme",
                      amount: "+₺125,000",
                      type: "gelen",
                    },
                    {
                      id: 2,
                      date: "2024-01-14",
                      description: "Tedarikçi X - Ödeme",
                      amount: "-₺45,000",
                      type: "giden",
                    },
                    {
                      id: 3,
                      date: "2024-01-13",
                      description: "Maaş Ödemeleri",
                      amount: "-₺85,000",
                      type: "giden",
                    },
                    {
                      id: 4,
                      date: "2024-01-12",
                      description: "XYZ İnşaat - Ödeme",
                      amount: "+₺75,000",
                      type: "gelen",
                    },
                  ].map((transaction) => (
                    <div
                      key={transaction.id}
                      className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                    >
                      <div className="flex items-center space-x-4">
                        <div
                          className={`w-3 h-3 rounded-full ${
                            transaction.type === "gelen"
                              ? "bg-primary-green"
                              : "bg-red"
                          }`}
                        ></div>
                        <div>
                          <p className="font-medium text-dark-gray">
                            {transaction.description}
                          </p>
                          <p className="text-sm text-gray-500">
                            {transaction.date}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p
                          className={`font-bold ${
                            transaction.type === "gelen"
                              ? "text-primary-green"
                              : "text-red"
                          }`}
                        >
                          {transaction.amount}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Settings className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-dark-gray mb-2">
                Alt Modül Geliştiriliyor
              </h3>
              <p className="text-gray-600">
                Bu alt modül yakında kullanıma sunulacak.
              </p>
            </div>
          </div>
        );
    }
  };

  const renderInventoryContent = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-dark-gray">
          Stok ve Depo Yönetimi
        </h3>
        <p className="text-gray-600">
          Stok seviyelerinizi takip edin ve depo işlemlerinizi yönetin
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-gray-600">Toplam Stok Değeri</p>
              <p className="text-2xl font-bold text-primary-green">₺2.4M</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-gray-600">Kritik Seviye</p>
              <p className="text-2xl font-bold text-red">15</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-gray-600">Stok Kalemleri</p>
              <p className="text-2xl font-bold text-dark-gray">2,456</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-gray-600">Depo Sayısı</p>
              <p className="text-2xl font-bold text-blue-600">8</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderPurchasingContent = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-dark-gray">
          Satın Alma Yönetimi
        </h3>
        <p className="text-gray-600">
          Satın alma süreçlerinizi yönetin ve tedarikçilerinizi takip edin
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-gray-600">Bekleyen Talepler</p>
              <p className="text-2xl font-bold text-orange">12</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-gray-600">Aktif Siparişler</p>
              <p className="text-2xl font-bold text-blue-600">67</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-gray-600">Tedarikçi Sayısı</p>
              <p className="text-2xl font-bold text-primary-green">45</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-gray-600">Bu Ay Harcama</p>
              <p className="text-2xl font-bold text-red">₺485K</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderProductionContent = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-dark-gray">Üretim Yönetimi</h3>
        <p className="text-gray-600">
          Üretim süreçlerinizi planlayın ve takip edin
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-gray-600">Aktif İş Emirleri</p>
              <p className="text-2xl font-bold text-purple-600">24</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-gray-600">Tamamlanan</p>
              <p className="text-2xl font-bold text-primary-green">156</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-gray-600">Üretim Verimliliği</p>
              <p className="text-2xl font-bold text-blue-600">98.5%</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-gray-600">Üretim Maliyeti</p>
              <p className="text-2xl font-bold text-orange">₺1.2M</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderMRPContent = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-dark-gray">
          Malzeme İhtiyaç Planlama
        </h3>
        <p className="text-gray-600">
          Malzeme ihtiyaçlarınızı planlayın ve optimize edin
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-gray-600">İhtiyaç Analizi</p>
              <p className="text-2xl font-bold text-red">45</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-gray-600">Otomatik Öneriler</p>
              <p className="text-2xl font-bold text-blue-600">12</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-gray-600">Tasarruf Oranı</p>
              <p className="text-2xl font-bold text-primary-green">15%</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderQualityContent = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-dark-gray">Kalite Kontrol</h3>
        <p className="text-gray-600">Kalite kontrol süreçlerinizi yönetin</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-gray-600">Kontrol Edilen</p>
              <p className="text-2xl font-bold text-green-600">1,245</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-gray-600">Uygunsuz</p>
              <p className="text-2xl font-bold text-red">23</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-gray-600">Kalite Oranı</p>
              <p className="text-2xl font-bold text-primary-green">98.2%</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-gray-600">Açık Uygunsuzluk</p>
              <p className="text-2xl font-bold text-orange">5</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderMaintenanceContent = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-dark-gray">
          Bakım ve Teknik Servis
        </h3>
        <p className="text-gray-600">
          Ekipman bakımlarınızı planlayın ve takip edin
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-gray-600">Toplam Ekipman</p>
              <p className="text-2xl font-bold text-dark-gray">156</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-gray-600">Bakım Bekleyen</p>
              <p className="text-2xl font-bold text-yellow-600">8</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-gray-600">Arızalı</p>
              <p className="text-2xl font-bold text-red">2</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-gray-600">Çalışır Durumda</p>
              <p className="text-2xl font-bold text-primary-green">146</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderEDocumentContent = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-dark-gray">e-Belge Modülü</h3>
        <p className="text-gray-600">Elektronik belgelerinizi yönetin</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-gray-600">e-Fatura</p>
              <p className="text-2xl font-bold text-indigo-600">1,245</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-gray-600">e-İrsaliye</p>
              <p className="text-2xl font-bold text-blue-600">856</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-gray-600">e-Arşiv</p>
              <p className="text-2xl font-bold text-purple-600">2,145</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderReportingContent = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-dark-gray">Raporlama</h3>
        <p className="text-gray-600">Detaylı raporlar ve analizler</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="text-pink-600 flex items-center">
              <TrendingUp className="mr-2 h-5 w-5" />
              Anlık Stok Raporu
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">Güncel stok durumu ve hareketleri</p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="text-pink-600 flex items-center">
              <BarChart3 className="mr-2 h-5 w-5" />
              Finansal Durum Özeti
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">Gelir, gider ve karlılık analizi</p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="text-pink-600 flex items-center">
              <ShoppingCart className="mr-2 h-5 w-5" />
              Sipariş Durumu Analizi
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">Sipariş ve tedarikçi performansı</p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="text-pink-600 flex items-center">
              <DollarSign className="mr-2 h-5 w-5" />
              Maliyet Analizleri
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">Satın alma ve üretim maliyetleri</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-dark-gray">
            Kurumsal Kaynak Planlaması
          </h2>
          <p className="text-gray-600 mt-2">
            İşletmenizin tüm kaynaklarını entegre bir şekilde yönetin
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar - Modules */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-dark-gray">ERP Modülleri</CardTitle>
                <CardDescription>
                  Yönetmek istediğiniz modülü seçin
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-1">
                  {modules.map((module) => {
                    const IconComponent = module.icon;
                    const isExpanded = expandedModules.includes(module.id);
                    const isActive = activeModule === module.id;

                    return (
                      <div key={module.id}>
                        {/* Ana Modül */}
                        <div
                          onClick={() => handleModuleClick(module.id)}
                          className={`w-full text-left p-3 rounded-lg transition-colors flex items-center justify-between ${
                            isActive && !activeSubModule
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
                          {module.subModules.length > 0 && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleModule(module.id);
                              }}
                              className="p-1 hover:bg-gray-200 rounded"
                            >
                              {isExpanded ? (
                                <ChevronDown className="h-4 w-4" />
                              ) : (
                                <ChevronRight className="h-4 w-4" />
                              )}
                            </button>
                          )}
                        </div>

                        {/* Alt Modüller */}
                        {isExpanded && module.subModules.length > 0 && (
                          <div className="ml-6 mt-1 space-y-1">
                            {module.subModules.map((subModule) => (
                              <button
                                key={subModule.id}
                                onClick={() =>
                                  handleModuleClick(module.id, subModule.id)
                                }
                                className={`w-full text-left p-2 rounded-md transition-colors text-sm ${
                                  activeModule === module.id &&
                                  activeSubModule === subModule.id
                                    ? `${module.bgColor} ${module.color} font-medium`
                                    : "hover:bg-gray-50 text-gray-600"
                                }`}
                              >
                                • {subModule.name}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
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
    </div>
  );
}
