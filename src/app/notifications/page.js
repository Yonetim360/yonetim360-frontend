"use client";

import { useState, useEffect, useMemo } from "react";
import {
  Bell,
  Check,
  CheckCheck,
  Trash2,
  Filter,
  Search,
  X,
  AlertCircle,
  Info,
  CheckCircle,
  AlertTriangle,
  Package,
  DollarSign,
  Users,
  FileText,
  Settings,
  Eye,
} from "lucide-react";

export default function Page() {
  const [notifications, setNotifications] = useState([]);
  const [filteredNotifications, setFilteredNotifications] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedNotifications, setSelectedNotifications] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  // Mock bildirim verileri
  const mockNotifications = useMemo(
    () => [
      {
        id: 1,
        type: "success",
        category: "system",
        title: "Sistem Güncellemesi Tamamlandı",
        message:
          "ERP sistemi başarıyla v2.1.0 sürümüne güncellendi. Yeni özellikler aktif.",
        timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 dakika önce
        isRead: false,
        priority: "medium",
        sender: "Sistem",
        action: "Detayları Gör",
      },
      {
        id: 2,
        type: "warning",
        category: "inventory",
        title: "Stok Uyarısı",
        message:
          "Laptop Dell XPS 13 ürününde stok seviyesi kritik seviyeye düştü (5 adet kaldı).",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 saat önce
        isRead: false,
        priority: "high",
        sender: "Stok Yönetimi",
        action: "Stoku Görüntüle",
      },
      {
        id: 3,
        type: "error",
        category: "hr",
        title: "Bordro Hatası",
        message:
          "Ahmet Yılmaz için bordro hesaplamasında hata oluştu. Lütfen kontrol edin.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4), // 4 saat önce
        isRead: true,
        priority: "high",
        sender: "İK Departmanı",
        action: "Hatayı Düzelt",
      },
      {
        id: 4,
        type: "info",
        category: "finance",
        title: "Aylık Rapor Hazır",
        message:
          "Aralık 2024 aylık finansal raporu hazırlandı ve onayınızı bekliyor.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6), // 6 saat önce
        isRead: false,
        priority: "medium",
        sender: "Muhasebe",
        action: "Raporu İncele",
      },
      {
        id: 5,
        type: "success",
        category: "hr",
        title: "Yeni Personel Kaydı",
        message:
          "Zeynep Kaya başarıyla sisteme kaydedildi ve işe başlama tarihi belirlendi.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8), // 8 saat önce
        isRead: true,
        priority: "low",
        sender: "İK Departmanı",
        action: "Profili Görüntüle",
      },
      {
        id: 6,
        type: "warning",
        category: "system",
        title: "Bakım Bildirimi",
        message:
          "Sistem bakımı 25 Aralık 02:00-04:00 saatleri arasında gerçekleştirilecek.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12), // 12 saat önce
        isRead: false,
        priority: "medium",
        sender: "IT Departmanı",
        action: "Detayları Gör",
      },
      {
        id: 7,
        type: "info",
        category: "inventory",
        title: "Yeni Tedarikçi Eklendi",
        message:
          "ABC Teknoloji tedarikçi olarak sisteme eklendi ve onay bekliyor.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 gün önce
        isRead: true,
        priority: "low",
        sender: "Satın Alma",
        action: "Tedarikçiyi İncele",
      },
      {
        id: 8,
        type: "error",
        category: "finance",
        title: "Ödeme Hatası",
        message:
          "XYZ Şirketi faturası için ödeme işlemi başarısız oldu. Banka bilgileri kontrol edilmeli.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 gün önce
        isRead: false,
        priority: "high",
        sender: "Muhasebe",
        action: "Ödemeyi Yenile",
      },
    ],
    []
  );

  useEffect(() => {
    setNotifications(mockNotifications);
    setFilteredNotifications(mockNotifications);
  }, [mockNotifications]);

  // Filtreleme ve arama
  useEffect(() => {
    let filtered = notifications;

    // Kategori filtresi
    if (selectedFilter !== "all") {
      if (selectedFilter === "unread") {
        filtered = filtered.filter((n) => !n.isRead);
      } else if (selectedFilter === "read") {
        filtered = filtered.filter((n) => n.isRead);
      } else {
        filtered = filtered.filter((n) => n.category === selectedFilter);
      }
    }

    // Arama filtresi
    if (searchTerm) {
      filtered = filtered.filter(
        (n) =>
          n.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          n.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
          n.sender.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredNotifications(filtered);
  }, [notifications, selectedFilter, searchTerm]);

  // Bildirim türü ikonları
  const getNotificationIcon = (type) => {
    switch (type) {
      case "success":
        return <CheckCircle className="w-5 h-5 text-[#4CAF50]" />;
      case "warning":
        return <AlertTriangle className="w-5 h-5 text-[#F77F00]" />;
      case "error":
        return <AlertCircle className="w-5 h-5 text-[#EF233C]" />;
      case "info":
        return <Info className="w-5 h-5 text-blue-500" />;
      default:
        return <Bell className="w-5 h-5 text-gray-500" />;
    }
  };

  // Kategori ikonları
  const getCategoryIcon = (category) => {
    switch (category) {
      case "hr":
        return <Users className="w-4 h-4" />;
      case "finance":
        return <DollarSign className="w-4 h-4" />;
      case "inventory":
        return <Package className="w-4 h-4" />;
      case "system":
        return <Settings className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  // Zaman formatı
  const formatTime = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 60) {
      return `${minutes} dakika önce`;
    } else if (hours < 24) {
      return `${hours} saat önce`;
    } else {
      return `${days} gün önce`;
    }
  };

  // Bildirim okundu işaretle
  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  // Bildirim sil
  const deleteNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    setSelectedNotifications((prev) => prev.filter((nId) => nId !== id));
  };

  // Toplu işlemler
  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const deleteSelected = () => {
    setNotifications((prev) =>
      prev.filter((n) => !selectedNotifications.includes(n.id))
    );
    setSelectedNotifications([]);
  };

  // Checkbox seçimi
  const toggleSelection = (id) => {
    setSelectedNotifications((prev) =>
      prev.includes(id) ? prev.filter((nId) => nId !== id) : [...prev, id]
    );
  };

  const selectAll = () => {
    const allIds = filteredNotifications.map((n) => n.id);
    setSelectedNotifications(allIds);
  };

  const deselectAll = () => {
    setSelectedNotifications([]);
  };

  // İstatistikler
  const unreadCount = notifications.filter((n) => !n.isRead).length;
  const highPriorityCount = notifications.filter(
    (n) => n.priority === "high" && !n.isRead
  ).length;

  const filterOptions = [
    { value: "all", label: "Tümü", count: notifications.length },
    { value: "unread", label: "Okunmamış", count: unreadCount },
    {
      value: "read",
      label: "Okunmuş",
      count: notifications.length - unreadCount,
    },
    {
      value: "hr",
      label: "İK",
      count: notifications.filter((n) => n.category === "hr").length,
    },
    {
      value: "finance",
      label: "Finans",
      count: notifications.filter((n) => n.category === "finance").length,
    },
    {
      value: "inventory",
      label: "Stok",
      count: notifications.filter((n) => n.category === "inventory").length,
    },
    {
      value: "system",
      label: "Sistem",
      count: notifications.filter((n) => n.category === "system").length,
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAF9F6] p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-[#D0E8D0] p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#4CAF50] rounded-lg">
                <Bell className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-[#333533]">
                  Bildirimler
                </h1>
                <p className="text-gray-600">
                  Sistem bildirimleri ve güncellemeler
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <div className="w-2 h-2 bg-[#EF233C] rounded-full"></div>
                <span>{highPriorityCount} Yüksek Öncelik</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <div className="w-2 h-2 bg-[#F77F00] rounded-full"></div>
                <span>{unreadCount} Okunmamış</span>
              </div>
            </div>
          </div>

          {/* Arama ve Filtreler */}
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Bildirim ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <Filter className="w-4 h-4" />
              Filtreler
            </button>
          </div>

          {/* Filtre Seçenekleri */}
          {showFilters && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2">
                {filterOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setSelectedFilter(option.value)}
                    className={`flex items-center justify-between p-2 rounded-lg text-sm transition-colors ${
                      selectedFilter === option.value
                        ? "bg-[#4CAF50] text-white"
                        : "bg-white hover:bg-gray-100 text-gray-700"
                    }`}
                  >
                    <span>{option.label}</span>
                    <span
                      className={`text-xs px-1.5 py-0.5 rounded-full ${
                        selectedFilter === option.value
                          ? "bg-white/20 text-white"
                          : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {option.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Toplu İşlemler */}
          {selectedNotifications.length > 0 && (
            <div className="mt-4 p-3 bg-blue-50 rounded-lg flex items-center justify-between">
              <span className="text-sm text-blue-700">
                {selectedNotifications.length} bildirim seçildi
              </span>
              <div className="flex gap-2">
                <button
                  onClick={markAllAsRead}
                  className="flex items-center gap-1 px-3 py-1 bg-[#4CAF50] text-white rounded text-sm hover:bg-[#45a049]"
                >
                  <CheckCheck className="w-4 h-4" />
                  Okundu İşaretle
                </button>
                <button
                  onClick={deleteSelected}
                  className="flex items-center gap-1 px-3 py-1 bg-[#EF233C] text-white rounded text-sm hover:bg-red-600"
                >
                  <Trash2 className="w-4 h-4" />
                  Sil
                </button>
                <button
                  onClick={deselectAll}
                  className="flex items-center gap-1 px-3 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600"
                >
                  <X className="w-4 h-4" />
                  İptal
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Hızlı Eylemler */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <button
            onClick={markAllAsRead}
            className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm border border-[#D0E8D0] hover:bg-gray-50 transition-colors"
          >
            <div className="p-2 bg-[#4CAF50] rounded-lg">
              <CheckCheck className="w-5 h-5 text-white" />
            </div>
            <div className="text-left">
              <div className="font-medium text-[#333533]">
                Tümünü Okundu İşaretle
              </div>
              <div className="text-sm text-gray-600">
                {unreadCount} okunmamış bildirim
              </div>
            </div>
          </button>

          <button
            onClick={selectAll}
            className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm border border-[#D0E8D0] hover:bg-gray-50 transition-colors"
          >
            <div className="p-2 bg-[#F77F00] rounded-lg">
              <Check className="w-5 h-5 text-white" />
            </div>
            <div className="text-left">
              <div className="font-medium text-[#333533]">Tümünü Seç</div>
              <div className="text-sm text-gray-600">
                {filteredNotifications.length} bildirim
              </div>
            </div>
          </button>

          <button className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm border border-[#D0E8D0] hover:bg-gray-50 transition-colors">
            <div className="p-2 bg-blue-500 rounded-lg">
              <Settings className="w-5 h-5 text-white" />
            </div>
            <div className="text-left">
              <div className="font-medium text-[#333533]">
                Bildirim Ayarları
              </div>
              <div className="text-sm text-gray-600">Tercihleri düzenle</div>
            </div>
          </button>
        </div>

        {/* Bildirimler Listesi */}
        <div className="bg-white rounded-lg shadow-sm border border-[#D0E8D0]">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-[#333533]">
                Bildirimler ({filteredNotifications.length})
              </h2>
              {filteredNotifications.length > 0 && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={
                      selectedNotifications.length ===
                      filteredNotifications.length
                        ? deselectAll
                        : selectAll
                    }
                    className="text-sm text-[#4CAF50] hover:underline"
                  >
                    {selectedNotifications.length ===
                    filteredNotifications.length
                      ? "Seçimi Kaldır"
                      : "Tümünü Seç"}
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="divide-y divide-gray-100">
            {filteredNotifications.length === 0 ? (
              <div className="p-8 text-center">
                <Bell className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Bildirim bulunamadı
                </h3>
                <p className="text-gray-600">
                  Seçilen kriterlere uygun bildirim bulunmuyor.
                </p>
              </div>
            ) : (
              filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 hover:bg-gray-50 transition-colors ${
                    !notification.isRead ? "bg-blue-50/30" : ""
                  } ${
                    selectedNotifications.includes(notification.id)
                      ? "bg-blue-100"
                      : ""
                  }`}
                >
                  <div className="flex items-start gap-4">
                    {/* Checkbox */}
                    <input
                      type="checkbox"
                      checked={selectedNotifications.includes(notification.id)}
                      onChange={() => toggleSelection(notification.id)}
                      className="mt-1 w-4 h-4 text-[#4CAF50] border-gray-300 rounded focus:ring-[#4CAF50]"
                    />

                    {/* Bildirim İkonu */}
                    <div className="flex-shrink-0 mt-1">
                      {getNotificationIcon(notification.type)}
                    </div>

                    {/* Bildirim İçeriği */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <h3
                            className={`text-sm font-medium ${
                              !notification.isRead
                                ? "text-[#333533]"
                                : "text-gray-700"
                            }`}
                          >
                            {notification.title}
                          </h3>
                          {!notification.isRead && (
                            <div className="w-2 h-2 bg-[#4CAF50] rounded-full"></div>
                          )}
                          {notification.priority === "high" && (
                            <span className="px-2 py-0.5 bg-[#EF233C] text-white text-xs rounded-full">
                              Yüksek
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <div className="flex items-center gap-1">
                            {getCategoryIcon(notification.category)}
                            <span>{notification.sender}</span>
                          </div>
                          <span>•</span>
                          <span>{formatTime(notification.timestamp)}</span>
                        </div>
                      </div>

                      <p
                        className={`text-sm mb-3 ${
                          !notification.isRead
                            ? "text-gray-700"
                            : "text-gray-600"
                        }`}
                      >
                        {notification.message}
                      </p>

                      {/* Eylemler */}
                      <div className="flex items-center gap-3">
                        {notification.action && (
                          <button className="text-sm text-[#4CAF50] hover:underline font-medium">
                            {notification.action}
                          </button>
                        )}
                        {!notification.isRead && (
                          <button
                            onClick={() => markAsRead(notification.id)}
                            className="flex items-center gap-1 text-sm text-gray-600 hover:text-[#4CAF50]"
                          >
                            <Eye className="w-4 h-4" />
                            Okundu İşaretle
                          </button>
                        )}
                        <button
                          onClick={() => deleteNotification(notification.id)}
                          className="flex items-center gap-1 text-sm text-gray-600 hover:text-[#EF233C]"
                        >
                          <Trash2 className="w-4 h-4" />
                          Sil
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Sayfalama */}
        {filteredNotifications.length > 10 && (
          <div className="mt-6 flex items-center justify-center">
            <div className="flex items-center gap-2">
              <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50">
                Önceki
              </button>
              <span className="px-4 py-2 text-sm text-gray-600">1 / 1</span>
              <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50">
                Sonraki
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
