"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Users,
  UserPlus,
  Clock,
  Calendar,
  DollarSign,
  Award,
  AlertTriangle,
  Package,
  BarChart3,
  MessageSquare,
  ChevronDown,
  ChevronRight,
  Plus,
  Edit,
  Trash2,
  Eye,
  Search,
  Filter,
  Download,
  CheckCircle,
  XCircle,
  TrendingUp,
  Bell,
  Settings,
  UserCheck,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Page() {
  const [activeModule, setActiveModule] = useState("overview");
  const [activeSubModule, setActiveSubModule] = useState("");
  const [expandedModules, setExpandedModules] = useState(["overview"]);

  // Mock data states
  const [employees, setEmployees] = useState([
    {
      id: "1",
      employeeId: "EMP001",
      firstName: "Ahmet",
      lastName: "Yılmaz",
      email: "ahmet.yilmaz@sirket.com",
      phone: "0532 123 4567",
      department: "Bilgi İşlem",
      position: "Yazılım Geliştirici",
      startDate: "2023-01-15",
      salary: 15000,
      status: "active",
      manager: "Mehmet Kaya",
    },
    {
      id: "2",
      employeeId: "EMP002",
      firstName: "Ayşe",
      lastName: "Demir",
      email: "ayse.demir@sirket.com",
      phone: "0533 234 5678",
      department: "İnsan Kaynakları",
      position: "İK Uzmanı",
      startDate: "2022-06-10",
      salary: 12000,
      status: "active",
      manager: "Fatma Özkan",
    },
    {
      id: "3",
      employeeId: "EMP003",
      firstName: "Mehmet",
      lastName: "Kaya",
      email: "mehmet.kaya@sirket.com",
      phone: "0534 345 6789",
      department: "Bilgi İşlem",
      position: "Proje Yöneticisi",
      startDate: "2021-03-20",
      salary: 20000,
      status: "active",
      manager: "Ali Veli",
    },
  ]);

  const [shifts, setShifts] = useState([
    {
      id: "1",
      name: "Gündüz Vardiyası",
      startTime: "08:00",
      endTime: "17:00",
      breakDuration: 60,
      employees: ["EMP001", "EMP002"],
      days: ["Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma"],
    },
    {
      id: "2",
      name: "Gece Vardiyası",
      startTime: "22:00",
      endTime: "06:00",
      breakDuration: 30,
      employees: ["EMP003"],
      days: ["Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma"],
    },
  ]);

  const [salaryDefinitions, setSalaryDefinitions] = useState([
    {
      id: "1",
      employeeId: "EMP001",
      baseSalary: 15000,
      allowances: [
        { name: "Yemek Yardımı", amount: 500 },
        { name: "Ulaşım Yardımı", amount: 300 },
      ],
      deductions: [
        { name: "SGK", amount: 2250 },
        { name: "Gelir Vergisi", amount: 1800 },
      ],
      bonuses: [{ name: "Performans Primi", amount: 1000 }],
      netSalary: 12750,
    },
  ]);

  const [leaveRequests, setLeaveRequests] = useState([
    {
      id: "1",
      employeeId: "EMP001",
      employeeName: "Ahmet Yılmaz",
      leaveType: "Yıllık İzin",
      startDate: "2024-02-01",
      endDate: "2024-02-05",
      days: 5,
      reason: "Tatil",
      status: "pending",
      appliedDate: "2024-01-20",
    },
    {
      id: "2",
      employeeId: "EMP002",
      employeeName: "Ayşe Demir",
      leaveType: "Hastalık İzni",
      startDate: "2024-01-25",
      endDate: "2024-01-26",
      days: 2,
      reason: "Grip",
      status: "approved",
      appliedDate: "2024-01-24",
    },
  ]);

  const [attendance, setAttendance] = useState([
    {
      id: "1",
      employeeId: "EMP001",
      employeeName: "Ahmet Yılmaz",
      date: "2024-01-22",
      checkIn: "08:15",
      checkOut: "17:30",
      workHours: 8.25,
      overtime: 0.5,
      status: "present",
    },
    {
      id: "2",
      employeeId: "EMP002",
      employeeName: "Ayşe Demir",
      date: "2024-01-22",
      checkIn: "08:00",
      checkOut: "17:00",
      workHours: 8.0,
      overtime: 0,
      status: "present",
    },
  ]);

  const [candidates, setCandidates] = useState([
    {
      id: "1",
      firstName: "Can",
      lastName: "Özkan",
      email: "can.ozkan@email.com",
      phone: "0535 123 4567",
      position: "Yazılım Geliştirici",
      experience: "3 yıl",
      education: "Bilgisayar Mühendisliği",
      status: "interview",
      appliedDate: "2024-01-15",
      cv: "can_ozkan_cv.pdf",
    },
    {
      id: "2",
      firstName: "Zeynep",
      lastName: "Kara",
      email: "zeynep.kara@email.com",
      phone: "0536 234 5678",
      position: "İK Uzmanı",
      experience: "2 yıl",
      education: "İşletme",
      status: "evaluation",
      appliedDate: "2024-01-18",
      cv: "zeynep_kara_cv.pdf",
    },
  ]);

  const [performanceReviews, setPerformanceReviews] = useState([
    {
      id: "1",
      employeeId: "EMP001",
      employeeName: "Ahmet Yılmaz",
      reviewPeriod: "2023 Q4",
      overallScore: 4.2,
      competencies: [
        { name: "Teknik Yetkinlik", score: 4.5 },
        { name: "İletişim", score: 4.0 },
        { name: "Takım Çalışması", score: 4.0 },
        { name: "Problem Çözme", score: 4.5 },
      ],
      goals: [
        { description: "Yeni teknolojileri öğrenmek", status: "completed" },
        {
          description: "Proje teslim sürelerini iyileştirmek",
          status: "in-progress",
        },
      ],
      feedback: "Çok başarılı bir dönem geçirdi. Teknik yetenekleri mükemmel.",
      reviewDate: "2024-01-10",
    },
  ]);

  const [disciplinaryRecords, setDisciplinaryRecords] = useState([
    {
      id: "1",
      employeeId: "EMP003",
      employeeName: "Mehmet Kaya",
      type: "warning",
      reason: "Geç kalma",
      description: "Son 1 ay içinde 3 kez geç kaldı",
      date: "2024-01-15",
      givenBy: "İK Departmanı",
      status: "active",
    },
  ]);

  const [assets, setAssets] = useState([
    {
      id: "1",
      name: "Laptop Dell XPS 13",
      category: "Bilgisayar",
      serialNumber: "DL123456789",
      purchaseDate: "2023-01-15",
      value: 25000,
      status: "assigned",
      assignedTo: "EMP001",
      assignedDate: "2023-01-16",
    },
    {
      id: "2",
      name: "iPhone 14",
      category: "Telefon",
      serialNumber: "IP987654321",
      purchaseDate: "2023-06-10",
      value: 15000,
      status: "available",
      assignedTo: null,
      assignedDate: null,
    },
  ]);

  const [announcements, setAnnouncements] = useState([
    {
      id: "1",
      title: "Yeni Yıl Tatili Duyurusu",
      content: "1-3 Ocak tarihleri arasında resmi tatil olacaktır.",
      date: "2023-12-25",
      author: "İK Departmanı",
      priority: "high",
      status: "active",
    },
    {
      id: "2",
      title: "Sağlık Sigortası Güncellemesi",
      content: "Sağlık sigortası kapsamında yeni düzenlemeler yapılmıştır.",
      date: "2024-01-10",
      author: "İK Departmanı",
      priority: "medium",
      status: "active",
    },
  ]);

  // Dialog states
  const [isEmployeeDialogOpen, setIsEmployeeDialogOpen] = useState(false);
  const [isShiftDialogOpen, setIsShiftDialogOpen] = useState(false);
  const [isLeaveDialogOpen, setIsLeaveDialogOpen] = useState(false);
  const [isCandidateDialogOpen, setIsCandidateDialogOpen] = useState(false);
  const [isAssetDialogOpen, setIsAssetDialogOpen] = useState(false);
  const [isAnnouncementDialogOpen, setIsAnnouncementDialogOpen] =
    useState(false);

  // Form states
  // Form states - Personel için genişletilmiş
  const [newEmployee, setNewEmployee] = useState({
    // Genel bilgiler
    employeeId: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    birthDate: "",
    nationalId: "",
    address: "",
    emergencyContact: "",
    emergencyPhone: "",

    // Eğitim bilgileri
    education: [
      {
        degree: "",
        school: "",
        department: "",
        graduationYear: "",
        gpa: "",
      },
    ],

    // Kariyer bilgileri
    department: "",
    position: "",
    startDate: "",
    salary: "",
    manager: "",
    workType: "",

    // Özlük belgeleri
    documents: {
      cv: null,
      diploma: null,
      healthReport: null,
      criminalRecord: null,
      references: null,
    },

    // Diğer bilgiler
    skills: "",
    languages: "",
    hobbies: "",
    notes: "",
  });

  const [newShift, setNewShift] = useState({
    name: "",
    startTime: "",
    endTime: "",
    breakDuration: "",
    days: [],
  });

  const [newLeaveRequest, setNewLeaveRequest] = useState({
    employeeId: "",
    leaveType: "",
    startDate: "",
    endDate: "",
    reason: "",
  });

  // Aday için genişletilmiş form state
  const [newCandidate, setNewCandidate] = useState({
    // Genel bilgiler
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    birthDate: "",
    nationalId: "",
    address: "",

    // Eğitim bilgileri
    education: [
      {
        degree: "",
        school: "",
        department: "",
        graduationYear: "",
        gpa: "",
      },
    ],

    // Kariyer bilgileri
    position: "",
    experience: "",
    previousCompanies: [
      {
        company: "",
        position: "",
        startDate: "",
        endDate: "",
        responsibilities: "",
      },
    ],

    // Diğer bilgiler
    skills: "",
    languages: "",
    expectedSalary: "",
    availableStartDate: "",
    notes: "",
  });

  const [newAsset, setNewAsset] = useState({
    name: "",
    category: "",
    serialNumber: "",
    purchaseDate: "",
    value: "",
  });

  const [newAnnouncement, setNewAnnouncement] = useState({
    title: "",
    content: "",
    priority: "medium",
  });

  const modules = [
    {
      id: "overview",
      name: "Genel Bakış",
      icon: BarChart3,
      color: "text-gray-700",
      bgColor: "bg-gray-100",
      subModules: [],
    },
    {
      id: "personnel",
      name: "Personel Yönetimi",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      subModules: [
        { id: "add-employee", name: "Personel Ekle" },
        { id: "employee-exit", name: "Personel Çıkış" },
        { id: "employee-list", name: "Personel Listesi" },
      ],
    },
    {
      id: "shifts",
      name: "Vardiya Yönetimi",
      icon: Clock,
      color: "text-green-600",
      bgColor: "bg-green-100",
      subModules: [
        { id: "define-shift", name: "Vardiya Belirle" },
        { id: "shift-table", name: "Vardiya Tablosu" },
      ],
    },
    {
      id: "payroll",
      name: "Bordro ve Maaş Yönetimi",
      icon: DollarSign,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
      subModules: [
        { id: "salary-definitions", name: "Maaş Tanımları ve Zam Geçmişi" },
        { id: "payments-deductions", name: "Ek Ödemeler, Kesintiler, Primler" },
        {
          id: "payroll-export",
          name: "Maaş Bordrosu Oluşturma ve Dışarı Aktarma",
        },
      ],
    },
    {
      id: "leave",
      name: "İzin Yönetimi",
      icon: Calendar,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
      subModules: [
        { id: "leave-requests", name: "İzin Başvuruları" },
        { id: "leave-balance", name: "İzin Bakiyesi Takibi" },
      ],
    },
    {
      id: "attendance",
      name: "Devam Takip (Puantaj)",
      icon: UserCheck,
      color: "text-indigo-600",
      bgColor: "bg-indigo-100",
      subModules: [
        { id: "check-in-out", name: "Giriş / Çıkış Saatleri" },
        { id: "overtime", name: "Fazla Mesai Takibi" },
      ],
    },
    {
      id: "candidates",
      name: "Aday Yönetimi",
      icon: UserPlus,
      color: "text-pink-600",
      bgColor: "bg-pink-100",
      subModules: [
        { id: "candidate-pool", name: "Aday Başvuruları ve Havuzu" },
        {
          id: "interview-notes",
          name: "Mülakat Notları, Değerlendirme Formları",
        },
        { id: "position-matching", name: "Aday Pozisyon Eşleştirme" },
      ],
    },
    {
      id: "performance",
      name: "Performans Değerlendirme",
      icon: Award,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100",
      subModules: [
        { id: "evaluation-forms", name: "Dönemsel Değerlendirme Formları" },
        { id: "competency-scoring", name: "Yetkinlik Bazlı Puanlama" },
        {
          id: "feedback-reports",
          name: "Geri Bildirim Süreci ve Sonuç Raporları",
        },
      ],
    },
    {
      id: "discipline",
      name: "Disiplin ve Uyarı Kayıtları",
      icon: AlertTriangle,
      color: "text-red-600",
      bgColor: "bg-red-100",
      subModules: [
        { id: "warnings", name: "Uyarı, İhtar ve Disiplin Cezaları" },
        {
          id: "incident-reports",
          name: "Olay Açıklamaları ve İlgili Belgeler",
        },
      ],
    },
    {
      id: "assets",
      name: "Zimmet Yönetimi",
      icon: Package,
      color: "text-teal-600",
      bgColor: "bg-teal-100",
      subModules: [
        { id: "asset-definition", name: "Eşya Tanımlama" },
        { id: "asset-assignment", name: "Zimmet Atama" },
        { id: "asset-tracking", name: "Zimmet Takibi" },
      ],
    },
    {
      id: "reports",
      name: "Raporlama Ve Analitik",
      icon: TrendingUp,
      color: "text-cyan-600",
      bgColor: "bg-cyan-100",
      subModules: [
        { id: "statistics", name: "Personel Sayısı, İzin İstatistikleri" },
      ],
    },
    {
      id: "support",
      name: "Çözüm Merkezi",
      icon: MessageSquare,
      color: "text-violet-600",
      bgColor: "bg-violet-100",
      subModules: [
        { id: "announcements", name: "Duyurular" },
        { id: "requests", name: "Talepler" },
      ],
    },
  ];

  const toggleModule = (moduleId) => {
    if (expandedModules.includes(moduleId)) {
      setExpandedModules(expandedModules.filter((id) => id !== moduleId));
    } else {
      setExpandedModules([...expandedModules, moduleId]);
    }
  };

  const handleModuleClick = (moduleId, subModuleId = "") => {
    setActiveModule(moduleId);
    setActiveSubModule(subModuleId);
    if (!expandedModules.includes(moduleId)) {
      setExpandedModules([...expandedModules, moduleId]);
    }
  };

  // Add new employee
  const handleAddEmployee = () => {
    const employee = {
      id: Date.now().toString(),
      employeeId: newEmployee.employeeId,
      firstName: newEmployee.firstName,
      lastName: newEmployee.lastName,
      email: newEmployee.email,
      phone: newEmployee.phone,
      department: newEmployee.department,
      position: newEmployee.position,
      startDate: newEmployee.startDate,
      salary: Number(newEmployee.salary),
      status: "active",
      manager: newEmployee.manager,
    };

    setEmployees([...employees, employee]);
    setNewEmployee({
      employeeId: "",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      birthDate: "",
      nationalId: "",
      address: "",
      emergencyContact: "",
      emergencyPhone: "",
      education: [
        { degree: "", school: "", department: "", graduationYear: "", gpa: "" },
      ],
      department: "",
      position: "",
      startDate: "",
      salary: "",
      manager: "",
      workType: "",
      documents: {
        cv: null,
        diploma: null,
        healthReport: null,
        criminalRecord: null,
        references: null,
      },
      skills: "",
      languages: "",
      hobbies: "",
      notes: "",
    });
    setIsEmployeeDialogOpen(false);
  };

  // Add new shift
  const handleAddShift = () => {
    const shift = {
      id: Date.now().toString(),
      name: newShift.name,
      startTime: newShift.startTime,
      endTime: newShift.endTime,
      breakDuration: Number(newShift.breakDuration),
      employees: [],
      days: newShift.days,
    };

    setShifts([...shifts, shift]);
    setNewShift({
      name: "",
      startTime: "",
      endTime: "",
      breakDuration: "",
      days: [],
    });
    setIsShiftDialogOpen(false);
  };

  // Add new leave request
  const handleAddLeaveRequest = () => {
    const employee = employees.find(
      (emp) => emp.employeeId === newLeaveRequest.employeeId
    );
    const startDate = new Date(newLeaveRequest.startDate);
    const endDate = new Date(newLeaveRequest.endDate);
    const days = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;

    const leaveRequest = {
      id: Date.now().toString(),
      employeeId: newLeaveRequest.employeeId,
      employeeName: employee
        ? `${employee.firstName} ${employee.lastName}`
        : "",
      leaveType: newLeaveRequest.leaveType,
      startDate: newLeaveRequest.startDate,
      endDate: newLeaveRequest.endDate,
      days: days,
      reason: newLeaveRequest.reason,
      status: "pending",
      appliedDate: new Date().toISOString().split("T")[0],
    };

    setLeaveRequests([...leaveRequests, leaveRequest]);
    setNewLeaveRequest({
      employeeId: "",
      leaveType: "",
      startDate: "",
      endDate: "",
      reason: "",
    });
    setIsLeaveDialogOpen(false);
  };

  // Add new candidate
  const handleAddCandidate = () => {
    const candidate = {
      id: Date.now().toString(),
      firstName: newCandidate.firstName,
      lastName: newCandidate.lastName,
      email: newCandidate.email,
      phone: newCandidate.phone,
      position: newCandidate.position,
      experience: newCandidate.experience,
      education: newCandidate.education,
      status: "new",
      appliedDate: new Date().toISOString().split("T")[0],
      cv: `${newCandidate.firstName.toLowerCase()}_${newCandidate.lastName.toLowerCase()}_cv.pdf`,
    };

    setCandidates([...candidates, candidate]);
    setNewCandidate({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      birthDate: "",
      nationalId: "",
      address: "",
      education: [
        { degree: "", school: "", department: "", graduationYear: "", gpa: "" },
      ],
      position: "",
      experience: "",
      previousCompanies: [
        {
          company: "",
          position: "",
          startDate: "",
          endDate: "",
          responsibilities: "",
        },
      ],
      skills: "",
      languages: "",
      expectedSalary: "",
      availableStartDate: "",
      notes: "",
    });
    setIsCandidateDialogOpen(false);
  };

  // Add new asset
  const handleAddAsset = () => {
    const asset = {
      id: Date.now().toString(),
      name: newAsset.name,
      category: newAsset.category,
      serialNumber: newAsset.serialNumber,
      purchaseDate: newAsset.purchaseDate,
      value: Number(newAsset.value),
      status: "available",
      assignedTo: null,
      assignedDate: null,
    };

    setAssets([...assets, asset]);
    setNewAsset({
      name: "",
      category: "",
      serialNumber: "",
      purchaseDate: "",
      value: "",
    });
    setIsAssetDialogOpen(false);
  };

  // Add new announcement
  const handleAddAnnouncement = () => {
    const announcement = {
      id: Date.now().toString(),
      title: newAnnouncement.title,
      content: newAnnouncement.content,
      date: new Date().toISOString().split("T")[0],
      author: "İK Departmanı",
      priority: newAnnouncement.priority,
      status: "active",
    };

    setAnnouncements([...announcements, announcement]);
    setNewAnnouncement({
      title: "",
      content: "",
      priority: "medium",
    });
    setIsAnnouncementDialogOpen(false);
  };

  // Delete functions
  const deleteEmployee = (id) => {
    setEmployees(employees.filter((emp) => emp.id !== id));
  };

  const deleteShift = (id) => {
    setShifts(shifts.filter((shift) => shift.id !== id));
  };

  const deleteLeaveRequest = (id) => {
    setLeaveRequests(leaveRequests.filter((req) => req.id !== id));
  };

  const deleteCandidate = (id) => {
    setCandidates(candidates.filter((candidate) => candidate.id !== id));
  };

  const deleteAsset = (id) => {
    setAssets(assets.filter((asset) => asset.id !== id));
  };

  // Update functions
  const updateLeaveRequestStatus = (id, status) => {
    setLeaveRequests(
      leaveRequests.map((req) =>
        req.id === id ? { ...req, status: status } : req
      )
    );
  };

  const updateCandidateStatus = (id, status) => {
    setCandidates(
      candidates.map((candidate) =>
        candidate.id === id ? { ...candidate, status: status } : candidate
      )
    );
  };

  const assignAsset = (assetId, employeeId) => {
    setAssets(
      assets.map((asset) =>
        asset.id === assetId
          ? {
              ...asset,
              status: "assigned",
              assignedTo: employeeId,
              assignedDate: new Date().toISOString().split("T")[0],
            }
          : asset
      )
    );
  };

  const renderOverviewContent = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-gray-900">İK Genel Bakış</h3>
        <p className="text-gray-600">
          İnsan kaynakları yönetim sisteminizdeki genel durum ve önemli
          metriklerin özeti
        </p>
      </div>

      {/* Ana İstatistikler */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Toplam Personel</p>
                <p className="text-3xl font-bold text-gray-900">
                  {employees.filter((emp) => emp.status === "active").length}
                </p>
                <p className="text-xs text-blue-600">+2 bu ay</p>
              </div>
              <Users className="h-10 w-10 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Bekleyen İzinler</p>
                <p className="text-3xl font-bold text-gray-900">
                  {
                    leaveRequests.filter((req) => req.status === "pending")
                      .length
                  }
                </p>
                <p className="text-xs text-green-600">-1 bu hafta</p>
              </div>
              <Calendar className="h-10 w-10 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Aday Başvuruları</p>
                <p className="text-3xl font-bold text-gray-900">
                  {candidates.length}
                </p>
                <p className="text-xs text-orange-600">+3 bu hafta</p>
              </div>
              <UserPlus className="h-10 w-10 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Ortalama Maaş</p>
                <p className="text-3xl font-bold text-gray-900">
                  ₺
                  {Math.round(
                    employees.reduce((sum, emp) => sum + emp.salary, 0) /
                      employees.length
                  ).toLocaleString()}
                </p>
                <p className="text-xs text-purple-600">+5% bu yıl</p>
              </div>
              <DollarSign className="h-10 w-10 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Hızlı Aksiyonlar */}
      <Card>
        <CardHeader>
          <CardTitle className="text-gray-900">Hızlı Aksiyonlar</CardTitle>
          <CardDescription>Sık kullanılan İK işlemleri</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button
              className="h-20 flex-col bg-blue-500 hover:bg-blue-600"
              onClick={() => setIsEmployeeDialogOpen(true)}
            >
              <UserPlus className="h-6 w-6 mb-2" />
              <span className="text-sm">Personel Ekle</span>
            </Button>
            <Button
              className="h-20 flex-col bg-green-500 hover:bg-green-600"
              onClick={() => setIsLeaveDialogOpen(true)}
            >
              <Calendar className="h-6 w-6 mb-2" />
              <span className="text-sm">İzin Başvurusu</span>
            </Button>
            <Button
              className="h-20 flex-col bg-orange-500 hover:bg-orange-600"
              onClick={() => setIsCandidateDialogOpen(true)}
            >
              <Users className="h-6 w-6 mb-2" />
              <span className="text-sm">Aday Ekle</span>
            </Button>
            <Button
              className="h-20 flex-col bg-purple-600 hover:bg-purple-700"
              onClick={() => setIsAnnouncementDialogOpen(true)}
            >
              <Bell className="h-6 w-6 mb-2" />
              <span className="text-sm">Duyuru Yap</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Kritik Uyarılar ve Son Aktiviteler */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-gray-900 flex items-center">
              <AlertTriangle className="mr-2 h-5 w-5 text-red-500" />
              Kritik Uyarılar
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {leaveRequests
                .filter((req) => req.status === "pending")
                .slice(0, 3)
                .map((req) => (
                  <div
                    key={req.id}
                    className="flex items-center space-x-4 p-3 bg-orange-50 rounded-lg border border-orange-200"
                  >
                    <Calendar className="h-5 w-5 text-orange-500" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        Bekleyen İzin: {req.employeeName}
                      </p>
                      <p className="text-xs text-gray-500">
                        {req.startDate} - {req.endDate} ({req.days} gün)
                      </p>
                    </div>
                    <Badge className="bg-orange-500 text-white">Bekliyor</Badge>
                  </div>
                ))}

              {disciplinaryRecords
                .filter((record) => record.status === "active")
                .slice(0, 2)
                .map((record) => (
                  <div
                    key={record.id}
                    className="flex items-center space-x-4 p-3 bg-red-50 rounded-lg border border-red-200"
                  >
                    <AlertTriangle className="h-5 w-5 text-red-500" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        Disiplin: {record.employeeName}
                      </p>
                      <p className="text-xs text-gray-500">{record.reason}</p>
                    </div>
                    <Badge className="bg-red-500 text-white">Aktif</Badge>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-gray-900">Son Aktiviteler</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {employees.slice(0, 4).map((employee) => (
                <div
                  key={employee.id}
                  className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg"
                >
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      {employee.firstName} {employee.lastName}
                    </p>
                    <p className="text-xs text-gray-500">
                      {employee.department} - {employee.position}
                    </p>
                  </div>
                  <p className="text-xs text-gray-500">{employee.startDate}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Departman Dağılımı */}
      <Card>
        <CardHeader>
          <CardTitle className="text-gray-900">Departman Dağılımı</CardTitle>
          <CardDescription>
            Personel sayılarının departmanlara göre dağılımı
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {Object.entries(
              employees.reduce((acc, emp) => {
                acc[emp.department] = (acc[emp.department] || 0) + 1;
                return acc;
              }, {})
            ).map(([department, count]) => (
              <div key={department} className="text-center">
                <p className="text-2xl font-bold text-blue-600">{count}</p>
                <p className="text-sm text-gray-600">{department}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderEmployeeListContent = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-bold text-gray-900">Personel Listesi</h3>
          <p className="text-gray-600">
            Tüm personel bilgilerini görüntüleyin ve yönetin
          </p>
        </div>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            className="bg-red-500 hover:bg-red-600 text-white"
          >
            <Download className="mr-2 h-4 w-4" />
            PDF Export
          </Button>
        </div>
      </div>

      {/* Personel Tablosu */}
      <Card>
        <CardHeader>
          <CardTitle>Personel Bilgileri</CardTitle>
          <div className="flex space-x-2">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <Input placeholder="Personel ara..." className="pl-8" />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filtrele
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Personel No</TableHead>
                <TableHead>Ad Soyad</TableHead>
                <TableHead>Departman</TableHead>
                <TableHead>Pozisyon</TableHead>
                <TableHead>E-posta</TableHead>
                <TableHead>Telefon</TableHead>
                <TableHead>Maaş</TableHead>
                <TableHead>Durum</TableHead>
                <TableHead>İşlemler</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {employees.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell className="font-mono">
                    {employee.employeeId}
                  </TableCell>
                  <TableCell className="font-medium">
                    {employee.firstName} {employee.lastName}
                  </TableCell>
                  <TableCell>{employee.department}</TableCell>
                  <TableCell>{employee.position}</TableCell>
                  <TableCell>{employee.email}</TableCell>
                  <TableCell>{employee.phone}</TableCell>
                  <TableCell>₺{employee.salary.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        employee.status === "active" ? "default" : "secondary"
                      }
                    >
                      {employee.status === "active" ? "Aktif" : "Pasif"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteEmployee(employee.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );

  const renderAddEmployeeContent = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-gray-900">Personel Ekle</h3>
        <p className="text-gray-600">Yeni personel kaydı oluşturun</p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <Tabs defaultValue="general" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="general">Genel Bilgiler</TabsTrigger>
              <TabsTrigger value="education">Eğitim Bilgileri</TabsTrigger>
              <TabsTrigger value="career">Kariyer Bilgileri</TabsTrigger>
              <TabsTrigger value="documents">Özlük Belgeleri</TabsTrigger>
              <TabsTrigger value="other">Diğer Bilgiler</TabsTrigger>
            </TabsList>

            <TabsContent value="general" className="space-y-4 mt-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="employeeId">Personel No *</Label>
                  <Input
                    id="employeeId"
                    value={newEmployee.employeeId}
                    onChange={(e) =>
                      setNewEmployee({
                        ...newEmployee,
                        employeeId: e.target.value,
                      })
                    }
                    placeholder="EMP001"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="nationalId">TC Kimlik No *</Label>
                  <Input
                    id="nationalId"
                    value={newEmployee.nationalId}
                    onChange={(e) =>
                      setNewEmployee({
                        ...newEmployee,
                        nationalId: e.target.value,
                      })
                    }
                    placeholder="12345678901"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="firstName">Ad *</Label>
                  <Input
                    id="firstName"
                    value={newEmployee.firstName}
                    onChange={(e) =>
                      setNewEmployee({
                        ...newEmployee,
                        firstName: e.target.value,
                      })
                    }
                    placeholder="Ad"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="lastName">Soyad *</Label>
                  <Input
                    id="lastName"
                    value={newEmployee.lastName}
                    onChange={(e) =>
                      setNewEmployee({
                        ...newEmployee,
                        lastName: e.target.value,
                      })
                    }
                    placeholder="Soyad"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">E-posta *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newEmployee.email}
                    onChange={(e) =>
                      setNewEmployee({ ...newEmployee, email: e.target.value })
                    }
                    placeholder="email@sirket.com"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone">Telefon *</Label>
                  <Input
                    id="phone"
                    value={newEmployee.phone}
                    onChange={(e) =>
                      setNewEmployee({ ...newEmployee, phone: e.target.value })
                    }
                    placeholder="0532 123 4567"
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="birthDate">Doğum Tarihi</Label>
                <Input
                  id="birthDate"
                  type="date"
                  value={newEmployee.birthDate}
                  onChange={(e) =>
                    setNewEmployee({
                      ...newEmployee,
                      birthDate: e.target.value,
                    })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="address">Adres</Label>
                <Textarea
                  id="address"
                  value={newEmployee.address}
                  onChange={(e) =>
                    setNewEmployee({ ...newEmployee, address: e.target.value })
                  }
                  placeholder="Tam adres bilgisi"
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="emergencyContact">Acil Durum İletişim</Label>
                  <Input
                    id="emergencyContact"
                    value={newEmployee.emergencyContact}
                    onChange={(e) =>
                      setNewEmployee({
                        ...newEmployee,
                        emergencyContact: e.target.value,
                      })
                    }
                    placeholder="Ad Soyad"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="emergencyPhone">Acil Durum Telefon</Label>
                  <Input
                    id="emergencyPhone"
                    value={newEmployee.emergencyPhone}
                    onChange={(e) =>
                      setNewEmployee({
                        ...newEmployee,
                        emergencyPhone: e.target.value,
                      })
                    }
                    placeholder="0532 123 4567"
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="education" className="space-y-4 mt-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="text-lg font-semibold">Eğitim Bilgileri</h4>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      const newEducation = [
                        ...newEmployee.education,
                        {
                          degree: "",
                          school: "",
                          department: "",
                          graduationYear: "",
                          gpa: "",
                        },
                      ];
                      setNewEmployee({
                        ...newEmployee,
                        education: newEducation,
                      });
                    }}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Eğitim Ekle
                  </Button>
                </div>

                {newEmployee.education.map((edu, index) => (
                  <Card key={index} className="p-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label>Derece</Label>
                        <Select
                          value={edu.degree}
                          onValueChange={(value) => {
                            const updatedEducation = [...newEmployee.education];
                            updatedEducation[index].degree = value;
                            setNewEmployee({
                              ...newEmployee,
                              education: updatedEducation,
                            });
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Derece seçin" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="İlkokul">İlkokul</SelectItem>
                            <SelectItem value="Ortaokul">Ortaokul</SelectItem>
                            <SelectItem value="Lise">Lise</SelectItem>
                            <SelectItem value="Ön Lisans">Ön Lisans</SelectItem>
                            <SelectItem value="Lisans">Lisans</SelectItem>
                            <SelectItem value="Yüksek Lisans">
                              Yüksek Lisans
                            </SelectItem>
                            <SelectItem value="Doktora">Doktora</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid gap-2">
                        <Label>Okul/Üniversite</Label>
                        <Input
                          value={edu.school}
                          onChange={(e) => {
                            const updatedEducation = [...newEmployee.education];
                            updatedEducation[index].school = e.target.value;
                            setNewEmployee({
                              ...newEmployee,
                              education: updatedEducation,
                            });
                          }}
                          placeholder="Okul adı"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 mt-4">
                      <div className="grid gap-2">
                        <Label>Bölüm</Label>
                        <Input
                          value={edu.department}
                          onChange={(e) => {
                            const updatedEducation = [...newEmployee.education];
                            updatedEducation[index].department = e.target.value;
                            setNewEmployee({
                              ...newEmployee,
                              education: updatedEducation,
                            });
                          }}
                          placeholder="Bölüm"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label>Mezuniyet Yılı</Label>
                        <Input
                          value={edu.graduationYear}
                          onChange={(e) => {
                            const updatedEducation = [...newEmployee.education];
                            updatedEducation[index].graduationYear =
                              e.target.value;
                            setNewEmployee({
                              ...newEmployee,
                              education: updatedEducation,
                            });
                          }}
                          placeholder="2020"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label>Not Ortalaması</Label>
                        <Input
                          value={edu.gpa}
                          onChange={(e) => {
                            const updatedEducation = [...newEmployee.education];
                            updatedEducation[index].gpa = e.target.value;
                            setNewEmployee({
                              ...newEmployee,
                              education: updatedEducation,
                            });
                          }}
                          placeholder="3.50"
                        />
                      </div>
                    </div>
                    {newEmployee.education.length > 1 && (
                      <div className="flex justify-end mt-4">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            const updatedEducation =
                              newEmployee.education.filter(
                                (_, i) => i !== index
                              );
                            setNewEmployee({
                              ...newEmployee,
                              education: updatedEducation,
                            });
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="career" className="space-y-4 mt-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="department">Departman *</Label>
                  <Select
                    value={newEmployee.department}
                    onChange={(e) =>
                      setNewEmployee({
                        ...newEmployee,
                        department: e.target.value,
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Departman seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Bilgi İşlem">Bilgi İşlem</SelectItem>
                      <SelectItem value="İnsan Kaynakları">
                        İnsan Kaynakları
                      </SelectItem>
                      <SelectItem value="Muhasebe">Muhasebe</SelectItem>
                      <SelectItem value="Satış">Satış</SelectItem>
                      <SelectItem value="Pazarlama">Pazarlama</SelectItem>
                      <SelectItem value="Üretim">Üretim</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="position">Pozisyon *</Label>
                  <Input
                    id="position"
                    value={newEmployee.position}
                    onChange={(e) =>
                      setNewEmployee({
                        ...newEmployee,
                        position: e.target.value,
                      })
                    }
                    placeholder="Pozisyon"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="startDate">İşe Başlama Tarihi *</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={newEmployee.startDate}
                    onChange={(e) =>
                      setNewEmployee({
                        ...newEmployee,
                        startDate: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="workType">Çalışma Türü</Label>
                  <Select
                    value={newEmployee.workType}
                    onChange={(e) =>
                      setNewEmployee({
                        ...newEmployee,
                        workType: e.target.value,
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Çalışma türü seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Tam Zamanlı">Tam Zamanlı</SelectItem>
                      <SelectItem value="Yarı Zamanlı">Yarı Zamanlı</SelectItem>
                      <SelectItem value="Proje Bazlı">Proje Bazlı</SelectItem>
                      <SelectItem value="Stajyer">Stajyer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="salary">Maaş *</Label>
                  <Input
                    id="salary"
                    type="number"
                    value={newEmployee.salary}
                    onChange={(e) =>
                      setNewEmployee({ ...newEmployee, salary: e.target.value })
                    }
                    placeholder="15000"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="manager">Yönetici</Label>
                  <Input
                    id="manager"
                    value={newEmployee.manager}
                    onChange={(e) =>
                      setNewEmployee({
                        ...newEmployee,
                        manager: e.target.value,
                      })
                    }
                    placeholder="Yönetici adı"
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="documents" className="space-y-4 mt-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="cv">CV</Label>
                    <Input
                      id="cv"
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) =>
                        setNewEmployee({
                          ...newEmployee,
                          documents: {
                            ...newEmployee.documents,
                            cv: e.target.files[0],
                          },
                        })
                      }
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="diploma">Diploma</Label>
                    <Input
                      id="diploma"
                      type="file"
                      accept=".pdf,.jpg,.png"
                      onChange={(e) =>
                        setNewEmployee({
                          ...newEmployee,
                          documents: {
                            ...newEmployee.documents,
                            diploma: e.target.files[0],
                          },
                        })
                      }
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="healthReport">Sağlık Raporu</Label>
                    <Input
                      id="healthReport"
                      type="file"
                      accept=".pdf,.jpg,.png"
                      onChange={(e) =>
                        setNewEmployee({
                          ...newEmployee,
                          documents: {
                            ...newEmployee.documents,
                            healthReport: e.target.files[0],
                          },
                        })
                      }
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="criminalRecord">Adli Sicil Belgesi</Label>
                    <Input
                      id="criminalRecord"
                      type="file"
                      accept=".pdf,.jpg,.png"
                      onChange={(e) =>
                        setNewEmployee({
                          ...newEmployee,
                          documents: {
                            ...newEmployee.documents,
                            criminalRecord: e.target.files[0],
                          },
                        })
                      }
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="references">Referans Mektupları</Label>
                    <Input
                      id="references"
                      type="file"
                      accept=".pdf,.doc,.docx"
                      multiple
                      onChange={(e) =>
                        setNewEmployee({
                          ...newEmployee,
                          documents: {
                            ...newEmployee.documents,
                            references: e.target.files,
                          },
                        })
                      }
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="other" className="space-y-4 mt-6">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="skills">Yetenekler</Label>
                  <Textarea
                    id="skills"
                    value={newEmployee.skills}
                    onChange={(e) =>
                      setNewEmployee({ ...newEmployee, skills: e.target.value })
                    }
                    placeholder="JavaScript, React, Node.js, vb."
                    rows={3}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="languages">Diller</Label>
                  <Textarea
                    id="languages"
                    value={newEmployee.languages}
                    onChange={(e) =>
                      setNewEmployee({
                        ...newEmployee,
                        languages: e.target.value,
                      })
                    }
                    placeholder="Türkçe (Ana dil), İngilizce (İleri), vb."
                    rows={2}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="hobbies">Hobiler</Label>
                  <Textarea
                    id="hobbies"
                    value={newEmployee.hobbies}
                    onChange={(e) =>
                      setNewEmployee({
                        ...newEmployee,
                        hobbies: e.target.value,
                      })
                    }
                    placeholder="Spor, müzik, okuma, vb."
                    rows={2}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="notes">Notlar</Label>
                  <Textarea
                    id="notes"
                    value={newEmployee.notes}
                    onChange={(e) =>
                      setNewEmployee({ ...newEmployee, notes: e.target.value })
                    }
                    placeholder="Ek notlar ve açıklamalar"
                    rows={3}
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end space-x-2 mt-6 pt-6 border-t">
            <Button
              variant="outline"
              onClick={() => {
                setNewEmployee({
                  employeeId: "",
                  firstName: "",
                  lastName: "",
                  email: "",
                  phone: "",
                  birthDate: "",
                  nationalId: "",
                  address: "",
                  emergencyContact: "",
                  emergencyPhone: "",
                  education: [
                    {
                      degree: "",
                      school: "",
                      department: "",
                      graduationYear: "",
                      gpa: "",
                    },
                  ],
                  department: "",
                  position: "",
                  startDate: "",
                  salary: "",
                  manager: "",
                  workType: "",
                  documents: {
                    cv: null,
                    diploma: null,
                    healthReport: null,
                    criminalRecord: null,
                    references: null,
                  },
                  skills: "",
                  languages: "",
                  hobbies: "",
                  notes: "",
                });
              }}
            >
              Temizle
            </Button>
            <Button
              onClick={handleAddEmployee}
              className="bg-blue-500 hover:bg-blue-600"
            >
              Personel Ekle
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderAddCandidateContent = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-gray-900">Aday Ekle</h3>
        <p className="text-gray-600">Yeni aday kaydı oluşturun</p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <Tabs defaultValue="general" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="general">Genel Bilgiler</TabsTrigger>
              <TabsTrigger value="education">Eğitim Bilgileri</TabsTrigger>
              <TabsTrigger value="career">Kariyer Bilgileri</TabsTrigger>
              <TabsTrigger value="other">Diğer Bilgiler</TabsTrigger>
            </TabsList>

            <TabsContent value="general" className="space-y-4 mt-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="candidateFirstName">Ad *</Label>
                  <Input
                    id="candidateFirstName"
                    value={newCandidate.firstName}
                    onChange={(e) =>
                      setNewCandidate({
                        ...newCandidate,
                        firstName: e.target.value,
                      })
                    }
                    placeholder="Ad"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="candidateLastName">Soyad *</Label>
                  <Input
                    id="candidateLastName"
                    value={newCandidate.lastName}
                    onChange={(e) =>
                      setNewCandidate({
                        ...newCandidate,
                        lastName: e.target.value,
                      })
                    }
                    placeholder="Soyad"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="candidateEmail">E-posta *</Label>
                  <Input
                    id="candidateEmail"
                    type="email"
                    value={newCandidate.email}
                    onChange={(e) =>
                      setNewCandidate({
                        ...newCandidate,
                        email: e.target.value,
                      })
                    }
                    placeholder="email@example.com"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="candidatePhone">Telefon *</Label>
                  <Input
                    id="candidatePhone"
                    value={newCandidate.phone}
                    onChange={(e) =>
                      setNewCandidate({
                        ...newCandidate,
                        phone: e.target.value,
                      })
                    }
                    placeholder="0532 123 4567"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="candidateBirthDate">Doğum Tarihi</Label>
                  <Input
                    id="candidateBirthDate"
                    type="date"
                    value={newCandidate.birthDate}
                    onChange={(e) =>
                      setNewCandidate({
                        ...newCandidate,
                        birthDate: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="candidateNationalId">TC Kimlik No</Label>
                  <Input
                    id="candidateNationalId"
                    value={newCandidate.nationalId}
                    onChange={(e) =>
                      setNewCandidate({
                        ...newCandidate,
                        nationalId: e.target.value,
                      })
                    }
                    placeholder="12345678901"
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="candidateAddress">Adres</Label>
                <Textarea
                  id="candidateAddress"
                  value={newCandidate.address}
                  onChange={(e) =>
                    setNewCandidate({
                      ...newCandidate,
                      address: e.target.value,
                    })
                  }
                  placeholder="Tam adres bilgisi"
                  rows={3}
                />
              </div>
            </TabsContent>

            <TabsContent value="education" className="space-y-4 mt-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="text-lg font-semibold">Eğitim Bilgileri</h4>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      const newEducation = [
                        ...newCandidate.education,
                        {
                          degree: "",
                          school: "",
                          department: "",
                          graduationYear: "",
                          gpa: "",
                        },
                      ];
                      setNewCandidate({
                        ...newCandidate,
                        education: newEducation,
                      });
                    }}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Eğitim Ekle
                  </Button>
                </div>

                {newCandidate.education.map((edu, index) => (
                  <Card key={index} className="p-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label>Derece</Label>
                        <Select
                          value={edu.degree}
                          onChange={(e) => {
                            const updatedEducation = [
                              ...newCandidate.education,
                            ];
                            updatedEducation[index].degree = e.target.value;
                            setNewCandidate({
                              ...newCandidate,
                              education: updatedEducation,
                            });
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Derece seçin" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="İlkokul">İlkokul</SelectItem>
                            <SelectItem value="Ortaokul">Ortaokul</SelectItem>
                            <SelectItem value="Lise">Lise</SelectItem>
                            <SelectItem value="Ön Lisans">Ön Lisans</SelectItem>
                            <SelectItem value="Lisans">Lisans</SelectItem>
                            <SelectItem value="Yüksek Lisans">
                              Yüksek Lisans
                            </SelectItem>
                            <SelectItem value="Doktora">Doktora</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid gap-2">
                        <Label>Okul/Üniversite</Label>
                        <Input
                          value={edu.school}
                          onChange={(e) => {
                            const updatedEducation = [
                              ...newCandidate.education,
                            ];
                            updatedEducation[index].school = e.target.value;
                            setNewCandidate({
                              ...newCandidate,
                              education: updatedEducation,
                            });
                          }}
                          placeholder="Okul adı"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 mt-4">
                      <div className="grid gap-2">
                        <Label>Bölüm</Label>
                        <Input
                          value={edu.department}
                          onChange={(e) => {
                            const updatedEducation = [
                              ...newCandidate.education,
                            ];
                            updatedEducation[index].department = e.target.value;
                            setNewCandidate({
                              ...newCandidate,
                              education: updatedEducation,
                            });
                          }}
                          placeholder="Bölüm"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label>Mezuniyet Yılı</Label>
                        <Input
                          value={edu.graduationYear}
                          onChange={(e) => {
                            const updatedEducation = [
                              ...newCandidate.education,
                            ];
                            updatedEducation[index].graduationYear =
                              e.target.value;
                            setNewCandidate({
                              ...newCandidate,
                              education: updatedEducation,
                            });
                          }}
                          placeholder="2020"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label>Not Ortalaması</Label>
                        <Input
                          value={edu.gpa}
                          onChange={(e) => {
                            const updatedEducation = [
                              ...newCandidate.education,
                            ];
                            updatedEducation[index].gpa = e.target.value;
                            setNewCandidate({
                              ...newCandidate,
                              education: updatedEducation,
                            });
                          }}
                          placeholder="3.50"
                        />
                      </div>
                    </div>
                    {newCandidate.education.length > 1 && (
                      <div className="flex justify-end mt-4">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            const updatedEducation =
                              newCandidate.education.filter(
                                (_, i) => i !== index
                              );
                            setNewCandidate({
                              ...newCandidate,
                              education: updatedEducation,
                            });
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="career" className="space-y-4 mt-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="candidatePosition">
                    Başvurulan Pozisyon *
                  </Label>
                  <Input
                    id="candidatePosition"
                    value={newCandidate.position}
                    onChange={(e) =>
                      setNewCandidate({
                        ...newCandidate,
                        position: e.target.value,
                      })
                    }
                    placeholder="Yazılım Geliştirici"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="candidateExperience">Toplam Deneyim</Label>
                  <Input
                    id="candidateExperience"
                    value={newCandidate.experience}
                    onChange={(e) =>
                      setNewCandidate({
                        ...newCandidate,
                        experience: e.target.value,
                      })
                    }
                    placeholder="3 yıl"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="text-lg font-semibold">
                    Önceki İş Deneyimleri
                  </h4>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      const newExperience = [
                        ...newCandidate.previousCompanies,
                        {
                          company: "",
                          position: "",
                          startDate: "",
                          endDate: "",
                          responsibilities: "",
                        },
                      ];
                      setNewCandidate({
                        ...newCandidate,
                        previousCompanies: newExperience,
                      });
                    }}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Deneyim Ekle
                  </Button>
                </div>

                {newCandidate.previousCompanies.map((exp, index) => (
                  <Card key={index} className="p-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label>Şirket Adı</Label>
                        <Input
                          value={exp.company}
                          onChange={(e) => {
                            const updatedExperience = [
                              ...newCandidate.previousCompanies,
                            ];
                            updatedExperience[index].company = e.target.value;
                            setNewCandidate({
                              ...newCandidate,
                              previousCompanies: updatedExperience,
                            });
                          }}
                          placeholder="Şirket adı"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label>Pozisyon</Label>
                        <Input
                          value={exp.position}
                          onChange={(e) => {
                            const updatedExperience = [
                              ...newCandidate.previousCompanies,
                            ];
                            updatedExperience[index].position = e.target.value;
                            setNewCandidate({
                              ...newCandidate,
                              previousCompanies: updatedExperience,
                            });
                          }}
                          placeholder="Pozisyon"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div className="grid gap-2">
                        <Label>Başlangıç Tarihi</Label>
                        <Input
                          type="date"
                          value={exp.startDate}
                          onChange={(e) => {
                            const updatedExperience = [
                              ...newCandidate.previousCompanies,
                            ];
                            updatedExperience[index].startDate = e.target.value;
                            setNewCandidate({
                              ...newCandidate,
                              previousCompanies: updatedExperience,
                            });
                          }}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label>Bitiş Tarihi</Label>
                        <Input
                          type="date"
                          value={exp.endDate}
                          onChange={(e) => {
                            const updatedExperience = [
                              ...newCandidate.previousCompanies,
                            ];
                            updatedExperience[index].endDate = e.target.value;
                            setNewCandidate({
                              ...newCandidate,
                              previousCompanies: updatedExperience,
                            });
                          }}
                        />
                      </div>
                    </div>
                    <div className="grid gap-2 mt-4">
                      <Label>Sorumluluklar</Label>
                      <Textarea
                        value={exp.responsibilities}
                        onChange={(e) => {
                          const updatedExperience = [
                            ...newCandidate.previousCompanies,
                          ];
                          updatedExperience[index].responsibilities =
                            e.target.value;
                          setNewCandidate({
                            ...newCandidate,
                            previousCompanies: updatedExperience,
                          });
                        }}
                        placeholder="İş tanımı ve sorumluluklar"
                        rows={3}
                      />
                    </div>
                    {newCandidate.previousCompanies.length > 1 && (
                      <div className="flex justify-end mt-4">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            const updatedExperience =
                              newCandidate.previousCompanies.filter(
                                (_, i) => i !== index
                              );
                            setNewCandidate({
                              ...newCandidate,
                              previousCompanies: updatedExperience,
                            });
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="other" className="space-y-4 mt-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="candidateExpectedSalary">Beklenen Maaş</Label>
                  <Input
                    id="candidateExpectedSalary"
                    type="number"
                    value={newCandidate.expectedSalary}
                    onChange={(e) =>
                      setNewCandidate({
                        ...newCandidate,
                        expectedSalary: e.target.value,
                      })
                    }
                    placeholder="15000"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="candidateAvailableStartDate">
                    Müsait Başlangıç Tarihi
                  </Label>
                  <Input
                    id="candidateAvailableStartDate"
                    type="date"
                    value={newCandidate.availableStartDate}
                    onChange={(e) =>
                      setNewCandidate({
                        ...newCandidate,
                        availableStartDate: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="candidateSkills">Yetenekler</Label>
                  <Textarea
                    id="candidateSkills"
                    value={newCandidate.skills}
                    onChange={(e) =>
                      setNewCandidate({
                        ...newCandidate,
                        skills: e.target.value,
                      })
                    }
                    placeholder="JavaScript, React, Node.js, vb."
                    rows={3}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="candidateLanguages">Diller</Label>
                  <Textarea
                    id="candidateLanguages"
                    value={newCandidate.languages}
                    onChange={(e) =>
                      setNewCandidate({
                        ...newCandidate,
                        languages: e.target.value,
                      })
                    }
                    placeholder="Türkçe (Ana dil), İngilizce (İleri), vb."
                    rows={2}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="candidateNotes">Notlar</Label>
                  <Textarea
                    id="candidateNotes"
                    value={newCandidate.notes}
                    onChange={(e) =>
                      setNewCandidate({
                        ...newCandidate,
                        notes: e.target.value,
                      })
                    }
                    placeholder="Ek notlar ve açıklamalar"
                    rows={3}
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end space-x-2 mt-6 pt-6 border-t">
            <Button
              variant="outline"
              onClick={() => {
                setNewCandidate({
                  firstName: "",
                  lastName: "",
                  email: "",
                  phone: "",
                  birthDate: "",
                  nationalId: "",
                  address: "",
                  education: [
                    {
                      degree: "",
                      school: "",
                      department: "",
                      graduationYear: "",
                      gpa: "",
                    },
                  ],
                  position: "",
                  experience: "",
                  previousCompanies: [
                    {
                      company: "",
                      position: "",
                      startDate: "",
                      endDate: "",
                      responsibilities: "",
                    },
                  ],
                  skills: "",
                  languages: "",
                  expectedSalary: "",
                  availableStartDate: "",
                  notes: "",
                });
              }}
            >
              Temizle
            </Button>
            <Button
              onClick={handleAddCandidate}
              className="bg-pink-500 hover:bg-pink-600"
            >
              Aday Ekle
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderShiftManagementContent = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-bold text-gray-900">Vardiya Yönetimi</h3>
          <p className="text-gray-600">
            Çalışma vardiyalarını tanımlayın ve yönetin
          </p>
        </div>
        <Dialog open={isShiftDialogOpen} onOpenChange={setIsShiftDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-green-500 hover:bg-green-600">
              <Plus className="mr-2 h-4 w-4" />
              Yeni Vardiya
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Yeni Vardiya Tanımla</DialogTitle>
              <DialogDescription>
                Yeni bir çalışma vardiyası oluşturun
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="shiftName">Vardiya Adı</Label>
                <Input
                  id="shiftName"
                  value={newShift.name}
                  onChange={(e) =>
                    setNewShift({ ...newShift, name: e.target.value })
                  }
                  placeholder="Gündüz Vardiyası"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="startTime">Başlangıç Saati</Label>
                  <Input
                    id="startTime"
                    type="time"
                    value={newShift.startTime}
                    onChange={(e) =>
                      setNewShift({ ...newShift, startTime: e.target.value })
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="endTime">Bitiş Saati</Label>
                  <Input
                    id="endTime"
                    type="time"
                    value={newShift.endTime}
                    onChange={(e) =>
                      setNewShift({ ...newShift, endTime: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="breakDuration">Mola Süresi (dakika)</Label>
                <Input
                  id="breakDuration"
                  type="number"
                  value={newShift.breakDuration}
                  onChange={(e) =>
                    setNewShift({ ...newShift, breakDuration: e.target.value })
                  }
                  placeholder="60"
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleAddShift}>Vardiya Oluştur</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Vardiya Kartları */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {shifts.map((shift) => (
          <Card key={shift.id}>
            <CardHeader>
              <CardTitle className="text-green-600 flex items-center">
                <Clock className="mr-2 h-5 w-5" />
                {shift.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">
                    Çalışma Saatleri:
                  </span>
                  <span className="font-medium">
                    {shift.startTime} - {shift.endTime}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Mola Süresi:</span>
                  <span className="font-medium">
                    {shift.breakDuration} dakika
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">
                    Personel Sayısı:
                  </span>
                  <span className="font-medium">{shift.employees.length}</span>
                </div>
                <div className="flex space-x-2 mt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 bg-transparent"
                  >
                    <Edit className="mr-2 h-4 w-4" />
                    Düzenle
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => deleteShift(shift.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderLeaveManagementContent = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-bold text-gray-900">İzin Yönetimi</h3>
          <p className="text-gray-600">
            Personel izin başvurularını yönetin ve takip edin
          </p>
        </div>
        <Dialog open={isLeaveDialogOpen} onOpenChange={setIsLeaveDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-purple-500 hover:bg-purple-600">
              <Plus className="mr-2 h-4 w-4" />
              Yeni İzin Başvurusu
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Yeni İzin Başvurusu</DialogTitle>
              <DialogDescription>
                Personel için yeni bir izin başvurusu oluşturun
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="employeeSelect">Personel</Label>
                <Select
                  value={newLeaveRequest.employeeId}
                  onValueChange={(value) =>
                    setNewLeaveRequest({
                      ...newLeaveRequest,
                      employeeId: value,
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Personel seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    {employees.map((employee) => (
                      <SelectItem key={employee.id} value={employee.employeeId}>
                        {employee.firstName} {employee.lastName} (
                        {employee.employeeId})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="leaveType">İzin Türü</Label>
                <Select
                  value={newLeaveRequest.leaveType}
                  onValueChange={(value) =>
                    setNewLeaveRequest({ ...newLeaveRequest, leaveType: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="İzin türü seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Yıllık İzin">Yıllık İzin</SelectItem>
                    <SelectItem value="Hastalık İzni">Hastalık İzni</SelectItem>
                    <SelectItem value="Doğum İzni">Doğum İzni</SelectItem>
                    <SelectItem value="Babalık İzni">Babalık İzni</SelectItem>
                    <SelectItem value="Mazeret İzni">Mazeret İzni</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="startDate">Başlangıç Tarihi</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={newLeaveRequest.startDate}
                    onChange={(e) =>
                      setNewLeaveRequest({
                        ...newLeaveRequest,
                        startDate: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="endDate">Bitiş Tarihi</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={newLeaveRequest.endDate}
                    onChange={(e) =>
                      setNewLeaveRequest({
                        ...newLeaveRequest,
                        endDate: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="reason">Açıklama</Label>
                <Textarea
                  id="reason"
                  value={newLeaveRequest.reason}
                  onChange={(e) =>
                    setNewLeaveRequest({
                      ...newLeaveRequest,
                      reason: e.target.value,
                    })
                  }
                  placeholder="İzin açıklaması"
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleAddLeaveRequest}>Başvuru Oluştur</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* İzin Başvuruları Tablosu */}
      <Card>
        <CardHeader>
          <CardTitle>İzin Başvuruları</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Personel</TableHead>
                <TableHead>İzin Türü</TableHead>
                <TableHead>Başlangıç</TableHead>
                <TableHead>Bitiş</TableHead>
                <TableHead>Gün Sayısı</TableHead>
                <TableHead>Durum</TableHead>
                <TableHead>İşlemler</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leaveRequests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell className="font-medium">
                    {request.employeeName}
                  </TableCell>
                  <TableCell>{request.leaveType}</TableCell>
                  <TableCell>{request.startDate}</TableCell>
                  <TableCell>{request.endDate}</TableCell>
                  <TableCell>{request.days}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        request.status === "approved"
                          ? "default"
                          : request.status === "pending"
                          ? "secondary"
                          : "destructive"
                      }
                    >
                      {request.status === "pending"
                        ? "Bekliyor"
                        : request.status === "approved"
                        ? "Onaylandı"
                        : "Reddedildi"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      {request.status === "pending" && (
                        <>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              updateLeaveRequestStatus(request.id, "approved")
                            }
                          >
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              updateLeaveRequestStatus(request.id, "rejected")
                            }
                          >
                            <XCircle className="h-4 w-4 text-red-600" />
                          </Button>
                        </>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteLeaveRequest(request.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );

  const renderCandidateManagementContent = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-bold text-gray-900">Aday Yönetimi</h3>
          <p className="text-gray-600">
            İş başvurularını ve aday süreçlerini yönetin
          </p>
        </div>
        <Dialog
          open={isCandidateDialogOpen}
          onOpenChange={setIsCandidateDialogOpen}
        >
          <DialogTrigger asChild>
            <Button className="bg-pink-500 hover:bg-pink-600">
              <Plus className="mr-2 h-4 w-4" />
              Yeni Aday
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Yeni Aday Ekle</DialogTitle>
              <DialogDescription>
                Yeni bir aday kaydı oluşturun
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="candidateFirstName">Ad</Label>
                  <Input
                    id="candidateFirstName"
                    value={newCandidate.firstName}
                    onChange={(e) =>
                      setNewCandidate({
                        ...newCandidate,
                        firstName: e.target.value,
                      })
                    }
                    placeholder="Ad"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="candidateLastName">Soyad</Label>
                  <Input
                    id="candidateLastName"
                    value={newCandidate.lastName}
                    onChange={(e) =>
                      setNewCandidate({
                        ...newCandidate,
                        lastName: e.target.value,
                      })
                    }
                    placeholder="Soyad"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="candidateEmail">E-posta</Label>
                  <Input
                    id="candidateEmail"
                    type="email"
                    value={newCandidate.email}
                    onChange={(e) =>
                      setNewCandidate({
                        ...newCandidate,
                        email: e.target.value,
                      })
                    }
                    placeholder="email@example.com"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="candidatePhone">Telefon</Label>
                  <Input
                    id="candidatePhone"
                    value={newCandidate.phone}
                    onChange={(e) =>
                      setNewCandidate({
                        ...newCandidate,
                        phone: e.target.value,
                      })
                    }
                    placeholder="0532 123 4567"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="candidatePosition">Başvurulan Pozisyon</Label>
                  <Input
                    id="candidatePosition"
                    value={newCandidate.position}
                    onChange={(e) =>
                      setNewCandidate({
                        ...newCandidate,
                        position: e.target.value,
                      })
                    }
                    placeholder="Yazılım Geliştirici"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="candidateExperience">Deneyim</Label>
                  <Input
                    id="candidateExperience"
                    value={newCandidate.experience}
                    onChange={(e) =>
                      setNewCandidate({
                        ...newCandidate,
                        experience: e.target.value,
                      })
                    }
                    placeholder="3 yıl"
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="candidateEducation">Eğitim</Label>
                <Input
                  id="candidateEducation"
                  value={newCandidate.education}
                  onChange={(e) =>
                    setNewCandidate({
                      ...newCandidate,
                      education: e.target.value,
                    })
                  }
                  placeholder="Bilgisayar Mühendisliği"
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleAddCandidate}>Aday Ekle</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Aday Kartları */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {candidates.map((candidate) => (
          <Card key={candidate.id}>
            <CardHeader>
              <CardTitle className="text-pink-600 flex items-center">
                <UserPlus className="mr-2 h-5 w-5" />
                {candidate.firstName} {candidate.lastName}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Pozisyon:</span>
                  <span className="font-medium">{candidate.position}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Deneyim:</span>
                  <span className="font-medium">{candidate.experience}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Eğitim:</span>
                  <span className="font-medium">{candidate.education}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Durum:</span>
                  <Badge
                    variant={
                      candidate.status === "hired"
                        ? "default"
                        : candidate.status === "interview"
                        ? "secondary"
                        : "outline"
                    }
                  >
                    {candidate.status === "new"
                      ? "Yeni"
                      : candidate.status === "interview"
                      ? "Mülakat"
                      : candidate.status === "evaluation"
                      ? "Değerlendirme"
                      : candidate.status === "hired"
                      ? "İşe Alındı"
                      : "Reddedildi"}
                  </Badge>
                </div>
                <div className="flex space-x-2 mt-4">
                  <Select
                    value={candidate.status}
                    onValueChange={(value) =>
                      updateCandidateStatus(candidate.id, value)
                    }
                  >
                    <SelectTrigger className="flex-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">Yeni</SelectItem>
                      <SelectItem value="interview">Mülakat</SelectItem>
                      <SelectItem value="evaluation">Değerlendirme</SelectItem>
                      <SelectItem value="hired">İşe Alındı</SelectItem>
                      <SelectItem value="rejected">Reddedildi</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => deleteCandidate(candidate.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderAssetManagementContent = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-bold text-gray-900">Zimmet Yönetimi</h3>
          <p className="text-gray-600">
            Şirket varlıklarını ve zimmet atamalarını yönetin
          </p>
        </div>
        <Dialog open={isAssetDialogOpen} onOpenChange={setIsAssetDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-teal-500 hover:bg-teal-600">
              <Plus className="mr-2 h-4 w-4" />
              Yeni Varlık
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Yeni Varlık Ekle</DialogTitle>
              <DialogDescription>
                Yeni bir şirket varlığı tanımlayın
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="assetName">Varlık Adı</Label>
                <Input
                  id="assetName"
                  value={newAsset.name}
                  onChange={(e) =>
                    setNewAsset({ ...newAsset, name: e.target.value })
                  }
                  placeholder="Laptop Dell XPS 13"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="assetCategory">Kategori</Label>
                  <Select
                    value={newAsset.category}
                    onValueChange={(value) =>
                      setNewAsset({ ...newAsset, category: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Kategori seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Bilgisayar">Bilgisayar</SelectItem>
                      <SelectItem value="Telefon">Telefon</SelectItem>
                      <SelectItem value="Mobilya">Mobilya</SelectItem>
                      <SelectItem value="Araç">Araç</SelectItem>
                      <SelectItem value="Diğer">Diğer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="assetSerial">Seri No</Label>
                  <Input
                    id="assetSerial"
                    value={newAsset.serialNumber}
                    onChange={(e) =>
                      setNewAsset({ ...newAsset, serialNumber: e.target.value })
                    }
                    placeholder="DL123456789"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="assetPurchaseDate">Satın Alma Tarihi</Label>
                  <Input
                    id="assetPurchaseDate"
                    type="date"
                    value={newAsset.purchaseDate}
                    onChange={(e) =>
                      setNewAsset({ ...newAsset, purchaseDate: e.target.value })
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="assetValue">Değer (₺)</Label>
                  <Input
                    id="assetValue"
                    type="number"
                    value={newAsset.value}
                    onChange={(e) =>
                      setNewAsset({ ...newAsset, value: e.target.value })
                    }
                    placeholder="25000"
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleAddAsset}>Varlık Ekle</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Varlık Tablosu */}
      <Card>
        <CardHeader>
          <CardTitle>Şirket Varlıkları</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Varlık Adı</TableHead>
                <TableHead>Kategori</TableHead>
                <TableHead>Seri No</TableHead>
                <TableHead>Değer</TableHead>
                <TableHead>Durum</TableHead>
                <TableHead>Zimmetli</TableHead>
                <TableHead>İşlemler</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {assets.map((asset) => (
                <TableRow key={asset.id}>
                  <TableCell className="font-medium">{asset.name}</TableCell>
                  <TableCell>{asset.category}</TableCell>
                  <TableCell className="font-mono">
                    {asset.serialNumber}
                  </TableCell>
                  <TableCell>₺{asset.value.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        asset.status === "assigned" ? "default" : "secondary"
                      }
                    >
                      {asset.status === "assigned" ? "Zimmetli" : "Müsait"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {asset.assignedTo ? (
                      <span className="text-sm">
                        {
                          employees.find(
                            (emp) => emp.employeeId === asset.assignedTo
                          )?.firstName
                        }{" "}
                        {
                          employees.find(
                            (emp) => emp.employeeId === asset.assignedTo
                          )?.lastName
                        }
                      </span>
                    ) : (
                      <Select
                        onValueChange={(value) => assignAsset(asset.id, value)}
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue placeholder="Ata" />
                        </SelectTrigger>
                        <SelectContent>
                          {employees.map((employee) => (
                            <SelectItem
                              key={employee.id}
                              value={employee.employeeId}
                            >
                              {employee.firstName} {employee.lastName}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteAsset(asset.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );

  const renderAnnouncementsContent = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-bold text-gray-900">Duyurular</h3>
          <p className="text-gray-600">
            Şirket duyurularını yönetin ve paylaşın
          </p>
        </div>
        <Dialog
          open={isAnnouncementDialogOpen}
          onOpenChange={setIsAnnouncementDialogOpen}
        >
          <DialogTrigger asChild>
            <Button className="bg-violet-500 hover:bg-violet-600">
              <Plus className="mr-2 h-4 w-4" />
              Yeni Duyuru
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Yeni Duyuru Oluştur</DialogTitle>
              <DialogDescription>
                Personel için yeni bir duyuru oluşturun
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="announcementTitle">Başlık</Label>
                <Input
                  id="announcementTitle"
                  value={newAnnouncement.title}
                  onChange={(e) =>
                    setNewAnnouncement({
                      ...newAnnouncement,
                      title: e.target.value,
                    })
                  }
                  placeholder="Duyuru başlığı"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="announcementContent">İçerik</Label>
                <Textarea
                  id="announcementContent"
                  value={newAnnouncement.content}
                  onChange={(e) =>
                    setNewAnnouncement({
                      ...newAnnouncement,
                      content: e.target.value,
                    })
                  }
                  placeholder="Duyuru içeriği"
                  rows={4}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="announcementPriority">Öncelik</Label>
                <Select
                  value={newAnnouncement.priority}
                  onValueChange={(value) =>
                    setNewAnnouncement({ ...newAnnouncement, priority: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Düşük</SelectItem>
                    <SelectItem value="medium">Orta</SelectItem>
                    <SelectItem value="high">Yüksek</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleAddAnnouncement}>Duyuru Yayınla</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Duyuru Kartları */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {announcements.map((announcement) => (
          <Card key={announcement.id}>
            <CardHeader>
              <CardTitle className="text-violet-600 flex items-center justify-between">
                <div className="flex items-center">
                  <Bell className="mr-2 h-5 w-5" />
                  {announcement.title}
                </div>
                <Badge
                  variant={
                    announcement.priority === "high"
                      ? "destructive"
                      : announcement.priority === "medium"
                      ? "default"
                      : "secondary"
                  }
                >
                  {announcement.priority === "high"
                    ? "Yüksek"
                    : announcement.priority === "medium"
                    ? "Orta"
                    : "Düşük"}
                </Badge>
              </CardTitle>
              <CardDescription>
                {announcement.author} • {announcement.date}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">{announcement.content}</p>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" size="sm">
                  <Edit className="mr-2 h-4 w-4" />
                  Düzenle
                </Button>
                <Button variant="outline" size="sm">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderModuleContent = () => {
    switch (activeModule) {
      case "overview":
        return renderOverviewContent();
      case "personnel":
        if (activeSubModule === "add-employee") {
          return renderAddEmployeeContent();
        }
        if (activeSubModule === "employee-list") {
          return renderEmployeeListContent();
        }
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-gray-900">
                Personel Yönetimi
              </h3>
              <p className="text-gray-600">
                Personel bilgilerini yönetin ve takip edin
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card
                className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => setActiveSubModule("add-employee")}
              >
                <CardHeader>
                  <CardTitle className="text-blue-600 flex items-center">
                    <UserPlus className="mr-2 h-5 w-5" />
                    Personel Ekle
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Yeni personel kaydı oluşturun</p>
                </CardContent>
              </Card>
              <Card
                className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => setActiveSubModule("employee-list")}
              >
                <CardHeader>
                  <CardTitle className="text-blue-600 flex items-center">
                    <Users className="mr-2 h-5 w-5" />
                    Personel Listesi
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Tüm personel bilgilerini görüntüleyin
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        );
      case "shifts":
        if (
          activeSubModule === "define-shift" ||
          activeSubModule === "shift-table"
        ) {
          return renderShiftManagementContent();
        }
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-gray-900">
                Vardiya Yönetimi
              </h3>
              <p className="text-gray-600">
                Çalışma vardiyalarını tanımlayın ve yönetin
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card
                className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => setActiveSubModule("define-shift")}
              >
                <CardHeader>
                  <CardTitle className="text-green-600 flex items-center">
                    <Clock className="mr-2 h-5 w-5" />
                    Vardiya Belirle
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Yeni vardiya tanımları oluşturun
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        );
      case "leave":
        if (
          activeSubModule === "leave-requests" ||
          activeSubModule === "leave-balance"
        ) {
          return renderLeaveManagementContent();
        }
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-gray-900">
                İzin Yönetimi
              </h3>
              <p className="text-gray-600">
                Personel izin başvurularını yönetin
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card
                className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => setActiveSubModule("leave-requests")}
              >
                <CardHeader>
                  <CardTitle className="text-purple-600 flex items-center">
                    <Calendar className="mr-2 h-5 w-5" />
                    İzin Başvuruları
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    İzin başvurularını onaylayın veya reddedin
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        );
      case "candidates":
        if (activeSubModule === "candidate-pool") {
          return renderAddCandidateContent();
        }
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-gray-900">
                Aday Yönetimi
              </h3>
              <p className="text-gray-600">
                İş başvurularını ve aday süreçlerini yönetin
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card
                className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => setActiveSubModule("candidate-pool")}
              >
                <CardHeader>
                  <CardTitle className="text-pink-600 flex items-center">
                    <UserPlus className="mr-2 h-5 w-5" />
                    Aday Havuzu
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Başvuran adayları görüntüleyin ve yönetin
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        );
      case "assets":
        if (activeSubModule === "asset-tracking") {
          return renderAssetManagementContent();
        }
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-gray-900">
                Zimmet Yönetimi
              </h3>
              <p className="text-gray-600">
                Şirket varlıklarını ve zimmet atamalarını yönetin
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card
                className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => setActiveSubModule("asset-tracking")}
              >
                <CardHeader>
                  <CardTitle className="text-teal-600 flex items-center">
                    <Package className="mr-2 h-5 w-5" />
                    Zimmet Takibi
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Varlık zimmet durumlarını takip edin
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        );
      case "support":
        if (activeSubModule === "announcements") {
          return renderAnnouncementsContent();
        }
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-gray-900">
                Çözüm Merkezi
              </h3>
              <p className="text-gray-600">Duyurular ve talepleri yönetin</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card
                className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => setActiveSubModule("announcements")}
              >
                <CardHeader>
                  <CardTitle className="text-violet-600 flex items-center">
                    <Bell className="mr-2 h-5 w-5" />
                    Duyurular
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Şirket duyurularını yönetin</p>
                </CardContent>
              </Card>
            </div>
          </div>
        );
      default:
        return (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Settings className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Modül Geliştiriliyor
              </h3>
              <p className="text-gray-600">
                Bu modül yakında kullanıma sunulacak.
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900">
            İnsan Kaynakları Yönetimi
          </h2>
          <p className="text-gray-600 mt-2">
            Personel ve İK süreçlerinizi entegre bir şekilde yönetin
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar - Modules */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-gray-900">İK Modülleri</CardTitle>
                <CardDescription>
                  Yönetmek istediğiniz modülü seçin
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-1">
                  {modules.map((module) => {
                    const IconComponent = module.icon;
                    const isExpanded = expandedModules.includes(module.id);
                    const isActive = activeModule === module.id;

                    return (
                      <div key={module.id}>
                        {/* Ana Modül */}
                        <div
                          onClick={() => handleModuleClick(module.id)}
                          className={`w-full text-left p-3 rounded-lg transition-colors flex items-center justify-between cursor-pointer ${
                            isActive && !activeSubModule
                              ? `${module.bgColor} ${module.color} border-l-4 border-current`
                              : "hover:bg-gray-50 text-gray-700"
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <IconComponent className="h-5 w-5" />
                            <span className="text-sm font-medium">
                              {module.name}
                            </span>
                          </div>
                          {module.subModules.length > 0 && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleModule(module.id);
                              }}
                              className="p-1 hover:bg-gray-200 rounded"
                            >
                              {isExpanded ? (
                                <ChevronDown className="h-4 w-4" />
                              ) : (
                                <ChevronRight className="h-4 w-4" />
                              )}
                            </button>
                          )}
                        </div>

                        {/* Alt Modüller */}
                        {isExpanded && module.subModules.length > 0 && (
                          <div className="ml-6 mt-1 space-y-1">
                            {module.subModules.map((subModule) => (
                              <button
                                key={subModule.id}
                                onClick={() =>
                                  handleModuleClick(module.id, subModule.id)
                                }
                                className={`w-full text-left p-2 rounded-md transition-colors text-sm ${
                                  activeModule === module.id &&
                                  activeSubModule === subModule.id
                                    ? `${module.bgColor} ${module.color} font-medium`
                                    : "hover:bg-gray-50 text-gray-600"
                                }`}
                              >
                                • {subModule.name}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Content Area */}
          <div className="lg:col-span-3">{renderModuleContent()}</div>
        </div>
      </div>
    </div>
  );
}
