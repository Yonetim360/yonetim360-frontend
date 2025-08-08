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
import { CommunicationStore } from "@/stores/crm/domains/CommunicationStore";
import {
  Phone,
  Mail,
  Calendar,
  MessageSquare,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  Clock,
  User,
  FileText,
  Download,
  RefreshCw,
  Star,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";

export default function PastCommunications() {
  const { communications, setIsCommunicationModalOpen } = CommunicationStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortBy, setSortBy] = useState("date");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Mock data for demonstration - genişletilmiş veri seti
  const mockCommunications = [
    {
      id: 1,
      customer: "Ahmet Yılmaz",
      company: "ABC Teknoloji",
      subject: "Ürün Demo Sunumu",
      type: "Toplantı",
      status: "Tamamlandı",
      date: "2024-01-22",
      time: "14:30",
      duration: "45 dk",
      notes:
        "Ürün demosunu başarıyla gerçekleştirdik. Müşteri çok ilgili, teklifimizi bekliyor.",
      priority: "high",
      outcome: "positive",
      nextAction: "Teklif hazırla",
      assignedTo: "Mehmet Kaya",
    },
    {
      id: 2,
      customer: "Fatma Özkan",
      company: "XYZ İnşaat",
      subject: "Proje Detayları Görüşmesi",
      type: "Telefon",
      status: "Tamamlandı",
      date: "2024-01-22",
      time: "10:15",
      duration: "25 dk",
      notes: "Proje kapsamı ve bütçe konuşuldu. Ek bilgi talep edildi.",
      priority: "medium",
      outcome: "neutral",
      nextAction: "Ek döküman gönder",
      assignedTo: "Ayşe Demir",
    },
    {
      id: 3,
      customer: "Can Özkan",
      company: "DEF Yazılım",
      subject: "Teknik Destek Talebi",
      type: "E-posta",
      status: "Bekliyor",
      date: "2024-01-21",
      time: "16:45",
      duration: null,
      notes:
        "Sistem entegrasyonu konusunda destek talep etti. Teknik ekiple görüşülecek.",
      priority: "high",
      outcome: "pending",
      nextAction: "Teknik ekip ataması",
      assignedTo: "Ali Veli",
    },
    {
      id: 4,
      customer: "Zeynep Kara",
      company: "GHI Danışmanlık",
      subject: "Aylık Değerlendirme",
      type: "Video Konferans",
      status: "Tamamlandı",
      date: "2024-01-21",
      time: "11:00",
      duration: "60 dk",
      notes:
        "Aylık performans değerlendirmesi yapıldı. Genel memnuniyet yüksek.",
      priority: "low",
      outcome: "positive",
      nextAction: "Rapor hazırla",
      assignedTo: "Mehmet Kaya",
    },
    {
      id: 5,
      customer: "Oğuz Yıldız",
      company: "JKL Lojistik",
      subject: "Fiyat Görüşmesi",
      type: "Yüz Yüze",
      status: "Ertelendi",
      date: "2024-01-20",
      time: "15:30",
      duration: "30 dk",
      notes: "Fiyat konusunda anlaşma sağlanamadı. Yeni teklif hazırlanacak.",
      priority: "medium",
      outcome: "negative",
      nextAction: "Revize teklif",
      assignedTo: "Fatma Özkan",
    },
    {
      id: 6,
      customer: "Murat Demir",
      company: "MNO Pazarlama",
      subject: "Kampanya Stratejisi",
      type: "Toplantı",
      status: "Tamamlandı",
      date: "2024-01-19",
      time: "09:00",
      duration: "90 dk",
      notes:
        "Yeni kampanya stratejileri üzerinde çalıştık. Yaratıcı fikirler ortaya çıktı.",
      priority: "high",
      outcome: "positive",
      nextAction: "Kampanya planı hazırla",
      assignedTo: "Selin Yıldız",
    },
    {
      id: 7,
      customer: "Elif Şahin",
      company: "PQR Eğitim",
      subject: "Eğitim Programı Görüşmesi",
      type: "Video Konferans",
      status: "Planlandı",
      date: "2024-01-18",
      time: "13:00",
      duration: "40 dk",
      notes: "Personel eğitim programları hakkında detaylı bilgi verildi.",
      priority: "medium",
      outcome: "neutral",
      nextAction: "Program detayları gönder",
      assignedTo: "Kemal Özkan",
    },
    {
      id: 8,
      customer: "Hasan Kaya",
      company: "STU Otomotiv",
      subject: "Ürün Şikayeti",
      type: "Telefon",
      status: "Tamamlandı",
      date: "2024-01-17",
      time: "14:45",
      duration: "20 dk",
      notes: "Ürün kalitesi konusunda şikayet. Değişim süreci başlatıldı.",
      priority: "high",
      outcome: "negative",
      nextAction: "Ürün değişimi organize et",
      assignedTo: "Deniz Acar",
    },
    {
      id: 9,
      customer: "Aylin Çelik",
      company: "VWX Finans",
      subject: "Yatırım Danışmanlığı",
      type: "E-posta",
      status: "Bekliyor",
      date: "2024-01-16",
      time: "11:30",
      duration: null,
      notes: "Yatırım portföyü çeşitlendirme konusunda danışmanlık talep etti.",
      priority: "low",
      outcome: "pending",
      nextAction: "Portföy analizi hazırla",
      assignedTo: "Cem Yılmaz",
    },
    {
      id: 10,
      customer: "Burak Özdemir",
      company: "YZA Teknoloji",
      subject: "Sistem Entegrasyonu",
      type: "Yüz Yüze",
      status: "Tamamlandı",
      date: "2024-01-15",
      time: "16:00",
      duration: "75 dk",
      notes:
        "Mevcut sistemlerle entegrasyon süreci planlandı. Teknik detaylar belirlendi.",
      priority: "high",
      outcome: "positive",
      nextAction: "Entegrasyon takvimi oluştur",
      assignedTo: "Tuna Kara",
    },
    {
      id: 11,
      customer: "Seda Yıldırım",
      company: "BCD Sağlık",
      subject: "Hizmet Kalitesi Değerlendirmesi",
      type: "Toplantı",
      status: "Ertelendi",
      date: "2024-01-14",
      time: "10:00",
      duration: "50 dk",
      notes: "Hizmet kalitesi ve müşteri memnuniyeti konuları ele alındı.",
      priority: "medium",
      outcome: "neutral",
      nextAction: "Kalite raporu hazırla",
      assignedTo: "Gül Arslan",
    },
    {
      id: 12,
      customer: "Emre Koç",
      company: "EFG Lojistik",
      subject: "Kargo Takip Sistemi",
      type: "Video Konferans",
      status: "Tamamlandı",
      date: "2024-01-13",
      time: "15:15",
      duration: "35 dk",
      notes:
        "Yeni kargo takip sisteminin özellikleri tanıtıldı. Olumlu geri dönüş alındı.",
      priority: "low",
      outcome: "positive",
      nextAction: "Demo versiyonu hazırla",
      assignedTo: "Pınar Demir",
    },
  ];

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
      case "Tamamlandı":
        return "bg-primary-green text-white";
      case "Bekliyor":
        return "bg-orange text-white";
      case "Ertelendi":
        return "bg-red text-white";
      case "Planlandı":
        return "bg-blue-500 text-white";
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

  const getOutcomeColor = (outcome) => {
    switch (outcome) {
      case "positive":
        return "text-primary-green";
      case "negative":
        return "text-red";
      case "neutral":
        return "text-orange";
      default:
        return "text-gray-500";
    }
  };

  // Filtreleme ve sıralama
  const filteredCommunications = mockCommunications
    .filter((comm) => {
      const matchesSearch =
        comm.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        comm.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        comm.company.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = filterType === "all" || comm.type === filterType;
      const matchesStatus =
        filterStatus === "all" || comm.status === filterStatus;
      return matchesSearch && matchesType && matchesStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "date":
          return new Date(b.date) - new Date(a.date);
        case "customer":
          return a.customer.localeCompare(b.customer);
        case "priority":
          const priorityOrder = { high: 3, medium: 2, low: 1 };
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        default:
          return 0;
      }
    });

  // Pagination hesaplamaları
  const totalPages = Math.ceil(filteredCommunications.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCommunications = filteredCommunications.slice(
    startIndex,
    endIndex
  );

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

  // Filtre değiştiğinde sayfa 1'e dön
  const handleFilterChange = (filterFunction) => {
    setCurrentPage(1);
    filterFunction();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-bold text-dark-gray">Son İletişimler</h3>
          <p className="text-gray-600">
            Geçmiş iletişim kayıtlarını görüntüleyin ve yönetin
          </p>
        </div>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            className="border-primary-green text-primary-green hover:bg-primary-green hover:text-white bg-transparent"
          >
            <Download className="mr-2 h-4 w-4" />
            Dışa Aktar
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
        </CardContent>
      </Card>

      {/* İstatistik Kartları */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-dark-gray">
                {filteredCommunications.length}
              </p>
              <p className="text-sm text-gray-600">Toplam İletişim</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary-green">
                {
                  filteredCommunications.filter(
                    (c) => c.status === "Tamamlandı"
                  ).length
                }
              </p>
              <p className="text-sm text-gray-600">Tamamlanan</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-orange">
                {
                  filteredCommunications.filter((c) => c.status === "Bekliyor")
                    .length
                }
              </p>
              <p className="text-sm text-gray-600">Bekleyen</p>
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
              <p className="text-sm text-gray-600">Başarılı</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* İletişim Listesi */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>İletişim Geçmişi ({filteredCommunications.length})</span>
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
            {currentCommunications.length === 0 ? (
              <div className="text-center py-8">
                <MessageSquare className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  İletişim bulunamadı
                </h3>
                <p className="text-gray-600">
                  Arama kriterlerinize uygun iletişim kaydı bulunmuyor.
                </p>
              </div>
            ) : (
              currentCommunications.map((comm) => (
                <div
                  key={comm.id}
                  className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
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
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <User className="h-4 w-4" />
                      <span>{comm.assignedTo}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <span className="text-gray-500">Sonuç:</span>
                      <span
                        className={`font-medium ${getOutcomeColor(
                          comm.outcome
                        )}`}
                      >
                        {comm.outcome === "positive"
                          ? "Olumlu"
                          : comm.outcome === "negative"
                          ? "Olumsuz"
                          : comm.outcome === "neutral"
                          ? "Nötr"
                          : "Bekliyor"}
                      </span>
                    </div>
                  </div>

                  <p className="text-sm text-gray-700 mb-3 bg-gray-50 p-3 rounded">
                    {comm.notes}
                  </p>

                  {comm.nextAction && (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 text-sm">
                        <span className="text-gray-500">Sonraki Adım:</span>
                        <span className="font-medium text-orange">
                          {comm.nextAction}
                        </span>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-primary-green hover:text-primary-green/80"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-orange hover:text-orange/80"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red hover:text-red/80"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              ))
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
                      // Sadece mevcut sayfa etrafındaki sayfaları göster
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
    </div>
  );
}
