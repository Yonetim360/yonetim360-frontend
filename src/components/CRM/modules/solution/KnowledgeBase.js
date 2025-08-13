"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  BookOpen,
  HelpCircle,
  ArrowLeft,
  Calendar,
} from "lucide-react";

export function KnowledgeBase() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedArticle, setSelectedArticle] = useState(null);

  const articles = [
    {
      id: 1,
      title: "Şifre Nasıl Sıfırlanır?",
      category: "Hesap Yönetimi",
      views: 1250,
      likes: 45,
      rating: 4.8,
      lastUpdated: "2024-01-10",
      excerpt:
        "Şifrenizi unuttuysanız, bu adımları takip ederek kolayca sıfırlayabilirsiniz...",
      content: `
# Şifre Nasıl Sıfırlanır?

Şifrenizi unuttuysanız endişelenmeyin! Bu rehberi takip ederek kolayca yeni bir şifre oluşturabilirsiniz.

## Adım 1: Giriş Sayfasına Gidin
- Ana sayfadaki "Giriş Yap" butonuna tıklayın
- Giriş formunda "Şifremi Unuttum" linkine tıklayın

## Adım 2: E-posta Adresinizi Girin
- Kayıtlı e-posta adresinizi girin
- "Şifre Sıfırlama Linki Gönder" butonuna tıklayın

## Adım 3: E-postanızı Kontrol Edin
- E-posta kutunuzu kontrol edin (spam klasörünü de kontrol etmeyi unutmayın)
- Şifre sıfırlama linkine tıklayın

## Adım 4: Yeni Şifrenizi Oluşturun
- Güvenli bir şifre oluşturun (en az 8 karakter)
- Şifrenizi onaylayın
- "Şifreyi Güncelle" butonuna tıklayın

## Güvenlik İpuçları
- Şifrenizde büyük-küçük harf, rakam ve özel karakter kullanın
- Kolay tahmin edilebilir şifreler kullanmayın
- Şifrenizi düzenli olarak değiştirin

Sorun yaşamaya devam ederseniz destek ekibimizle iletişime geçin.
      `,
    },
    {
      id: 2,
      title: "Fatura İndirme Rehberi",
      category: "Faturalama",
      views: 890,
      likes: 32,
      rating: 4.6,
      lastUpdated: "2024-01-08",
      excerpt:
        "Faturalarınızı PDF formatında indirmek için bu rehberi takip edin...",
      content: `
# Fatura İndirme Rehberi

Bu rehber size faturalarınızı nasıl indirebileceğinizi adım adım gösterir.

## Fatura Sayfasına Erişim
1. Hesabınıza giriş yapın
2. Sol menüden "Faturalama" bölümüne tıklayın
3. "Fatura Geçmişi" sekmesini seçin

## Fatura İndirme
### Tek Fatura İndirme
- İndirmek istediğiniz faturanın yanındaki "PDF İndir" butonuna tıklayın
- Fatura otomatik olarak bilgisayarınıza indirilecektir

### Toplu Fatura İndirme
- İndirmek istediğiniz faturaları seçin
- "Seçilenleri İndir" butonuna tıklayın
- Tüm faturalar ZIP dosyası olarak indirilecektir

## Fatura Detayları
Her faturada şu bilgiler yer alır:
- Fatura numarası ve tarihi
- Hizmet detayları
- Tutar bilgileri
- Vergi hesaplamaları
- Ödeme durumu

## Sorun Giderme
Fatura indirme ile ilgili sorun yaşıyorsanız:
- Tarayıcınızın pop-up engelleyicisini kontrol edin
- Farklı bir tarayıcı deneyin
- Destek ekibimizle iletişime geçin

## E-posta ile Fatura
Faturalarınızı e-posta ile de alabilirsiniz:
1. Hesap ayarlarına gidin
2. "Bildirim Tercihleri" bölümünü açın
3. "E-posta ile fatura gönder" seçeneğini aktifleştirin
      `,
    },
    {
      id: 3,
      title: "Mobil Uygulama Kurulum",
      category: "Teknik Destek",
      views: 2100,
      likes: 78,
      rating: 4.9,
      lastUpdated: "2024-01-12",
      excerpt:
        "iOS ve Android cihazlarda uygulamamızı nasıl kuracağınızı öğrenin...",
      content: `
# Mobil Uygulama Kurulum Rehberi

Mobil uygulamamızı iOS ve Android cihazlarınıza nasıl kuracağınızı öğrenin.

## iOS Kurulum
### App Store'dan İndirme
1. iPhone veya iPad'inizde App Store'u açın
2. Arama çubuğuna "CRM Çözüm" yazın
3. Uygulamamızı bulun ve "İndir" butonuna tıklayın
4. Apple ID şifrenizi girin veya Touch/Face ID kullanın

### Sistem Gereksinimleri
- iOS 12.0 veya üzeri
- En az 50 MB boş alan
- İnternet bağlantısı

## Android Kurulum
### Google Play Store'dan İndirme
1. Android cihazınızda Google Play Store'u açın
2. "CRM Çözüm" uygulamasını arayın
3. "Yükle" butonuna tıklayın
4. Gerekli izinleri onaylayın

### Sistem Gereksinimleri
- Android 6.0 (API level 23) veya üzeri
- En az 50 MB boş alan
- İnternet bağlantısı

## İlk Kurulum
Uygulamayı kurduktan sonra:
1. Uygulamayı açın
2. Mevcut hesap bilgilerinizle giriş yapın
3. Bildirim izinlerini aktifleştirin
4. Uygulamayı kullanmaya başlayın

## Özellikler
Mobil uygulamamızda şu özellikler mevcuttur:
- Talep oluşturma ve takip
- Bildirimler
- Hızlı erişim menüsü
- Offline çalışma desteği
- Güvenli giriş

## Sorun Giderme
### Uygulama Açılmıyor
- Cihazınızı yeniden başlatın
- Uygulamayı kaldırıp tekrar yükleyin
- İşletim sisteminizi güncelleyin

### Giriş Yapamıyorum
- İnternet bağlantınızı kontrol edin
- Kullanıcı adı ve şifrenizi kontrol edin
- Şifre sıfırlama özelliğini kullanın

Daha fazla yardım için destek ekibimizle iletişime geçin.
      `,
    },
  ];

  const faqs = [
    {
      question: "Hesabımı nasıl kapatırım?",
      answer:
        "Hesap kapatma işlemi için destek ekibimizle iletişime geçmeniz gerekmektedir. Talep oluşturarak talebinizi iletebilirsiniz.",
      category: "Hesap Yönetimi",
    },
    {
      question: "Ödeme yöntemlerini nasıl değiştirebilirim?",
      answer:
        "Hesap ayarlarından 'Ödeme Yöntemleri' bölümüne giderek mevcut kartınızı güncelleyebilir veya yeni kart ekleyebilirsiniz.",
      category: "Faturalama",
    },
    {
      question: "Uygulama neden yavaş çalışıyor?",
      answer:
        "Uygulama performans sorunları genellikle önbellek temizleme ile çözülür. Ayarlar > Önbellek Temizle seçeneğini deneyin.",
      category: "Teknik Destek",
    },
  ];

  const categories = [
    { name: "Tümü", count: 24 },
    { name: "Hesap Yönetimi", count: 8 },
    { name: "Faturalama", count: 6 },
    { name: "Teknik Destek", count: 7 },
    { name: "Güvenlik", count: 3 },
  ];

  const filteredArticles = articles.filter(
    (article) =>
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleBackToList = () => {
    setSelectedArticle(null);
  };

  // Makale detay görünümü
  if (selectedArticle) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-6">
        <Card>
          <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <Button variant="outline" size="sm" onClick={handleBackToList}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Geri Dön
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500">
              <BookOpen className="w-5 h-5 text-blue-600" />
              <Badge variant="outline">{selectedArticle.category}</Badge>
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                <span>Güncelleme: {selectedArticle.lastUpdated}</span>
              </div>
            </div>
            <h1 className="text-2xl font-bold">{selectedArticle.title}</h1>
            <div className="text-gray-700 whitespace-pre-line">
              {selectedArticle.content}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Ana liste görünümü
  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <Tabs defaultValue="articles" className="space-y-6">
        <TabsList className="grid grid-cols-2 w-full sm:w-auto bg-indigo-100">
          <TabsTrigger value="articles">Makaleler</TabsTrigger>
          <TabsTrigger value="faq">Sık Sorulan Sorular</TabsTrigger>
        </TabsList>

        <TabsContent value="articles" className="space-y-6">
          {/* Arama */}
          <Card>
            <CardContent className="p-4 sm:p-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Bilgi bankasında ara..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 text-base sm:text-lg h-10 sm:h-12"
                />
              </div>
            </CardContent>
          </Card>

          {/* Makale listesi */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredArticles.map((article) => (
              <Card
                key={article.id}
                className="hover:shadow-md transition-shadow"
              >
                <CardContent className="p-4 sm:p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <BookOpen className="w-4 h-4 text-blue-600" />
                      <Badge variant="outline">{article.category}</Badge>
                    </div>
                    <h3
                      className="font-semibold text-lg mb-2 hover:text-blue-600 cursor-pointer"
                      onClick={() => setSelectedArticle(article)}
                    >
                      {article.title}
                    </h3>
                    <p className="text-gray-600 text-sm">{article.excerpt}</p>
                  </div>
                  <div className="mt-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedArticle(article)}
                      className="w-full"
                    >
                      Oku
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="faq" className="space-y-4">
          {/* Kategoriler */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Kategoriler</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {categories.map((category) => (
                <div
                  key={category.name}
                  className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 cursor-pointer"
                >
                  <span className="text-sm">{category.name}</span>
                  <Badge className="text-xs bg-indigo-500">
                    {category.count}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* FAQ listesi */}
          {faqs.map((faq, index) => (
            <Card key={index}>
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-start gap-3">
                  <HelpCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold">{faq.question}</h3>
                      <Badge variant="outline" className="text-xs">
                        {faq.category}
                      </Badge>
                    </div>
                    <p className="text-gray-600 text-sm">{faq.answer}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
