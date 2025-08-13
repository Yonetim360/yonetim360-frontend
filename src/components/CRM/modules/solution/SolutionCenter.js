"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Code,
  Bug,
  Lightbulb,
  Clock,
  Eye,
  Search,
  CheckCircle,
  XCircle,
  Settings,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { RequestDetailsModal } from "../../modals/solutionCenter/RequestDetailsModal";

export default function SolutionCenter() {
  const stats = [
    {
      title: "Toplam Talepler",
      value: "24",
      icon: Code,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Bug Raporları",
      value: "8",
      icon: Bug,
      color: "text-red-600",
      bgColor: "bg-red-100",
    },
    {
      title: "Özellik Talepleri",
      value: "12",
      icon: Lightbulb,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Bekleyen",
      value: "4",
      icon: Clock,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
  ];

  const requests = [
    {
      id: "REQ-001",
      title: "Dashboard yükleme sorunu",
      description:
        "Dashboard sayfası yüklenirken beyaz ekran kalıyoraaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      type: "bug",
      priority: "high",
      status: "open",
      module: "CRM Dashboard",
      createdAt: "2024-01-15",
      assignee: "Ahmet D.",
      comments: 3,
    },
    {
      id: "REQ-002",
      title: "Toplu e-posta gönderme özelliği",
      description: "Seçili müşterilere toplu e-posta gönderebilme özelliği",
      type: "feature",
      priority: "medium",
      status: "in-progress",
      module: "Müşteri Yönetimi",
      createdAt: "2024-01-14",
      assignee: "Mehmet K.",
      comments: 7,
    },
    {
      id: "REQ-003",
      title: "Rapor filtreleme iyileştirmesi",
      description: "Rapor sayfasında daha gelişmiş filtreleme seçenekleri",
      type: "improvement",
      priority: "low",
      status: "completed",
      module: "Raporlama",
      createdAt: "2024-01-12",
      assignee: "Fatma S.",
      comments: 2,
    },
  ];

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  const filteredRequests = requests.filter((request) => {
    const matchesSearch =
      request.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || request.status === statusFilter;
    const matchesType = typeFilter === "all" || request.type === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  const getTypeIcon = (type) => {
    switch (type) {
      case "bug":
        return <Bug className="w-4 h-4 text-red-600" />;
      case "feature":
        return <Lightbulb className="w-4 h-4 text-green-600" />;
      case "improvement":
        return <Settings className="w-4 h-4 text-blue-600" />;
      default:
        return <Settings className="w-4 h-4 text-gray-600" />;
    }
  };

  const getTypeText = (type) => {
    switch (type) {
      case "bug":
        return "Bug";
      case "feature":
        return "Özellik";
      case "improvement":
        return "İyileştirme";
      default:
        return "Diğer";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "critical":
        return "bg-red-100 text-red-800";
      case "high":
        return "bg-orange-100 text-orange-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityText = (priority) => {
    switch (priority) {
      case "critical":
        return "Kritik";
      case "high":
        return "Yüksek";
      case "medium":
        return "Orta";
      case "low":
        return "Düşük";
      default:
        return "Bilinmiyor";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "open":
        return <Clock className="w-4 h-4 text-orange-600" />;
      case "in-progress":
        return <Clock className="w-4 h-4 text-blue-600" />;
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "rejected":
        return <XCircle className="w-4 h-4 text-red-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "open":
        return "bg-orange-100 text-orange-800";
      case "in-progress":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "open":
        return "Açık";
      case "in-progress":
        return "İşlemde";
      case "completed":
        return "Tamamlandı";
      case "rejected":
        return "Reddedildi";
      default:
        return "Bilinmiyor";
    }
  };

  /*

  */
  const [openModal, setOpenModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Geçmiş Talepler
            </h1>
            <p className="text-gray-600 mt-1">Tüm talepleri gör</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">
                      {stat.value}
                    </p>
                  </div>
                  <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                    <stat.icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <CardTitle>Talepler ({filteredRequests.length})</CardTitle>
              <div className="flex gap-4 md:gap-2 w-auto md:w-full flex-col md:flex-row">
                <div className="relative flex-1 sm:flex-initial">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Talep ara..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-full sm:w-64"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Durum" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tümü</SelectItem>
                    <SelectItem value="open">Açık</SelectItem>
                    <SelectItem value="in-progress">İşlemde</SelectItem>
                    <SelectItem value="completed">Tamamlandı</SelectItem>
                    <SelectItem value="rejected">Reddedildi</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Tür" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tümü</SelectItem>
                    <SelectItem value="bug">Bug</SelectItem>
                    <SelectItem value="feature">Özellik</SelectItem>
                    <SelectItem value="improvement">İyileştirme</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredRequests.map((request) => (
                <div
                  key={request.id}
                  className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {getTypeIcon(request.type)}
                        <span className="font-mono text-sm text-gray-600">
                          {request.id}
                        </span>
                        <Badge className={getStatusColor(request.status)}>
                          <div className="flex items-center gap-1">
                            {getStatusIcon(request.status)}
                            {getStatusText(request.status)}
                          </div>
                        </Badge>
                        <Badge variant="outline" className={"hidden md:block"}>
                          {getTypeText(request.type)}
                        </Badge>
                        <Badge className={getPriorityColor(request.priority)}>
                          {getPriorityText(request.priority)}
                        </Badge>
                      </div>
                      <h3 className="font-medium text-gray-900 mb-1">
                        {request.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">
                        {request.description}
                      </p>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                        <span>Modül: {request.module}</span>
                        <span>Tarih: {request.createdAt}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => (
                          setOpenModal(true), setSelectedRequest(request)
                        )}
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        Detay
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {filteredRequests.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <p>Arama kriterlerinize uygun talep bulunamadı.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      <RequestDetailsModal
        open={openModal}
        onOpenChange={setOpenModal}
        request={selectedRequest}
      />
    </div>
  );
}
