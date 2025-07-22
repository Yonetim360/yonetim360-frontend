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
  Users,
  Phone,
  FileText,
  Headphones,
  MessageCircle,
  CalendarDays,
  Megaphone,
  HelpCircle,
  BarChart3,
} from "lucide-react";
import MyCalendar from "@/components/CRM/modules/MyCalendar";
import Overview from "@/components/CRM/modules/Overview";
import CustomerInfo from "@/components/CRM/modules/CustomerInfo";
import Communication from "@/components/CRM/modules/Communication";
import SalesOffers from "@/components/CRM/modules/SalesOffers";
import Support from "@/components/CRM/modules/Support";
import DefaultCase from "@/components/CRM/modules/DefaultCase";
import AddCustomerModal from "@/components/CRM/modals/AddCustomerModal";
import AddContactModal from "@/components/CRM/modals/AddContactModal";
import AddOfferModal from "@/components/CRM/modals/AddOfferModal";
import AddSupportModal from "@/components/CRM/modals/AddSupportModal";

export default function Page() {
  const [activeModule, setActiveModule] = useState("overview");
  const [isCustomerModalOpen, setIsCustomerModalOpen] = useState(false);
  const [isCommunicationModalOpen, setIsCommunicationModalOpen] =
    useState(false);
  const [isOfferModalOpen, setIsOfferModalOpen] = useState(false);
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  /* Form States */
  const [supportForm, setSupportForm] = useState({
    customer: "",
    subject: "",
    description: "",
    priority: "",
    assignedTo: "",
  });

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

  /*Initial datas*/

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

  {
    /* Modal Submit Handlers */
  }
  const handleSupportSubmit = async (formdata) => {
    setIsLoading(true);

    console.log(formdata);
    setIsLoading(false);
  };

  const handleCustomerSubmit = async (formdata) => {
    setIsLoading(true);

    console.log(formdata);
    setIsLoading(false);
  };

  {
    /* Right Content */
  }
  const renderModuleContent = () => {
    switch (activeModule) {
      case "overview":
        return <Overview />;

      case "customer-info":
        return (
          <CustomerInfo
            customers={customers}
            setIsCustomerModalOpen={setIsCustomerModalOpen}
          />
        );

      case "communication":
        return (
          <Communication
            communications={communications}
            setIsCommunicationModalOpen={setIsCommunicationModalOpen}
          />
        );

      case "sales-offers":
        return (
          <SalesOffers
            offers={offers}
            setIsOfferModalOpen={setIsOfferModalOpen}
          />
        );

      case "support":
        return (
          <Support
            supportTickets={supportTickets}
            setIsSupportModalOpen={setIsSupportModalOpen}
          />
        );

      case "calendar":
        return <MyCalendar />;
      default:
        return <DefaultCase />;
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
      <AddCustomerModal
        isCustomerModalOpen={isCustomerModalOpen}
        setIsCustomerModalOpen={setIsCustomerModalOpen}
        customers={customers}
        customerForm={customerForm}
        setCustomerForm={setCustomerForm}
        onSubmit={handleCustomerSubmit}
        isLoading={isLoading}
      />

      {/* İletişim Ekleme Modal */}
      <AddContactModal
        isCommunicationModalOpen={isCommunicationModalOpen}
        setIsCommunicationModalOpen={setIsCommunicationModalOpen}
        customers={customers}
      />

      {/* Teklif Ekleme Modal */}
      <AddOfferModal
        isOfferModalOpen={isOfferModalOpen}
        setIsOfferModalOpen={setIsOfferModalOpen}
        customers={customers}
      />
      {/* Destek Talebi Ekleme Modal */}
      <AddSupportModal
        isSupportModalOpen={isSupportModalOpen}
        setIsSupportModalOpen={setIsSupportModalOpen}
        customers={customers}
        onSubmit={handleSupportSubmit}
        supportForm={supportForm}
        setSupportForm={setSupportForm}
        isLoading={isLoading}
      />
    </div>
  );
}
