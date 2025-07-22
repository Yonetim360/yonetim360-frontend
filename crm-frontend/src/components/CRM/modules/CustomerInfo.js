import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Edit,
  Eye,
  Filter,
  Mail,
  Phone,
  Plus,
  Search,
  Users,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export default function CustomerInfo({ customers, setIsCustomerModalOpen }) {
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
                        customer.status === "Aktif" ? "default" : "secondary"
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
}
