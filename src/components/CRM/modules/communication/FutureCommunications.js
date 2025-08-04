"use client";

import { Badge } from "@/components/ui/badge";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCRMStore } from "@/stores/useCRMStore";
import {
  Phone,
  Mail,
  Calendar,
  MessageSquare,
  Search,
  Filter,
  Eye,
  Edit,
  Clock,
  FileText,
  Plus,
  RefreshCw,
  Star,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  CalendarDays,
  MapPin,
  Bell,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import AddOfferModal from "../../modals/offer/AddOfferModal";

export default function FutureCommunications() {
  const { communications, setIsCommunicationModalOpen } = useCRMStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterPriority, setFilterPriority] = useState("all");
  const [sortBy, setSortBy] = useState("date");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const getTypeIcon = (type) => {
    switch (type) {
      case "Telefon":
        return <Phone className="h-4 w-4 text-orange" />;
      case "E-posta":
        return <Mail className="h-4 w-4 text-blue-500" />;
      case "Toplantı":
      case "Yüz Yüze":
        return <Calendar className="h-4 w-4 text-primary-green" />;
      case "Video Konferans":
        return <MessageSquare className="h-4 w-4 text-purple-500" />;
      default:
        return <FileText className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Planlandı":
        return "bg-blue-500 text-white";
      case "Onaylandı":
        return "bg-primary-green text-white";
      case "Bekliyor":
        return "bg-orange text-white";
      case "İptal":
        return "bg-red text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case "high":
        return <AlertCircle className="h-4 w-4 text-red" />;
      case "medium":
        return <Clock className="h-4 w-4 text-orange" />;
      case "low":
        return <Star className="h-4 w-4 text-primary-green" />;
      default:
        return null;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "text-red border-red";
      case "medium":
        return "text-orange border-orange";
      case "low":
        return "text-primary-green border-primary-green";
      default:
        return "text-gray-500 border-gray-500";
    }
  };

  // Pagination hesaplamaları
  const totalPages = Math.ceil(communications.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Sayfa değiştirme fonksiyonları
  const goToPage = (page) => {
    setCurrentPage(page);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Tarihe göre kalan gün hesaplama
  const getDaysUntil = (date) => {
    const today = new Date();
    const targetDate = new Date(date);
    const diffTime = targetDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-bold text-dark-gray">
            Gelecek İletişimler
          </h3>
          <p className="text-gray-600">
            Planlanmış iletişim kayıtlarını görüntüleyin ve yönetin
          </p>
        </div>
        <div className="flex space-x-2">
          <Button
            className="bg-orange hover:bg-orange/90"
            onClick={() => setIsCommunicationModalOpen(true)}
          >
            <Plus className="mr-2 h-4 w-4" />
            Yeni İletişim
          </Button>
          <Button
            variant="outline"
            className="border-orange text-orange hover:bg-orange hover:text-white bg-transparent"
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
              value={filterPriority}
              onValueChange={(value) => {
                setFilterPriority(value);
                setCurrentPage(1);
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Öncelik" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tüm Öncelikler</SelectItem>
                <SelectItem value="high">Yüksek</SelectItem>
                <SelectItem value="medium">Orta</SelectItem>
                <SelectItem value="low">Düşük</SelectItem>
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
        </CardContent>
      </Card>

      {/* İstatistik Kartları */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-dark-gray">
                {communications.length}
              </p>
              <p className="text-sm text-gray-600">Toplam Planlanan</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-red">
                {communications.filter((c) => c.priority === "high").length}
              </p>
              <p className="text-sm text-gray-600">Yüksek Öncelik</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-orange">
                {communications.filter((c) => getDaysUntil(c.date) <= 3).length}
              </p>
              <p className="text-sm text-gray-600">Bu Hafta</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary-green">
                {
                  communications.filter((c) => getDaysUntil(c.date) === 1)
                    .length
                }
              </p>
              <p className="text-sm text-gray-600">Yarın</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* İletişim Listesi */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Planlanan İletişimler {/*({communications.length})*/}</span>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <Filter className="h-4 w-4" />
              <span>
                Sayfa {currentPage} / {totalPages}
              </span>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {communications.length === 0 ? (
              <div className="text-center py-8">
                <CalendarDays className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Planlanan iletişim bulunamadı
                </h3>
                <p className="text-gray-600">
                  Arama kriterlerinize uygun planlanan iletişim kaydı
                  bulunmuyor.
                </p>
              </div>
            ) : (
              communications.map((comm) => {
                const daysUntil = getDaysUntil(comm.date);
                if (daysUntil > 0) {
                  return (
                    <div
                      key={comm.id}
                      className={`p-4 border rounded-lg hover:shadow-md transition-shadow ${
                        daysUntil <= 1
                          ? "border-red bg-red/5"
                          : daysUntil <= 3
                          ? "border-orange bg-orange/5"
                          : "border-gray-200"
                      }`}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-start space-x-3">
                          <div className="p-2 rounded-full bg-gray-100">
                            {getTypeIcon(comm.type)}
                          </div>
                          <div>
                            <div className="flex items-center space-x-2 mb-1">
                              <h4 className="font-semibold text-dark-gray">
                                {comm.customer}
                              </h4>
                              {getPriorityIcon(comm.priority)}
                              {daysUntil <= 1 && (
                                <Bell className="h-4 w-4 text-red animate-pulse" />
                              )}
                            </div>
                            <p className="text-sm text-gray-600 mb-1">
                              {comm.company}
                            </p>
                            <p className="text-sm font-medium text-dark-gray">
                              {comm.subject}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className={getStatusColor(comm.status)}>
                            {comm.status}
                          </Badge>
                          <div
                            className={`text-xs px-2 py-1 rounded border ${getPriorityColor(
                              comm.priority
                            )}`}
                          >
                            {daysUntil === 0
                              ? "Bugün"
                              : daysUntil === 1
                              ? "Yarın"
                              : daysUntil > 0 && `${daysUntil} gün`}
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          <Calendar className="h-4 w-4" />
                          <span>
                            {comm.date} - {comm.time}
                          </span>
                          {comm.duration && (
                            <>
                              <Clock className="h-4 w-4 ml-2" />
                              <span>{comm.duration}</span>
                            </>
                          )}
                        </div>
                      </div>

                      <p className="text-sm text-gray-700 mb-3 bg-gray-50 p-3 rounded">
                        {comm.notes}
                      </p>

                      {/* {comm.preparation && (
                        <div className="mb-3 p-2 bg-blue-50 rounded border-l-4 border-blue-500">
                          <p className="text-sm text-blue-700">
                            <strong>Hazırlık:</strong> {comm.preparation}
                          </p>
                        </div>
                      )} */}

                      <div className="flex items-center justify-between">
                        <div className="flex space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-primary-green hover:text-primary-green/80"
                          >
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Tamamla
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-orange hover:text-orange/80"
                          >
                            <Edit className="h-4 w-4 mr-1" />
                            Düzenle
                          </Button>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-blue-500 hover:text-blue-500/80"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red hover:text-red/80"
                          >
                            <XCircle className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                }
              })
            )}
          </div>
        </CardContent>
      </Card>

      {/* Pagination */}
      {totalPages > 1 && (
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                Toplam {filteredCommunications.length} kayıttan {startIndex + 1}
                -{Math.min(endIndex, filteredCommunications.length)} arası
                gösteriliyor
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={goToPreviousPage}
                  disabled={currentPage === 1}
                  className="flex items-center space-x-1 bg-transparent"
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span>Önceki</span>
                </Button>

                <div className="flex items-center space-x-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => {
                      if (
                        page === 1 ||
                        page === totalPages ||
                        (page >= currentPage - 1 && page <= currentPage + 1)
                      ) {
                        return (
                          <Button
                            key={page}
                            variant={
                              currentPage === page ? "default" : "outline"
                            }
                            size="sm"
                            onClick={() => goToPage(page)}
                            className={`w-8 h-8 p-0 ${
                              currentPage === page
                                ? "bg-primary-green text-white hover:bg-primary-green/90"
                                : "hover:bg-gray-100"
                            }`}
                          >
                            {page}
                          </Button>
                        );
                      } else if (
                        (page === currentPage - 2 && currentPage > 3) ||
                        (page === currentPage + 2 &&
                          currentPage < totalPages - 2)
                      ) {
                        return (
                          <span key={page} className="px-2 text-gray-400">
                            ...
                          </span>
                        );
                      }
                      return null;
                    }
                  )}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages}
                  className="flex items-center space-x-1 bg-transparent"
                >
                  <span>Sonraki</span>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Modals */}
      <AddOfferModal />
    </div>
  );
}
