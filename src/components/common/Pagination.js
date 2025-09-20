"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}) {
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <div className="flex items-center justify-between mt-5 pt-4 border-t">
      <div className="text-sm text-muted-foreground">
        Toplam {totalItems} kayıttan {(currentPage - 1) * itemsPerPage + 1}-
        {Math.min(currentPage * itemsPerPage, totalItems)} arası gösteriliyor
      </div>

      <div className="flex items-center space-x-2">
        {/* Önceki buton */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="flex items-center space-x-1 bg-transparent"
        >
          <ChevronLeft className="h-4 w-4" />
          <span>Önceki</span>
        </Button>

        {/* Sayfa numaraları */}
        <div className="flex items-center space-x-1">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              variant={currentPage === page ? "default" : "outline"}
              size="sm"
              onClick={() => goToPage(page)}
              disabled={currentPage === page} // aktif sayfa disable
              className={`w-8 h-8 p-0 ${
                currentPage === page
                  ? "bg-primary text-primary-foreground hover:bg-primary/90"
                  : "hover:bg-muted"
              }`}
            >
              {page}
            </Button>
          ))}
        </div>

        {/* Sonraki buton */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="flex items-center space-x-1 bg-transparent"
        >
          <span>Sonraki</span>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
