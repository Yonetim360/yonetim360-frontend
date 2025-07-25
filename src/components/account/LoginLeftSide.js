import { Building2 } from "lucide-react";

export default function LoginLeftSide() {
  return (
    <div className="hidden lg:block space-y-6">
      <div className="text-center lg:text-left">
        <div className="flex items-center justify-center lg:justify-start mb-6">
          <Building2 className="h-12 w-12 text-primary-green mr-3" />
          <h1 className="text-4xl font-bold text-dark-gray">Yönetim360</h1>
        </div>
        <h2 className="text-2xl font-semibold text-dark-gray mb-4">
          İşletmenizi Yönetmenin En Kolay Yolu
        </h2>
        <p className="text-gray-600 text-lg leading-relaxed">
          CRM, ERP ve İnsan Kaynakları yönetimini tek platformda birleştiren
          kapsamlı işletme yönetim sistemi.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <div className="flex items-center space-x-3 p-4 bg-white/50 rounded-lg">
          <div className="w-3 h-3 bg-primary-green rounded-full"></div>
          <span className="text-dark-gray font-medium">
            Müşteri İlişkileri Yönetimi
          </span>
        </div>
        <div className="flex items-center space-x-3 p-4 bg-white/50 rounded-lg">
          <div className="w-3 h-3 bg-orange rounded-full"></div>
          <span className="text-dark-gray font-medium">
            Kurumsal Kaynak Planlaması
          </span>
        </div>
        <div className="flex items-center space-x-3 p-4 bg-white/50 rounded-lg">
          <div className="w-3 h-3 bg-red rounded-full"></div>
          <span className="text-dark-gray font-medium">
            İnsan Kaynakları Yönetimi
          </span>
        </div>
      </div>
    </div>
  );
}
