"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChevronDown, ChevronRight } from "lucide-react";
import MyCalendar from "@/components/CRM/modules/calendar/MyCalendar";
import Overview from "@/components/CRM/modules/overview/Overview";
import CustomerInfo from "@/components/CRM/modules/customer/CustomerInfo";
import Communication from "@/components/CRM/modules/communication/Communications";
import SalesOffers from "@/components/CRM/modules/offers/SalesOffers";
import Support from "@/components/CRM/modules/support/Support";
import DefaultCase from "@/components/CRM/modules/DefaultCase";
import AddCustomerModal from "@/components/CRM/modals/customer/AddCustomerModal";
import AddContactModal from "@/components/CRM/modals/contact/AddContactModal";
import AddOfferModal from "@/components/CRM/modals/offerSales/AddOfferModal";
import AddSupportModal from "@/components/CRM/modals/support/AddSupportModal";

import { useState } from "react";
import PastCommunications from "@/components/CRM/modules/communication/PastCommunications";
import FutureCommunications from "@/components/CRM/modules/communication/FutureCommunications";
import Offers from "@/components/CRM/modules/offers/Offers";
import Sales from "@/components/CRM/modules/offers/Sales";
import { ModalStore } from "@/stores/crm/shared/ModalStore";
import Representatives from "@/components/CRM/modules/representative/Representatives";
import SolutionCenter from "@/components/CRM/modules/solution/SolutionCenter";
import NewRequest from "@/components/CRM/modules/solution/NewRequest";
import { KnowledgeBase } from "@/components/CRM/modules/solution/KnowledgeBase";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  // useEffect(() => {
  //   const getUser = async () => {
  //     try {
  //       const response = await fetch(
  //         `${process.env.NEXT_PUBLIC_FRONTEND_BASE_URL}/api/auth/get-user`,
  //         {
  //           method: "GET",
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //         }
  //       );
  //       const result = await response.json();
  //       console.log(result);
  //     } catch (error) {
  //       console.error("API Error:", error);
  //     }
  //   };
  //   getUser();
  //   return () => {
  //     getUser();
  //   };
  // }, []);

  const {
    activeModule,
    setActiveModule,
    modules,
    activeSubModule,
    setActiveSubModule,
  } = ModalStore();

  // Genişletilmiş modülleri takip etmek için state
  const [expandedModules, setExpandedModules] = useState(["overview"]);

  // Modül genişletme/daraltma fonksiyonu
  const toggleModule = (moduleId) => {
    if (expandedModules.includes(moduleId)) {
      setExpandedModules(expandedModules.filter((id) => id !== moduleId));
    } else {
      setExpandedModules([...expandedModules, moduleId]);
    }
  };

  // Modül tıklama işlemi
  const handleModuleClick = (moduleId, subModuleId = "") => {
    if (moduleId === "whatsapp") {
      router.push("/crm/whatsapp-service");
      return;
    }
    setActiveModule(moduleId);
    setActiveSubModule(subModuleId);
    if (!expandedModules.includes(moduleId)) {
      setExpandedModules([...expandedModules, moduleId]);
    }
  };

  // Modül içeriğini render etme
  const renderModuleContent = () => {
    // Eğer alt modül seçiliyse, alt modül içeriğini göster
    if (activeSubModule) {
      switch (activeSubModule) {
        case "communicationHistory":
          return <PastCommunications />;
        case "upcomingMeetings":
          return <FutureCommunications />;
        case "offers":
          return <Offers />;
        case "sales":
          return <Sales />;
        case "newRequest":
          return <NewRequest />;
        case "knowledgeBase":
          return <KnowledgeBase />;
        default:
          return <DefaultCase />;
      }
    }

    // Ana modül içeriği
    switch (activeModule) {
      case "overview":
        return <Overview />;
      case "customer-info":
        return <CustomerInfo />;
      case "representatives":
        return <Representatives />;
      case "communication":
        return <Communication />;
      case "sales-offers":
        return <SalesOffers />;
      case "support":
        return <Support />;
      case "calendar":
        return <MyCalendar />;
      case "solution-center":
        return <SolutionCenter />;
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
                    const IconComponent = module.icon || (() => null);
                    const hasSubModules =
                      module.subModules && module.subModules.length > 0;
                    const isExpanded = expandedModules.includes(module.id);
                    const isActive = activeModule === module.id;

                    return (
                      <div key={module.id}>
                        {/* Ana Modül */}
                        <div
                          onClick={() => handleModuleClick(module.id)}
                          className={`w-full text-left p-3 rounded-lg transition-colors flex items-center justify-between cursor-pointer ${
                            isActive && !activeSubModule
                              ? `${module.bgColor || "bg-blue-50"} ${
                                  module.color || "text-blue-600"
                                } border-l-4 border-current`
                              : "hover:bg-gray-50 text-gray-700"
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <IconComponent className="h-5 w-5" />
                            <span className="text-sm font-medium">
                              {module.name || "İsimsiz Modül"}
                            </span>
                          </div>
                          {hasSubModules && (
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
                        {isExpanded && hasSubModules && (
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
                                    ? `${module.bgColor || "bg-blue-50"} ${
                                        module.color || "text-blue-600"
                                      } font-medium`
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

      {/* Modals */}
      <AddCustomerModal />
      <AddContactModal />
      <AddOfferModal />
      <AddSupportModal />
    </div>
  );
}
