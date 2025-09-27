"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BarChart3,
  CreditCard,
  Package,
  ShoppingCart,
  Factory,
  Shield,
  FileText,
  ChevronDown,
  ChevronRight,
  Wallet,
  FileBarChart,
} from "lucide-react";
import ERPOverview from "@/components/ERP/modules/Overview/Overview";
import DefaultCase from "@/components/CRM/modules/DefaultCase";

export default function Page() {
  const [activeModule, setActiveModule] = useState("overview");
  const [activeSubModule, setActiveSubModule] = useState("");
  const [expandedModules, setExpandedModules] = useState(["overview"]);

  const modules = [
    {
      id: "overview",
      name: "Genel Bakış",
      icon: BarChart3,
      color: "text-gray-700",
      bgColor: "bg-gray-100",
      subModules: [],
    },
    {
      id: "financial-accounts",
      name: "Cari Hesaplar & Finans",
      icon: Wallet,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
      subModules: [
        { id: "credit-cards", name: "Cari Hesap Kartları" },
        { id: "bank-accounts", name: "Banka Hesapları" },
        { id: "income-expense", name: "Gelir/Gider Takibi" },
        { id: "cash-flow", name: "Nakit Akış Takibi" },
        { id: "loans", name: "Borç/Alacak Takibi" },
      ],
    },
    {
      id: "e-invoice",
      name: "e-Fatura Yönetimi",
      icon: FileText,
      color: "text-green-600",
      bgColor: "bg-green-100",
      subModules: [
        { id: "invoice-creation", name: "Fatura Oluşturma" },
        { id: "e-invoice-approval", name: "Gelen e-Faturalar" },
        { id: "e-invoice-rejection", name: "Giden e-Faturalar" },
        { id: "e-invoice-archive", name: "e-Arşiv Faturaları" },
        { id: "invoice-pause", name: "Fatura Durumu Takibi" },
        { id: "invoice-settings", name: "e-Fatura Ayarları" },
      ],
    },
    {
      id: "stock-management",
      name: "Stok ve Depo Yönetimi",
      icon: Package,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      subModules: [
        { id: "product-cards", name: "Ürün Kartları" },
        { id: "stock-operations", name: "Stok Hareketleri" },
        { id: "warehouse-management", name: "Depo Yönetimi" },
        { id: "stock-count", name: "Stok Sayımı" },
        { id: "minimum-stock-levels", name: "Minimum Stok Uyarıları" },
      ],
    },
    {
      id: "purchase-management",
      name: "Satın Alma Yönetimi",
      icon: ShoppingCart,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
      subModules: [
        { id: "purchase-orders", name: "Satın Alma Talepleri" },
        { id: "purchase-requests", name: "Onay Süreci" },
        { id: "purchase-offers", name: "Satın Alma Siparişleri" },
        { id: "supplier-evaluation", name: "Tedarikçi Değerlendirme" },
      ],
    },
    {
      id: "production-management",
      name: "Üretim Yönetimi",
      icon: Factory,
      color: "text-red-600",
      bgColor: "bg-red-100",
      subModules: [
        { id: "bom", name: "Ürün Reçeteleri (BOM)" },
        { id: "production-orders", name: "Üretim Emirleri" },
        { id: "production-planning", name: "Üretim Takibi" },
        { id: "production-capacity-planning", name: "Kapasite Planlama" },
      ],
    },
    {
      id: "quality-management",
      name: "Raporlama ve Takip",
      icon: FileBarChart,
      color: "text-green-600",
      bgColor: "bg-green-100",
      subModules: [
        { id: "", name: "Finansal Raporlar" },
        { id: "", name: "Stok Raporları" },
        { id: "", name: "KDV Raporları" },
        { id: "", name: "Döviz Kuru Takibi" },
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
    if (!expandedModules.includes(moduleId)) {
      setExpandedModules([...expandedModules, moduleId]);
    }
  };

  const renderModuleContent = () => {
    switch (activeModule) {
      case "overview":
        return <ERPOverview />;
      case "financial-accounts":
        return <div>Accounting Module Content</div>;
      case "e-invoice":
        if (activeSubModule === "bank-transactions") {
          return renderBankTransactionsContent();
        }
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-gray-900">
                Cari Hesaplar
              </h3>
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
                  <CardTitle className="text-orange-600 flex items-center">
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
            </div>
          </div>
        );
      case "stock-management":
        if (activeSubModule === "warehouse-operations") {
          return renderStockManagementContent();
        }
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-gray-900">
                Stok ve Depo Yönetimi
              </h3>
              <p className="text-gray-600">
                Stok seviyelerinizi takip edin ve depo işlemlerinizi yönetin
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card
                className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => setActiveSubModule("warehouse-operations")}
              >
                <CardHeader>
                  <CardTitle className="text-green-600 flex items-center">
                    <Package className="mr-2 h-5 w-5" />
                    Depo İşlemleri
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Stok giriş/çıkış işlemlerini yönetin
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        );
      case "purchase-management":
        if (activeSubModule === "order-creation") {
          return renderPurchasingContent();
        }
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-gray-900">
                Satın Alma Yönetimi
              </h3>
              <p className="text-gray-600">
                Satın alma süreçlerinizi yönetin ve tedarikçilerinizi takip edin
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card
                className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => setActiveSubModule("order-creation")}
              >
                <CardHeader>
                  <CardTitle className="text-blue-600 flex items-center">
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    Sipariş Oluşturma
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Yeni satın alma siparişleri oluşturun
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        );
      case "production-management":
        if (activeSubModule === "work-orders") {
          return renderProductionContent();
        }
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-gray-900">
                Üretim Yönetimi
              </h3>
              <p className="text-gray-600">
                Üretim süreçlerinizi planlayın ve takip edin
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card
                className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => setActiveSubModule("work-orders")}
              >
                <CardHeader>
                  <CardTitle className="text-purple-600 flex items-center">
                    <Factory className="mr-2 h-5 w-5" />
                    İş Emri Takibi
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Üretim emirlerini oluşturun ve takip edin
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        );
      case "quality-management":
        if (activeSubModule === "quality-control") {
          return renderQualityControlContent();
        }
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-gray-900">
                Kalite Kontrol
              </h3>
              <p className="text-gray-600">
                Kalite kontrol süreçlerinizi yönetin
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card
                className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => setActiveSubModule("quality-control")}
              >
                <CardHeader>
                  <CardTitle className="text-green-600 flex items-center">
                    <Shield className="mr-2 h-5 w-5" />
                    Kalite Kontrol
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Gelen malzeme ve üretim kalite kontrolü
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        );
      default:
        return <DefaultCase />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900">
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
                <CardTitle className="text-gray-900">ERP Modülleri</CardTitle>
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
                          className={`w-full text-left p-3 rounded-lg transition-colors flex items-center justify-between cursor-pointer ${
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
