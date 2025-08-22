"use client";

import { useState } from "react";
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

// Mock team data
const teams = [
  { id: "all", name: "Tüm Personel", memberCount: 45 },
  { id: "sales", name: "Satış Ekibi", memberCount: 12 },
  { id: "marketing", name: "Pazarlama Ekibi", memberCount: 8 },
  { id: "development", name: "Geliştirme Ekibi", memberCount: 15 },
  { id: "support", name: "Destek Ekibi", memberCount: 6 },
  { id: "hr", name: "İnsan Kaynakları", memberCount: 4 },
];

export default function AnnouncementsPage() {
  const [selectedTeams, setSelectedTeams] = useState([]);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleTeamSelect = (teamId) => {
    if (teamId === "all") {
      setSelectedTeams(["all"]);
    } else {
      setSelectedTeams((prev) => {
        const filtered = prev.filter((id) => id !== "all");
        if (filtered.includes(teamId)) {
          return filtered.filter((id) => id !== teamId);
        } else {
          return [...filtered, teamId];
        }
      });
    }
  };

  const removeTeam = (teamId) => {
    setSelectedTeams((prev) => prev.filter((id) => id !== teamId));
  };

  const getTotalRecipients = () => {
    if (selectedTeams.includes("all")) {
      return teams.find((team) => team.id === "all")?.memberCount || 0;
    }
    return selectedTeams.reduce((total, teamId) => {
      const team = teams.find((t) => t.id === teamId);
      return total + (team?.memberCount || 0);
    }, 0);
  };

  const handleSendAnnouncement = async () => {
    if (!message.trim() || selectedTeams.length === 0) {
      toast.error("Lütfen mesaj yazın ve en az bir ekip seçin.");
      return;
    }

    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast.success(
      `${getTotalRecipients()} kişiye duyuru başarıyla gönderildi.`
    );

    // Reset form
    setMessage("");
    setSelectedTeams([]);
    setIsLoading(false);
  };

  const handleCancel = () => {
    setMessage("");
    setSelectedTeams([]);
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
              Göndermek istediğiniz ekipleri seçin ve duyuru mesajınızı yazın.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 p-6">
            {/* Team Selection */}
            <div className="space-y-3">
              <Label
                htmlFor="team-select"
                className="text-base font-medium text-gray-900"
              >
                Hedef Ekipler
              </Label>
              <Select onValueChange={handleTeamSelect}>
                <SelectTrigger className="w-full border-gray-300 focus:border-yellow-500 focus:ring-yellow-500">
                  <SelectValue placeholder="Ekip seçin..." />
                </SelectTrigger>
                <SelectContent>
                  {teams.map((team) => (
                    <SelectItem key={team.id} value={team.id}>
                      <div className="flex items-center justify-between w-full">
                        <span>{team.name}</span>
                        <Badge
                          variant="secondary"
                          className="ml-2 bg-yellow-100 text-yellow-800"
                        >
                          <Users className="h-3 w-3 mr-1" />
                          {team.memberCount}
                        </Badge>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Selected Teams */}
              {selectedTeams.length > 0 && (
                <div className="space-y-2">
                  <div className="flex flex-wrap gap-2">
                    {selectedTeams.map((teamId) => {
                      const team = teams.find((t) => t.id === teamId);
                      return (
                        <Badge
                          key={teamId}
                          className="flex items-center gap-1 bg-yellow-600 text-white hover:bg-yellow-700"
                        >
                          {team?.name}
                          <Button
                            variant={"ghost"}
                            className="h-5 w-5"
                            onClick={() => removeTeam(team.id)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </Badge>
                      );
                    })}
                  </div>
                  <p className="text-sm text-gray-600">
                    Toplam {getTotalRecipients()} kişiye gönderilecek
                  </p>
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
                  isLoading || !message.trim() || selectedTeams.length === 0
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
