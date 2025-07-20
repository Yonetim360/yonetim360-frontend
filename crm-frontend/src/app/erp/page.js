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
  BarChart3,
  CreditCard,
  Package,
  ShoppingCart,
  Factory,
  Calculator,
  Shield,
  Wrench,
  FileText,
  TrendingUp,
  ChevronDown,
  ChevronRight,
  Plus,
  AlertTriangle,
  DollarSign,
  Settings,
  Edit,
  Trash2,
  Eye,
  Search,
  Filter,
  Download,
  Upload,
  Clock,
} from "lucide-react";

export default function Page() {
  const [activeModule, setActiveModule] = useState("overview");
  const [activeSubModule, setActiveSubModule] = useState("");
  const [expandedModules, setExpandedModules] = useState(["overview"]);

  // Mock data states
  const [bankTransactions, setBankTransactions] = useState([
    {
      id: "1",
      date: "2024-01-15",
      description: "ABC Teknoloji - Ödeme",
      amount: 125000,
      type: "income",
      category: "Satış",
      status: "completed",
    },
    {
      id: "2",
      date: "2024-01-14",
      description: "Tedarikçi X - Ödeme",
      amount: -45000,
      type: "expense",
      category: "Satın Alma",
      status: "completed",
    },
    {
      id: "3",
      date: "2024-01-13",
      description: "Maaş Ödemeleri",
      amount: -85000,
      type: "expense",
      category: "İnsan Kaynakları",
      status: "completed",
    },
    {
      id: "4",
      date: "2024-01-12",
      description: "XYZ İnşaat - Ödeme",
      amount: 75000,
      type: "income",
      category: "Satış",
      status: "completed",
    },
  ]);

  const [stockItems, setStockItems] = useState([
    {
      id: "1",
      name: "Hammadde A",
      sku: "HM-001",
      category: "Hammadde",
      quantity: 150,
      minStock: 50,
      price: 25.5,
      supplier: "Tedarikçi A",
      lastUpdated: "2024-01-15",
    },
    {
      id: "2",
      name: "Ürün X",
      sku: "UR-001",
      category: "Mamul",
      quantity: 25,
      minStock: 30,
      price: 150.0,
      supplier: "Üretim",
      lastUpdated: "2024-01-14",
    },
    {
      id: "3",
      name: "Hammadde B",
      sku: "HM-002",
      category: "Hammadde",
      quantity: 10,
      minStock: 20,
      price: 45.0,
      supplier: "Tedarikçi B",
      lastUpdated: "2024-01-13",
    },
  ]);

  const [purchaseOrders, setPurchaseOrders] = useState([
    {
      id: "1",
      orderNumber: "PO-2024-001",
      supplier: "Tedarikçi A",
      date: "2024-01-15",
      status: "pending",
      totalAmount: 45000,
      items: [
        { name: "Hammadde A", quantity: 100, price: 25.5 },
        { name: "Hammadde B", quantity: 200, price: 95.0 },
      ],
    },
    {
      id: "2",
      orderNumber: "PO-2024-002",
      supplier: "Tedarikçi B",
      date: "2024-01-14",
      status: "approved",
      totalAmount: 32000,
      items: [{ name: "Hammadde C", quantity: 150, price: 15.0 }],
    },
  ]);

  const [productionOrders, setProductionOrders] = useState([
    {
      id: "1",
      orderNumber: "PR-2024-001",
      product: "Ürün X",
      quantity: 100,
      status: "in-progress",
      startDate: "2024-01-10",
      endDate: "2024-01-20",
      progress: 65,
    },
    {
      id: "2",
      orderNumber: "PR-2024-002",
      product: "Ürün Y",
      quantity: 50,
      status: "planned",
      startDate: "2024-01-20",
      endDate: "2024-01-30",
      progress: 0,
    },
  ]);

  const [suppliers, setSuppliers] = useState([
    {
      id: "1",
      name: "Tedarikçi A",
      contact: "Ahmet Yılmaz",
      phone: "0212 555 0001",
      email: "ahmet@tedarikcia.com",
      rating: 4.5,
      totalOrders: 25,
    },
    {
      id: "2",
      name: "Tedarikçi B",
      contact: "Mehmet Kaya",
      phone: "0212 555 0002",
      email: "mehmet@tedarikcib.com",
      rating: 4.2,
      totalOrders: 18,
    },
  ]);

  const [qualityControls, setQualityControls] = useState([
    {
      id: "1",
      itemName: "Hammadde A",
      batchNumber: "LOT-2024-001",
      controlDate: "2024-01-15",
      status: "passed",
      inspector: "Ali Demir",
      notes: "Kalite standartlarına uygun",
    },
    {
      id: "2",
      itemName: "Ürün X",
      batchNumber: "LOT-2024-002",
      controlDate: "2024-01-14",
      status: "failed",
      inspector: "Ayşe Yıldız",
      notes: "Boyut toleransı aşıldı",
    },
  ]);

  // Dialog states
  const [isTransactionDialogOpen, setIsTransactionDialogOpen] = useState(false);
  const [isStockDialogOpen, setIsStockDialogOpen] = useState(false);
  const [isPurchaseDialogOpen, setIsPurchaseDialogOpen] = useState(false);
  const [isProductionDialogOpen, setIsProductionDialogOpen] = useState(false);
  const [isSupplierDialogOpen, setIsSupplierDialogOpen] = useState(false);

  // Form states
  const [newTransaction, setNewTransaction] = useState({
    description: "",
    amount: "",
    type: "income",
    category: "",
  });

  const [newStockItem, setNewStockItem] = useState({
    name: "",
    sku: "",
    category: "",
    quantity: "",
    minStock: "",
    price: "",
    supplier: "",
  });

  const [newPurchaseOrder, setNewPurchaseOrder] = useState({
    supplier: "",
    items: [{ name: "", quantity: "", price: "" }],
  });

  const [newProductionOrder, setNewProductionOrder] = useState({
    product: "",
    quantity: "",
    startDate: "",
    endDate: "",
  });

  const [newSupplier, setNewSupplier] = useState({
    name: "",
    contact: "",
    phone: "",
    email: "",
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
      id: "accounting",
      name: "Cari Hesaplar",
      icon: CreditCard,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
      subModules: [
        { id: "bank-transactions", name: "Banka Hareketleri" },
        { id: "income-expense", name: "Gelir Gider Takibi" },
        { id: "cash-operations", name: "Kasa İşlemleri" },
        { id: "invoice-management", name: "Fatura Yönetimi" },
        { id: "tax-tracking", name: "KDV, Vergi, Döviz Takibi" },
        { id: "profit-loss", name: "Kar Zarar Grafik" },
      ],
    },
    {
      id: "inventory",
      name: "Stok ve Depo Yönetimi",
      icon: Package,
      color: "text-green-600",
      bgColor: "bg-green-100",
      subModules: [
        { id: "warehouse-operations", name: "Depo Giriş/Çıkış İşlemleri" },
        { id: "stock-levels", name: "Stok Seviyeleri ve Alarm Sistemleri" },
        { id: "inventory-control", name: "Sayım ve Envanter Kontrolü" },
      ],
    },
    {
      id: "purchasing",
      name: "Satın Alma Yönetimi",
      icon: ShoppingCart,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      subModules: [
        {
          id: "purchase-requests",
          name: "Satın Alma Talepleri ve Onay Süreci",
        },
        { id: "order-creation", name: "Sipariş Oluşturma" },
        { id: "price-comparison", name: "Tedarikçi Bazlı Fiyat Karşılaştırma" },
        { id: "supplier-reports", name: "Tedarikçi Performans Raporları" },
      ],
    },
    {
      id: "production",
      name: "Üretim Yönetimi",
      icon: Factory,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
      subModules: [
        { id: "bom", name: "Üretim reçeteleri (BOM)" },
        { id: "work-orders", name: "İş Emri Oluşturma ve Takibi" },
        { id: "material-consumption", name: "Hammadde Düşümü / Ürün Çıkışı" },
        { id: "production-planning", name: "Üretim Planlama" },
        { id: "production-costing", name: "Üretim Maliyet Hesaplama" },
      ],
    },
    {
      id: "mrp",
      name: "Malzeme İhtiyaç Planlama",
      icon: Calculator,
      color: "text-red-600",
      bgColor: "bg-red-100",
      subModules: [
        { id: "material-requirements", name: "Hammadde İhtiyacı Hesaplama" },
        {
          id: "auto-purchase-suggestions",
          name: "Otomatik Satın Alma Önerileri",
        },
      ],
    },
    {
      id: "quality",
      name: "Kalite Kontrol",
      icon: Shield,
      color: "text-green-600",
      bgColor: "bg-green-100",
      subModules: [
        {
          id: "quality-control",
          name: "Gelen Malzeme ve Üretim Sonrası Kalite Kontrol",
        },
        { id: "non-conformance", name: "Uygunsuzluk Takibi" },
      ],
    },
    {
      id: "maintenance",
      name: "Bakım ve Teknik Servis",
      icon: Wrench,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100",
      subModules: [
        { id: "equipment-tracking", name: "Ekipman Takibi" },
        { id: "maintenance-planning", name: "Periyodik Bakım Planlama" },
        { id: "maintenance-records", name: "Arıza/Bakım Kayıtları" },
      ],
    },
    {
      id: "e-document",
      name: "e-Belge Modülü",
      icon: FileText,
      color: "text-indigo-600",
      bgColor: "bg-indigo-100",
      subModules: [{ id: "e-invoice", name: "e-Fatura, e-İrsaliye, e-Arşiv" }],
    },
    {
      id: "reporting",
      name: "Raporlama",
      icon: TrendingUp,
      color: "text-pink-600",
      bgColor: "bg-pink-100",
      subModules: [
        { id: "stock-reports", name: "Anlık Stok Raporu" },
        { id: "financial-summary", name: "Finansal Durum Özeti" },
        { id: "order-analysis", name: "Sipariş Durumu, Tedarikçi Analizi" },
        { id: "cost-analysis", name: "Satın Alma Maliyet Analizleri" },
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

  // Add new transaction
  const handleAddTransaction = () => {
    const transaction = {
      id: Date.now().toString(),
      date: new Date().toISOString().split("T")[0],
      description: newTransaction.description,
      amount:
        newTransaction.type === "expense"
          ? -Math.abs(Number(newTransaction.amount))
          : Math.abs(Number(newTransaction.amount)),
      type: newTransaction.type,
      category: newTransaction.category,
      status: "completed",
    };

    setBankTransactions([transaction, ...bankTransactions]);
    setNewTransaction({
      description: "",
      amount: "",
      type: "income",
      category: "",
    });
    setIsTransactionDialogOpen(false);
  };

  // Add new stock item
  const handleAddStockItem = () => {
    const stockItem = {
      id: Date.now().toString(),
      name: newStockItem.name,
      sku: newStockItem.sku,
      category: newStockItem.category,
      quantity: Number(newStockItem.quantity),
      minStock: Number(newStockItem.minStock),
      price: Number(newStockItem.price),
      supplier: newStockItem.supplier,
      lastUpdated: new Date().toISOString().split("T")[0],
    };

    setStockItems([...stockItems, stockItem]);
    setNewStockItem({
      name: "",
      sku: "",
      category: "",
      quantity: "",
      minStock: "",
      price: "",
      supplier: "",
    });
    setIsStockDialogOpen(false);
  };

  // Add new purchase order
  const handleAddPurchaseOrder = () => {
    const totalAmount = newPurchaseOrder.items.reduce(
      (sum, item) => sum + Number(item.quantity) * Number(item.price),
      0
    );

    const purchaseOrder = {
      id: Date.now().toString(),
      orderNumber: `PO-2024-${String(purchaseOrders.length + 1).padStart(
        3,
        "0"
      )}`,
      supplier: newPurchaseOrder.supplier,
      date: new Date().toISOString().split("T")[0],
      status: "pending",
      totalAmount: totalAmount,
      items: newPurchaseOrder.items.map((item) => ({
        name: item.name,
        quantity: Number(item.quantity),
        price: Number(item.price),
      })),
    };

    setPurchaseOrders([...purchaseOrders, purchaseOrder]);
    setNewPurchaseOrder({
      supplier: "",
      items: [{ name: "", quantity: "", price: "" }],
    });
    setIsPurchaseDialogOpen(false);
  };

  // Add new production order
  const handleAddProductionOrder = () => {
    const productionOrder = {
      id: Date.now().toString(),
      orderNumber: `PR-2024-${String(productionOrders.length + 1).padStart(
        3,
        "0"
      )}`,
      product: newProductionOrder.product,
      quantity: Number(newProductionOrder.quantity),
      status: "planned",
      startDate: newProductionOrder.startDate,
      endDate: newProductionOrder.endDate,
      progress: 0,
    };

    setProductionOrders([...productionOrders, productionOrder]);
    setNewProductionOrder({
      product: "",
      quantity: "",
      startDate: "",
      endDate: "",
    });
    setIsProductionDialogOpen(false);
  };

  // Add new supplier
  const handleAddSupplier = () => {
    const supplier = {
      id: Date.now().toString(),
      name: newSupplier.name,
      contact: newSupplier.contact,
      phone: newSupplier.phone,
      email: newSupplier.email,
      rating: 0,
      totalOrders: 0,
    };

    setSuppliers([...suppliers, supplier]);
    setNewSupplier({
      name: "",
      contact: "",
      phone: "",
      email: "",
    });
    setIsSupplierDialogOpen(false);
  };

  // Delete functions
  const deleteTransaction = (id) => {
    setBankTransactions(bankTransactions.filter((t) => t.id !== id));
  };

  const deleteStockItem = (id) => {
    setStockItems(stockItems.filter((item) => item.id !== id));
  };

  const deletePurchaseOrder = (id) => {
    setPurchaseOrders(purchaseOrders.filter((po) => po.id !== id));
  };

  const deleteProductionOrder = (id) => {
    setProductionOrders(productionOrders.filter((po) => po.id !== id));
  };

  // Update stock quantity
  const updateStockQuantity = (id, newQuantity) => {
    setStockItems(
      stockItems.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: newQuantity,
              lastUpdated: new Date().toISOString().split("T")[0],
            }
          : item
      )
    );
  };

  // Update production order progress
  const updateProductionProgress = (id, newProgress) => {
    setProductionOrders(
      productionOrders.map((order) =>
        order.id === id
          ? {
              ...order,
              progress: newProgress,
              status:
                newProgress === 100
                  ? "completed"
                  : newProgress > 0
                  ? "in-progress"
                  : "planned",
            }
          : order
      )
    );
  };

  const renderOverviewContent = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-gray-900">ERP Genel Bakış</h3>
        <p className="text-gray-600">
          Kurumsal kaynak planlama sisteminizdeki genel durum ve önemli
          metriklerin özeti
        </p>
      </div>

      {/* Ana İstatistikler */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-orange-500">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Toplam Ciro</p>
                <p className="text-3xl font-bold text-gray-900">
                  ₺
                  {bankTransactions
                    .filter((t) => t.type === "income")
                    .reduce((sum, t) => sum + t.amount, 0)
                    .toLocaleString()}
                </p>
                <p className="text-xs text-orange-600">+18% bu ay</p>
              </div>
              <DollarSign className="h-10 w-10 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Stok Kalemleri</p>
                <p className="text-3xl font-bold text-gray-900">
                  {stockItems.length}
                </p>
                <p className="text-xs text-green-600">+5% bu ay</p>
              </div>
              <Package className="h-10 w-10 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Bekleyen Siparişler</p>
                <p className="text-3xl font-bold text-gray-900">
                  {
                    purchaseOrders.filter((po) => po.status === "pending")
                      .length
                  }
                </p>
                <p className="text-xs text-blue-600">-3 bu hafta</p>
              </div>
              <ShoppingCart className="h-10 w-10 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Üretim Emirleri</p>
                <p className="text-3xl font-bold text-gray-900">
                  {productionOrders.length}
                </p>
                <p className="text-xs text-purple-600">+2 bu hafta</p>
              </div>
              <Factory className="h-10 w-10 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Hızlı Aksiyonlar */}
      <Card>
        <CardHeader>
          <CardTitle className="text-gray-900">Hızlı Aksiyonlar</CardTitle>
          <CardDescription>Sık kullanılan işlemler</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button
              className="h-20 flex-col bg-orange-500 hover:bg-orange-600"
              onClick={() => setIsTransactionDialogOpen(true)}
            >
              <Plus className="h-6 w-6 mb-2" />
              <span className="text-sm">Yeni İşlem</span>
            </Button>
            <Button
              className="h-20 flex-col bg-green-500 hover:bg-green-600"
              onClick={() => setIsStockDialogOpen(true)}
            >
              <Package className="h-6 w-6 mb-2" />
              <span className="text-sm">Stok Girişi</span>
            </Button>
            <Button
              className="h-20 flex-col bg-blue-600 hover:bg-blue-700"
              onClick={() => setIsPurchaseDialogOpen(true)}
            >
              <ShoppingCart className="h-6 w-6 mb-2" />
              <span className="text-sm">Satın Alma</span>
            </Button>
            <Button
              className="h-20 flex-col bg-purple-600 hover:bg-purple-700"
              onClick={() => setIsProductionDialogOpen(true)}
            >
              <Factory className="h-6 w-6 mb-2" />
              <span className="text-sm">Üretim Emri</span>
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
              {stockItems
                .filter((item) => item.quantity <= item.minStock)
                .map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center space-x-4 p-3 bg-red-50 rounded-lg border border-red-200"
                  >
                    <AlertTriangle className="h-5 w-5 text-red-500" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        Kritik Stok: {item.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        Mevcut: {item.quantity}, Minimum: {item.minStock}
                      </p>
                    </div>
                    <Badge className="bg-red-500 text-white">Acil</Badge>
                  </div>
                ))}

              {purchaseOrders
                .filter((po) => po.status === "pending")
                .slice(0, 2)
                .map((po) => (
                  <div
                    key={po.id}
                    className="flex items-center space-x-4 p-3 bg-orange-50 rounded-lg border border-orange-200"
                  >
                    <Clock className="h-5 w-5 text-orange-500" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        Bekleyen Sipariş: {po.orderNumber}
                      </p>
                      <p className="text-xs text-gray-500">
                        Tedarikçi: {po.supplier}
                      </p>
                    </div>
                    <Badge className="bg-orange-500 text-white">Bekliyor</Badge>
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
              {bankTransactions.slice(0, 4).map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg"
                >
                  <div
                    className={`w-2 h-2 rounded-full ${
                      transaction.type === "income"
                        ? "bg-green-500"
                        : "bg-red-500"
                    }`}
                  ></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      {transaction.description}
                    </p>
                    <p className="text-xs text-gray-500">{transaction.date}</p>
                  </div>
                  <p
                    className={`font-bold ${
                      transaction.type === "income"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {transaction.amount > 0 ? "+" : ""}₺
                    {Math.abs(transaction.amount).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performans Özeti */}
      <Card>
        <CardHeader>
          <CardTitle className="text-gray-900">
            Bu Ay Performans Özeti
          </CardTitle>
          <CardDescription>Ocak 2024 dönem raporu</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-500">
                ₺
                {bankTransactions
                  .filter((t) => t.type === "income")
                  .reduce((sum, t) => sum + t.amount, 0)
                  .toLocaleString()}
              </p>
              <p className="text-sm text-gray-600">Toplam Ciro</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-500">94%</p>
              <p className="text-sm text-gray-600">Stok Devir Hızı</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">2.1 gün</p>
              <p className="text-sm text-gray-600">Ortalama Teslimat</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">
                {Math.round(
                  productionOrders.reduce(
                    (sum, order) => sum + order.progress,
                    0
                  ) / productionOrders.length || 0
                )}
                %
              </p>
              <p className="text-sm text-gray-600">Üretim Verimliliği</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderBankTransactionsContent = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-bold text-gray-900">
            Banka Hareketleri
          </h3>
          <p className="text-gray-600">
            Banka hesap hareketlerinizi görüntüleyin ve yönetin
          </p>
        </div>
        <Dialog
          open={isTransactionDialogOpen}
          onOpenChange={setIsTransactionDialogOpen}
        >
          <DialogTrigger asChild>
            <Button className="bg-orange-500 hover:bg-orange-600">
              <Plus className="mr-2 h-4 w-4" />
              Yeni Hareket
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Yeni Banka Hareketi</DialogTitle>
              <DialogDescription>
                Yeni bir banka hareketi ekleyin
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="description">Açıklama</Label>
                <Input
                  id="description"
                  value={newTransaction.description}
                  onChange={(e) =>
                    setNewTransaction({
                      ...newTransaction,
                      description: e.target.value,
                    })
                  }
                  placeholder="İşlem açıklaması"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="amount">Tutar</Label>
                <Input
                  id="amount"
                  type="number"
                  value={newTransaction.amount}
                  onChange={(e) =>
                    setNewTransaction({
                      ...newTransaction,
                      amount: e.target.value,
                    })
                  }
                  placeholder="0.00"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="type">Tür</Label>
                <Select
                  value={newTransaction.type}
                  onValueChange={(value) =>
                    setNewTransaction({ ...newTransaction, type: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="income">Gelir</SelectItem>
                    <SelectItem value="expense">Gider</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="category">Kategori</Label>
                <Input
                  id="category"
                  value={newTransaction.category}
                  onChange={(e) =>
                    setNewTransaction({
                      ...newTransaction,
                      category: e.target.value,
                    })
                  }
                  placeholder="İşlem kategorisi"
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleAddTransaction}>Kaydet</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Özet Kartları */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-gray-600">Toplam Bakiye</p>
              <p className="text-2xl font-bold text-green-600">
                ₺
                {bankTransactions
                  .reduce((sum, t) => sum + t.amount, 0)
                  .toLocaleString()}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-gray-600">Bu Ay Gelen</p>
              <p className="text-2xl font-bold text-blue-600">
                ₺
                {bankTransactions
                  .filter((t) => t.type === "income")
                  .reduce((sum, t) => sum + t.amount, 0)
                  .toLocaleString()}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-gray-600">Bu Ay Giden</p>
              <p className="text-2xl font-bold text-red-600">
                ₺
                {Math.abs(
                  bankTransactions
                    .filter((t) => t.type === "expense")
                    .reduce((sum, t) => sum + t.amount, 0)
                ).toLocaleString()}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-gray-600">İşlem Sayısı</p>
              <p className="text-2xl font-bold text-gray-900">
                {bankTransactions.length}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* İşlemler Tablosu */}
      <Card>
        <CardHeader>
          <CardTitle>Banka Hareketleri</CardTitle>
          <div className="flex space-x-2">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <Input placeholder="Ara..." className="pl-8" />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filtrele
            </Button>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Dışa Aktar
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tarih</TableHead>
                <TableHead>Açıklama</TableHead>
                <TableHead>Kategori</TableHead>
                <TableHead>Tutar</TableHead>
                <TableHead>Durum</TableHead>
                <TableHead>İşlemler</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bankTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>{transaction.date}</TableCell>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell>{transaction.category}</TableCell>
                  <TableCell
                    className={
                      transaction.amount > 0 ? "text-green-600" : "text-red-600"
                    }
                  >
                    {transaction.amount > 0 ? "+" : ""}₺
                    {Math.abs(transaction.amount).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        transaction.status === "completed"
                          ? "default"
                          : "secondary"
                      }
                    >
                      {transaction.status === "completed"
                        ? "Tamamlandı"
                        : "Bekliyor"}
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
                        onClick={() => deleteTransaction(transaction.id)}
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

  const renderStockManagementContent = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-bold text-gray-900">Stok Yönetimi</h3>
          <p className="text-gray-600">
            Stok seviyelerinizi takip edin ve yönetin
          </p>
        </div>
        <Dialog open={isStockDialogOpen} onOpenChange={setIsStockDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-green-500 hover:bg-green-600">
              <Plus className="mr-2 h-4 w-4" />
              Yeni Stok Kalemi
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Yeni Stok Kalemi</DialogTitle>
              <DialogDescription>
                Yeni bir stok kalemi ekleyin
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Ürün Adı</Label>
                  <Input
                    id="name"
                    value={newStockItem.name}
                    onChange={(e) =>
                      setNewStockItem({ ...newStockItem, name: e.target.value })
                    }
                    placeholder="Ürün adı"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="sku">SKU</Label>
                  <Input
                    id="sku"
                    value={newStockItem.sku}
                    onChange={(e) =>
                      setNewStockItem({ ...newStockItem, sku: e.target.value })
                    }
                    placeholder="Stok kodu"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="category">Kategori</Label>
                  <Input
                    id="category"
                    value={newStockItem.category}
                    onChange={(e) =>
                      setNewStockItem({
                        ...newStockItem,
                        category: e.target.value,
                      })
                    }
                    placeholder="Kategori"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="supplier">Tedarikçi</Label>
                  <Input
                    id="supplier"
                    value={newStockItem.supplier}
                    onChange={(e) =>
                      setNewStockItem({
                        ...newStockItem,
                        supplier: e.target.value,
                      })
                    }
                    placeholder="Tedarikçi"
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="quantity">Miktar</Label>
                  <Input
                    id="quantity"
                    type="number"
                    value={newStockItem.quantity}
                    onChange={(e) =>
                      setNewStockItem({
                        ...newStockItem,
                        quantity: e.target.value,
                      })
                    }
                    placeholder="0"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="minStock">Min. Stok</Label>
                  <Input
                    id="minStock"
                    type="number"
                    value={newStockItem.minStock}
                    onChange={(e) =>
                      setNewStockItem({
                        ...newStockItem,
                        minStock: e.target.value,
                      })
                    }
                    placeholder="0"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="price">Fiyat</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={newStockItem.price}
                    onChange={(e) =>
                      setNewStockItem({
                        ...newStockItem,
                        price: e.target.value,
                      })
                    }
                    placeholder="0.00"
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleAddStockItem}>Kaydet</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stok Özet Kartları */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-gray-600">Toplam Stok Değeri</p>
              <p className="text-2xl font-bold text-green-600">
                ₺
                {stockItems
                  .reduce((sum, item) => sum + item.quantity * item.price, 0)
                  .toLocaleString()}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-gray-600">Kritik Seviye</p>
              <p className="text-2xl font-bold text-red-500">
                {
                  stockItems.filter((item) => item.quantity <= item.minStock)
                    .length
                }
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-gray-600">Stok Kalemleri</p>
              <p className="text-2xl font-bold text-gray-900">
                {stockItems.length}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-gray-600">Kategoriler</p>
              <p className="text-2xl font-bold text-blue-600">
                {new Set(stockItems.map((item) => item.category)).size}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Stok Tablosu */}
      <Card>
        <CardHeader>
          <CardTitle>Stok Kalemleri</CardTitle>
          <div className="flex space-x-2">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <Input placeholder="Stok ara..." className="pl-8" />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filtrele
            </Button>
            <Button variant="outline" size="sm">
              <Upload className="mr-2 h-4 w-4" />
              İçe Aktar
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>SKU</TableHead>
                <TableHead>Ürün Adı</TableHead>
                <TableHead>Kategori</TableHead>
                <TableHead>Miktar</TableHead>
                <TableHead>Min. Stok</TableHead>
                <TableHead>Birim Fiyat</TableHead>
                <TableHead>Toplam Değer</TableHead>
                <TableHead>Durum</TableHead>
                <TableHead>İşlemler</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {stockItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-mono">{item.sku}</TableCell>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      value={item.quantity}
                      onChange={(e) =>
                        updateStockQuantity(item.id, Number(e.target.value))
                      }
                      className="w-20"
                    />
                  </TableCell>
                  <TableCell>{item.minStock}</TableCell>
                  <TableCell>₺{item.price.toFixed(2)}</TableCell>
                  <TableCell>
                    ₺{(item.quantity * item.price).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        item.quantity <= item.minStock
                          ? "destructive"
                          : "default"
                      }
                    >
                      {item.quantity <= item.minStock ? "Kritik" : "Normal"}
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
                        onClick={() => deleteStockItem(item.id)}
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

  const renderPurchasingContent = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-bold text-gray-900">
            Satın Alma Yönetimi
          </h3>
          <p className="text-gray-600">
            Satın alma süreçlerinizi yönetin ve tedarikçilerinizi takip edin
          </p>
        </div>
        <Dialog
          open={isPurchaseDialogOpen}
          onOpenChange={setIsPurchaseDialogOpen}
        >
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="mr-2 h-4 w-4" />
              Yeni Sipariş
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Yeni Satın Alma Siparişi</DialogTitle>
              <DialogDescription>
                Yeni bir satın alma siparişi oluşturun
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="supplier">Tedarikçi</Label>
                <Select
                  value={newPurchaseOrder.supplier}
                  onValueChange={(value) =>
                    setNewPurchaseOrder({
                      ...newPurchaseOrder,
                      supplier: value,
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Tedarikçi seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    {suppliers.map((supplier) => (
                      <SelectItem key={supplier.id} value={supplier.name}>
                        {supplier.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-4">
                <Label>Sipariş Kalemleri</Label>
                {newPurchaseOrder.items.map((item, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-3 gap-4 p-4 border rounded-lg"
                  >
                    <div className="grid gap-2">
                      <Label>Ürün Adı</Label>
                      <Input
                        value={item.name}
                        onChange={(e) => {
                          const updatedItems = [...newPurchaseOrder.items];
                          updatedItems[index].name = e.target.value;
                          setNewPurchaseOrder({
                            ...newPurchaseOrder,
                            items: updatedItems,
                          });
                        }}
                        placeholder="Ürün adı"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label>Miktar</Label>
                      <Input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => {
                          const updatedItems = [...newPurchaseOrder.items];
                          updatedItems[index].quantity = e.target.value;
                          setNewPurchaseOrder({
                            ...newPurchaseOrder,
                            items: updatedItems,
                          });
                        }}
                        placeholder="0"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label>Birim Fiyat</Label>
                      <Input
                        type="number"
                        step="0.01"
                        value={item.price}
                        onChange={(e) => {
                          const updatedItems = [...newPurchaseOrder.items];
                          updatedItems[index].price = e.target.value;
                          setNewPurchaseOrder({
                            ...newPurchaseOrder,
                            items: updatedItems,
                          });
                        }}
                        placeholder="0.00"
                      />
                    </div>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={() =>
                    setNewPurchaseOrder({
                      ...newPurchaseOrder,
                      items: [
                        ...newPurchaseOrder.items,
                        { name: "", quantity: "", price: "" },
                      ],
                    })
                  }
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Kalem Ekle
                </Button>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleAddPurchaseOrder}>Sipariş Oluştur</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Özet Kartları */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-gray-600">Bekleyen Siparişler</p>
              <p className="text-2xl font-bold text-orange-500">
                {purchaseOrders.filter((po) => po.status === "pending").length}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-gray-600">Onaylanan Siparişler</p>
              <p className="text-2xl font-bold text-blue-600">
                {purchaseOrders.filter((po) => po.status === "approved").length}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-gray-600">Tedarikçi Sayısı</p>
              <p className="text-2xl font-bold text-green-600">
                {suppliers.length}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-gray-600">Toplam Tutar</p>
              <p className="text-2xl font-bold text-purple-600">
                ₺
                {purchaseOrders
                  .reduce((sum, po) => sum + po.totalAmount, 0)
                  .toLocaleString()}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Siparişler Tablosu */}
      <Card>
        <CardHeader>
          <CardTitle>Satın Alma Siparişleri</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Sipariş No</TableHead>
                <TableHead>Tedarikçi</TableHead>
                <TableHead>Tarih</TableHead>
                <TableHead>Durum</TableHead>
                <TableHead>Toplam Tutar</TableHead>
                <TableHead>İşlemler</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {purchaseOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-mono">
                    {order.orderNumber}
                  </TableCell>
                  <TableCell>{order.supplier}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        order.status === "approved"
                          ? "default"
                          : order.status === "pending"
                          ? "secondary"
                          : "destructive"
                      }
                    >
                      {order.status === "pending"
                        ? "Bekliyor"
                        : order.status === "approved"
                        ? "Onaylandı"
                        : order.status === "delivered"
                        ? "Teslim Edildi"
                        : "İptal"}
                    </Badge>
                  </TableCell>
                  <TableCell>₺{order.totalAmount.toLocaleString()}</TableCell>
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
                        onClick={() => deletePurchaseOrder(order.id)}
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

  const renderProductionContent = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-bold text-gray-900">Üretim Yönetimi</h3>
          <p className="text-gray-600">
            Üretim süreçlerinizi planlayın ve takip edin
          </p>
        </div>
        <Dialog
          open={isProductionDialogOpen}
          onOpenChange={setIsProductionDialogOpen}
        >
          <DialogTrigger asChild>
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Plus className="mr-2 h-4 w-4" />
              Yeni Üretim Emri
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Yeni Üretim Emri</DialogTitle>
              <DialogDescription>
                Yeni bir üretim emri oluşturun
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="product">Ürün</Label>
                <Input
                  id="product"
                  value={newProductionOrder.product}
                  onChange={(e) =>
                    setNewProductionOrder({
                      ...newProductionOrder,
                      product: e.target.value,
                    })
                  }
                  placeholder="Üretilecek ürün"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="quantity">Miktar</Label>
                <Input
                  id="quantity"
                  type="number"
                  value={newProductionOrder.quantity}
                  onChange={(e) =>
                    setNewProductionOrder({
                      ...newProductionOrder,
                      quantity: e.target.value,
                    })
                  }
                  placeholder="0"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="startDate">Başlangıç Tarihi</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={newProductionOrder.startDate}
                    onChange={(e) =>
                      setNewProductionOrder({
                        ...newProductionOrder,
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
                    value={newProductionOrder.endDate}
                    onChange={(e) =>
                      setNewProductionOrder({
                        ...newProductionOrder,
                        endDate: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleAddProductionOrder}>
                Üretim Emri Oluştur
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Özet Kartları */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-gray-600">Aktif İş Emirleri</p>
              <p className="text-2xl font-bold text-purple-600">
                {
                  productionOrders.filter((po) => po.status === "in-progress")
                    .length
                }
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-gray-600">Tamamlanan</p>
              <p className="text-2xl font-bold text-green-600">
                {
                  productionOrders.filter((po) => po.status === "completed")
                    .length
                }
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-gray-600">Planlanan</p>
              <p className="text-2xl font-bold text-blue-600">
                {
                  productionOrders.filter((po) => po.status === "planned")
                    .length
                }
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-gray-600">Ortalama Verimlilik</p>
              <p className="text-2xl font-bold text-orange-500">
                {Math.round(
                  productionOrders.reduce(
                    (sum, order) => sum + order.progress,
                    0
                  ) / productionOrders.length || 0
                )}
                %
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Üretim Emirleri Tablosu */}
      <Card>
        <CardHeader>
          <CardTitle>Üretim Emirleri</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Emir No</TableHead>
                <TableHead>Ürün</TableHead>
                <TableHead>Miktar</TableHead>
                <TableHead>Durum</TableHead>
                <TableHead>İlerleme</TableHead>
                <TableHead>Başlangıç</TableHead>
                <TableHead>Bitiş</TableHead>
                <TableHead>İşlemler</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {productionOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-mono">
                    {order.orderNumber}
                  </TableCell>
                  <TableCell>{order.product}</TableCell>
                  <TableCell>{order.quantity}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        order.status === "completed"
                          ? "default"
                          : order.status === "in-progress"
                          ? "secondary"
                          : "outline"
                      }
                    >
                      {order.status === "planned"
                        ? "Planlı"
                        : order.status === "in-progress"
                        ? "Devam Ediyor"
                        : order.status === "completed"
                        ? "Tamamlandı"
                        : "İptal"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Input
                        type="number"
                        min="0"
                        max="100"
                        value={order.progress}
                        onChange={(e) =>
                          updateProductionProgress(
                            order.id,
                            Number(e.target.value)
                          )
                        }
                        className="w-16"
                      />
                      <span className="text-sm text-gray-500">%</span>
                    </div>
                  </TableCell>
                  <TableCell>{order.startDate}</TableCell>
                  <TableCell>{order.endDate}</TableCell>
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
                        onClick={() => deleteProductionOrder(order.id)}
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

  const renderQualityControlContent = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-gray-900">Kalite Kontrol</h3>
        <p className="text-gray-600">
          Kalite kontrol süreçlerinizi yönetin ve takip edin
        </p>
      </div>

      {/* Özet Kartları */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-gray-600">Kontrol Edilen</p>
              <p className="text-2xl font-bold text-green-600">
                {qualityControls.length}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-gray-600">Başarılı</p>
              <p className="text-2xl font-bold text-green-600">
                {qualityControls.filter((qc) => qc.status === "passed").length}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-gray-600">Başarısız</p>
              <p className="text-2xl font-bold text-red-500">
                {qualityControls.filter((qc) => qc.status === "failed").length}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-gray-600">Başarı Oranı</p>
              <p className="text-2xl font-bold text-blue-600">
                {Math.round(
                  (qualityControls.filter((qc) => qc.status === "passed")
                    .length /
                    qualityControls.length) *
                    100
                )}
                %
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Kalite Kontrol Tablosu */}
      <Card>
        <CardHeader>
          <CardTitle>Kalite Kontrol Kayıtları</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ürün</TableHead>
                <TableHead>Lot No</TableHead>
                <TableHead>Kontrol Tarihi</TableHead>
                <TableHead>Durum</TableHead>
                <TableHead>Kontrolör</TableHead>
                <TableHead>Notlar</TableHead>
                <TableHead>İşlemler</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {qualityControls.map((control) => (
                <TableRow key={control.id}>
                  <TableCell>{control.itemName}</TableCell>
                  <TableCell className="font-mono">
                    {control.batchNumber}
                  </TableCell>
                  <TableCell>{control.controlDate}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        control.status === "passed" ? "default" : "destructive"
                      }
                    >
                      {control.status === "passed" ? "Başarılı" : "Başarısız"}
                    </Badge>
                  </TableCell>
                  <TableCell>{control.inspector}</TableCell>
                  <TableCell>{control.notes}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
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

  const renderModuleContent = () => {
    switch (activeModule) {
      case "overview":
        return renderOverviewContent();
      case "accounting":
        if (activeSubModule === "bank-transactions") {
          return renderBankTransactionsContent();
        }
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-gray-900">
                Cari Hesaplar
              </h3>
              <p className="text-gray-600">
                Finansal işlemlerinizi yönetin ve takip edin
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card
                className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => setActiveSubModule("bank-transactions")}
              >
                <CardHeader>
                  <CardTitle className="text-orange-600 flex items-center">
                    <CreditCard className="mr-2 h-5 w-5" />
                    Banka Hareketleri
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Banka hesap hareketlerini takip edin
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        );
      case "inventory":
        if (activeSubModule === "warehouse-operations") {
          return renderStockManagementContent();
        }
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-gray-900">
                Stok ve Depo Yönetimi
              </h3>
              <p className="text-gray-600">
                Stok seviyelerinizi takip edin ve depo işlemlerinizi yönetin
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card
                className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => setActiveSubModule("warehouse-operations")}
              >
                <CardHeader>
                  <CardTitle className="text-green-600 flex items-center">
                    <Package className="mr-2 h-5 w-5" />
                    Depo İşlemleri
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Stok giriş/çıkış işlemlerini yönetin
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        );
      case "purchasing":
        if (activeSubModule === "order-creation") {
          return renderPurchasingContent();
        }
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-gray-900">
                Satın Alma Yönetimi
              </h3>
              <p className="text-gray-600">
                Satın alma süreçlerinizi yönetin ve tedarikçilerinizi takip edin
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card
                className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => setActiveSubModule("order-creation")}
              >
                <CardHeader>
                  <CardTitle className="text-blue-600 flex items-center">
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    Sipariş Oluşturma
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Yeni satın alma siparişleri oluşturun
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        );
      case "production":
        if (activeSubModule === "work-orders") {
          return renderProductionContent();
        }
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-gray-900">
                Üretim Yönetimi
              </h3>
              <p className="text-gray-600">
                Üretim süreçlerinizi planlayın ve takip edin
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card
                className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => setActiveSubModule("work-orders")}
              >
                <CardHeader>
                  <CardTitle className="text-purple-600 flex items-center">
                    <Factory className="mr-2 h-5 w-5" />
                    İş Emri Takibi
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Üretim emirlerini oluşturun ve takip edin
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        );
      case "quality":
        if (activeSubModule === "quality-control") {
          return renderQualityControlContent();
        }
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-gray-900">
                Kalite Kontrol
              </h3>
              <p className="text-gray-600">
                Kalite kontrol süreçlerinizi yönetin
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card
                className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => setActiveSubModule("quality-control")}
              >
                <CardHeader>
                  <CardTitle className="text-green-600 flex items-center">
                    <Shield className="mr-2 h-5 w-5" />
                    Kalite Kontrol
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Gelen malzeme ve üretim kalite kontrolü
                  </p>
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
            Kurumsal Kaynak Planlaması
          </h2>
          <p className="text-gray-600 mt-2">
            İşletmenizin tüm kaynaklarını entegre bir şekilde yönetin
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar - Modules */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-gray-900">ERP Modülleri</CardTitle>
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
