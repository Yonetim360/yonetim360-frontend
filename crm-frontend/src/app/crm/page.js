"use client";
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
import { useCRMStore } from "../../stores/useCRMStore";

export default function Page() {
  const {
    activeModule,
    isLoading,
    //modals
    isCustomerModalOpen,
    isCommunicationModalOpen,
    isOfferModalOpen,
    isSupportModalOpen,
    //forms
    supportForm,
    customerForm,
    //state setters
    setActiveModule,
    setIsLoading,
    setIsCustomerModalOpen,
    setIsCommunicationModalOpen,
    setIsOfferModalOpen,
    setIsSupportModalOpen,
    setSupportForm,
    setCustomerForm,

    //datas
    modules,
    customers,
    communications,
    offers,
    supportTickets,
  } = useCRMStore();

  /* Modal Submit Handlers */

  const handleSupportSubmit = async (formdata) => {
    try {
      setIsLoading(true);
      console.log(formdata);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  {
    /* Right Content */
  }
  const renderModuleContent = () => {
    switch (activeModule) {
      case "overview":
        return <Overview />;

      case "customer-info":
        return <CustomerInfo />;

      case "communication":
        return <Communication />;

      case "sales-offers":
        return <SalesOffers />;

      case "support":
        return <Support />;

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
      <AddCustomerModal />

      {/* İletişim Ekleme Modal */}
      <AddContactModal />

      {/* Teklif Ekleme Modal */}
      <AddOfferModal />
      {/* Destek Talebi Ekleme Modal */}
      <AddSupportModal />
    </div>
  );
}
