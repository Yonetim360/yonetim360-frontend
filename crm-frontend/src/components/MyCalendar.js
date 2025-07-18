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

export default function MyCalendar() {
  const [events, setEvents] = useState([
    {
      id: "1",
      title: "Müşteri Toplantısı",
      start: "2025-01-20T14:00:00", // ISO format ile tam tarih-saat
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
      return `${dateStr}T09:00:00`; // Varsayılan saat
    }
    return `${dateStr}T${timeStr}:00`;
  };

  const extractTimeFromDateTime = (dateTimeStr) => {
    if (!dateTimeStr) return "";
    const date = new Date(dateTimeStr);
    return date.toTimeString().slice(0, 5); // HH:MM formatı
  };

  const extractDateFromDateTime = (dateTimeStr) => {
    if (!dateTimeStr) return "";
    const date = new Date(dateTimeStr);
    return date.toISOString().split("T")[0]; // YYYY-MM-DD formatı
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
      time: "09:00", // Varsayılan saat
      assignedTo: "",
    });
    setIsAddModalOpen(true);
  };

  const handleEventClick = (info) => {
    const event = events.find((e) => e.id === info.event.id);
    setSelectedEvent(event);
    setIsViewModalOpen(true);
  };

  // Event'in zamanını güncelleme (sürükle-bırak için)
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
      // Düzenleme modu - mevcut event'i güncelle
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
      // Ekleme modu - yeni event oluştur
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
    <div className="p-6 bg-cream min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-dark-gray mb-2">
                Takvim & Görev Yönetimi
              </h1>
              <p className="text-gray-600">
                Görevlerinizi ve toplantılarınızı takip edin
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                {categories.slice(0, 4).map((category) => (
                  <div
                    key={category.value}
                    className="flex items-center space-x-1"
                  >
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: category.color }}
                    ></div>
                    <span className="text-sm text-gray-600">
                      {category.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Calendar */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
            initialView="dayGridMonth"
            selectable={true}
            editable={true}
            events={events}
            dateClick={handleDateClick}
            eventClick={handleEventClick}
            eventChange={handleEventChange} // Sürükle-bırak için
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay",
            }}
            locale="tr"
            buttonText={{
              today: "Bugün",
              month: "Ay",
              week: "Hafta",
              day: "Gün",
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
            eventDisplay="block"
            dayMaxEvents={3}
            moreLinkText="daha fazla"
            slotMinTime="07:00:00"
            slotMaxTime="20:00:00"
            slotDuration="00:30:00"
            eventTimeFormat={{
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            }}
            displayEventTime={true}
          />
        </div>

        {/* Görev Ekleme Modal */}
        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-dark-gray flex items-center">
                <Plus className="mr-2 h-5 w-5 text-primary-green" />
                Yeni Görev Ekle
              </DialogTitle>
              <DialogDescription>
                {selectedDate &&
                  `${formatDate(
                    selectedDate
                  )} tarihine yeni bir görev ekleyin.`}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSaveTask} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
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
                    className="border-gray-300 focus:border-primary-green focus:ring-primary-green"
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
                    <SelectTrigger className="border-gray-300 focus:border-primary-green">
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

              <div className="grid grid-cols-2 gap-4">
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
                    className="border-gray-300 focus:border-primary-green focus:ring-primary-green"
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
                    <SelectTrigger className="border-gray-300 focus:border-primary-green">
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
                  className="border-gray-300 focus:border-primary-green focus:ring-primary-green resize-none"
                />
              </div>

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsAddModalOpen(false)}
                  className="bg-transparent"
                >
                  İptal
                </Button>
                <Button
                  type="submit"
                  className="bg-primary-green hover:bg-primary-green/90"
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
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            {selectedEvent && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-dark-gray flex items-center justify-between">
                    <div className="flex items-center">
                      <Calendar
                        className="mr-2 h-5 w-5"
                        style={{ color: selectedEvent.backgroundColor }}
                      />
                      {selectedEvent.title}
                    </div>
                    <Badge
                      className="text-white"
                      style={{ backgroundColor: selectedEvent.backgroundColor }}
                    >
                      {getCategoryLabel(selectedEvent.category)}
                    </Badge>
                  </DialogTitle>
                  <DialogDescription>
                    {formatDate(selectedEvent.start)} tarihindeki görev
                    detayları
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
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

                <DialogFooter className="flex justify-between">
                  <Button
                    variant="outline"
                    onClick={handleDeleteTask}
                    className="bg-transparent text-red hover:bg-red hover:text-white border-red"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Görevi Sil
                  </Button>
                  <div className="space-x-2">
                    <Button
                      variant="outline"
                      onClick={() => setIsViewModalOpen(false)}
                      className="bg-transparent"
                    >
                      Kapat
                    </Button>
                    <Button
                      className="bg-primary-green hover:bg-primary-green/90"
                      onClick={() => {
                        // Form'u mevcut event verileri ile doldur
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
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-dark-gray flex items-center">
                <Edit className="mr-2 h-5 w-5 text-primary-green" />
                Görevi Düzenle
              </DialogTitle>
              <DialogDescription>
                {selectedDate &&
                  `${formatDate(selectedDate)} tarihindeki görevi düzenleyin.`}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSaveTask} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
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
                    className="border-gray-300 focus:border-primary-green focus:ring-primary-green"
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
                    <SelectTrigger className="border-gray-300 focus:border-primary-green">
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

              <div className="grid grid-cols-2 gap-4">
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
                    className="border-gray-300 focus:border-primary-green focus:ring-primary-green"
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
                    <SelectTrigger className="border-gray-300 focus:border-primary-green">
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
                  className="border-gray-300 focus:border-primary-green focus:ring-primary-green resize-none"
                />
              </div>

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsEditModalOpen(false)}
                  className="bg-transparent"
                >
                  İptal
                </Button>
                <Button
                  type="submit"
                  className="bg-primary-green hover:bg-primary-green/90"
                >
                  <Edit className="mr-2 h-4 w-4" />
                  Güncelle
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
