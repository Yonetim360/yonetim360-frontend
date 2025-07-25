import { HelpCircle } from "lucide-react";

export default function DefaultCase() {
  return (
    <div className="flex items-center justify-center h-64">
      <div className="text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <HelpCircle className="h-8 w-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-dark-gray mb-2">
          Modül Geliştiriliyor
        </h3>
        <p className="text-gray-600">Bu modül yakında kullanıma sunulacak.</p>
      </div>
    </div>
  );
}
