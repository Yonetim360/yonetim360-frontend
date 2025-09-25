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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  User,
  Building2,
  Users,
  UserCheck,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Shield,
  Camera,
  Save,
  Edit,
} from "lucide-react";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("general");
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Form states
  const [generalInfo, setGeneralInfo] = useState({
    firstName: "Ahmet",
    lastName: "Yılmaz",
    email: "ahmet.yilmaz@sirket.com",
    phone: "+90 532 123 45 67",
    title: "Genel Müdür",
    department: "Yönetim",
    birthDate: "1985-03-15",
    address: "Ataşehir, İstanbul",
    bio: "15 yıllık deneyime sahip işletme yöneticisi. Teknoloji ve inovasyon odaklı çözümler geliştirme konusunda uzman.",
  });

  const [companyInfo, setCompanyInfo] = useState({
    companyName: "ABC Teknoloji A.Ş.",
    taxNumber: "1234567890",
    tradeRegisterNo: "123456",
    mersisNo: "0123456789012345",
    companyAddress:
      "Maslak Mahallesi, Büyükdere Caddesi No:123 Sarıyer/İstanbul",
    companyPhone: "+90 212 123 45 67",
    companyEmail: "info@abcteknoloji.com",
    website: "www.abcteknoloji.com",
    sector: "Bilişim Teknolojileri",
    foundedYear: "2010",
    employeeCount: "50-100",
    authorizedPerson: "Ahmet Yılmaz",
    bankName: "Türkiye İş Bankası",
    iban: "TR12 0006 4000 0011 2345 6789 01",
  });

  const [hrInfo, setHrInfo] = useState({
    employeeId: "EMP-2024-001",
    startDate: "2020-01-15",
    position: "Genel Müdür",
    department: "Yönetim",
    manager: "Yönetim Kurulu",
    workType: "Tam Zamanlı",
    contractType: "Belirsiz Süreli",
    salary: "₺45,000",
    annualLeave: "24 gün",
    usedLeave: "8 gün",
    remainingLeave: "16 gün",
    performanceScore: "4.8/5.0",
    lastReview: "2024-01-01",
    nextReview: "2024-07-01",
    emergencyContact: "Fatma Yılmaz - +90 532 987 65 43",
    bloodType: "A Rh+",
    healthInsurance: "Allianz Sigorta",
  });

  const [representativeInfo, setRepresentativeInfo] = useState({
    territory: "İstanbul Anadolu Yakası",
    customerCount: "156",
    monthlyTarget: "₺500,000",
    monthlyAchievement: "₺625,000",
    achievementRate: "125%",
    totalSales: "₺2,450,000",
    averageDealSize: "₺15,700",
    conversionRate: "24%",
    customerSatisfaction: "4.6/5.0",
    teamSize: "8 kişi",
    certifications: "CRM Uzmanı, Satış Teknikleri",
    languages: "Türkçe (Ana dil), İngilizce (İleri), Almanca (Orta)",
    specializations: "B2B Satış, Kurumsal Müşteri Yönetimi",
  });

  const tabs = [
    {
      id: "general",
      name: "Genel Bilgiler",
      icon: User,
      color: "text-primary-green",
      bgColor: "bg-primary-green/10",
      description: "Kişisel bilgilerinizi görüntüleyin ve düzenleyin",
    },
    {
      id: "company",
      name: "Firma Bilgileri",
      icon: Building2,
      color: "text-orange",
      bgColor: "bg-orange/10",
      description: "Şirket bilgilerini yönetin",
    },
    {
      id: "hr",
      name: "İK Bilgileri",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      description: "İnsan kaynakları bilgilerinizi görüntüleyin",
    },
    {
      id: "representative",
      name: "Temsilci Bilgileri",
      icon: UserCheck,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
      description: "CRM temsilci performans bilgileri",
    },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "general":
        return (
          <div className="space-y-6">
            {/* Profil Fotoğrafı */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-primary-green">
                  <Camera className="mr-2 h-5 w-5" />
                  Profil Fotoğrafı
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-6">
                  <Avatar className="h-24 w-24">
                    <AvatarImage
                      src="/placeholder.svg?height=96&width=96&text=AY"
                      alt="Profil"
                    />
                    <AvatarFallback className="text-2xl bg-primary-green text-white">
                      AY
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-2">
                    <Button variant="outline" className="bg-transparent">
                      <Camera className="mr-2 h-4 w-4" />
                      Fotoğraf Değiştir
                    </Button>
                    <p className="text-sm text-gray-500">
                      JPG, PNG formatında, maksimum 5MB
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Kişisel Bilgiler */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-primary-green">
                  <div className="flex items-center">
                    <User className="mr-2 h-5 w-5" />
                    Kişisel Bilgiler
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsEditing(!isEditing)}
                    className="bg-transparent"
                  >
                    <Edit className="mr-2 h-4 w-4" />
                    {isEditing ? "İptal" : "Düzenle"}
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Ad</Label>
                    <Input
                      id="firstName"
                      value={generalInfo.firstName}
                      onChange={(e) =>
                        setGeneralInfo({
                          ...generalInfo,
                          firstName: e.target.value,
                        })
                      }
                      disabled={!isEditing}
                      className={!isEditing ? "bg-gray-50" : ""}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Soyad</Label>
                    <Input
                      id="lastName"
                      value={generalInfo.lastName}
                      onChange={(e) =>
                        setGeneralInfo({
                          ...generalInfo,
                          lastName: e.target.value,
                        })
                      }
                      disabled={!isEditing}
                      className={!isEditing ? "bg-gray-50" : ""}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">E-posta</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        id="email"
                        type="email"
                        value={generalInfo.email}
                        onChange={(e) =>
                          setGeneralInfo({
                            ...generalInfo,
                            email: e.target.value,
                          })
                        }
                        disabled={!isEditing}
                        className={`pl-10 ${!isEditing ? "bg-gray-50" : ""}`}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefon</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        id="phone"
                        value={generalInfo.phone}
                        onChange={(e) =>
                          setGeneralInfo({
                            ...generalInfo,
                            phone: e.target.value,
                          })
                        }
                        disabled={!isEditing}
                        className={`pl-10 ${!isEditing ? "bg-gray-50" : ""}`}
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Ünvan</Label>
                    <Input
                      id="title"
                      value={generalInfo.title}
                      onChange={(e) =>
                        setGeneralInfo({
                          ...generalInfo,
                          title: e.target.value,
                        })
                      }
                      disabled={!isEditing}
                      className={!isEditing ? "bg-gray-50" : ""}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="department">Departman</Label>
                    <Input
                      id="department"
                      value={generalInfo.department}
                      onChange={(e) =>
                        setGeneralInfo({
                          ...generalInfo,
                          department: e.target.value,
                        })
                      }
                      disabled={!isEditing}
                      className={!isEditing ? "bg-gray-50" : ""}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="birthDate">Doğum Tarihi</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        id="birthDate"
                        type="date"
                        value={generalInfo.birthDate}
                        onChange={(e) =>
                          setGeneralInfo({
                            ...generalInfo,
                            birthDate: e.target.value,
                          })
                        }
                        disabled={!isEditing}
                        className={`pl-10 ${!isEditing ? "bg-gray-50" : ""}`}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Adres</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        id="address"
                        value={generalInfo.address}
                        onChange={(e) =>
                          setGeneralInfo({
                            ...generalInfo,
                            address: e.target.value,
                          })
                        }
                        disabled={!isEditing}
                        className={`pl-10 ${!isEditing ? "bg-gray-50" : ""}`}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Hakkımda</Label>
                  <Textarea
                    id="bio"
                    value={generalInfo.bio}
                    onChange={(e) =>
                      setGeneralInfo({ ...generalInfo, bio: e.target.value })
                    }
                    disabled={!isEditing}
                    rows={4}
                    className={!isEditing ? "bg-gray-50" : ""}
                    placeholder="Kendiniz hakkında kısa bir açıklama yazın..."
                  />
                </div>

                {isEditing && (
                  <div className="flex justify-end space-x-2">
                    <Button
                      variant="outline"
                      onClick={() => setIsEditing(false)}
                      className="bg-transparent"
                    >
                      İptal
                    </Button>
                    <Button className="bg-primary-green hover:bg-primary-green/90">
                      <Save className="mr-2 h-4 w-4" />
                      Kaydet
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        );

      case "company":
        return (
          <div className="space-y-6">
            {/* Şirket Genel Bilgileri */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-orange">
                  <Building2 className="mr-2 h-5 w-5" />
                  Şirket Genel Bilgileri
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Şirket Adı</Label>
                    <Input
                      id="companyName"
                      value={companyInfo.companyName}
                      disabled
                      className="bg-gray-50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sector">Sektör</Label>
                    <Input
                      id="sector"
                      value={companyInfo.sector}
                      disabled
                      className="bg-gray-50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="taxNumber">Vergi Numarası</Label>
                    <Input
                      id="taxNumber"
                      value={companyInfo.taxNumber}
                      disabled
                      className="bg-gray-50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tradeRegisterNo">Ticaret Sicil No</Label>
                    <Input
                      id="tradeRegisterNo"
                      value={companyInfo.tradeRegisterNo}
                      disabled
                      className="bg-gray-50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="mersisNo">MERSİS No</Label>
                    <Input
                      id="mersisNo"
                      value={companyInfo.mersisNo}
                      disabled
                      className="bg-gray-50"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="companyAddress">Şirket Adresi</Label>
                  <Textarea
                    id="companyAddress"
                    value={companyInfo.companyAddress}
                    disabled
                    className="bg-gray-50"
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="companyPhone">Şirket Telefonu</Label>
                    <Input
                      id="companyPhone"
                      value={companyInfo.companyPhone}
                      disabled
                      className="bg-gray-50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="companyEmail">Şirket E-postası</Label>
                    <Input
                      id="companyEmail"
                      value={companyInfo.companyEmail}
                      disabled
                      className="bg-gray-50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="website">Web Sitesi</Label>
                    <Input
                      id="website"
                      value={companyInfo.website}
                      disabled
                      className="bg-gray-50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="foundedYear">Kuruluş Yılı</Label>
                    <Input
                      id="foundedYear"
                      value={companyInfo.foundedYear}
                      disabled
                      className="bg-gray-50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="employeeCount">Çalışan Sayısı</Label>
                    <Input
                      id="employeeCount"
                      value={companyInfo.employeeCount}
                      disabled
                      className="bg-gray-50"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Yetkili Kişi ve Banka Bilgileri */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-orange">
                  <Shield className="mr-2 h-5 w-5" />
                  Yetkili Kişi ve Banka Bilgileri
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="authorizedPerson">Yetkili Kişi</Label>
                  <Input
                    id="authorizedPerson"
                    value={companyInfo.authorizedPerson}
                    disabled
                    className="bg-gray-50"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="bankName">Banka Adı</Label>
                    <Input
                      id="bankName"
                      value={companyInfo.bankName}
                      disabled
                      className="bg-gray-50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="iban">IBAN</Label>
                    <Input
                      id="iban"
                      value={companyInfo.iban}
                      disabled
                      className="bg-gray-50"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "hr":
        return (
          <div className="space-y-6">
            {/* İstihdam Bilgileri */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-blue-600">
                  <Users className="mr-2 h-5 w-5" />
                  İstihdam Bilgileri
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="employeeId">Personel No</Label>
                    <Input
                      id="employeeId"
                      value={hrInfo.employeeId}
                      disabled
                      className="bg-gray-50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="startDate">İşe Başlama Tarihi</Label>
                    <Input
                      id="startDate"
                      value={hrInfo.startDate}
                      disabled
                      className="bg-gray-50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="position">Pozisyon</Label>
                    <Input
                      id="position"
                      value={hrInfo.position}
                      disabled
                      className="bg-gray-50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="hrDepartment">Departman</Label>
                    <Input
                      id="hrDepartment"
                      value={hrInfo.department}
                      disabled
                      className="bg-gray-50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="manager">Yönetici</Label>
                    <Input
                      id="manager"
                      value={hrInfo.manager}
                      disabled
                      className="bg-gray-50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="workType">Çalışma Türü</Label>
                    <Input
                      id="workType"
                      value={hrInfo.workType}
                      disabled
                      className="bg-gray-50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="contractType">Sözleşme Türü</Label>
                    <Input
                      id="contractType"
                      value={hrInfo.contractType}
                      disabled
                      className="bg-gray-50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="salary">Maaş</Label>
                    <Input
                      id="salary"
                      value={hrInfo.salary}
                      disabled
                      className="bg-gray-50"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* İzin ve Performans Bilgileri */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-blue-600">
                  <Calendar className="mr-2 h-5 w-5" />
                  İzin ve Performans Bilgileri
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="annualLeave">Yıllık İzin Hakkı</Label>
                    <Input
                      id="annualLeave"
                      value={hrInfo.annualLeave}
                      disabled
                      className="bg-gray-50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="usedLeave">Kullanılan İzin</Label>
                    <Input
                      id="usedLeave"
                      value={hrInfo.usedLeave}
                      disabled
                      className="bg-gray-50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="remainingLeave">Kalan İzin</Label>
                    <Input
                      id="remainingLeave"
                      value={hrInfo.remainingLeave}
                      disabled
                      className="bg-gray-50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="performanceScore">Performans Puanı</Label>
                    <Input
                      id="performanceScore"
                      value={hrInfo.performanceScore}
                      disabled
                      className="bg-gray-50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastReview">Son Değerlendirme</Label>
                    <Input
                      id="lastReview"
                      value={hrInfo.lastReview}
                      disabled
                      className="bg-gray-50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="nextReview">Sonraki Değerlendirme</Label>
                    <Input
                      id="nextReview"
                      value={hrInfo.nextReview}
                      disabled
                      className="bg-gray-50"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Kişisel ve Sağlık Bilgileri */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-blue-600">
                  <Shield className="mr-2 h-5 w-5" />
                  Kişisel ve Sağlık Bilgileri
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="emergencyContact">Acil Durum İletişim</Label>
                  <Input
                    id="emergencyContact"
                    value={hrInfo.emergencyContact}
                    disabled
                    className="bg-gray-50"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="bloodType">Kan Grubu</Label>
                    <Input
                      id="bloodType"
                      value={hrInfo.bloodType}
                      disabled
                      className="bg-gray-50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="healthInsurance">Sağlık Sigortası</Label>
                    <Input
                      id="healthInsurance"
                      value={hrInfo.healthInsurance}
                      disabled
                      className="bg-gray-50"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "representative":
        return (
          <div className="space-y-6">
            {/* Satış Performansı */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-purple-600">
                  <UserCheck className="mr-2 h-5 w-5" />
                  Satış Performansı
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="territory">Bölge</Label>
                    <Input
                      id="territory"
                      value={representativeInfo.territory}
                      disabled
                      className="bg-gray-50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="customerCount">Müşteri Sayısı</Label>
                    <Input
                      id="customerCount"
                      value={representativeInfo.customerCount}
                      disabled
                      className="bg-gray-50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="monthlyTarget">Aylık Hedef</Label>
                    <Input
                      id="monthlyTarget"
                      value={representativeInfo.monthlyTarget}
                      disabled
                      className="bg-gray-50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="monthlyAchievement">
                      Aylık Gerçekleşen
                    </Label>
                    <Input
                      id="monthlyAchievement"
                      value={representativeInfo.monthlyAchievement}
                      disabled
                      className="bg-gray-50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="achievementRate">Başarı Oranı</Label>
                    <div className="relative">
                      <Input
                        id="achievementRate"
                        value={representativeInfo.achievementRate}
                        disabled
                        className="bg-gray-50"
                      />
                      <Badge className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary-green text-white">
                        Hedef Aşıldı
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="totalSales">Toplam Satış</Label>
                    <Input
                      id="totalSales"
                      value={representativeInfo.totalSales}
                      disabled
                      className="bg-gray-50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="averageDealSize">
                      Ortalama Anlaşma Büyüklüğü
                    </Label>
                    <Input
                      id="averageDealSize"
                      value={representativeInfo.averageDealSize}
                      disabled
                      className="bg-gray-50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="conversionRate">Dönüşüm Oranı</Label>
                    <Input
                      id="conversionRate"
                      value={representativeInfo.conversionRate}
                      disabled
                      className="bg-gray-50"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Ekip ve Yetkinlikler */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-purple-600">
                  <Users className="mr-2 h-5 w-5" />
                  Ekip ve Yetkinlikler
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="customerSatisfaction">
                      Müşteri Memnuniyeti
                    </Label>
                    <Input
                      id="customerSatisfaction"
                      value={representativeInfo.customerSatisfaction}
                      disabled
                      className="bg-gray-50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="teamSize">Ekip Büyüklüğü</Label>
                    <Input
                      id="teamSize"
                      value={representativeInfo.teamSize}
                      disabled
                      className="bg-gray-50"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="certifications">Sertifikalar</Label>
                  <Input
                    id="certifications"
                    value={representativeInfo.certifications}
                    disabled
                    className="bg-gray-50"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="languages">Diller</Label>
                  <Input
                    id="languages"
                    value={representativeInfo.languages}
                    disabled
                    className="bg-gray-50"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="specializations">Uzmanlık Alanları</Label>
                  <Textarea
                    id="specializations"
                    value={representativeInfo.specializations}
                    disabled
                    className="bg-gray-50"
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-dark-gray">
            Profil Bilgileri
          </h2>
          <p className="text-gray-600 mt-2">
            Kişisel ve profesyonel bilgilerinizi görüntüleyin ve yönetin
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar - Tabs */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-dark-gray">
                  Profil Bölümleri
                </CardTitle>
                <CardDescription>
                  Görüntülemek istediğiniz bölümü seçin
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-1">
                  {tabs.map((tab) => {
                    const IconComponent = tab.icon;
                    const isActive = activeTab === tab.id;

                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full text-left p-3 rounded-lg transition-colors ${
                          isActive
                            ? `${tab.bgColor} ${tab.color} border-l-4 border-current`
                            : "hover:bg-gray-50 text-gray-700"
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <IconComponent className="h-5 w-5" />
                          <div>
                            <div className="text-sm font-medium">
                              {tab.name}
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                              {tab.description}
                            </div>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Hızlı Bilgiler */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-dark-gray">Hızlı Bilgiler</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary-green/10 rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-primary-green" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-dark-gray">
                      Ahmet Yılmaz
                    </p>
                    <p className="text-xs text-gray-500">Genel Müdür</p>
                  </div>
                </div>
                <Separator />
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-orange/10 rounded-full flex items-center justify-center">
                    <Building2 className="h-4 w-4 text-orange" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-dark-gray">
                      ABC Teknoloji A.Ş.
                    </p>
                    <p className="text-xs text-gray-500">
                      Bilişim Teknolojileri
                    </p>
                  </div>
                </div>
                <Separator />
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <Calendar className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-dark-gray">4 yıl</p>
                    <p className="text-xs text-gray-500">Çalışma süresi</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Content Area */}
          <div className="lg:col-span-3">{renderTabContent()}</div>
        </div>
      </div>
    </div>
  );
}
