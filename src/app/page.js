import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Building2,
  Users,
  BarChart3,
  FileText,
  Shield,
  Zap,
  Globe,
  HeadphonesIcon,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-cream">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-green/10 via-cream to-light-green/20 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <Building2 className="h-16 w-16 text-primary-green" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-dark-gray mb-6">
              Yönetim360
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              İşletmenizi yönetmenin en kolay yolu. CRM, ERP ve İnsan Kaynakları
              yönetimini tek platformda birleştiren kapsamlı çözüm.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/login">
                <Button
                  size="lg"
                  className="bg-primary-green hover:bg-primary-green/90 text-lg px-8 py-3"
                >
                  Hemen Başlayın
                </Button>
              </Link>
              <Link href="/demo">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 py-3 border-primary-green text-primary-green hover:bg-primary-green/10 bg-transparent"
                >
                  Demo İzleyin
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-dark-gray mb-4">
              Neden Yönetim360?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              İşletmenizin tüm süreçlerini tek platformda yönetin ve
              verimliliğinizi artırın.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center border-2 hover:border-primary-green/50 transition-colors">
              <CardHeader>
                <div className="w-16 h-16 bg-primary-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-primary-green" />
                </div>
                <CardTitle className="text-xl text-dark-gray">
                  CRM Yönetimi
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">
                  Müşteri ilişkilerinizi güçlendirin, satış süreçlerinizi
                  optimize edin ve müşteri memnuniyetini artırın.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center border-2 hover:border-orange/50 transition-colors">
              <CardHeader>
                <div className="w-16 h-16 bg-orange/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="h-8 w-8 text-orange" />
                </div>
                <CardTitle className="text-xl text-dark-gray">
                  ERP Sistemi
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">
                  Envanter, muhasebe, satış ve satın alma süreçlerinizi entegre
                  bir şekilde yönetin.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center border-2 hover:border-red/50 transition-colors">
              <CardHeader>
                <div className="w-16 h-16 bg-red/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="h-8 w-8 text-red" />
                </div>
                <CardTitle className="text-xl text-dark-gray">
                  İnsan Kaynakları
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">
                  Personel yönetimi, bordro, izin takibi ve performans
                  değerlendirmelerini kolayca yapın.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-light-green/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-dark-gray mb-6">
                İşletmenizi Bir Sonraki Seviyeye Taşıyın
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Yönetim360 ile işletmenizin tüm süreçlerini dijitalleştirin,
                verimliliği artırın ve rekabet avantajı kazanın.
              </p>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-primary-green rounded-full flex items-center justify-center">
                    <Shield className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-dark-gray font-medium">
                    Güvenli ve şifreli veri saklama
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-primary-green rounded-full flex items-center justify-center">
                    <Zap className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-dark-gray font-medium">
                    Hızlı ve kullanıcı dostu arayüz
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-primary-green rounded-full flex items-center justify-center">
                    <Globe className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-dark-gray font-medium">
                    Her yerden erişim imkanı
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-primary-green rounded-full flex items-center justify-center">
                    <HeadphonesIcon className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-dark-gray font-medium">
                    7/24 teknik destek
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <Card className="bg-white">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-primary-green mb-2">
                    1000+
                  </div>
                  <div className="text-gray-600">Mutlu Müşteri</div>
                </CardContent>
              </Card>
              <Card className="bg-white">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-orange mb-2">
                    99.9%
                  </div>
                  <div className="text-gray-600">Uptime Garantisi</div>
                </CardContent>
              </Card>
              <Card className="bg-white">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-red mb-2">24/7</div>
                  <div className="text-gray-600">Teknik Destek</div>
                </CardContent>
              </Card>
              <Card className="bg-white">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-light-green mb-2">
                    5 Yıl
                  </div>
                  <div className="text-gray-600">Tecrübe</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-green">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Hemen Başlamaya Hazır mısınız?
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Ücretsiz deneme sürümü ile Yönetim360&apos;ı keşfedin ve
            işletmenizin potansiyelini ortaya çıkarın.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/login">
              <Button
                size="lg"
                className="bg-white text-primary-green hover:bg-gray-100 text-lg px-8 py-3"
              >
                Ücretsiz Deneyin
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10 text-lg px-8 py-3 bg-transparent"
              >
                İletişime Geçin
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
