"use client";

import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User, Trash2, Edit, Plus } from "lucide-react";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";

export default function MyCalendar() {
  const [events, setEvents] = useState([
    {
      id: "1",
      title: "Müşteri Toplantısı",
      start: "2025-01-20T14:00:00",
      backgroundColor: "#4CAF50",
      borderColor: "#4CAF50",
      category: "toplanti",
      description: "ABC Teknoloji ile proje görüşmesi",
      assignedTo: "Ahmet Yılmaz",
    },
    {
      id: "2",
      title: "Teklif Hazırlama",
      start: "2025-01-21T10:00:00",
      backgroundColor: "#F77F00",
      borderColor: "#F77F00",
      category: "gorev",
      description: "XYZ İnşaat için teklif hazırlığı",
      assignedTo: "Fatma Demir",
    },
    {
      id: "3",
      title: "Personel Değerlendirmesi",
      start: "2025-01-22T15:30:00",
      backgroundColor: "#EF233C",
      borderColor: "#EF233C",
      category: "ik",
      description: "Çeyreklik performans değerlendirmesi",
      assignedTo: "Mehmet Kaya",
    },
  ]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [taskForm, setTaskForm] = useState({
    title: "",
    description: "",
    category: "",
    time: "",
    assignedTo: "",
  });

  const categories = [
    { value: "toplanti", label: "Toplantı", color: "#4CAF50" },
    { value: "gorev", label: "Görev", color: "#F77F00" },
    { value: "ik", label: "İnsan Kaynakları", color: "#EF233C" },
    { value: "crm", label: "CRM", color: "#4CAF50" },
    { value: "erp", label: "ERP", color: "#F77F00" },
    { value: "genel", label: "Genel", color: "#333533" },
  ];

  const teamMembers = [
    "Ahmet Yılmaz",
    "Fatma Demir",
    "Mehmet Kaya",
    "Ayşe Özkan",
    "Mustafa Çelik",
    "Zeynep Arslan",
  ];

  // Tarih ve saat formatları için yardımcı fonksiyonlar
  const formatDateTime = (dateStr, timeStr) => {
    if (!timeStr) {
      return `${dateStr}T09:00:00`;
    }
    return `${dateStr}T${timeStr}:00`;
  };

  const extractTimeFromDateTime = (dateTimeStr) => {
    if (!dateTimeStr) return "";
    const date = new Date(dateTimeStr);
    return date.toTimeString().slice(0, 5);
  };

  const extractDateFromDateTime = (dateTimeStr) => {
    if (!dateTimeStr) return "";
    const date = new Date(dateTimeStr);
    return date.toISOString().split("T")[0];
  };

  const formatDisplayTime = (dateTimeStr) => {
    if (!dateTimeStr) return "";
    const date = new Date(dateTimeStr);
    return date.toLocaleTimeString("tr-TR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleDateClick = (info) => {
    setSelectedDate(info.dateStr);
    setTaskForm({
      title: "",
      description: "",
      category: "",
      time: "09:00",
      assignedTo: "",
    });
    setIsAddModalOpen(true);
  };

  const handleEventClick = (info) => {
    const event = events.find((e) => e.id === info.event.id);
    setSelectedEvent(event);
    setIsViewModalOpen(true);
  };

  const handleEventChange = (changeInfo) => {
    const updatedEvent = {
      ...events.find((e) => e.id === changeInfo.event.id),
      start: changeInfo.event.start.toISOString(),
    };

    setEvents(
      events.map((event) =>
        event.id === changeInfo.event.id ? updatedEvent : event
      )
    );
  };

  const handleSaveTask = (e) => {
    e.preventDefault();
    if (!taskForm.title || !taskForm.category) return;

    const selectedCategory = categories.find(
      (cat) => cat.value === taskForm.category
    );
    const startDateTime = formatDateTime(selectedDate, taskForm.time);

    if (isEditModalOpen && selectedEvent) {
      const updatedEvent = {
        ...selectedEvent,
        title: taskForm.title,
        start: startDateTime,
        backgroundColor: selectedCategory.color,
        borderColor: selectedCategory.color,
        category: taskForm.category,
        description: taskForm.description,
        assignedTo: taskForm.assignedTo,
      };

      setEvents(
        events.map((event) =>
          event.id === selectedEvent.id ? updatedEvent : event
        )
      );
      setIsEditModalOpen(false);
    } else {
      const newEvent = {
        id: String(Date.now()),
        title: taskForm.title,
        start: startDateTime,
        backgroundColor: selectedCategory.color,
        borderColor: selectedCategory.color,
        category: taskForm.category,
        description: taskForm.description,
        assignedTo: taskForm.assignedTo,
      };
      setEvents([...events, newEvent]);
      setIsAddModalOpen(false);
    }

    setTaskForm({
      title: "",
      description: "",
      category: "",
      time: "",
      assignedTo: "",
    });
  };

  const handleDeleteTask = () => {
    if (selectedEvent) {
      setEvents(events.filter((event) => event.id !== selectedEvent.id));
      setIsViewModalOpen(false);
      setSelectedEvent(null);
    }
  };

  const getCategoryLabel = (categoryValue) => {
    const category = categories.find((cat) => cat.value === categoryValue);
    return category ? category.label : categoryValue;
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("tr-TR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h3 className="text-2xl font-bold text-dark-gray">
            Takvim & Görev Yönetimi
          </h3>
          <p className="text-gray-600">
            Görevlerinizi ve toplantılarınızı takip edin
          </p>
        </div>
        <Button
          className="bg-purple-600 hover:bg-purple-700 w-full sm:w-auto"
          onClick={() => {
            const today = new Date().toISOString().split("T")[0];
            setSelectedDate(today);
            setTaskForm({
              title: "",
              description: "",
              category: "",
              time: "09:00",
              assignedTo: "",
            });
            setIsAddModalOpen(true);
          }}
        >
          <Plus className="mr-2 h-4 w-4" />
          Yeni Görev
        </Button>
      </div>

      {/* Legend - Responsive */}
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {categories.map((category) => (
            <div key={category.value} className="flex items-center space-x-2">
              <div
                className="w-3 h-3 rounded-full flex-shrink-0"
                style={{ backgroundColor: category.color }}
              ></div>
              <span className="text-sm text-gray-600 truncate">
                {category.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Calendar - Responsive */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-3 sm:p-6">
          <FullCalendar
            plugins={[
              dayGridPlugin,
              interactionPlugin,
              timeGridPlugin,
              listPlugin,
            ]}
            initialView="dayGridMonth"
            selectable={true}
            editable={true}
            events={events}
            dateClick={handleDateClick}
            eventClick={handleEventClick}
            eventChange={handleEventChange}
            headerToolbar={{
              left: "prev,next",
              center: "title",
              right: "dayGridMonth,listWeek",
            }}
            // Responsive header toolbar
            views={{
              dayGridMonth: {
                titleFormat: { year: "numeric", month: "long" },
              },
              listWeek: {
                titleFormat: { year: "numeric", month: "long", day: "numeric" },
              },
            }}
            locale="tr"
            buttonText={{
              today: "Bugün",
              month: "Ay",
              week: "Hafta",
              day: "Gün",
              list: "Liste",
            }}
            dayNames={[
              "Pazar",
              "Pazartesi",
              "Salı",
              "Çarşamba",
              "Perşembe",
              "Cuma",
              "Cumartesi",
            ]}
            dayNamesShort={["Paz", "Pzt", "Sal", "Çar", "Per", "Cum", "Cmt"]}
            monthNames={[
              "Ocak",
              "Şubat",
              "Mart",
              "Nisan",
              "Mayıs",
              "Haziran",
              "Temmuz",
              "Ağustos",
              "Eylül",
              "Ekim",
              "Kasım",
              "Aralık",
            ]}
            height="auto"
            aspectRatio={1.8}
            eventDisplay="block"
            dayMaxEvents={2}
            moreLinkText="daha"
            eventTimeFormat={{
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            }}
            displayEventTime={true}
            // Responsive settings
            windowResizeDelay={100}
            eventMinHeight={25}
            eventShortHeight={20}
            // Mobile optimizations
            dayHeaderFormat={{ weekday: "short" }}
            eventClassNames="text-xs sm:text-sm"
            // Custom CSS for mobile
            customButtons={{}}
          />
        </div>
      </div>

      {/* Görev Ekleme Modal */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto mx-4">
          <DialogHeader>
            <DialogTitle className="text-dark-gray flex items-center">
              <Plus className="mr-2 h-5 w-5 text-purple-600" />
              Yeni Görev Ekle
            </DialogTitle>
            <DialogDescription>
              {selectedDate &&
                `${formatDate(selectedDate)} tarihine yeni bir görev ekleyin.`}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSaveTask} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label
                  htmlFor="task-title"
                  className="text-dark-gray font-medium"
                >
                  Görev Başlığı *
                </Label>
                <Input
                  id="task-title"
                  value={taskForm.title}
                  onChange={(e) =>
                    setTaskForm({ ...taskForm, title: e.target.value })
                  }
                  placeholder="Görev başlığını girin"
                  className="border-gray-300 focus:border-purple-600 focus:ring-purple-600"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="task-category"
                  className="text-dark-gray font-medium"
                >
                  Kategori *
                </Label>
                <Select
                  value={taskForm.category}
                  onValueChange={(value) =>
                    setTaskForm({ ...taskForm, category: value })
                  }
                >
                  <SelectTrigger className="border-gray-300 focus:border-purple-600">
                    <SelectValue placeholder="Kategori seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        <div className="flex items-center space-x-2">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: category.color }}
                          ></div>
                          <span>{category.label}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label
                  htmlFor="task-time"
                  className="text-dark-gray font-medium"
                >
                  Saat *
                </Label>
                <Input
                  id="task-time"
                  type="time"
                  value={taskForm.time}
                  onChange={(e) =>
                    setTaskForm({ ...taskForm, time: e.target.value })
                  }
                  className="border-gray-300 focus:border-purple-600 focus:ring-purple-600"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="task-assigned"
                  className="text-dark-gray font-medium"
                >
                  Atanan Kişi
                </Label>
                <Select
                  value={taskForm.assignedTo}
                  onValueChange={(value) =>
                    setTaskForm({ ...taskForm, assignedTo: value })
                  }
                >
                  <SelectTrigger className="border-gray-300 focus:border-purple-600">
                    <SelectValue placeholder="Kişi seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    {teamMembers.map((member) => (
                      <SelectItem key={member} value={member}>
                        {member}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="task-description"
                className="text-dark-gray font-medium"
              >
                Açıklama
              </Label>
              <Textarea
                id="task-description"
                value={taskForm.description}
                onChange={(e) =>
                  setTaskForm({ ...taskForm, description: e.target.value })
                }
                placeholder="Görev açıklaması..."
                rows={3}
                maxLength={500}
                wrap="soft"
                className="border-gray-300 focus:border-purple-600 focus:ring-purple-600 resize-none"
              />
            </div>

            <DialogFooter className="flex flex-col sm:flex-row gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsAddModalOpen(false)}
                className="bg-transparent w-full sm:w-auto"
              >
                İptal
              </Button>
              <Button
                type="submit"
                className="bg-purple-600 hover:bg-purple-700 w-full sm:w-auto"
              >
                <Plus className="mr-2 h-4 w-4" />
                Görev Ekle
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Görev Görüntüleme/Silme Modal */}
      <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto mx-4">
          {selectedEvent && (
            <>
              <DialogHeader>
                <DialogTitle className="text-dark-gray flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div className="flex items-center">
                    <Calendar
                      className="mr-2 h-5 w-5"
                      style={{ color: selectedEvent.backgroundColor }}
                    />
                    <span className="truncate">{selectedEvent.title}</span>
                  </div>
                  <Badge
                    className="text-white w-fit"
                    style={{ backgroundColor: selectedEvent.backgroundColor }}
                  >
                    {getCategoryLabel(selectedEvent.category)}
                  </Badge>
                </DialogTitle>
                <DialogDescription>
                  {formatDate(selectedEvent.start)} tarihindeki görev detayları
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 py-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="mr-2 h-4 w-4" />
                      <span className="font-medium">Tarih:</span>
                    </div>
                    <p className="text-dark-gray ml-6">
                      {formatDate(selectedEvent.start)}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="mr-2 h-4 w-4" />
                      <span className="font-medium">Saat:</span>
                    </div>
                    <p className="text-dark-gray ml-6">
                      {formatDisplayTime(selectedEvent.start)}
                    </p>
                  </div>
                </div>

                {selectedEvent.assignedTo && (
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-600">
                      <User className="mr-2 h-4 w-4" />
                      <span className="font-medium">Atanan Kişi:</span>
                    </div>
                    <p className="text-dark-gray ml-6">
                      {selectedEvent.assignedTo}
                    </p>
                  </div>
                )}

                {selectedEvent.description && (
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-600">
                      <span className="font-medium">Açıklama:</span>
                    </div>
                    <div className="text-dark-gray bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm leading-relaxed break-all whitespace-pre-line word-wrap">
                        {selectedEvent.description}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <DialogFooter className="flex flex-col sm:flex-row sm:justify-between gap-2">
                <Button
                  variant="outline"
                  onClick={handleDeleteTask}
                  className="bg-transparent text-red hover:bg-red hover:text-white border-red w-full sm:w-auto"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Görevi Sil
                </Button>
                <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                  <Button
                    variant="outline"
                    onClick={() => setIsViewModalOpen(false)}
                    className="bg-transparent"
                  >
                    Kapat
                  </Button>
                  <Button
                    className="bg-purple-600 hover:bg-purple-700"
                    onClick={() => {
                      setTaskForm({
                        title: selectedEvent.title,
                        description: selectedEvent.description || "",
                        category: selectedEvent.category,
                        time: extractTimeFromDateTime(selectedEvent.start),
                        assignedTo: selectedEvent.assignedTo || "",
                      });
                      setSelectedDate(
                        extractDateFromDateTime(selectedEvent.start)
                      );
                      setIsViewModalOpen(false);
                      setIsEditModalOpen(true);
                    }}
                  >
                    <Edit className="mr-2 h-4 w-4" />
                    Düzenle
                  </Button>
                </div>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Görev Düzenleme Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto mx-4">
          <DialogHeader>
            <DialogTitle className="text-dark-gray flex items-center">
              <Edit className="mr-2 h-5 w-5 text-purple-600" />
              Görevi Düzenle
            </DialogTitle>
            <DialogDescription>
              {selectedDate &&
                `${formatDate(selectedDate)} tarihindeki görevi düzenleyin.`}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSaveTask} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label
                  htmlFor="edit-task-title"
                  className="text-dark-gray font-medium"
                >
                  Görev Başlığı *
                </Label>
                <Input
                  id="edit-task-title"
                  value={taskForm.title}
                  onChange={(e) =>
                    setTaskForm({ ...taskForm, title: e.target.value })
                  }
                  placeholder="Görev başlığını girin"
                  className="border-gray-300 focus:border-purple-600 focus:ring-purple-600"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="edit-task-category"
                  className="text-dark-gray font-medium"
                >
                  Kategori *
                </Label>
                <Select
                  value={taskForm.category}
                  onValueChange={(value) =>
                    setTaskForm({ ...taskForm, category: value })
                  }
                >
                  <SelectTrigger className="border-gray-300 focus:border-purple-600">
                    <SelectValue placeholder="Kategori seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        <div className="flex items-center space-x-2">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: category.color }}
                          ></div>
                          <span>{category.label}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label
                  htmlFor="edit-task-time"
                  className="text-dark-gray font-medium"
                >
                  Saat *
                </Label>
                <Input
                  id="edit-task-time"
                  type="time"
                  value={taskForm.time}
                  onChange={(e) =>
                    setTaskForm({ ...taskForm, time: e.target.value })
                  }
                  className="border-gray-300 focus:border-purple-600 focus:ring-purple-600"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="edit-task-assigned"
                  className="text-dark-gray font-medium"
                >
                  Atanan Kişi
                </Label>
                <Select
                  value={taskForm.assignedTo}
                  onValueChange={(value) =>
                    setTaskForm({ ...taskForm, assignedTo: value })
                  }
                >
                  <SelectTrigger className="border-gray-300 focus:border-purple-600">
                    <SelectValue placeholder="Kişi seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    {teamMembers.map((member) => (
                      <SelectItem key={member} value={member}>
                        {member}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="edit-task-description"
                className="text-dark-gray font-medium"
              >
                Açıklama
              </Label>
              <Textarea
                id="edit-task-description"
                value={taskForm.description}
                onChange={(e) =>
                  setTaskForm({ ...taskForm, description: e.target.value })
                }
                placeholder="Görev açıklaması..."
                rows={3}
                maxLength={500}
                wrap="soft"
                className="border-gray-300 focus:border-purple-600 focus:ring-purple-600 resize-none"
              />
            </div>

            <DialogFooter className="flex flex-col sm:flex-row gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsEditModalOpen(false)}
                className="bg-transparent w-full sm:w-auto"
              >
                İptal
              </Button>
              <Button
                type="submit"
                className="bg-purple-600 hover:bg-purple-700 w-full sm:w-auto"
              >
                <Edit className="mr-2 h-4 w-4" />
                Güncelle
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Custom CSS for mobile responsiveness */}
      <style jsx global>{`
        .fc-toolbar {
          flex-direction: column;
          gap: 0.5rem;
        }

        @media (min-width: 640px) {
          .fc-toolbar {
            flex-direction: row;
          }
        }

        .fc-toolbar-chunk {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        @media (max-width: 639px) {
          .fc-toolbar-chunk {
            margin: 0.25rem 0;
          }

          .fc-button-group {
            display: flex;
            gap: 0.25rem;
          }

          .fc-button {
            padding: 0.25rem 0.5rem;
            font-size: 0.75rem;
          }

          .fc-toolbar-title {
            font-size: 1.1rem;
            margin: 0.5rem 0;
          }

          .fc-daygrid-event {
            font-size: 0.7rem;
            padding: 1px 2px;
          }

          .fc-event-title {
            font-size: 0.7rem;
          }

          .fc-col-header-cell {
            padding: 0.25rem;
          }

          .fc-daygrid-day-number {
            font-size: 0.8rem;
            padding: 0.25rem;
          }
        }

        .fc-event {
          border-radius: 4px;
          border: none !important;
        }

        .fc-list-event:hover {
          background-color: rgba(0, 0, 0, 0.05);
        }
      `}</style>
    </div>
  );
}
