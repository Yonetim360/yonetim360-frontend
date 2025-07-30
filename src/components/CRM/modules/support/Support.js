import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCRMStore } from "@/stores/useCRMStore";
import { Plus } from "lucide-react";

export default function Support() {
  const { supportTickets, setIsSupportModalOpen } = useCRMStore();
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-bold text-dark-gray">
            Müşteri Destek Talep Takip
          </h3>
          <p className="text-gray-600">
            Destek taleplerini yönetin ve çözüm süreçlerini takip edin
          </p>
        </div>
        <Button
          className="bg-blue-600 hover:bg-blue-700"
          onClick={() => setIsSupportModalOpen(true)}
        >
          <Plus className="mr-2 h-4 w-4" />
          Yeni Talep
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-gray-600">Açık Talepler</p>
              <p className="text-2xl font-bold text-red">3</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-gray-600">Çözülen</p>
              <p className="text-2xl font-bold text-primary-green">12</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-gray-600">Ortalama Süre</p>
              <p className="text-2xl font-bold text-dark-gray">2.5 gün</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-gray-600">Memnuniyet</p>
              <p className="text-2xl font-bold text-orange">4.8/5</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Destek Talepleri</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {supportTickets.map((ticket) => (
              <div
                key={ticket.id}
                className="p-4 border border-gray-200 rounded-lg"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-semibold text-dark-gray">
                      {ticket.customer}
                    </h4>
                    <p className="text-sm text-gray-600">
                      #{ticket.ticketNo} - {ticket.subject}
                    </p>
                    <p className="text-sm text-gray-500">
                      Atanan: {ticket.assignedTo}
                    </p>
                  </div>
                  <div className="text-right space-y-2">
                    <Badge
                      variant={
                        ticket.priority === "Yüksek"
                          ? "destructive"
                          : "secondary"
                      }
                      className={
                        ticket.priority === "Yüksek" ? "bg-red" : "bg-orange"
                      }
                    >
                      {ticket.priority}
                    </Badge>
                    <Badge
                      variant={
                        ticket.status === "Çözüldü" ? "default" : "secondary"
                      }
                      className={
                        ticket.status === "Çözüldü"
                          ? "bg-primary-green"
                          : "bg-gray-500"
                      }
                    >
                      {ticket.status}
                    </Badge>
                  </div>
                </div>
                <p className="text-sm text-gray-500">
                  Oluşturulma: {ticket.createdDate}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
