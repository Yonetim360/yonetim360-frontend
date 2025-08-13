"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  ArrowUp,
  ArrowDown,
  Minus,
  Clock,
  User,
  Mail,
  Calendar,
  X,
  Tag,
  FileText,
} from "lucide-react";

export function RequestDetailsModal({ request, open, onOpenChange }) {
  if (!request) return null;

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case "high":
        return <ArrowUp className="w-4 h-4 text-red-500" />;
      case "medium":
        return <Minus className="w-4 h-4 text-yellow-500" />;
      case "low":
        return <ArrowDown className="w-4 h-4 text-green-500" />;
      default:
        return <Minus className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "open":
        return "bg-red-100 text-red-800";
      case "in-progress":
        return "bg-blue-100 text-blue-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "resolved":
        return "bg-green-100 text-green-800";
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
      case "pending":
        return "Beklemede";
      case "resolved":
        return "Çözüldü";
      default:
        return "Bilinmiyor";
    }
  };

  const getPriorityText = (priority) => {
    switch (priority) {
      case "high":
        return "Yüksek";
      case "medium":
        return "Orta";
      case "low":
        return "Düşük";
      case "urgent":
        return "Acil";
      default:
        return "Bilinmiyor";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                {getPriorityIcon(request.priority)}
                <span className="font-mono text-sm text-gray-600">
                  {request.id}
                </span>
                <Badge className={getStatusColor(request.status)}>
                  {getStatusText(request.status)}
                </Badge>
                <Badge variant="outline">{request.type}</Badge>
              </div>
              <DialogTitle className="text-xl mb-2">
                {request.title}
              </DialogTitle>
              <DialogDescription>
                {request.customer} tarafından {request.createdAt} tarihinde
                oluşturuldu
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6 mt-6">
          {/* Talep İçeriği */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-600" />
              <h3 className="font-semibold text-lg">Talep Detayı</h3>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 border">
              <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                {request.description || "Detaylı açıklama mevcut değil."}
              </p>
            </div>
          </div>

          <Separator />

          {/* Talep Bilgileri */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Sol Kolon - Müşteri Bilgileri */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5 text-blue-600" />
                <h3 className="font-semibold">Müşteri Bilgileri</h3>
              </div>
              <div className="space-y-3 bg-gray-50 rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <User className="w-4 h-4 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-600">Müşteri Adı</p>
                    <p className="font-medium">{request.customer}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-600">E-posta</p>
                    <p className="font-medium">{request.email}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sağ Kolon - Talep Bilgileri */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Tag className="w-5 h-5 text-blue-600" />
                <h3 className="font-semibold">Talep Bilgileri</h3>
              </div>
              <div className="space-y-3 bg-gray-50 rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-600">Oluşturulma Tarihi</p>
                    <p className="font-medium">{request.createdAt}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {getPriorityIcon(request.priority)}
                  <div>
                    <p className="text-sm text-gray-600">Öncelik</p>
                    <p className="font-medium">
                      {getPriorityText(request.priority)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
