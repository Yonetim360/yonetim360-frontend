"use client";
import StatusBadge from "@/components/common/StatusBadge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CommunicationStore } from "@/stores/crm/domains/CommunicationStore";
import {
  Calendar,
  MessageSquare,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  Clock,
  User,
  Download,
  RefreshCw,
} from "lucide-react";
import { useEffect, useState } from "react";
import Pagination from "@/components/common/Pagination";
import getTypeIcon from "@/utils/GetTypeIcon";
import LoadingModule from "@/components/common/LoadingModule";
import ErrorModule from "@/components/common/ErrorModule";

export default function PastCommunications() {
  const {
    communications,
    fetchCommunications,
    communicationsLoading,
    communicationsError,
    setSelectedCommunication,
    setCommunicationsError,
    setIsViewCommunicationModalOpen,
    setIsDeleteCommunicationModalOpen,
    setIsCommunicationDetailsModalOpen,
  } = CommunicationStore();

  useEffect(() => {
    if (communications.length === 0) {
      fetchCommunications();
    }
  }, [communications.length, fetchCommunications]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortBy, setSortBy] = useState("date");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredCommunications = communications
    .filter((comm) => {
      const matchesSearch =
        comm.customer?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        comm.subject?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        comm.company?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = filterType === "all" || comm.type === filterType;
      const matchesStatus =
        filterStatus === "all" || comm.status === filterStatus;
      return matchesSearch && matchesType && matchesStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "date":
          return (
            new Date(b.date || b.startDateTime) -
            new Date(a.date || a.startDateTime)
          );
        case "customer":
          return (a.customer || "").localeCompare(b.customer || "");
        case "priority":
          const priorityOrder = { high: 3, medium: 2, low: 1 };
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        default:
          return 0;
      }
    });

  const totalPages = Math.ceil(filteredCommunications.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCommunications = filteredCommunications.slice(
    startIndex,
    endIndex
  );

  const handleView = (comm) => {
    setSelectedCommunication(comm);
    setIsViewCommunicationModalOpen(true);
  };

  const handleEdit = (comm) => {
    setSelectedCommunication(comm);
    setIsCommunicationDetailsModalOpen(true);
  };

  const handleEnd = (comm) => {
    setSelectedCommunication(comm);
    setIsDeleteCommunicationModalOpen(true);
  };

  if (communicationsLoading) {
    return <LoadingModule />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-bold text-foreground">
            Son İletişimler
          </h3>
          <p className="text-muted-foreground">
            Geçmiş iletişim kayıtlarını görüntüleyin ve yönetin
          </p>
        </div>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            className="border-green-500 text-green-500 hover:bg-green-500 hover:text-white bg-transparent"
          >
            <Download className="mr-2 h-4 w-4" />
            Dışa Aktar
          </Button>
          <Button
            variant="outline"
            className="border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white bg-transparent"
            onClick={() => fetchCommunications()}
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Yenile
          </Button>
        </div>
      </div>
      {/* Filtreler ve Arama */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Müşteri, konu veya şirket ara..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="pl-10"
              />
            </div>
            <Select
              value={filterType}
              onValueChange={(value) => {
                setFilterType(value);
                setCurrentPage(1);
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="İletişim Türü" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tüm Türler</SelectItem>
                <SelectItem value="Telefon">Telefon</SelectItem>
                <SelectItem value="E-posta">E-posta</SelectItem>
                <SelectItem value="Toplantı">Toplantı</SelectItem>
                <SelectItem value="Video Konferans">Video Konferans</SelectItem>
                <SelectItem value="Yüz Yüze">Yüz Yüze</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={filterStatus}
              onValueChange={(value) => {
                setFilterStatus(value);
                setCurrentPage(1);
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Durum" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tüm Durumlar</SelectItem>
                <SelectItem value="Tamamlandı">Tamamlandı</SelectItem>
                <SelectItem value="Bekliyor">Bekliyor</SelectItem>
                <SelectItem value="Ertelendi">Ertelendi</SelectItem>
                <SelectItem value="Planlandı">Planlandı</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={sortBy}
              onValueChange={(value) => {
                setSortBy(value);
                setCurrentPage(1);
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sırala" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date">Tarihe Göre</SelectItem>
                <SelectItem value="customer">Müşteriye Göre</SelectItem>
                <SelectItem value="priority">Önceliğe Göre</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {communicationsError && (
            <div className="mt-4">
              <ErrorModule
                error={communicationsError}
                setError={setCommunicationsError}
              />
            </div>
          )}
        </CardContent>
      </Card>
      {/* Özet Kartlar */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">
                {filteredCommunications.length}
              </p>
              <p className="text-sm text-muted-foreground">Toplam İletişim</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-500">
                {
                  filteredCommunications.filter(
                    (c) => c.conversationStatus === "Tamamlandı"
                  ).length
                }
              </p>
              <p className="text-sm text-muted-foreground">Tamamlanan</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-500">
                {
                  filteredCommunications.filter(
                    (c) => c.conversationStatus === "Bekliyor"
                  ).length
                }
              </p>
              <p className="text-sm text-muted-foreground">Bekleyen</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-500">
                {
                  filteredCommunications.filter((c) => c.outcome === "positive")
                    .length
                }
              </p>
              <p className="text-sm text-muted-foreground">Başarılı</p>
            </div>
          </CardContent>
        </Card>
      </div>
      {/* İletişim Listesi */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>İletişim Geçmişi ({filteredCommunications.length})</span>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Filter className="h-4 w-4" />
              <span>
                Sayfa {currentPage} / {totalPages}
              </span>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {currentCommunications.length === 0 ? (
              <div className="text-center py-8">
                <MessageSquare className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">
                  İletişim bulunamadı
                </h3>
                <p className="text-muted-foreground">
                  Arama kriterlerinize uygun iletişim kaydı bulunmuyor.
                </p>
              </div>
            ) : (
              currentCommunications.map((comm) => (
                <div
                  key={comm.id}
                  className="p-4 border border-border rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-start space-x-3">
                      <div className="p-2 rounded-full bg-muted">
                        {getTypeIcon(comm.conversationType)}
                      </div>
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="font-semibold text-foreground">
                            {comm.customer || "Müşteri Bilgisi Yok"}
                          </h4>
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">
                          {comm.company || "Şirket Bilgisi Yok"}
                        </p>
                        <p className="text-sm font-medium text-foreground">
                          {comm.subject || "Konu Bilgisi Yok"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <StatusBadge
                        type="communication"
                        status={comm.conversationStatus}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>
                        {comm.date ||
                          new Date(comm.startDateTime).toLocaleDateString(
                            "tr-TR"
                          )}{" "}
                        -{" "}
                        {comm.time ||
                          new Date(comm.startDateTime).toLocaleTimeString(
                            "tr-TR"
                          )}
                      </span>
                      {(comm.duration || comm.durationInMinutes) && (
                        <>
                          <Clock className="h-4 w-4 ml-2" />
                          <span>{`${comm.durationInMinutes} dk`}</span>
                        </>
                      )}
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <User className="h-4 w-4" />
                      <span>
                        {comm.representatives.length > 1
                          ? comm.representatives
                              .map((r) => r.firstName + " " + r.lastName)
                              .join(", ")
                          : comm.representatives[0].firstName +
                              " " +
                              comm.representatives[0].lastName || "Atanmamış"}
                      </span>
                    </div>
                  </div>
                  <div>
                    <div className="bg-gray-100 p-3 rounded-lg w-full">
                      <p className="text-sm ">
                        {comm.conversationInformation || "Not bulunmamaktadır."}
                      </p>
                    </div>
                  </div>
                  <div className="w-full py-1 mt-2 flex justify-end items-center space-x-1 ">
                    <Button
                      onClick={() => handleView(comm)}
                      variant="ghost"
                      size="sm"
                      className="text-primary-green hover:text-primary-green/80"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      onClick={() => handleEdit(comm)}
                      variant="ghost"
                      size="sm"
                      className="text-orange hover:text-orange/80"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-500 hover:text-red-500/80"
                      onClick={() => handleEnd(comm)}
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
          {/* Pagination */}

          <Pagination
            totalItems={filteredCommunications.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </CardContent>
      </Card>
    </div>
  );
}
