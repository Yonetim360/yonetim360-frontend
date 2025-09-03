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
  Trash2,
  AlertCircle,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useEffect, useMemo, useState } from "react";
import { RepresentativeStore } from "@/stores/crm/domains/RepresentativeStore";
import { Alert, AlertDescription } from "@/components/ui/alert";
import LoadingModule from "@/components/common/LoadingModule";
import AddRepresentativeModal from "../../modals/representatives/AddRepresentativeModal";
import useDebounce from "@/hooks/useDebounce";
import DeleteRepresentativeModal from "../../modals/representatives/DeleteRepresentativeModal";
import ViewRepresentativeModal from "../../modals/representatives/ViewRepresentativeModal";
import RepresentativeDetailsModal from "../../modals/representatives/RepresentativeDetailsModal";

export default function Representatives() {
  const [searchTerm, setSearchTerm] = useState("");
  const {
    representatives,
    fetchRepresentatives,
    representativesLoading,
    representativesLoaded,
    representativesError,
    setIsRepresentativesModalOpen,
    setIsDeleteRepresentativeModalOpen,
    setSelectedRepresentative,
    setIsViewRepresentativeModalOpen,
    setIsRepresentativeDetailsModalOpen,
  } = RepresentativeStore();

  useEffect(() => {
    fetchRepresentatives();
  }, [fetchRepresentatives]);

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // Arama filtresi
  const filteredRepresentatives = useMemo(() => {
    if (!debouncedSearchTerm || debouncedSearchTerm.length === 0) {
      return representatives;
    }

    return representatives.filter((representative) => {
      const fullName = `${representative.firstName || ""} ${
        representative.lastName || ""
      }`.trim();
      return fullName.toLowerCase().includes(debouncedSearchTerm.toLowerCase());
    });
  }, [representatives, debouncedSearchTerm]);

  const handleDelete = (rep) => {
    setSelectedRepresentative(rep), setIsDeleteRepresentativeModalOpen(true);
  };

  const handleView = (rep) => {
    setSelectedRepresentative(rep), setIsViewRepresentativeModalOpen(true);
  };

  const handleEdit = (rep) => {
    setSelectedRepresentative(rep), setIsRepresentativeDetailsModalOpen(true);
  };
  //   // Loading durumu

  if (representativesLoading || !representativesLoaded) {
    return <LoadingModule />;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h3 className="text-2xl font-bold text-dark-gray">
            Temsilci Bilgileri
          </h3>
          <p className="text-gray-600">
            Temsilci bilgilerini görüntüleyin ve yönetin
          </p>
        </div>
        <div className="flex gap-2">
          {/* <Button
            variant="outline"
            onClick={refresh}
            disabled={loading}
            className="flex items-center gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            Yenile
          </Button> */}
          <Button
            className="bg-[#02d1a1] hover:bg-[#02d1a1]/180 w-full sm:w-auto"
            onClick={() => setIsRepresentativesModalOpen(true)}
          >
            <Plus className="mr-2 h-4 w-4" />
            Yeni Temsilci
          </Button>
        </div>
      </div>

      {/* Error durumu */}
      {representativesError && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="flex items-center justify-between">
            {representativesError}
            <Button variant="ghost" size="sm" className="ml-2">
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
                id="search"
                placeholder="Temsilci ara..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* representative listesi */}
          <div className="space-y-4">
            {filteredRepresentatives?.length === 0 ? (
              <div className="text-center py-8">
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">
                  {searchTerm
                    ? "Arama kriterlerine uygun temsilci bulunamadı"
                    : "Henüz temsilci eklenmemiş"}
                </p>
              </div>
            ) : (
              filteredRepresentatives?.map((representative) => (
                <div
                  key={representative.id}
                  className="flex flex-col lg:flex-row lg:items-center lg:justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors gap-4"
                >
                  {/* Sol taraf - Müşteri bilgileri */}
                  <div className="flex items-start sm:items-center space-x-4 flex-1">
                    <div className="w-12 h-12 bg-primary-green/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Users className="h-6 w-6 text-primary-green" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-dark-gray text-sm sm:text-base truncate">
                        {representative.firstName} {representative.lastName}
                      </h4>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mt-2 gap-1 sm:gap-0">
                        <div className="flex items-center text-xs text-gray-500 truncate">
                          <Mail className="h-3 w-3 mr-1 flex-shrink-0" />
                          <span className="truncate">
                            {representative.email}
                          </span>
                        </div>
                        <div className="flex items-center text-xs text-gray-500">
                          <Phone className="h-3 w-3 mr-1 flex-shrink-0" />
                          <span>{representative.phoneNumber}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Aksiyon butonları */}
                  <div className="flex space-x-2 justify-end sm:justify-start">
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 w-8 p-0 bg-transparent"
                      onClick={() => handleDelete(representative)}
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Sil</span>
                    </Button>
                    <Button
                      onClick={() => handleView(representative)}
                      variant="outline"
                      size="sm"
                      className="h-8 w-8 p-0 bg-transparent"
                    >
                      <Eye className="h-4 w-4" />
                      <span className="sr-only">Görüntüle</span>
                    </Button>
                    <Button
                      onClick={() => handleEdit(representative)}
                      variant="outline"
                      size="sm"
                      className="h-8 w-8 p-0 bg-transparent"
                    >
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">Düzenle</span>
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Sayfalama */}
          {filteredRepresentatives?.length > 0 && (
            <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4">
              <p className="text-sm text-gray-600 text-center sm:text-left">
                Toplam {filteredRepresentatives?.length} müşteri gösteriliyor
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
      <AddRepresentativeModal />
      <DeleteRepresentativeModal />
      <ViewRepresentativeModal />
      <RepresentativeDetailsModal />
    </div>
  );
}
