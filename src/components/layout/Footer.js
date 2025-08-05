import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-dark-gray text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold text-primary-green mb-4">
              Yönetim360
            </h3>
            <p className="text-gray-300">
              İşletmenizi yönetmenin en kolay yolu. Tek platformda tüm çözümler.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Ürünler</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link href="/crm" className="hover:text-primary-green">
                  CRM
                </Link>
              </li>
              <li>
                <Link href="/erp" className="hover:text-primary-green">
                  ERP
                </Link>
              </li>
              <li>
                <Link href="/hr" className="hover:text-primary-green">
                  İnsan Kaynakları
                </Link>
              </li>
              <li>
                <Link href="/reports" className="hover:text-primary-green">
                  Raporlar
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Destek</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link href="/help" className="hover:text-primary-green">
                  Yardım Merkezi
                </Link>
              </li>
              <li>
                <Link href="/docs" className="hover:text-primary-green">
                  Dokümantasyon
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary-green">
                  İletişim
                </Link>
              </li>
              <li>
                <Link href="/support" className="hover:text-primary-green">
                  Teknik Destek
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Şirket</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link href="/about" className="hover:text-primary-green">
                  Hakkımızda
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-primary-green">
                  Kariyer
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-primary-green">
                  Gizlilik
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-primary-green">
                  Şartlar
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 Yönetim360. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  );
}
