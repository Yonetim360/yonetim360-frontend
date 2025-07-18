Frontend Proje Kurulum Rehberi

Bu rehber, projenin frontend kısmını yerel ortamınıza kurmanız ve çalıştırmanız için hazırlanmıştır.

---
Kurulum Adımları
Depoyu Klonlayın:


```
git clone <repo-url>
cd <proje-klasörü>
```
Bağımlılıkları Yükleyin:


```
npm install
```
Geliştirme Sunucusunu Başlatın:


```
npm run dev
```
Uygulamayı Görüntüleyin:

Tarayıcınızda http://localhost:3000 adresini açın.

Önemli Komutlar

- npm run dev: Geliştirme sunucusunu başlatır

- npm run build: Production build'i oluşturur

- npm start: Production sunucusunu başlatır

- npm run lint: ESLint ile kod kontrolü yapar

---
Ortam Değişkenleri

Projeyi çalıştırmak için aşağıdaki ortam değişkenlerini .env.local dosyasına eklemeniz gerekebilir:

env

NEXT_PUBLIC_API_URL=http://localhost:3000/api
---
