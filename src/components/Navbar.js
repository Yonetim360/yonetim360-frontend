"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Bell, Settings, User, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <h1 className="text-2xl font-bold text-[#4CAF50]">Yönetim360</h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link
              href="/"
              className="text-gray-600 hover:text-[#4CAF50] transition-colors"
            >
              Ana Sayfa
            </Link>
            <Link
              href="/dashboard"
              className="text-gray-600 hover:text-[#4CAF50] transition-colors"
            >
              Dashboard
            </Link>
            <Link
              href="/reports"
              className="text-gray-600 hover:text-[#4CAF50] transition-colors"
            >
              Raporlar
            </Link>
            <Link
              href="/contact"
              className="text-gray-600 hover:text-[#4CAF50] transition-colors"
            >
              İletişim
            </Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              asChild
              variant="ghost"
              size="icon"
              className="text-gray-600 hover:text-[#4CAF50] hover:bg-[#D0E8D0]"
            >
              <Link href="/notifications">
                <Bell className="h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              variant="ghost"
              size="icon"
              className="text-gray-600 hover:text-[#4CAF50] hover:bg-[#D0E8D0]"
            >
              <Link href="/settings">
                <Settings className="h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              variant="ghost"
              size="icon"
              className="text-gray-600 hover:text-[#4CAF50] hover:bg-[#D0E8D0]"
            >
              <Link href="/profile">
                <User className="h-5 w-5" />
              </Link>
            </Button>
            <Link href="/login">
              <Button className="bg-[#4CAF50] hover:bg-[#4CAF50]/90 text-white">
                Giriş Yap
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Mobile Quick Actions */}
            <Button
              asChild
              variant="ghost"
              size="icon"
              className="text-gray-600 hover:text-[#4CAF50] hover:bg-[#D0E8D0]"
            >
              <Link href="/notifications">
                <Bell className="h-4 w-4" />
              </Link>
            </Button>

            {/* Hamburger Menu */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMobileMenu}
              className="text-gray-600 hover:text-[#4CAF50] hover:bg-[#D0E8D0]"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-white border-b border-gray-200 shadow-lg z-50">
            <div className="px-4 py-4 space-y-4">
              {/* Mobile Navigation Links */}
              <div className="space-y-3">
                <Link
                  href="/"
                  className="block text-gray-600 hover:text-[#4CAF50] transition-colors py-2 px-3 rounded-md hover:bg-[#D0E8D0]"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Ana Sayfa
                </Link>
                <Link
                  href="/dashboard"
                  className="block text-gray-600 hover:text-[#4CAF50] transition-colors py-2 px-3 rounded-md hover:bg-[#D0E8D0]"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  href="/reports"
                  className="block text-gray-600 hover:text-[#4CAF50] transition-colors py-2 px-3 rounded-md hover:bg-[#D0E8D0]"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Raporlar
                </Link>
                <Link
                  href="/contact"
                  className="block text-gray-600 hover:text-[#4CAF50] transition-colors py-2 px-3 rounded-md hover:bg-[#D0E8D0]"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  İletişim
                </Link>
              </div>

              {/* Mobile Action Buttons */}
              <div className="border-t border-gray-200 pt-4 space-y-3">
                <div className="grid grid-cols-3 gap-3">
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="flex flex-col items-center py-3 h-auto border-[#4CAF50] text-[#4CAF50] hover:bg-[#D0E8D0] bg-transparent"
                  >
                    <Link
                      href="/notifications"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Bell className="h-4 w-4 mb-1" />
                      <span className="text-xs">Bildirimler</span>
                    </Link>
                  </Button>

                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="flex flex-col items-center py-3 h-auto border-[#4CAF50] text-[#4CAF50] hover:bg-[#D0E8D0] bg-transparent"
                  >
                    <Link
                      href="/settings"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Settings className="h-4 w-4 mb-1" />
                      <span className="text-xs">Ayarlar</span>
                    </Link>
                  </Button>

                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="flex flex-col items-center py-3 h-auto border-[#4CAF50] text-[#4CAF50] hover:bg-[#D0E8D0] bg-transparent"
                  >
                    <Link
                      href="/profile"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <User className="h-4 w-4 mb-1" />
                      <span className="text-xs">Profil</span>
                    </Link>
                  </Button>
                </div>

                {/* Mobile Login Button */}
                <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button className="w-full bg-[#4CAF50] hover:bg-[#4CAF50]/90 text-white my-4">
                    Giriş Yap
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
