import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ModalStore } from "@/stores/crm/shared/ModalStore";
import { Bug, Lightbulb, Send, Settings } from "lucide-react";
import { useState } from "react";

export default function NewRequest() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "",
    priority: "",
    module: "",
    stepsToReproduce: "",
    email: "",
    phone: "",
    preferedContact: "",
  });
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  const { setActiveSubModule } = ModalStore();

  const requestTypes = [
    { value: "bug", label: "Bug Raporu", icon: Bug, color: "text-red-600" },
    {
      value: "feature",
      label: "Özellik Talebi",
      icon: Lightbulb,
      color: "text-green-600",
    },
    {
      value: "improvement",
      label: "İyileştirme",
      icon: Settings,
      color: "text-blue-600",
    },
  ];

  const priorities = [
    { value: "low", label: "Düşük", color: "bg-green-100 text-green-800" },
    { value: "medium", label: "Orta", color: "bg-yellow-100 text-yellow-800" },
    { value: "high", label: "Yüksek", color: "bg-orange-100 text-orange-800" },
    { value: "critical", label: "Kritik", color: "bg-red-100 text-red-800" },
  ];

  const modules = ["CRM Modülü", "ERP Modülü", "İK Modülü"];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Dosya ile birlikte form verisi hazırlama örneği:
    // const formDataToSend = new FormData();
    // Object.entries(formData).forEach(([key, value]) => formDataToSend.append(key, value));
    // if (file) formDataToSend.append("file", file);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    const requestId = `REQ-${Date.now().toString().slice(-6)}`;

    console.log("Yeni talep oluşturuldu:", {
      id: requestId,
      ...formData,
      createdAt: new Date().toISOString(),
      status: "open",
    });

    setFormData({
      title: "",
      description: "",
      type: "",
      priority: "",
      module: "",
      stepsToReproduce: "",
    });

    setIsSubmitting(false);
    setActiveSubModule("");
    // setActiveModule("solution-center")
  };
  return (
    <div className="max-w-2xl mx-auto">
      <Card className={"my-4"}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Send className="w-5 h-5" />
            Yeni Talep oluştur
          </CardTitle>
          <CardDescription>
            Bug raporu, özellik talebi veya iyileştirme önerisi gönderin
          </CardDescription>
        </CardHeader>
      </Card>
      <Card>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="type">Talep Türü</Label>
              <Select
                value={formData.type}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, type: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Talep türünü seçin" />
                </SelectTrigger>
                <SelectContent>
                  {requestTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      <div className="flex items-center gap-2">
                        <type.icon className={`w-4 h-4 ${type.color}`} />
                        {type.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="title">Başlık</Label>
              <Input
                id="title"
                placeholder="Kısa ve açıklayıcı bir başlık yazın"
                value={formData.title}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, title: e.target.value }))
                }
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="priority">Öncelik</Label>
                <Select
                  value={formData.priority}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, priority: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Öncelik seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    {priorities.map((priority) => (
                      <SelectItem key={priority.value} value={priority.value}>
                        <Badge className={priority.color}>
                          {priority.label}
                        </Badge>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="module">İlgili Modül</Label>
                <Select
                  value={formData.module}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, module: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Modül seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    {modules.map((module) => (
                      <SelectItem key={module} value={module}>
                        {module}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">E-posta</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="E-posta adresinizi girin"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, email: e.target.value }))
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Telefon (Opsiyonel)</Label>
                <Input
                  id="phone"
                  type="number"
                  placeholder="Telefon numaranızı girin"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, phone: e.target.value }))
                  }
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="preferedContact">
                Tercih Edilen İletişim Yöntemi
              </Label>
              <Select
                id="preferedContact"
                value={formData.preferedContact || ""}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, preferedContact: value }))
                }
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="İletişim yöntemi seçin" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="email">E-posta</SelectItem>
                  <SelectItem value="phone">Telefon</SelectItem>
                  <SelectItem value="online">Online Görüşme</SelectItem>
                  <SelectItem value="sms">SMS</SelectItem>
                  <SelectItem value="notification">
                    Uygulama İçi Bildirim
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Dosya ekleme alanı */}
            <div className="space-y-2">
              <Label htmlFor="file">Dosya Ekle (Opsiyonel)</Label>
              <Input
                id="file"
                type="file"
                onChange={handleFileChange}
                accept=".jpg,.jpeg,.png,.pdf,.doc,.docx,.xls,.xlsx,.txt"
              />
              {file && (
                <div className="text-sm text-gray-600">
                  Seçilen dosya:{" "}
                  <span className="font-medium">{file.name}</span>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Detaylı Açıklama</Label>
              <Textarea
                id="description"
                placeholder={
                  formData.type === "bug"
                    ? "Karşılaştığınız sorunu detaylı olarak açıklayın..."
                    : formData.type === "feature"
                    ? "İstediğiniz özelliği detaylı olarak açıklayın..."
                    : "İyileştirme önerinizi detaylı olarak açıklayın..."
                }
                rows={4}
                value={formData.description}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                required
              />
            </div>

            {formData.type === "bug" && (
              <div className="space-y-2">
                <Label htmlFor="stepsToReproduce">
                  Hatayı Tekrarlama Adımları
                </Label>
                <Textarea
                  id="stepsToReproduce"
                  placeholder="1. İlk adım&#10;2. İkinci adım&#10;3. Hatanın oluştuğu adım"
                  rows={3}
                  value={formData.stepsToReproduce}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      stepsToReproduce: e.target.value,
                    }))
                  }
                />
              </div>
            )}

            <div className="flex gap-3 pt-4">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-indigo-600 hover:bg-indigo-400"
              >
                {isSubmitting ? "Gönderiliyor..." : "Talep Gönder"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
