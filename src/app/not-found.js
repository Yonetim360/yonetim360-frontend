import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 text-center px-4">
      <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
        404 - Sayfa Bulunamadı
      </h2>
      <p className="text-lg text-muted-foreground mb-8">
        Aradığınız kaynak bulunamadı.
      </p>
      <Link
        href="/"
        className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
      >
        Ana Sayfaya Dön
      </Link>
    </div>
  );
}
