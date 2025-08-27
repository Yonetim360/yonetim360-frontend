"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Edit,
  Eye,
  Mail,
  Phone,
  Plus,
  Search,
  Users,
  RefreshCw,
  AlertCircle,
  Trash2,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import CustomerDetailsModal from "../../modals/customer/CustomerDetailsModal";
import ViewCustomerModal from "../../modals/customer/ViewCustomerModal";
import { useState, useEffect } from "react";
import { CustomerStore } from "@/stores/crm/domains/CustomerStore";
import DeleteCustomerModal from "../../modals/customer/DeleteCustomerModal";
import { useAuth } from "@/hooks/useAuth";

export default function CustomerInfo() {
  const [searchTerm, setSearchTerm] = useState("");

  const { user, loading: authLoading } = useAuth();

  // CustomerStore'dan state ve actions
  const {
    customers,
    loading,
    error,
    fetchCustomers,
    clearError,
    setIsCustomerModalOpen,
    setIsCustomerDetailsModalOpen,
    setSelectedCustomer,
    setIsViewCustomerModalOpen,
    setIsDeleteCustomerModalOpen,
  } = CustomerStore();

  // Component mount olduğunda müşteri verilerini çek
  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  // Arama filtresi
  const filteredCustomers =
    searchTerm.length > 0
      ? customers.filter((customer) =>
          customer.companyName?.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : customers;

  // Loading durumu
  if (loading || authLoading) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-48 mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-64"></div>
          </div>
          <div className="h-10 bg-gray-300 rounded w-32 animate-pulse"></div>
        </div>

        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="animate-pulse p-4 border border-gray-200 rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-gray-300 rounded w-32 mb-2"></div>
                      <div className="h-3 bg-gray-300 rounded w-48"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

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
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={fetchCustomers}
            disabled={loading}
            className="flex items-center gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            Yenile
          </Button>
          <Button
            className="bg-primary-green hover:bg-primary-green/90 w-full sm:w-auto"
            onClick={() => setIsCustomerModalOpen(true)}
          >
            <Plus className="mr-2 h-4 w-4" />
            Yeni Müşteri
          </Button>
        </div>
      </div>

      {/* Error durumu */}
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="flex items-center justify-between">
            {error}
            <Button
              variant="ghost"
              size="sm"
              onClick={clearError}
              className="ml-2"
            >
              Kapat
            </Button>
          </AlertDescription>
        </Alert>
      )}

      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Müşteri ara..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Müşteri listesi */}
          <div className="space-y-4">
            {filteredCustomers?.length === 0 ? (
              <div className="text-center py-8">
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">
                  {searchTerm
                    ? "Arama kriterlerine uygun müşteri bulunamadı"
                    : "Henüz müşteri eklenmemiş"}
                </p>
              </div>
            ) : (
              filteredCustomers?.map((customer, index) => (
                <div
                  key={index}
                  className="flex flex-col lg:flex-row lg:items-center lg:justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors gap-4"
                >
                  {/* Sol taraf - Müşteri bilgileri */}
                  <div className="flex items-start sm:items-center space-x-4 flex-1">
                    <div className="w-12 h-12 bg-primary-green/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Users className="h-6 w-6 text-primary-green" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-dark-gray text-sm sm:text-base truncate">
                        {customer.companyName}
                      </h4>
                      <p className="text-sm text-gray-600 truncate">
                        {customer.contactPerson}
                      </p>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mt-2 gap-1 sm:gap-0">
                        <div className="flex items-center text-xs text-gray-500 truncate">
                          <Mail className="h-3 w-3 mr-1 flex-shrink-0" />
                          <span className="truncate">{customer.email}</span>
                        </div>
                        <div className="flex items-center text-xs text-gray-500">
                          <Phone className="h-3 w-3 mr-1 flex-shrink-0" />
                          <span>{customer.phoneNumber}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Sağ taraf - Durum & aksiyonlar */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 lg:gap-4">
                    {/* Durum badge'i */}
                    <div className="flex justify-start sm:justify-center">
                      <Badge
                        variant={customer.state === 0 ? "default" : "secondary"}
                        className={`text-xs ${
                          customer.state === 1
                            ? "bg-primary-green hover:bg-primary-green/90"
                            : customer.state === 2
                            ? "bg-orange hover:bg-orange/90"
                            : "bg-red hover:bg-red/90"
                        }`}
                      >
                        {customer.state === 1
                          ? "Aktif"
                          : customer.state === 2
                          ? "Beklemede"
                          : "Pasif"}
                      </Badge>
                    </div>

                    {/* Aksiyon butonları */}
                    <div className="flex space-x-2 justify-end sm:justify-start">
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 w-8 p-0 bg-transparent"
                        onClick={() => (
                          setSelectedCustomer(customer),
                          setIsDeleteCustomerModalOpen(true)
                        )}
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Sil</span>
                      </Button>
                      <Button
                        onClick={() => (
                          setSelectedCustomer(customer),
                          setIsViewCustomerModalOpen(true)
                        )}
                        variant="outline"
                        size="sm"
                        className="h-8 w-8 p-0 bg-transparent"
                      >
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">Görüntüle</span>
                      </Button>
                      <Button
                        onClick={() => (
                          setSelectedCustomer(customer),
                          setIsCustomerDetailsModalOpen(true)
                        )}
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
              ))
            )}
          </div>

          {/* Sayfalama */}
          {filteredCustomers?.length > 0 && (
            <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4">
              <p className="text-sm text-gray-600 text-center sm:text-left">
                Toplam {filteredCustomers?.length} müşteri gösteriliyor
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
          )}
        </CardContent>
      </Card>

      {/* Modals */}
      <CustomerDetailsModal />
      <ViewCustomerModal />
      <DeleteCustomerModal />
    </div>
  );
}
