import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCRMStore } from "@/stores/useCRMStore";
import { AlertCircle, Clock, Phone, Plus } from "lucide-react";

export default function Communication() {
  const { communications, setIsCommunicationModalOpen } = useCRMStore();
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-bold text-dark-gray">
            İletişim ve Görüşme Takibi
          </h3>
          <p className="text-gray-600">
            Müşteri iletişimlerini kaydedin ve takip edin
          </p>
        </div>
        <Button
          className="bg-orange hover:bg-orange/90"
          onClick={() => setIsCommunicationModalOpen(true)}
        >
          <Plus className="mr-2 h-4 w-4" />
          Yeni İletişim
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Bu Hafta</p>
                <p className="text-2xl font-bold text-dark-gray">24</p>
              </div>
              <Phone className="h-8 w-8 text-orange" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Toplam Süre</p>
                <p className="text-2xl font-bold text-dark-gray">12.5 saat</p>
              </div>
              <Clock className="h-8 w-8 text-primary-green" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Bekleyen</p>
                <p className="text-2xl font-bold text-dark-gray">3</p>
              </div>
              <AlertCircle className="h-8 w-8 text-red" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Son İletişimler</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {communications.map((comm) => (
              <div
                key={comm.id}
                className="p-4 border border-gray-200 rounded-lg"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-semibold text-dark-gray">
                      {comm.customer}
                    </h4>
                    <p className="text-sm text-gray-600">{comm.subject}</p>
                  </div>
                  <Badge
                    variant={
                      comm.status === "Tamamlandı" ? "default" : "secondary"
                    }
                  >
                    {comm.status}
                  </Badge>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-500 mb-2">
                  <span>{comm.type}</span>
                  <span>
                    {comm.date} - {comm.time}
                  </span>
                  {comm.duration && <span>{comm.duration}</span>}
                </div>
                <p className="text-sm text-gray-700">{comm.notes}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
