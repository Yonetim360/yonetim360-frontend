import { Inter } from "next/font/google";
import "./globals.css";

import ClientLayout from "./ClientLayout";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Yönetim360 - İşletme Yönetim Sistemi",
  description:
    "CRM, ERP ve İnsan Kaynakları yönetimini tek platformda birleştiren kapsamlı işletme yönetim sistemi",
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body className={inter.className}>
        <ClientLayout>{children}</ClientLayout>
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}
