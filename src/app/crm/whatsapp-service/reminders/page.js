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
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Edit,
  Trash2,
  Send,
} from "lucide-react";
import Link from "next/link";

export default function Page() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const reminders = [
    {
      id: 1,
      customer: "Ahmet Yılmaz",
      phone: "+90 532 123 4567",
      message: "Randevunuz yarın saat 14:00'da. Lütfen zamanında gelin.",
      scheduledTime: "2024-01-15 09:00",
      status: "scheduled",
      template: "Randevu Hatırlatması",
    },
    {
      id: 2,
      customer: "Fatma Kaya",
      phone: "+90 533 987 6543",
      message:
        "Ödeme tarihiniz geçmiştir. Lütfen en kısa sürede ödemenizi yapın.",
      scheduledTime: "2024-01-15 10:30",
      status: "sent",
      template: "Ödeme Hatırlatması",
    },
    {
      id: 3,
      customer: "Mehmet Demir",
      phone: "+90 534 555 1234",
      message: "Toplantımız bugün saat 16:00'da başlayacak.",
      scheduledTime: "2024-01-15 11:00",
      status: "delivered",
      template: "Toplantı Hatırlatması",
    },
    {
      id: 4,
      customer: "Ayşe Özkan",
      phone: "+90 535 777 8888",
      message: "Doktor kontrolünüz için randevunuz var.",
      scheduledTime: "2024-01-16 08:00",
      status: "scheduled",
      template: "Sağlık Hatırlatması",
    },
    {
      id: 5,
      customer: "Can Yıldız",
      phone: "+90 536 999 0000",
      message: "Siparişiniz hazır, teslim alabilirsiniz.",
      scheduledTime: "2024-01-14 15:30",
      status: "failed",
      template: "Sipariş Hatırlatması",
    },
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case "scheduled":
        return (
          <Badge variant="outline" className="text-blue-600 border-blue-200">
            Planlandı
          </Badge>
        );
      case "sent":
        return (
          <Badge
            variant="outline"
            className="text-yellow-600 border-yellow-200"
          >
            Gönderildi
          </Badge>
        );
      case "delivered":
        return (
          <Badge variant="outline" className="text-green-600 border-green-200">
            Teslim Edildi
          </Badge>
        );
      case "failed":
        return (
          <Badge variant="outline" className="text-red-600 border-red-200">
            Başarısız
          </Badge>
        );
      default:
        return <Badge variant="outline">Bilinmiyor</Badge>;
    }
  };

  const filteredReminders = reminders.filter((reminder) => {
    const matchesSearch =
      reminder.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reminder.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || reminder.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-6">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Hatırlatmalar
              </h1>
              <p className="text-gray-600">
                Tüm WhatsApp hatırlatmalarınızı yönetin
              </p>
            </div>
            <Link href="reminders/create">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Yeni Hatırlatma
              </Button>
            </Link>
          </div>

          {/* Filtreler */}
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Müşteri adı veya mesaj içeriği ara..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full sm:w-48">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Durum filtrele" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tüm Durumlar</SelectItem>
                    <SelectItem value="scheduled">Planlandı</SelectItem>
                    <SelectItem value="sent">Gönderildi</SelectItem>
                    <SelectItem value="delivered">Teslim Edildi</SelectItem>
                    <SelectItem value="failed">Başarısız</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Hatırlatma Listesi */}
          <Card>
            <CardHeader>
              <CardTitle>
                Hatırlatma Listesi ({filteredReminders.length})
              </CardTitle>
              <CardDescription>
                Oluşturduğunuz tüm hatırlatmaları görüntüleyin ve yönetin
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Müşteri</TableHead>
                      <TableHead>Telefon</TableHead>
                      <TableHead>Mesaj</TableHead>
                      <TableHead>Gönderim Zamanı</TableHead>
                      <TableHead>Şablon</TableHead>
                      <TableHead>Durum</TableHead>
                      <TableHead className="text-right">İşlemler</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredReminders.map((reminder) => (
                      <TableRow key={reminder.id}>
                        <TableCell className="font-medium">
                          {reminder.customer}
                        </TableCell>
                        <TableCell>{reminder.phone}</TableCell>
                        <TableCell className="max-w-xs truncate">
                          {reminder.message}
                        </TableCell>
                        <TableCell>{reminder.scheduledTime}</TableCell>
                        <TableCell>{reminder.template}</TableCell>
                        <TableCell>{getStatusBadge(reminder.status)}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                Düzenle
                              </DropdownMenuItem>
                              {reminder.status === "failed" && (
                                <DropdownMenuItem>
                                  <Send className="mr-2 h-4 w-4" />
                                  Yeniden Gönder
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuItem className="text-red-600">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Sil
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
