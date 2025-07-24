"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChevronDown, ChevronRight } from "lucide-react";
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
import { useState } from "react";

export default function Page() {
  const { activeModule, setActiveModule, setIsLoading, modules } =
    useCRMStore();

  // Genişletilmiş modülleri takip etmek için state
  const [expandedModules, setExpandedModules] = useState(["overview"]);
  const [activeSubModule, setActiveSubModule] = useState("");

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
          return (
            <div className="p-6 bg-white rounded-lg">
              <h3 className="text-xl font-bold">communicationHistory</h3>
              <p>communicationHistory</p>
            </div>
          );
        case "upcomingMeetings":
          return (
            <div className="p-6 bg-white rounded-lg">
              <h3 className="text-xl font-bold">upcomingMeetings</h3>
              <p>upcomingMeetings</p>
            </div>
          );
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

  // Modules verisi yoksa loading göster
  if (!modules || modules.length === 0) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Modüller yükleniyor...</p>
        </div>
      </div>
    );
  }

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
