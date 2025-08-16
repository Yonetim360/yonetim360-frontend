"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import {
  Download,
  MessageSquare,
  Users,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";

export default function ReportsPage() {
  const [dateRange, setDateRange] = useState("7days");

  const messageStats = [
    { name: "Pzt", sent: 45, delivered: 42, failed: 3 },
    { name: "Sal", sent: 52, delivered: 48, failed: 4 },
    { name: "Çar", sent: 38, delivered: 35, failed: 3 },
    { name: "Per", sent: 61, delivered: 58, failed: 3 },
    { name: "Cum", sent: 55, delivered: 51, failed: 4 },
    { name: "Cmt", sent: 33, delivered: 31, failed: 2 },
    { name: "Paz", sent: 28, delivered: 26, failed: 2 },
  ];

  const statusData = [
    { name: "Teslim Edildi", value: 291, color: "#10b981" },
    { name: "Gönderildi", value: 45, color: "#f59e0b" },
    { name: "Başarısız", value: 21, color: "#ef4444" },
  ];

  const templateUsage = [
    { name: "Randevu Hatırlatması", usage: 45 },
    { name: "Ödeme Hatırlatması", usage: 32 },
    { name: "Sipariş Hazır", usage: 67 },
    { name: "Toplantı Hatırlatması", usage: 18 },
    { name: "Sağlık Kontrolü", usage: 23 },
  ];

  const hourlyData = [
    { hour: "00", messages: 2 },
    { hour: "01", messages: 1 },
    { hour: "02", messages: 0 },
    { hour: "03", messages: 0 },
    { hour: "04", messages: 1 },
    { hour: "05", messages: 3 },
    { hour: "06", messages: 8 },
    { hour: "07", messages: 15 },
    { hour: "08", messages: 25 },
    { hour: "09", messages: 35 },
    { hour: "10", messages: 42 },
    { hour: "11", messages: 38 },
    { hour: "12", messages: 28 },
    { hour: "13", messages: 22 },
    { hour: "14", messages: 31 },
    { hour: "15", messages: 29 },
    { hour: "16", messages: 26 },
    { hour: "17", messages: 18 },
    { hour: "18", messages: 12 },
    { hour: "19", messages: 8 },
    { hour: "20", messages: 5 },
    { hour: "21", messages: 3 },
    { hour: "22", messages: 2 },
    { hour: "23", messages: 1 },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-6">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Raporlar ve Analitik
              </h1>
              <p className="text-gray-600">
                WhatsApp mesaj performansınızı analiz edin
              </p>
            </div>
            <div className="flex gap-3">
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7days">Son 7 Gün</SelectItem>
                  <SelectItem value="30days">Son 30 Gün</SelectItem>
                  <SelectItem value="90days">Son 90 Gün</SelectItem>
                  <SelectItem value="1year">Son 1 Yıl</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Rapor İndir
              </Button>
            </div>
          </div>
        </div>

        {/* Özet İstatistikler */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Toplam Gönderim
              </CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">357</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+12%</span> önceki döneme göre
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Başarı Oranı
              </CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">%94.1</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+2.1%</span> önceki döneme göre
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Ortalama Yanıt Süresi
              </CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2.3s</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">-0.2s</span> önceki döneme göre
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Aktif Müşteri
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">89</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+7</span> yeni müşteri
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Genel Bakış</TabsTrigger>
            <TabsTrigger value="performance">Performans</TabsTrigger>
            <TabsTrigger value="templates">Şablonlar</TabsTrigger>
            <TabsTrigger value="timing">Zamanlama</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Günlük Mesaj Trendi</CardTitle>
                  <CardDescription>
                    Son 7 günün mesaj gönderim istatistikleri
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      sent: { label: "Gönderilen", color: "#3b82f6" },
                      delivered: { label: "Teslim Edilen", color: "#10b981" },
                      failed: { label: "Başarısız", color: "#ef4444" },
                    }}
                    className="h-[300px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={messageStats}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="sent" fill="#3b82f6" />
                        <Bar dataKey="delivered" fill="#10b981" />
                        <Bar dataKey="failed" fill="#ef4444" />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Mesaj Durumu Dağılımı</CardTitle>
                  <CardDescription>
                    Gönderilen mesajların durum analizi
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      delivered: { label: "Teslim Edildi", color: "#10b981" },
                      sent: { label: "Gönderildi", color: "#f59e0b" },
                      failed: { label: "Başarısız", color: "#ef4444" },
                    }}
                    className="h-[300px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={statusData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) =>
                            `${name} ${(percent * 100).toFixed(0)}%`
                          }
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {statusData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <ChartTooltip content={<ChartTooltipContent />} />
                      </PieChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Performans Metrikleri</CardTitle>
                <CardDescription>Detaylı performans analizi</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-4 border rounded-lg">
                    <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-green-600">291</div>
                    <div className="text-sm text-gray-600">
                      Başarılı Gönderim
                    </div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <AlertCircle className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-yellow-600">45</div>
                    <div className="text-sm text-gray-600">Beklemede</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <XCircle className="h-8 w-8 text-red-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-red-600">21</div>
                    <div className="text-sm text-gray-600">Başarısız</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="templates" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Şablon Kullanım İstatistikleri</CardTitle>
                <CardDescription>
                  En çok kullanılan mesaj şablonları
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {templateUsage.map((template, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div className="flex-1">
                        <div className="font-medium">{template.name}</div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{
                              width: `${
                                (template.usage /
                                  Math.max(
                                    ...templateUsage.map((t) => t.usage)
                                  )) *
                                100
                              }%`,
                            }}
                          />
                        </div>
                      </div>
                      <Badge variant="secondary" className="ml-4">
                        {template.usage}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="timing" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Saatlik Mesaj Dağılımı</CardTitle>
                <CardDescription>
                  Mesajların gün içindeki dağılımı
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    messages: { label: "Mesaj Sayısı", color: "#3b82f6" },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={hourlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="hour" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line
                        type="monotone"
                        dataKey="messages"
                        stroke="#3b82f6"
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
