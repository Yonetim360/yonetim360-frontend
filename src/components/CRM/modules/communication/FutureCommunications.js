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

export default function FutureCommunications() {
  const { communications } = useCRMStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterPriority, setFilterPriority] = useState("all");
  const [sortBy, setSortBy] = useState("date");
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newCommunication, setNewCommunication] = useState({
    customer: "",
    company: "",
    subject: "",
    type: "",
    date: "",
    time: "",
    duration: "",
    notes: "",
    priority: "medium",
    location: "",
    reminder: "15",
  });
  const itemsPerPage = 5;

  // Mock data for future communications
  const mockFutureCommunications = [
    {
      id: 1,
      customer: "Mehmet Özkan",
      company: "Tech Solutions Ltd.",
      subject: "Yeni Proje Sunumu",
      type: "Toplantı",
      status: "Planlandı",
      date: "2024-01-25",
      time: "14:00",
      duration: "60 dk",
      notes:
        "Yeni yazılım projesi için sunum yapılacak. Teknik ekip de katılacak.",
      priority: "high",
      location: "Ofis - Toplantı Salonu A",
      reminder: "30",
      attendees: ["Ahmet Yılmaz", "Fatma Demir"],
      preparation: "Sunum hazırla, demo ortamını kontrol et",
    },
    {
      id: 2,
      customer: "Ayşe Kara",
      company: "Digital Marketing Co.",
      subject: "Pazarlama Stratejisi Görüşmesi",
      type: "Video Konferans",
      status: "Planlandı",
      date: "2024-01-26",
      time: "10:30",
      duration: "45 dk",
      notes: "Q1 pazarlama stratejileri ve bütçe planlaması konuşulacak.",
      priority: "medium",
      location: "Online - Zoom",
      reminder: "15",
      attendees: ["Selin Yıldız"],
      preparation: "Pazarlama raporlarını hazırla",
    },
    {
      id: 3,
      customer: "Can Demir",
      company: "Innovation Hub",
      subject: "Ürün Geliştirme Toplantısı",
      type: "Yüz Yüze",
      status: "Planlandı",
      date: "2024-01-27",
      time: "16:00",
      duration: "90 dk",
      notes:
        "Yeni ürün özelliklerinin detaylı incelenmesi ve roadmap planlaması.",
      priority: "high",
      location: "Müşteri Ofisi - İstanbul",
      reminder: "60",
      attendees: ["Kemal Özkan", "Deniz Acar"],
      preparation: "Ürün dokümantasyonunu gözden geçir",
    },
    {
      id: 4,
      customer: "Zeynep Yıldırım",
      company: "Finance Corp",
      subject: "Finansal Analiz Sunumu",
      type: "Telefon",
      status: "Planlandı",
      date: "2024-01-28",
      time: "11:15",
      duration: "30 dk",
      notes:
        "Aylık finansal performans analizi ve gelecek dönem projeksiyonları.",
      priority: "medium",
      location: "Telefon Görüşmesi",
      reminder: "15",
      attendees: ["Cem Yılmaz"],
      preparation: "Finansal raporları hazırla",
    },
    {
      id: 5,
      customer: "Oğuz Şahin",
      company: "Logistics Plus",
      subject: "Lojistik Çözümleri Değerlendirmesi",
      type: "E-posta",
      status: "Planlandı",
      date: "2024-01-29",
      time: "09:00",
      duration: null,
      notes: "Lojistik süreçlerinin optimizasyonu için öneriler gönderilecek.",
      priority: "low",
      location: "E-posta Yazışması",
      reminder: "0",
      attendees: ["Pınar Demir"],
      preparation: "Lojistik analiz raporunu tamamla",
    },
    {
      id: 6,
      customer: "Elif Koç",
      company: "Healthcare Systems",
      subject: "Sistem Entegrasyonu Planlaması",
      type: "Toplantı",
      status: "Planlandı",
      date: "2024-01-30",
      time: "13:30",
      duration: "75 dk",
      notes: "Mevcut sistemlerle yeni yazılımın entegrasyonu planlanacak.",
      priority: "high",
      location: "Ofis - Teknik Toplantı Odası",
      reminder: "45",
      attendees: ["Tuna Kara", "Gül Arslan"],
      preparation: "Sistem mimarisini gözden geçir",
    },
    {
      id: 7,
      customer: "Hasan Özdemir",
      company: "Retail Chain",
      subject: "Satış Performansı İncelemesi",
      type: "Video Konferans",
      status: "Planlandı",
      date: "2024-01-31",
      time: "15:45",
      duration: "50 dk",
      notes:
        "Mağaza satış performansları ve iyileştirme önerileri değerlendirilecek.",
      priority: "medium",
      location: "Online - Teams",
      reminder: "30",
      attendees: ["Seda Yıldırım"],
      preparation: "Satış raporlarını analiz et",
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

  // Filtreleme ve sıralama
  const filteredCommunications = mockFutureCommunications
    .filter((comm) => {
      const matchesSearch =
        comm.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        comm.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        comm.company.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = filterType === "all" || comm.type === filterType;
      const matchesPriority =
        filterPriority === "all" || comm.priority === filterPriority;
      return matchesSearch && matchesType && matchesPriority;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "date":
          return new Date(a.date) - new Date(b.date);
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

  // Yeni iletişim ekleme
  const handleAddCommunication = () => {
    // Burada API çağrısı yapılacak
    console.log("Yeni iletişim:", newCommunication);
    setIsAddModalOpen(false);
    setNewCommunication({
      customer: "",
      company: "",
      subject: "",
      type: "",
      date: "",
      time: "",
      duration: "",
      notes: "",
      priority: "medium",
      location: "",
      reminder: "15",
    });
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
          <Button className="bg-orange hover:bg-orange/90">
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
                {filteredCommunications.length}
              </p>
              <p className="text-sm text-gray-600">Toplam Planlanan</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-red">
                {
                  filteredCommunications.filter((c) => c.priority === "high")
                    .length
                }
              </p>
              <p className="text-sm text-gray-600">Yüksek Öncelik</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-orange">
                {
                  filteredCommunications.filter(
                    (c) => getDaysUntil(c.date) <= 3
                  ).length
                }
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
                  filteredCommunications.filter(
                    (c) => getDaysUntil(c.date) === 1
                  ).length
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
            <span>Planlanan İletişimler ({filteredCommunications.length})</span>
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
              currentCommunications.map((comm) => {
                const daysUntil = getDaysUntil(comm.date);
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
                            : daysUntil > 0
                            ? `${daysUntil} gün`
                            : "Geçmiş"}
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
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <MapPin className="h-4 w-4" />
                        <span>{comm.location}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <Bell className="h-4 w-4" />
                        <span>
                          {comm.reminder === "0"
                            ? "Hatırlatma yok"
                            : comm.reminder === "15"
                            ? "15 dk önce"
                            : comm.reminder === "30"
                            ? "30 dk önce"
                            : comm.reminder === "60"
                            ? "1 saat önce"
                            : "1 gün önce"}
                        </span>
                      </div>
                    </div>

                    <p className="text-sm text-gray-700 mb-3 bg-gray-50 p-3 rounded">
                      {comm.notes}
                    </p>

                    {comm.preparation && (
                      <div className="mb-3 p-2 bg-blue-50 rounded border-l-4 border-blue-500">
                        <p className="text-sm text-blue-700">
                          <strong>Hazırlık:</strong> {comm.preparation}
                        </p>
                      </div>
                    )}

                    {comm.attendees && comm.attendees.length > 0 && (
                      <div className="mb-3">
                        <p className="text-sm text-gray-500 mb-1">
                          Katılımcılar:
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {comm.attendees.map((attendee, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="text-xs"
                            >
                              {attendee}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

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
    </div>
  );
}
