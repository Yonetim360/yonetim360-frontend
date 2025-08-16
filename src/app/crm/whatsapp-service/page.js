import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  MessageSquare,
  Clock,
  Users,
  BarChart3,
  Send,
  Calendar,
  CheckCircle,
} from "lucide-react";
import Link from "next/link";

export default function Page() {
  const stats = [
    {
      title: "Toplam Hatırlatma",
      value: "156",
      description: "Bu ay oluşturulan",
      icon: Clock,
      color: "text-blue-600",
    },
    {
      title: "Gönderilen Mesaj",
      value: "1,234",
      description: "Bu ay gönderilen",
      icon: Send,
      color: "text-green-600",
    },
    {
      title: "Aktif Müşteri",
      value: "89",
      description: "Mesaj alan müşteri",
      icon: Users,
      color: "text-purple-600",
    },
    {
      title: "Başarı Oranı",
      value: "%94.2",
      description: "Teslim edilen mesajlar",
      icon: CheckCircle,
      color: "text-emerald-600",
    },
  ];

  const recentReminders = [
    {
      id: 1,
      customer: "Ahmet Yılmaz",
      message: "Randevunuz yarın saat 14:00'da",
      scheduledTime: "2024-01-15 09:00",
      status: "scheduled",
    },
    {
      id: 2,
      customer: "Fatma Kaya",
      message: "Ödeme hatırlatması",
      scheduledTime: "2024-01-15 10:30",
      status: "sent",
    },
    {
      id: 3,
      customer: "Mehmet Demir",
      message: "Toplantı hatırlatması",
      scheduledTime: "2024-01-15 11:00",
      status: "delivered",
    },
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case "scheduled":
        return (
          <Badge variant="outline" className="text-blue-600">
            Planlandı
          </Badge>
        );
      case "sent":
        return (
          <Badge variant="outline" className="text-yellow-600">
            Gönderildi
          </Badge>
        );
      case "delivered":
        return (
          <Badge variant="outline" className="text-green-600">
            Teslim Edildi
          </Badge>
        );
      default:
        return <Badge variant="outline">Bilinmiyor</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            WhatsApp Hatırlatma Modülü
          </h1>
          <p className="text-gray-600">
            CRM sisteminiz için WhatsApp hatırlatma ve mesajlaşma yönetimi
          </p>
        </div>

        {/* İstatistikler */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Hızlı Eylemler */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Hızlı Eylemler</CardTitle>
              <CardDescription>Sık kullanılan işlemler</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link href="whatsapp-service/reminders/create">
                <Button
                  className="w-full justify-start bg-transparent"
                  variant="outline"
                >
                  <Clock className="mr-2 h-4 w-4" />
                  Yeni Hatırlatma Oluştur
                </Button>
              </Link>
              <Link href="whatsapp-service/messages">
                <Button
                  className="w-full justify-start bg-transparent"
                  variant="outline"
                >
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Manuel Mesaj Gönder
                </Button>
              </Link>
              <Link href="whatsapp-service/templates">
                <Button
                  className="w-full justify-start bg-transparent"
                  variant="outline"
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  Şablon Yönet
                </Button>
              </Link>
              <Link href="whatsapp-service/reports">
                <Button
                  className="w-full justify-start bg-transparent"
                  variant="outline"
                >
                  <BarChart3 className="mr-2 h-4 w-4" />
                  Raporları Görüntüle
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Son Hatırlatmalar */}
          <Card className="lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Son Hatırlatmalar</CardTitle>
                <CardDescription>
                  Yakın zamanda oluşturulan hatırlatmalar
                </CardDescription>
              </div>
              <Link href="whatsapp-service/reminders">
                <Button variant="outline" size="sm">
                  Tümünü Gör
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentReminders.map((reminder) => (
                  <div
                    key={reminder.id}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div className="flex-1">
                      <div className="font-medium">{reminder.customer}</div>
                      <div className="text-sm text-gray-600 truncate max-w-xs">
                        {reminder.message}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {reminder.scheduledTime}
                      </div>
                    </div>
                    <div className="ml-4">
                      {getStatusBadge(reminder.status)}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
