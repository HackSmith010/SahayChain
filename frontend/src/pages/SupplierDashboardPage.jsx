import { useState } from "react";
import {
  Truck,
  Package,
  CheckCircle,
  Star,
  MapPin,
  Clock,
  Phone,
  Mail,
  Upload,
  Navigation,
  ShieldCheck,
  AlertCircle,
  X,
  Camera,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

// Mock Data
const mockNewOrders = [
  {
    id: "A5F8",
    item: "School Bags",
    quantity: 75,
    ngo: "Hope Foundation",
    location: "Mumbai, MH",
    distance: "2.3 km",
    address: "123 Education Street, Bandra West, Mumbai - 400050",
    contact: "+91 98765 43210",
    email: "contact@hopefoundation.org",
    status: "new",
    created_at: "2024-01-15T10:00:00Z",
  },
  {
    id: "B9G2",
    item: "Blankets",
    quantity: 300,
    ngo: "Winter Relief Org",
    location: "Delhi, DL",
    distance: "5.1 km",
    address: "456 Shelter Road, Connaught Place, Delhi - 110001",
    contact: "+91 98765 43211",
    email: "info@winterrelief.org",
    status: "new",
    created_at: "2024-01-16T09:15:00Z",
  },
  {
    id: "C3K7",
    item: "Rice (kg)",
    quantity: 500,
    ngo: "Community Kitchen",
    location: "Mumbai, MH",
    distance: "1.8 km",
    address: "789 Food Lane, Andheri East, Mumbai - 400069",
    contact: "+91 98765 43212",
    email: "kitchen@community.org",
    status: "new",
    created_at: "2024-01-16T14:30:00Z",
  },
];

const mockMyDeliveries = [
  {
    id: "D4J9",
    item: "Medicine Kits",
    quantity: 100,
    ngo: "City Elders Home",
    location: "Mumbai, MH",
    distance: "3.2 km",
    address: "321 Care Road, Dadar West, Mumbai - 400028",
    contact: "+91 98765 43213",
    email: "care@eldershome.org",
    status: "accepted",
    accepted_at: "2024-01-14T11:20:00Z",
    estimated_delivery: "2024-01-17T15:00:00Z",
  },
  {
    id: "E7L2",
    item: "Notebooks",
    quantity: 500,
    ngo: "Rural Education Initiative",
    location: "Pune, MH",
    distance: "12.5 km",
    address: "654 Learning Street, Kothrud, Pune - 411038",
    contact: "+91 98765 43214",
    email: "education@ruralinitiative.org",
    status: "dispatched",
    accepted_at: "2024-01-13T14:00:00Z",
    dispatched_at: "2024-01-16T09:30:00Z",
    estimated_delivery: "2024-01-16T16:00:00Z",
  },
  {
    id: "F1M8",
    item: "Cooking Oil",
    quantity: 200,
    ngo: "Seva Trust",
    location: "Mumbai, MH",
    distance: "4.7 km",
    address: "987 Service Road, Vile Parle, Mumbai - 400057",
    contact: "+91 98765 43215",
    email: "trust@seva.org",
    status: "awaiting_confirmation",
    accepted_at: "2024-01-12T10:15:00Z",
    dispatched_at: "2024-01-15T13:45:00Z",
    delivered_at: "2024-01-15T16:30:00Z",
    delivery_proof: "https://example.com/delivery-proof-1.jpg",
  },
  {
    id: "G5N3",
    item: "Winter Jackets",
    quantity: 150,
    ngo: "Winter Relief Org",
    location: "Delhi, DL",
    distance: "6.3 km",
    address: "147 Warmth Avenue, Saket, Delhi - 110017",
    contact: "+91 98765 43216",
    email: "support@winterrelief.org",
    status: "completed",
    accepted_at: "2024-01-10T09:00:00Z",
    dispatched_at: "2024-01-11T11:30:00Z",
    delivered_at: "2024-01-11T15:45:00Z",
    completed_at: "2024-01-11T16:00:00Z",
    rating: 5,
    feedback: "Excellent service and timely delivery",
  },
];

export default function SupplierDashboardPage() {
  const [activeTab, setActiveTab] = useState("available");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [manageOrder, setManageOrder] = useState(null);
  const [deliveryProof, setDeliveryProof] = useState(null);
  const [otpCode, setOtpCode] = useState("");
  const { user } = useAuth();

  const stats = {
    newOrders: mockNewOrders.length,
    inProgress: mockMyDeliveries.filter((d) =>
      ["accepted", "dispatched"].includes(d.status)
    ).length,
    completed: mockMyDeliveries.filter((d) => d.status === "completed").length,
    rating: "4.8",
  };

  const handleAcceptOrder = (order) => {
    // In real app, this would call an API
    console.log("Accepting order:", order.id);
    setSelectedOrder(null);
  };

  const handleMarkDispatched = (order) => {
    // In real app, this would call an API
    console.log("Marking as dispatched:", order.id);
    setManageOrder(null);
  };

  const handleConfirmDelivery = (order) => {
    // In real app, this would call an API with OTP verification
    console.log("Confirming delivery:", order.id, "with OTP:", otpCode);
    setManageOrder(null);
    setDeliveryProof(null);
    setOtpCode("");
  };

  const handleProofUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setDeliveryProof(URL.createObjectURL(file));
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "new":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "accepted":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "dispatched":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "awaiting_confirmation":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "completed":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "new":
        return <Package size={14} />;
      case "accepted":
        return <Clock size={14} />;
      case "dispatched":
        return <Truck size={14} />;
      case "awaiting_confirmation":
        return <AlertCircle size={14} />;
      case "completed":
        return <CheckCircle size={14} />;
      default:
        return <Package size={14} />;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="animate-fade-in space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 font-poppins mb-2">
            Welcome, {user?.name}!
          </h1>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={16}
                  className={`${
                    star <= Math.floor(parseFloat(stats.rating))
                      ? "text-yellow-400 fill-current"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-gray-600 font-semibold">
              {stats.rating} / 5
            </span>
            <span className="text-gray-500 text-sm">
              (Based on 47 deliveries)
            </span>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="text-right">
            <div className="text-sm text-gray-500">This Week</div>
            <div className="text-2xl font-bold text-primary-600">
              8 Deliveries
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        <StatCard
          icon={<Package className="text-blue-500" size={24} />}
          title="New Orders"
          value={stats.newOrders}
          color="from-blue-50 to-blue-100"
          borderColor="border-blue-200"
        />
        <StatCard
          icon={<Truck className="text-purple-500" size={24} />}
          title="In Progress"
          value={stats.inProgress}
          color="from-purple-50 to-purple-100"
          borderColor="border-purple-200"
        />
        <StatCard
          icon={<CheckCircle className="text-green-500" size={24} />}
          title="Completed"
          value={stats.completed}
          color="from-green-50 to-green-100"
          borderColor="border-green-200"
        />
        <StatCard
          icon={<Star className="text-yellow-500" size={24} />}
          title="Rating"
          value={stats.rating}
          color="from-yellow-50 to-yellow-100"
          borderColor="border-yellow-200"
        />
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex">
            <button
              onClick={() => setActiveTab("available")}
              className={`flex-1 py-6 px-8 text-center border-b-2 font-semibold text-lg transition-all duration-300 ${
                activeTab === "available"
                  ? "border-primary-500 text-primary-600 bg-primary-50"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center justify-center gap-3">
                <Package size={20} />
                Available Orders
                <span
                  className={`px-3 py-1 rounded-full text-sm font-bold ${
                    activeTab === "available"
                      ? "bg-primary-500 text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {mockNewOrders.length}
                </span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab("deliveries")}
              className={`flex-1 py-6 px-8 text-center border-b-2 font-semibold text-lg transition-all duration-300 ${
                activeTab === "deliveries"
                  ? "border-primary-500 text-primary-600 bg-primary-50"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center justify-center gap-3">
                <Truck size={20} />
                My Deliveries
                <span
                  className={`px-3 py-1 rounded-full text-sm font-bold ${
                    activeTab === "deliveries"
                      ? "bg-primary-500 text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {mockMyDeliveries.length}
                </span>
              </div>
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === "available" ? (
            <AvailableOrdersTable
              orders={mockNewOrders}
              onAcceptClick={setSelectedOrder}
              getStatusColor={getStatusColor}
              getStatusIcon={getStatusIcon}
              formatDate={formatDate}
            />
          ) : (
            <MyDeliveriesTable
              orders={mockMyDeliveries}
              onManageClick={setManageOrder}
              getStatusColor={getStatusColor}
              getStatusIcon={getStatusIcon}
              formatDate={formatDate}
            />
          )}
        </div>
      </div>

      {/* Order Acceptance Modal */}
      {selectedOrder && (
        <AcceptOrderModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
          onAccept={handleAcceptOrder}
          formatDate={formatDate}
        />
      )}

      {/* Manage Delivery Modal */}
      {manageOrder && (
        <ManageDeliveryModal
          order={manageOrder}
          onClose={() => setManageOrder(null)}
          onMarkDispatched={handleMarkDispatched}
          onConfirmDelivery={handleConfirmDelivery}
          deliveryProof={deliveryProof}
          onProofUpload={handleProofUpload}
          otpCode={otpCode}
          onOtpChange={setOtpCode}
          formatDate={formatDate}
          getStatusColor={getStatusColor}
          getStatusIcon={getStatusIcon}
        />
      )}
    </div>
  );
}

// Stat Card Component
const StatCard = ({ icon, title, value, color, borderColor }) => (
  <div
    className={`bg-gradient-to-br ${color} border ${borderColor} rounded-2xl p-6 shadow-lg`}
  >
    <div className="flex items-center gap-4">
      <div className="bg-white rounded-xl p-3 shadow-sm">{icon}</div>
      <div>
        <div className="text-2xl font-bold text-gray-900">{value}</div>
        <div className="text-gray-700 font-semibold text-sm">{title}</div>
      </div>
    </div>
  </div>
);

// Available Orders Table Component
const AvailableOrdersTable = ({
  orders,
  onAcceptClick,
  getStatusColor,
  getStatusIcon,
  formatDate,
}) => (
  <div className="overflow-hidden rounded-xl border border-gray-200">
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
            Item
          </th>
          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
            Quantity
          </th>
          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
            NGO
          </th>
          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
            Delivery Location
          </th>
          <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700 uppercase tracking-wider">
            Action
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {orders.map((order) => (
          <tr
            key={order.id}
            className="hover:bg-gray-50 transition-colors duration-200"
          >
            <td className="px-6 py-4">
              <div>
                <div className="font-semibold text-gray-900">{order.item}</div>
                <div className="text-gray-500 text-sm">Order #{order.id}</div>
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
              {order.quantity}
            </td>
            <td className="px-6 py-4">
              <div className="flex items-center gap-2">
                <span className="font-medium text-gray-900">{order.ngo}</span>
                <ShieldCheck size={14} className="text-green-500" />
              </div>
            </td>
            <td className="px-6 py-4">
              <div>
                <div className="flex items-center gap-2 text-gray-900">
                  <MapPin size={14} />
                  {order.location}
                </div>
                <div className="text-gray-500 text-sm mt-1">
                  {order.distance} away
                </div>
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <button
                onClick={() => onAcceptClick(order)}
                className="inline-flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-primary-600 to-accent-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5"
              >
                <CheckCircle size={16} />
                Accept Order
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// My Deliveries Table Component
const MyDeliveriesTable = ({
  orders,
  onManageClick,
  getStatusColor,
  getStatusIcon,
  formatDate,
}) => (
  <div className="overflow-hidden rounded-xl border border-gray-200">
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
            Order ID
          </th>
          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
            Item
          </th>
          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
            NGO
          </th>
          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
            Status
          </th>
          <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700 uppercase tracking-wider">
            Action
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {orders.map((order) => (
          <tr
            key={order.id}
            className="hover:bg-gray-50 transition-colors duration-200"
          >
            <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900 font-semibold">
              #{order.id}
            </td>
            <td className="px-6 py-4">
              <div>
                <div className="font-semibold text-gray-900">{order.item}</div>
                <div className="text-gray-500 text-sm">
                  Qty: {order.quantity}
                </div>
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
              {order.ngo}
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <span
                className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
                  order.status
                )}`}
              >
                {getStatusIcon(order.status)}
                {order.status.replace("_", " ").toUpperCase()}
              </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <button
                onClick={() => onManageClick(order)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 hover:bg-primary-100 text-primary-700 rounded-xl font-semibold transition-colors duration-200"
              >
                <Truck size={16} />
                Manage Delivery
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// Accept Order Modal Component
const AcceptOrderModal = ({ order, onClose, onAccept, formatDate }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-fade-in-up">
      <div className="p-6 border-b border-gray-200 sticky top-0 bg-white rounded-t-2xl">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">
            Accept Order #{order.id}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-2 rounded-lg hover:bg-gray-100"
          >
            <X size={24} />
          </button>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Order Details */}
        <div className="bg-gray-50 rounded-2xl p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Order Details</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-gray-500">Item</div>
              <div className="font-semibold text-gray-900">{order.item}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Quantity</div>
              <div className="font-semibold text-gray-900">
                {order.quantity}
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-500">NGO</div>
              <div className="font-semibold text-gray-900 flex items-center gap-2">
                {order.ngo}
                <ShieldCheck size={16} className="text-green-500" />
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Order Date</div>
              <div className="font-semibold text-gray-900">
                {formatDate(order.created_at)}
              </div>
            </div>
          </div>
        </div>

        {/* Delivery Information */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
          <h3 className="font-semibold text-blue-900 mb-4 flex items-center gap-2">
            <MapPin className="text-blue-500" size={20} />
            Delivery Information
          </h3>
          <div className="space-y-3">
            <div>
              <div className="text-sm text-blue-700">Address</div>
              <div className="font-semibold text-blue-900">{order.address}</div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-blue-700">Contact</div>
                <div className="font-semibold text-blue-900 flex items-center gap-2">
                  <Phone size={14} />
                  {order.contact}
                </div>
              </div>
              <div>
                <div className="text-sm text-blue-700">Email</div>
                <div className="font-semibold text-blue-900 flex items-center gap-2">
                  <Mail size={14} />
                  {order.email}
                </div>
              </div>
            </div>
            <div>
              <div className="text-sm text-blue-700">Distance</div>
              <div className="font-semibold text-blue-900">
                {order.distance} from your location
              </div>
            </div>
          </div>
        </div>

        {/* Map Integration */}
        <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center">
          <div className="text-gray-500 mb-2">
            <Navigation size={32} className="mx-auto mb-2" />
            Route Optimization Map
          </div>
          <div className="text-sm text-gray-400">
            Mapbox/OpenStreetMap integration would show optimized delivery route
            here
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-end pt-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-6 py-3 text-gray-700 font-semibold rounded-xl border border-gray-300 hover:bg-gray-50 transition-colors duration-200 w-full sm:w-auto"
          >
            Cancel
          </button>
          <button
            onClick={() => onAccept(order)}
            className="px-6 py-3 bg-gradient-to-r from-primary-600 to-accent-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 w-full sm:w-auto"
          >
            Accept This Order
          </button>
        </div>
      </div>
    </div>
  </div>
);

// Manage Delivery Modal Component
const ManageDeliveryModal = ({
  order,
  onClose,
  onMarkDispatched,
  onConfirmDelivery,
  deliveryProof,
  onProofUpload,
  otpCode,
  onOtpChange,
  formatDate,
  getStatusColor,
  getStatusIcon,
}) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto animate-fade-in-up">
      <div className="p-6 border-b border-gray-200 sticky top-0 bg-white rounded-t-2xl">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">
            Manage Delivery #{order.id}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-2 rounded-lg hover:bg-gray-100"
          >
            <X size={24} />
          </button>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Order Status */}
        <div className="bg-gray-50 rounded-2xl p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Delivery Status</h3>
          <div className="flex items-center justify-between">
            <span
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border ${getStatusColor(
                order.status
              )}`}
            >
              {getStatusIcon(order.status)}
              {order.status.replace("_", " ").toUpperCase()}
            </span>
            {order.estimated_delivery && (
              <div className="text-right">
                <div className="text-sm text-gray-500">Estimated Delivery</div>
                <div className="font-semibold text-gray-900">
                  {formatDate(order.estimated_delivery)}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Order & Contact Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-gray-50 rounded-2xl p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Order Details</h3>
            <div className="space-y-3">
              <div>
                <div className="text-sm text-gray-500">Item</div>
                <div className="font-semibold text-gray-900">{order.item}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Quantity</div>
                <div className="font-semibold text-gray-900">
                  {order.quantity}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-500">NGO</div>
                <div className="font-semibold text-gray-900">{order.ngo}</div>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 rounded-2xl p-6">
            <h3 className="font-semibold text-blue-900 mb-4">
              Contact Information
            </h3>
            <div className="space-y-3">
              <div>
                <div className="text-sm text-blue-700">Address</div>
                <div className="font-semibold text-blue-900">
                  {order.address}
                </div>
              </div>
              <div>
                <div className="text-sm text-blue-700">Contact</div>
                <div className="font-semibold text-blue-900 flex items-center gap-2">
                  <Phone size={14} />
                  {order.contact}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Map Integration */}
        <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center">
          <div className="text-gray-500 mb-2">
            <Navigation size={32} className="mx-auto mb-2" />
            Delivery Route Map
          </div>
          <div className="text-sm text-gray-400">
            Real-time navigation and optimized route would be displayed here
          </div>
        </div>

        {/* Conditional Actions Based on Status */}
        {order.status === "accepted" && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6">
            <h3 className="font-semibold text-yellow-900 mb-4">
              Ready to Dispatch?
            </h3>
            <p className="text-yellow-700 mb-4">
              Once you've loaded the items and are ready to start delivery, mark
              this order as dispatched.
            </p>
            <button
              onClick={() => onMarkDispatched(order)}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-xl transition-colors duration-200"
            >
              <Truck size={20} />
              Mark as Dispatched
            </button>
          </div>
        )}

        {order.status === "dispatched" && (
          <div className="bg-orange-50 border border-orange-200 rounded-2xl p-6">
            <h3 className="font-semibold text-orange-900 mb-4">
              Complete Delivery
            </h3>

            {/* Proof of Delivery Upload */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-orange-700 mb-3">
                Upload Proof of Delivery
              </label>
              <div className="border-2 border-dashed border-orange-300 rounded-2xl p-6 text-center cursor-pointer hover:bg-orange-50 transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  onChange={onProofUpload}
                  className="hidden"
                  id="proof-upload"
                />
                <label htmlFor="proof-upload" className="cursor-pointer">
                  <Camera size={32} className="mx-auto mb-2 text-orange-400" />
                  <div className="text-orange-700 font-semibold">
                    Click to upload delivery photo
                  </div>
                  <div className="text-orange-600 text-sm">
                    Take a photo of the delivered items
                  </div>
                </label>
              </div>
              {deliveryProof && (
                <div className="mt-3">
                  <img
                    src={deliveryProof}
                    alt="Delivery proof"
                    className="w-32 h-32 object-cover rounded-lg"
                  />
                </div>
              )}
            </div>

            {/* OTP Verification */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-orange-700 mb-2">
                Enter OTP Code
              </label>
              <input
                type="text"
                value={otpCode}
                onChange={(e) => onOtpChange(e.target.value)}
                placeholder="Enter 6-digit OTP from NGO"
                className="w-full px-4 py-3 border border-orange-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                maxLength={6}
              />
              <div className="text-orange-600 text-sm mt-2">
                The NGO will provide you with a 6-digit OTP code upon delivery
              </div>
            </div>

            <button
              onClick={() => onConfirmDelivery(order)}
              disabled={!deliveryProof || !otpCode}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white font-semibold rounded-xl transition-colors duration-200 disabled:cursor-not-allowed"
            >
              <CheckCircle size={20} />
              Confirm Delivery
            </button>
          </div>
        )}

        {order.status === "completed" && (
          <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
            <h3 className="font-semibold text-green-900 mb-4 flex items-center gap-2">
              <CheckCircle className="text-green-500" size={20} />
              Delivery Completed
            </h3>
            <div className="space-y-3">
              <div>
                <div className="text-sm text-green-700">Delivered On</div>
                <div className="font-semibold text-green-900">
                  {formatDate(order.delivered_at)}
                </div>
              </div>
              {order.rating && (
                <div>
                  <div className="text-sm text-green-700">Rating Received</div>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={16}
                        className={`${
                          star <= order.rating
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                    <span className="text-green-900 font-semibold ml-2">
                      {order.rating}/5
                    </span>
                  </div>
                </div>
              )}
              {order.feedback && (
                <div>
                  <div className="text-sm text-green-700">Feedback</div>
                  <div className="font-semibold text-green-900">
                    {order.feedback}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="flex justify-end pt-4 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-xl transition-colors duration-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
);
