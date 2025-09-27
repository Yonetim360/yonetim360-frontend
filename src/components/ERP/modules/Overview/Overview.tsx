import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertTriangle,
  DollarSign,
  Factory,
  Package,
  Plus,
  ShoppingCart,
} from "lucide-react";

export default function ERPOverview() {
  function setIsTransactionDialogOpen(arg0: boolean): void {
    throw new Error("Function not implemented.");
  }

  function setIsStockDialogOpen(arg0: boolean): void {
    throw new Error("Function not implemented.");
  }

  function setIsPurchaseDialogOpen(arg0: boolean): void {
    throw new Error("Function not implemented.");
  }

  function setIsProductionDialogOpen(arg0: boolean): void {
    throw new Error("Function not implemented.");
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-gray-900">ERP Genel Bakış</h3>
        <p className="text-gray-600">
          Kurumsal kaynak planlama sisteminizdeki genel durum ve önemli
          metriklerin özeti
        </p>
      </div>

      {/* Ana İstatistikler */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-orange-500">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Toplam Ciro</p>
                <p className="text-3xl font-bold text-gray-900">500₺</p>
                <p className="text-xs text-orange-600">+18% bu ay</p>
              </div>
              <DollarSign className="h-10 w-10 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Stok Kalemleri</p>
                <p className="text-3xl font-bold text-gray-900">1</p>
                <p className="text-xs text-green-600">+5% bu ay</p>
              </div>
              <Package className="h-10 w-10 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Bekleyen Siparişler</p>
                <p className="text-3xl font-bold text-gray-900">1</p>
                <p className="text-xs text-blue-600">-3 bu hafta</p>
              </div>
              <ShoppingCart className="h-10 w-10 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Üretim Emirleri</p>
                <p className="text-3xl font-bold text-gray-900">1</p>
                <p className="text-xs text-purple-600">+2 bu hafta</p>
              </div>
              <Factory className="h-10 w-10 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Hızlı Aksiyonlar */}

      <Card>
        <CardHeader>
          <CardTitle className="text-gray-900">Hızlı Aksiyonlar</CardTitle>
          <CardDescription>Sık kullanılan işlemler</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button
              className="h-20 flex-col bg-orange/70 hover:bg-orange/100"
              onClick={() => setIsTransactionDialogOpen(true)}
            >
              <Plus className="h-6 w-6 mb-2" />
              <span className="text-sm">Yeni İşlem</span>
            </Button>
            <Button
              className="h-20 flex-col bg-green-500 hover:bg-green-600"
              onClick={() => setIsStockDialogOpen(true)}
            >
              <Package className="h-6 w-6 mb-2" />
              <span className="text-sm">Stok Girişi</span>
            </Button>
            <Button
              className="h-20 flex-col bg-blue-600 hover:bg-blue-700"
              onClick={() => setIsPurchaseDialogOpen(true)}
            >
              <ShoppingCart className="h-6 w-6 mb-2" />
              <span className="text-sm">Satın Alma</span>
            </Button>
            <Button
              className="h-20 flex-col bg-purple-600 hover:bg-purple-700"
              onClick={() => setIsProductionDialogOpen(true)}
            >
              <Factory className="h-6 w-6 mb-2" />
              <span className="text-sm">Üretim Emri</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Kritik Uyarılar ve Son Aktiviteler */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-gray-900 flex items-center">
              <AlertTriangle className="mr-2 h-5 w-5 text-red-500" />
              Kritik Uyarılar
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4"></div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-gray-900">Son Aktiviteler</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4"></div>
          </CardContent>
        </Card>
      </div>

      {/* Performans Özeti */}
      <Card>
        <CardHeader>
          <CardTitle className="text-gray-900">
            Bu Ay Performans Özeti
          </CardTitle>
          <CardDescription>Ocak 2024 dönem raporu</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-500">₺</p>
              <p className="text-sm text-gray-600">Toplam Ciro</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-500">94%</p>
              <p className="text-sm text-gray-600">Stok Devir Hızı</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">2.1 gün</p>
              <p className="text-sm text-gray-600">Ortalama Teslimat</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">%</p>
              <p className="text-sm text-gray-600">Üretim Verimliliği</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
