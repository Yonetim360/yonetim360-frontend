"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CommunicationStore } from "@/stores/crm/domains/CommunicationStore";
// import { Progress } from "@/components/ui/progress";
import {
  AlertCircle,
  Clock,
  Phone,
  Plus,
  Mail,
  MessageSquare,
  Calendar,
  TrendingUp,
  Users,
  Target,
  CheckCircle,
  ArrowRight,
  BarChart3,
  Activity,
} from "lucide-react";

export default function Communication() {
  const { communications, setIsCommunicationModalOpen } = CommunicationStore();

  // Mock data for demonstration
  const communicationStats = {
    thisWeek: 24,
    totalHours: 12.5,
    pending: 3,
    completed: 18,
    scheduled: 7,
    successRate: 85,
  };

  const communicationTypes = [
    { type: "Telefon", count: 45, percentage: 40, color: "bg-orange" },
    { type: "E-posta", count: 32, percentage: 28, color: "bg-primary-green" },
    { type: "Toplantı", count: 23, percentage: 20, color: "bg-blue-500" },
    { type: "WhatsApp", count: 14, percentage: 12, color: "bg-green-500" },
  ];

  const recentActivities = [
    {
      id: 1,
      type: "call",
      customer: "Ahmet Yılmaz",
      subject: "Ürün Bilgilendirme",
      time: "2 saat önce",
      status: "completed",
      priority: "high",
    },
    {
      id: 2,
      type: "email",
      customer: "Fatma Özkan",
      subject: "Teklif Sunumu",
      time: "4 saat önce",
      status: "pending",
      priority: "medium",
    },
    {
      id: 3,
      type: "meeting",
      customer: "Mehmet Kaya",
      subject: "Proje Görüşmesi",
      time: "1 gün önce",
      status: "completed",
      priority: "high",
    },
  ];

  const upcomingTasks = [
    {
      id: 1,
      task: "ABC Şirketi ile toplantı",
      time: "Bugün 14:00",
      type: "meeting",
      priority: "high",
    },
    {
      id: 2,
      task: "XYZ Ltd. teklif takibi",
      time: "Yarın 10:00",
      type: "call",
      priority: "medium",
    },
    {
      id: 3,
      task: "DEF A.Ş. e-posta gönderimi",
      time: "Yarın 15:30",
      type: "email",
      priority: "low",
    },
  ];

  const getTypeIcon = (type) => {
    switch (type) {
      case "call":
        return <Phone className="h-4 w-4" />;
      case "email":
        return <Mail className="h-4 w-4" />;
      case "meeting":
        return <Calendar className="h-4 w-4" />;
      default:
        return <MessageSquare className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-primary-green text-white";
      case "pending":
        return "bg-orange text-white";
      case "scheduled":
        return "bg-blue-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "border-l-red";
      case "medium":
        return "border-l-orange";
      case "low":
        return "border-l-primary-green";
      default:
        return "border-l-gray-300";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-bold text-dark-gray">
            İletişim ve Görüşme Takibi
          </h3>
          <p className="text-gray-600">
            Müşteri iletişimlerini kaydedin, takip edin ve analiz edin
          </p>
        </div>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            className="border-primary-green text-primary-green hover:bg-primary-green hover:text-white bg-transparent"
          >
            <BarChart3 className="mr-2 h-4 w-4" />
            Raporlar
          </Button>
          <Button
            className="bg-orange hover:bg-orange/90"
            onClick={() => setIsCommunicationModalOpen(true)}
          >
            <Plus className="mr-2 h-4 w-4" />
            Yeni İletişim
          </Button>
        </div>
      </div>

      {/* Ana İstatistikler */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-orange">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Bu Hafta</p>
                <p className="text-2xl font-bold text-dark-gray">
                  {communicationStats.thisWeek}
                </p>
                <p className="text-xs text-orange">+15% geçen haftaya göre</p>
              </div>
              <Phone className="h-8 w-8 text-orange" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-primary-green">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Toplam Süre</p>
                <p className="text-2xl font-bold text-dark-gray">
                  {communicationStats.totalHours} saat
                </p>
                <p className="text-xs text-primary-green">Bu hafta</p>
              </div>
              <Clock className="h-8 w-8 text-primary-green" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-red">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Bekleyen</p>
                <p className="text-2xl font-bold text-dark-gray">
                  {communicationStats.pending}
                </p>
                <p className="text-xs text-red">Acil takip gerekli</p>
              </div>
              <AlertCircle className="h-8 w-8 text-red" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Başarı Oranı</p>
                <p className="text-2xl font-bold text-dark-gray">
                  %{communicationStats.successRate}
                </p>
                <p className="text-xs text-blue-500">Bu ay</p>
              </div>
              <Target className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* İletişim Türleri ve Performans */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-dark-gray flex items-center">
              <Activity className="mr-2 h-5 w-5 text-primary-green" />
              İletişim Türleri Dağılımı
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {communicationTypes.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-dark-gray">
                      {item.type}
                    </span>
                    <span className="text-sm text-gray-600">
                      {item.count} adet
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`${item.color} h-2 rounded-full transition-all duration-300`}
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-500">
                    %{item.percentage}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-dark-gray flex items-center">
              <TrendingUp className="mr-2 h-5 w-5 text-primary-green" />
              Haftalık Performans
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Tamamlanan</span>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-primary-green" />
                  <span className="font-semibold text-dark-gray">
                    {communicationStats.completed}
                  </span>
                </div>
              </div>
              {/* <Progress value={75} className="h-2" /> */}

              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Bekleyen</span>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-orange" />
                  <span className="font-semibold text-dark-gray">
                    {communicationStats.pending}
                  </span>
                </div>
              </div>
              {/* <Progress value={15} className="h-2" /> */}

              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Planlanmış</span>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-blue-500" />
                  <span className="font-semibold text-dark-gray">
                    {communicationStats.scheduled}
                  </span>
                </div>
              </div>
              {/* <Progress value={35} className="h-2" /> */}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Son Aktiviteler ve Yaklaşan Görevler */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-dark-gray flex items-center justify-between">
              <div className="flex items-center">
                <Activity className="mr-2 h-5 w-5 text-primary-green" />
                Son Aktiviteler
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="text-primary-green hover:text-primary-green/80"
              >
                Tümünü Gör
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div
                  key={activity.id}
                  className={`p-4 rounded-lg border-l-4 ${getPriorityColor(
                    activity.priority
                  )} bg-gray-50`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <div className="p-2 rounded-full bg-white">
                        {getTypeIcon(activity.type)}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-dark-gray">
                          {activity.customer}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {activity.subject}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {activity.time}
                        </p>
                      </div>
                    </div>
                    <Badge className={getStatusColor(activity.status)}>
                      {activity.status === "completed"
                        ? "Tamamlandı"
                        : "Bekliyor"}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-dark-gray flex items-center justify-between">
              <div className="flex items-center">
                <Calendar className="mr-2 h-5 w-5 text-orange" />
                Yaklaşan Görevler
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="text-orange hover:text-orange/80"
              >
                Takvim
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingTasks.map((task) => (
                <div
                  key={task.id}
                  className={`p-4 rounded-lg border-l-4 ${getPriorityColor(
                    task.priority
                  )} bg-gray-50`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-full bg-white">
                        {getTypeIcon(task.type)}
                      </div>
                      <div>
                        <h4 className="font-medium text-dark-gray">
                          {task.task}
                        </h4>
                        <p className="text-sm text-gray-600">{task.time}</p>
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className={`${
                        task.priority === "high"
                          ? "border-red text-red"
                          : task.priority === "medium"
                          ? "border-orange text-orange"
                          : "border-primary-green text-primary-green"
                      }`}
                    >
                      {task.priority === "high"
                        ? "Yüksek"
                        : task.priority === "medium"
                        ? "Orta"
                        : "Düşük"}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
