"use client";

import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Users,
  BarChart3,
  UserCheck,
  TrendingUp,
  Building2,
  ArrowRight,
  ChevronRight,
} from "lucide-react";

export default function Page() {
  const services = [
    {
      id: "crm",
      title: "CRM",
      subtitle: "Müşteri İlişkileri Yönetimi",
      description:
        "Müşteri bilgilerini yönetin, iletişimleri takip edin ve satış süreçlerinizi optimize edin.",
      icon: Users,
      color: "text-primary-green",
      bgColor: "bg-primary-green",
      hoverColor: "hover:bg-primary-green/90",
      borderColor: "border-primary-green/20",
      iconBgColor: "bg-primary-green/10",
      href: "/crm",
      stats: [
        { label: "Toplam Müşteri", value: "1,234" },
        { label: "Aktif Projeler", value: "89" },
        { label: "Bu Ay Satış", value: "₺2.4M" },
      ],
    },
    {
      id: "erp",
      title: "ERP",
      subtitle: "Kurumsal Kaynak Planlaması",
      description:
        "Envanter, muhasebe, satış ve satın alma süreçlerinizi entegre bir şekilde yönetin.",
      icon: BarChart3,
      color: "text-orange",
      bgColor: "bg-orange",
      hoverColor: "hover:bg-orange/90",
      borderColor: "border-orange/20",
      iconBgColor: "bg-orange/10",
      href: "/erp",
      stats: [
        { label: "Stok Kalemleri", value: "2,456" },
        { label: "Bekleyen Siparişler", value: "67" },
        { label: "Aylık Ciro", value: "₺3.8M" },
      ],
    },
    {
      id: "hr",
      title: "İK",
      subtitle: "İnsan Kaynakları Yönetimi",
      description:
        "Personel yönetimi, bordro, izin takibi ve performans değerlendirmelerini kolayca yapın.",
      icon: UserCheck,
      color: "text-customRed",
      bgColor: "bg-customRed",
      hoverColor: "hover:bg-customRed/90",
      borderColor: "border-customRed/20",
      iconBgColor: "bg-customRed/10",
      href: "/hr",
      stats: [
        { label: "Toplam Personel", value: "47" },
        { label: "Aktif İzinler", value: "8" },
        { label: "Bu Ay Bordro", value: "₺485K" },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-cream">
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-12 text-center">
          <div className="flex justify-center mb-6">
            <Building2 className="h-16 w-16 text-primary-green" />
          </div>
          <h2 className="text-4xl font-bold text-dark-gray mb-4">
            Yönetim360 Dashboard
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            İşletmenizin tüm süreçlerini tek merkezden yönetin. CRM, ERP ve
            İnsan Kaynakları modüllerine hızlı erişim sağlayın.
          </p>
        </div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {services.map((service) => {
            const IconComponent = service.icon;
            return (
              <Link key={service.id} href={service.href} className="group">
                <Card
                  className={`h-full transition-all duration-300 hover:shadow-2xl hover:scale-105 border-2 ${service.borderColor} hover:border-opacity-50 cursor-pointer`}
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className={`w-16 h-16 ${service.iconBgColor} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                      >
                        <IconComponent className={`h-8 w-8 ${service.color}`} />
                      </div>
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <ChevronRight className={`h-6 w-6 ${service.color}`} />
                      </div>
                    </div>
                    <CardTitle
                      className={`text-2xl font-bold ${service.color} mb-2`}
                    >
                      {service.title}
                    </CardTitle>
                    <CardDescription className="text-lg font-medium text-dark-gray">
                      {service.subtitle}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-gray-600 mb-6 md:h-24 leading-relaxed">
                      {service.description}
                    </p>

                    {/* Stats */}
                    <div className="space-y-3 mb-6">
                      {service.stats.map((stat, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0"
                        >
                          <span className="text-sm text-gray-600">
                            {stat.label}
                          </span>
                          <span className="font-semibold text-dark-gray">
                            {stat.value}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Action Button */}
                    <div
                      className={`w-full py-3 px-4 ${service.bgColor} ${service.hoverColor} text-white rounded-lg flex items-center justify-center space-x-2 transition-all duration-300 group-hover:shadow-lg`}
                    >
                      <span className="font-medium">Modülü Aç</span>
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        {/* Quick Stats Overview */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h3 className="text-2xl font-bold text-dark-gray mb-6 text-center">
            Genel Durum
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-primary-green/5 rounded-xl">
              <div className="text-3xl font-bold text-primary-green mb-2">
                1,234
              </div>
              <div className="text-sm text-gray-600">Toplam Müşteri</div>
              <div className="flex items-center justify-center mt-2">
                <TrendingUp className="h-4 w-4 text-primary-green mr-1" />
                <span className="text-xs text-primary-green">+12%</span>
              </div>
            </div>
            <div className="text-center p-4 bg-orange/5 rounded-xl">
              <div className="text-3xl font-bold text-orange mb-2">₺3.8M</div>
              <div className="text-sm text-gray-600">Aylık Ciro</div>
              <div className="flex items-center justify-center mt-2">
                <TrendingUp className="h-4 w-4 text-orange mr-1" />
                <span className="text-xs text-orange">+18%</span>
              </div>
            </div>
            <div className="text-center p-4 bg-customRed/5 rounded-xl">
              <div className="text-3xl font-bold text-customRed mb-2">47</div>
              <div className="text-sm text-gray-600">Toplam Personel</div>
              <div className="flex items-center justify-center mt-2">
                <TrendingUp className="h-4 w-4 text-customRed mr-1" />
                <span className="text-xs text-customRed">+2</span>
              </div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-xl">
              <div className="text-3xl font-bold text-blue-600 mb-2">98.5%</div>
              <div className="text-sm text-gray-600">Sistem Uptime</div>
              <div className="flex items-center justify-center mt-2">
                <TrendingUp className="h-4 w-4 text-blue-600 mr-1" />
                <span className="text-xs text-blue-600">Mükemmel</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-dark-gray mb-6">
            Son Aktiviteler
          </h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-4 p-4 bg-primary-green/5 rounded-lg">
              <div className="w-3 h-3 bg-primary-green rounded-full"></div>
              <div className="flex-1">
                <p className="font-medium text-dark-gray">
                  Yeni müşteri eklendi: ABC Teknoloji A.Ş.
                </p>
                <p className="text-sm text-gray-500">
                  CRM Modülü • 2 saat önce
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4 p-4 bg-orange/5 rounded-lg">
              <div className="w-3 h-3 bg-orange rounded-full"></div>
              <div className="flex-1">
                <p className="font-medium text-dark-gray">
                  Stok seviyesi güncellendi: Laptop inventeri
                </p>
                <p className="text-sm text-gray-500">
                  ERP Modülü • 4 saat önce
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4 p-4 bg-customRed/5 rounded-lg">
              <div className="w-3 h-3 bg-customRed rounded-full"></div>
              <div className="flex-1">
                <p className="font-medium text-dark-gray">
                  Yeni personel kaydı: Mehmet Kaya - Yazılım Geliştirici
                </p>
                <p className="text-sm text-gray-500">İK Modülü • 6 saat önce</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-lg">
              <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
              <div className="flex-1">
                <p className="font-medium text-dark-gray">
                  Sistem yedeklemesi tamamlandı
                </p>
                <p className="text-sm text-gray-500">Sistem • 1 gün önce</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
