import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useCRMStore } from "@/stores/useCRMStore";
import {
  AlertCircle,
  BarChart3,
  Clock,
  FileText,
  Headphones,
  Phone,
  Users,
} from "lucide-react";

export default function Overview() {
  const {
    setIsCustomerModalOpen,
    setIsCommunicationModalOpen,
    setIsOfferModalOpen,
    setIsSupportModalOpen,
  } = useCRMStore();
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
          <CardTitle className="text-dark-gray">Hızlı Aksiyonlar</CardTitle>
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
            <CardTitle className="text-dark-gray">Son Aktiviteler</CardTitle>
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
            <CardTitle className="text-dark-gray">Yaklaşan Görevler</CardTitle>
            <CardDescription>Bu hafta yapılması gerekenler</CardDescription>
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
                <Badge className="bg-primary-green text-white">Normal</Badge>
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
              <p className="text-sm text-gray-600">Teklif Dönüşüm Oranı</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-red">2.3 gün</p>
              <p className="text-sm text-gray-600">Ortalama Yanıt Süresi</p>
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
}
