import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Bell, Settings, User } from "lucide-react";

export default function Navbar() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center">
            <h1 className="text-2xl font-bold text-primary-green">
              Yönetim360
            </h1>
          </Link>

          <nav className="hidden md:flex space-x-8">
            <Link
              href="/"
              className="text-gray-600 hover:text-primary-green transition-colors"
            >
              Ana Sayfa
            </Link>
            <Link
              href="/dashboard"
              className="text-gray-600 hover:text-primary-green transition-colors"
            >
              Dashboard
            </Link>

            <Link
              href="/reports"
              className="text-gray-600 hover:text-primary-green transition-colors"
            >
              Raporlar
            </Link>
            <Link
              href="/dashboard"
              className="text-gray-600 hover:text-primary-green transition-colors"
            >
              İletişim
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
            <Link href="/login">
              <Button className="bg-primary-green hover:bg-primary-green/90">
                Giriş Yap
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
