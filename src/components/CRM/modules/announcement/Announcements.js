"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Megaphone, Users, Send, X } from "lucide-react";
import { RepresentativeStore } from "@/stores/crm/domains/RepresentativeStore";

export default function AnnouncementsPage() {
  const [selectedRepresentatives, setSelectedRepresentatives] = useState([]);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { representatives, fetchRepresentatives } = RepresentativeStore();

  useEffect(() => {
    if (representatives.length === 0) {
      fetchRepresentatives();
    }
  }, [representatives.length, fetchRepresentatives]);

  const handleRepresentativeSelect = (repId) => {
    if (repId === "all") {
      // Tüm representative'leri seç
      const allRepIds = representatives.map((rep) => rep.id);
      setSelectedRepresentatives(allRepIds);
    } else {
      setSelectedRepresentatives((prev) => {
        if (prev.includes(repId)) {
          // Zaten seçili ise kaldır
          return prev.filter((id) => id !== repId);
        } else {
          // Seçili değilse ekle
          return [...prev, repId];
        }
      });
    }
  };

  const removeRepresentative = (repId) => {
    setSelectedRepresentatives((prev) => prev.filter((id) => id !== repId));
  };

  const handleSendAnnouncement = async () => {
    if (!message.trim() || selectedRepresentatives.length === 0) {
      toast.error("Lütfen mesaj yazın ve en az bir personel seçin.");
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const selectedCount = selectedRepresentatives.length;
      toast.success(`Duyuru ${selectedCount} personele başarıyla gönderildi.`);

      // Reset form
      setMessage("");
      setSelectedRepresentatives([]);
    } catch (error) {
      toast.error("Duyuru gönderilirken bir hata oluştu.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setMessage("");
    setSelectedRepresentatives([]);
  };

  // Seçili representative'lerin bilgilerini al
  const getSelectedRepresentatives = () => {
    return selectedRepresentatives
      .map((repId) => representatives.find((rep) => rep.id === repId))
      .filter((rep) => rep !== undefined);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-4xl space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <Megaphone className="h-8 w-8 text-yellow-600" />
            <h1 className="text-4xl font-bold text-gray-900">Duyurular</h1>
          </div>
          <p className="text-gray-600">
            Personellere önemli duyuruları gönderin ve ekibinizi bilgilendirin.
          </p>
        </div>

        <div className="border-t border-yellow-200"></div>

        {/* Main Form */}
        <Card className="border-gray-200 bg-white shadow-sm">
          <CardHeader className="bg-yellow-50 -mt-6 border-b border-yellow-100 rounded-xl">
            <CardTitle className="text-2xl text-yellow-900 mt-3">
              Yeni Duyuru Oluştur
            </CardTitle>
            <CardDescription className="text-yellow-700 mb-2">
              Göndermek istediğiniz personelleri seçin ve duyuru mesajınızı
              yazın.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 p-6">
            {/* Representative Selection */}
            <div className="space-y-3">
              <Label
                htmlFor="representative-select"
                className="text-base font-medium text-gray-900"
              >
                Hedef Personeller
              </Label>
              <Select onValueChange={handleRepresentativeSelect}>
                <SelectTrigger className="w-full border-gray-300 focus:border-yellow-500 focus:ring-yellow-500">
                  <SelectValue placeholder="Personel seçin..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">
                    <div className="flex items-center justify-between w-full">
                      <Badge
                        variant="secondary"
                        className="mr-2 bg-blue-100 text-blue-800"
                      >
                        <Users className="h-3 w-3" />
                      </Badge>
                      <span>Tüm Personeller</span>
                    </div>
                  </SelectItem>
                  {representatives.map((rep) => (
                    <SelectItem key={rep.id} value={rep.id}>
                      <div className="flex items-center justify-between w-full">
                        <Badge
                          variant="secondary"
                          className="mr-2 bg-yellow-100 text-yellow-800"
                        >
                          <Users className="h-3 w-3" />
                        </Badge>
                        <span>
                          {rep.firstName} {rep.lastName}
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Selected Representatives */}
              {selectedRepresentatives.length > 0 && (
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">
                    Seçili Personeller ({selectedRepresentatives.length}):
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {getSelectedRepresentatives().map((rep) => (
                      <Badge
                        key={rep.id}
                        className="flex items-center gap-1 bg-yellow-600 text-white hover:bg-yellow-700"
                      >
                        {rep.firstName} {rep.lastName}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-4 w-4 p-0 hover:bg-yellow-700"
                          onClick={() => removeRepresentative(rep.id)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Message Input */}
            <div className="space-y-3">
              <Label
                htmlFor="message"
                className="text-base font-medium text-gray-900"
              >
                Duyuru Mesajı
              </Label>
              <Textarea
                id="message"
                placeholder="Duyuru mesajınızı buraya yazın..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="min-h-[120px] resize-none border-gray-300 focus:border-yellow-500 focus:ring-yellow-500"
                maxLength={500}
              />
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>Mesajınızı net ve anlaşılır şekilde yazın</span>
                <span>{message.length}/500</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button
                onClick={handleSendAnnouncement}
                disabled={
                  isLoading ||
                  !message.trim() ||
                  selectedRepresentatives.length === 0
                }
                className="flex-1 sm:flex-none bg-yellow-600 hover:bg-yellow-700 text-white"
              >
                <Send className="h-4 w-4 mr-2" />
                {isLoading ? "Gönderiliyor..." : "Duyuru Gönder"}
              </Button>
              <Button
                variant="secondary"
                onClick={handleCancel}
                disabled={isLoading}
                className="bg-gray-100 hover:bg-gray-200 text-gray-900"
              >
                İptal
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Info Card */}
        <Card className="border-yellow-200 bg-yellow-50">
          <CardContent className="pt-4">
            <div className="flex items-start gap-3">
              <div className="rounded-full bg-yellow-100 p-2">
                <Megaphone className="h-4 w-4 text-yellow-600" />
              </div>
              <div className="space-y-1">
                <h3 className="font-medium text-yellow-900">Duyuru Hakkında</h3>
                <p className="text-sm text-yellow-700">
                  Gönderdiğiniz duyurular personellerin bildirimler sayfasında
                  görüntülenecektir. Önemli bilgileri paylaşmak için bu modülü
                  kullanabilirsiniz.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
