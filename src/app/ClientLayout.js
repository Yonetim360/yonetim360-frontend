"use client";

// CustomThemeProvider'ı kullanıyorsanız yorum satırını kaldırın
// import CustomThemeProvider from "@/providers/themeProvider";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function ClientLayout({ children }) {
  const pathname = usePathname();
  const [hideHeaderFooter, setHideHeaderFooter] = useState(false);
  const [contentLoaded, setContentLoaded] = useState(false);
  const contentRef = useRef(null);

  useEffect(() => {
    const pathsToHide = ["/login", "/register"];
    const shouldHideBasedOnPath = pathsToHide.includes(pathname);

    // 404 içeriğini kontrol eden fonksiyon
    const checkContentFor404 = () => {
      if (contentRef.current) {
        const textContent = contentRef.current.textContent || "";
        const documentTitle = document.title || "";

        const is404Detected =
          textContent.includes("Sayfa Bulunamadı") || // Kendi 404 sayfanızdaki metin
          textContent.includes("404") ||
          documentTitle.includes("404") ||
          documentTitle.includes("Sayfa Bulunamadı"); // Kendi 404 sayfanızın başlığı

        // Yol tabanlı gizleme ile 404 algılamayı birleştir
        setHideHeaderFooter(shouldHideBasedOnPath || is404Detected);
        setContentLoaded(true); // İçerik hazır, görüntülenebilir
      } else {
        // Ref henüz mevcut değilse, hazır değil varsay
        setContentLoaded(false);
      }
    };

    // Yeni bir yol için durumu sıfırla
    setHideHeaderFooter(false);
    setContentLoaded(false);

    // İlk kontrolü çalıştır
    checkContentFor404();

    // İçerik asenkron yüklenebilirse yeniden kontrol etmek için küçük bir gecikme ekle
    const timer = setTimeout(checkContentFor404, 100); // Gecikmeyi biraz artırdık

    return () => clearTimeout(timer); // Temizleme fonksiyonu
  }, [pathname]); // Sadece pathname'e bağlı, children burada gerekli değil

  return (
    // CustomThemeProvider'ı kullanıyorsanız yorum satırını kaldırın
    // <CustomThemeProvider>
    <div
      style={{
        opacity: contentLoaded ? 1 : 0,
        transition: "opacity 0.2s ease-in-out", // Biraz daha uzun geçiş
      }}
      className="flex flex-col min-h-screen"
    >
      {!hideHeaderFooter && <Navbar />}
      <div ref={contentRef} className="flex-1">
        {children}
      </div>
      {!hideHeaderFooter && (
        <footer>
          <Footer />
        </footer>
      )}
    </div>
    // </CustomThemeProvider>
  );
}
