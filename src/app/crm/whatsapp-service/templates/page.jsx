"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Plus,
  FileText,
  Edit,
  Trash2,
  Copy,
  MoreHorizontal,
} from "lucide-react";

export default function TemplatesPage() {
  const [templates, setTemplates] = useState([
    {
      id: 1,
      name: "Randevu Hatırlatması",
      category: "Randevu",
      content:
        "Merhaba {name}, randevunuz {date} tarihinde {time} saatinde. Lütfen zamanında gelin.",
      variables: ["name", "date", "time"],
      usageCount: 45,
      createdAt: "2024-01-10",
    },
    {
      id: 2,
      name: "Ödeme Hatırlatması",
      category: "Finans",
      content:
        "Sayın {name}, {amount} TL tutarındaki ödemenizin son tarihi {date}. Lütfen ödemenizi yapınız.",
      variables: ["name", "amount", "date"],
      usageCount: 32,
      createdAt: "2024-01-08",
    },
    {
      id: 3,
      name: "Toplantı Hatırlatması",
      category: "İş",
      content:
        "Merhaba {name}, toplantımız {date} tarihinde {time} saatinde {location} adresinde yapılacaktır.",
      variables: ["name", "date", "time", "location"],
      usageCount: 18,
      createdAt: "2024-01-05",
    },
    {
      id: 4,
      name: "Sipariş Hazır",
      category: "E-ticaret",
      content:
        "Merhaba {name}, {orderNumber} numaralı siparişiniz hazır. Teslim alabilirsiniz.",
      variables: ["name", "orderNumber"],
      usageCount: 67,
      createdAt: "2024-01-12",
    },
  ]);

  const [newTemplate, setNewTemplate] = useState({
    name: "",
    category: "",
    content: "",
  });

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const getCategoryColor = (category) => {
    const colors = {
      Randevu: "bg-blue-100 text-blue-800",
      Finans: "bg-green-100 text-green-800",
      İş: "bg-purple-100 text-purple-800",
      "E-ticaret": "bg-orange-100 text-orange-800",
    };
    return colors[category] || "bg-gray-100 text-gray-800";
  };

  const extractVariables = (content) => {
    const matches = content.match(/{([^}]+)}/g);
    return matches ? matches.map((match) => match.slice(1, -1)) : [];
  };

  const handleCreateTemplate = () => {
    const variables = extractVariables(newTemplate.content);
    const template = {
      id: templates.length + 1,
      ...newTemplate,
      variables,
      usageCount: 0,
      createdAt: new Date().toISOString().split("T")[0],
    };
    setTemplates([...templates, template]);
    setNewTemplate({ name: "", category: "", content: "" });
    setIsCreateDialogOpen(false);
  };

  const handleDeleteTemplate = (id) => {
    setTemplates(templates.filter((template) => template.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-6">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Mesaj Şablonları
              </h1>
              <p className="text-gray-600">
                Sık kullanılan mesaj şablonlarınızı yönetin
              </p>
            </div>
            <Dialog
              open={isCreateDialogOpen}
              onOpenChange={setIsCreateDialogOpen}
            >
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Yeni Şablon
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[525px]">
                <DialogHeader>
                  <DialogTitle>Yeni Şablon Oluştur</DialogTitle>
                  <DialogDescription>
                    Yeni bir mesaj şablonu oluşturun. Değişkenler için{" "}
                    {"{değişken}"} formatını kullanın.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="templateName">Şablon Adı</Label>
                    <Input
                      id="templateName"
                      placeholder="Şablon adını girin"
                      value={newTemplate.name}
                      onChange={(e) =>
                        setNewTemplate({ ...newTemplate, name: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="templateCategory">Kategori</Label>
                    <Input
                      id="templateCategory"
                      placeholder="Kategori girin (örn: Randevu, Finans)"
                      value={newTemplate.category}
                      onChange={(e) =>
                        setNewTemplate({
                          ...newTemplate,
                          category: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="templateContent">Mesaj İçeriği</Label>
                    <Textarea
                      id="templateContent"
                      placeholder="Mesaj içeriğini girin..."
                      value={newTemplate.content}
                      onChange={(e) =>
                        setNewTemplate({
                          ...newTemplate,
                          content: e.target.value,
                        })
                      }
                      rows={4}
                    />
                  </div>
                  {newTemplate.content && (
                    <div className="space-y-2">
                      <Label>Tespit Edilen Değişkenler</Label>
                      <div className="flex flex-wrap gap-2">
                        {extractVariables(newTemplate.content).map(
                          (variable, index) => (
                            <Badge key={index} variant="secondary">
                              {variable}
                            </Badge>
                          )
                        )}
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex justify-end gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setIsCreateDialogOpen(false)}
                  >
                    İptal
                  </Button>
                  <Button
                    onClick={handleCreateTemplate}
                    disabled={!newTemplate.name || !newTemplate.content}
                  >
                    Oluştur
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Şablon Listesi */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((template) => (
            <Card
              key={template.id}
              className="hover:shadow-md transition-shadow"
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-2">
                      {template.name}
                    </CardTitle>
                    <Badge className={getCategoryColor(template.category)}>
                      {template.category}
                    </Badge>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Düzenle
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Copy className="mr-2 h-4 w-4" />
                        Kopyala
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-red-600"
                        onClick={() => handleDeleteTemplate(template.id)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Sil
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600 line-clamp-3">
                      {template.content}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-2">Değişkenler:</p>
                    <div className="flex flex-wrap gap-1">
                      {template.variables.map((variable, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="text-xs"
                        >
                          {variable}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t">
                    <span>{template.usageCount} kez kullanıldı</span>
                    <span>{template.createdAt}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* İstatistikler */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Toplam Şablon
              </CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{templates.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                En Çok Kullanılan
              </CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Math.max(...templates.map((t) => t.usageCount))}
              </div>
              <p className="text-xs text-muted-foreground">kullanım</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Kategori Sayısı
              </CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {new Set(templates.map((t) => t.category)).size}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Toplam Kullanım
              </CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {templates.reduce((sum, t) => sum + t.usageCount, 0)}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
