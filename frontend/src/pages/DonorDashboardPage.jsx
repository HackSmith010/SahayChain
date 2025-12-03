import { useState, useEffect } from "react";
import {
  Search,
  Heart,
  MapPin,
  Zap,
  Clock,
  Users,
  ShieldCheck,
  CheckCircle,
  Filter,
  X,
  ExternalLink,
  Truck,
  Package,
  Star,
  Download,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

// Mock Data - In a real app, this would come from API calls
const mockRequests = [
  {
    id: 1,
    ngo: "Hope Foundation",
    ngo_verified: true,
    item: "School Bags",
    quantity: 150,
    needed: 75,
    urgency: "high",
    location: "Mumbai, MH",
    category: "Education",
    description:
      "Quality school bags for underprivileged children in municipal schools",
    created_at: "2024-01-15T10:00:00Z",
  },
  {
    id: 2,
    ngo: "Seva Trust",
    ngo_verified: true,
    item: "Rice (kg)",
    quantity: 800,
    needed: 800,
    urgency: "medium",
    location: "Pune, MH",
    category: "Food",
    description: "Rice for daily meal programs serving 200+ people",
    created_at: "2024-01-14T14:30:00Z",
  },
  {
    id: 3,
    ngo: "Winter Relief Org",
    ngo_verified: true,
    item: "Blankets",
    quantity: 500,
    needed: 200,
    urgency: "high",
    location: "Delhi, DL",
    category: "Clothing",
    description: "Warm blankets for homeless shelters during winter",
    created_at: "2024-01-16T09:15:00Z",
  },
  {
    id: 4,
    ngo: "City Elders Home",
    ngo_verified: false,
    item: "Medicine Kits",
    quantity: 100,
    needed: 100,
    urgency: "low",
    location: "Mumbai, MH",
    category: "Health",
    description: "Basic medicine kits for elderly care facility",
    created_at: "2024-01-13T16:45:00Z",
  },
  {
    id: 5,
    ngo: "Rural Education Initiative",
    ngo_verified: true,
    item: "Notebooks",
    quantity: 2000,
    needed: 1500,
    urgency: "medium",
    location: "Bangalore, KA",
    category: "Education",
    description: "Notebooks for rural school children",
    created_at: "2024-01-12T11:20:00Z",
  },
  {
    id: 6,
    ngo: "Community Kitchen",
    ngo_verified: true,
    item: "Cooking Oil",
    quantity: 300,
    needed: 300,
    urgency: "high",
    location: "Chennai, TN",
    category: "Food",
    description: "Cooking oil for community kitchen serving 500 meals daily",
    created_at: "2024-01-16T08:00:00Z",
  },
];

const mockDonations = [
  {
    id: 1,
    date: "2024-01-15T14:30:00Z",
    item: "School Bags",
    quantity: 25,
    ngo: "Hope Foundation",
    status: "delivered",
    transaction_hash: "0x742d35Cc6634C0532925a3b8D4a2a3a1a1a1a1a1",
    delivery_proof: "https://example.com/delivery-proof-1.jpg",
    supplier: "Quick Supplies Co.",
    amount: 12500,
  },
  {
    id: 2,
    date: "2024-01-10T11:20:00Z",
    item: "Rice (kg)",
    quantity: 100,
    ngo: "Seva Trust",
    status: "in_transit",
    transaction_hash: "0x842d35Cc6634C0532925a3b8D4a2a3a1a1a1a1a2",
    supplier: "Food Distributors Ltd.",
    amount: 5000,
  },
  {
    id: 3,
    date: "2024-01-05T09:45:00Z",
    item: "Blankets",
    quantity: 50,
    ngo: "Winter Relief Org",
    status: "confirmed",
    transaction_hash: "0x942d35Cc6634C0532925a3b8D4a2a3a1a1a1a1a3",
    delivery_proof: "https://example.com/delivery-proof-3.jpg",
    supplier: "Warm Comfort Inc.",
    amount: 7500,
  },
];

export default function DonorDashboardPage() {
  const [activeTab, setActiveTab] = useState("browse");
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [urgencyFilter, setUrgencyFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("all");
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [selectedDonation, setSelectedDonation] = useState(null);
  const { user } = useAuth();

  const categories = [
    "all",
    "Food",
    "Clothing",
    "Education",
    "Health",
    "Shelter",
  ];
  const urgencyLevels = ["all", "high", "medium", "low"];
  const locations = [
    "all",
    "Mumbai, MH",
    "Pune, MH",
    "Delhi, DL",
    "Bangalore, KA",
    "Chennai, TN",
  ];

  const filteredRequests = mockRequests.filter((request) => {
    const matchesSearch =
      request.item.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.ngo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" || request.category === categoryFilter;
    const matchesUrgency =
      urgencyFilter === "all" || request.urgency === urgencyFilter;
    const matchesLocation =
      locationFilter === "all" || request.location === locationFilter;

    return (
      matchesSearch && matchesCategory && matchesUrgency && matchesLocation
    );
  });

  const stats = {
    totalDonations: 12,
    livesImpacted: 5800,
    impactReports: 8,
    activeRequests: mockRequests.length,
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800 border-green-200";
      case "in_transit":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "confirmed":
        return "bg-purple-100 text-purple-800 border-purple-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));

    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
    return formatDate(dateString);
  };

  return (
    <div className="animate-fade-in space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 font-poppins mb-2">
            Make an Impact Today, {user?.name}!
          </h1>
          <p className="text-gray-600 text-lg">
            Discover meaningful causes and track your contributions in real-time
          </p>
        </div>
        <div className="flex gap-4">
          <div className="text-right">
            <div className="text-sm text-gray-500">This Month</div>
            <div className="text-2xl font-bold text-primary-600">
              3 Donations
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        <StatCard
          icon={<Heart className="text-red-500" size={24} />}
          title="Total Donations"
          value={stats.totalDonations}
          color="from-red-50 to-red-100"
          borderColor="border-red-200"
        />
        <StatCard
          icon={<Users className="text-blue-500" size={24} />}
          title="Lives Impacted"
          value="5,800+"
          color="from-blue-50 to-blue-100"
          borderColor="border-blue-200"
        />
        <StatCard
          icon={<ShieldCheck className="text-green-500" size={24} />}
          title="Impact Reports"
          value={stats.impactReports}
          color="from-green-50 to-green-100"
          borderColor="border-green-200"
        />
        <StatCard
          icon={<Package className="text-purple-500" size={24} />}
          title="Active Requests"
          value={stats.activeRequests}
          color="from-purple-50 to-purple-100"
          borderColor="border-purple-200"
        />
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex">
            <button
              onClick={() => setActiveTab("browse")}
              className={`flex-1 py-6 px-8 text-center border-b-2 font-semibold text-lg transition-all duration-300 ${activeTab === "browse"
                  ? "border-primary-500 text-primary-600 bg-primary-50"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                }`}
            >
              <div className="flex items-center justify-center gap-3">
                <Search size={20} />
                Browse Requests
                <span
                  className={`px-3 py-1 rounded-full text-sm font-bold ${activeTab === "browse"
                      ? "bg-primary-500 text-white"
                      : "bg-gray-200 text-gray-700"
                    }`}
                >
                  {mockRequests.length}
                </span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab("history")}
              className={`flex-1 py-6 px-8 text-center border-b-2 font-semibold text-lg transition-all duration-300 ${activeTab === "history"
                  ? "border-primary-500 text-primary-600 bg-primary-50"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                }`}
            >
              <div className="flex items-center justify-center gap-3">
                <Clock size={20} />
                My Donations
                <span
                  className={`px-3 py-1 rounded-full text-sm font-bold ${activeTab === "history"
                      ? "bg-primary-500 text-white"
                      : "bg-gray-200 text-gray-700"
                    }`}
                >
                  {mockDonations.length}
                </span>
              </div>
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === "browse" ? (
            <BrowseRequests
              requests={filteredRequests}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              categoryFilter={categoryFilter}
              setCategoryFilter={setCategoryFilter}
              urgencyFilter={urgencyFilter}
              setUrgencyFilter={setUrgencyFilter}
              locationFilter={locationFilter}
              setLocationFilter={setLocationFilter}
              categories={categories}
              urgencyLevels={urgencyLevels}
              locations={locations}
              onDonateClick={setSelectedRequest}
              getUrgencyColor={getUrgencyColor}
              getTimeAgo={getTimeAgo}
            />
          ) : (
            <DonationHistory
              donations={mockDonations}
              onViewImpact={setSelectedDonation}
              getStatusColor={getStatusColor}
              formatDate={formatDate}
            />
          )}
        </div>
      </div>

      {/* Donation Modal */}
      {selectedRequest && (
        <DonationModal
          request={selectedRequest}
          onClose={() => setSelectedRequest(null)}
          formatDate={formatDate}
          getUrgencyColor={getUrgencyColor}
        />
      )}

      {/* Impact Report Modal */}
      {selectedDonation && (
        <ImpactReportModal
          donation={selectedDonation}
          onClose={() => setSelectedDonation(null)}
          formatDate={formatDate}
          getStatusColor={getStatusColor}
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

// Browse Requests Component
const BrowseRequests = ({
  requests,
  searchTerm,
  setSearchTerm,
  categoryFilter,
  setCategoryFilter,
  urgencyFilter,
  setUrgencyFilter,
  locationFilter,
  setLocationFilter,
  categories,
  urgencyLevels,
  locations,
  onDonateClick,
  getUrgencyColor,
  getTimeAgo,
}) => (
  <div className="space-y-6">
    {/* Search and Filters */}
    <div className="flex flex-col lg:flex-row gap-4">
      <div className="flex-1 relative">
        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          size={20}
        />
        <input
          type="text"
          placeholder="Search for items, NGOs, or causes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative">
          <Filter
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="pl-10 pr-8 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none bg-white min-w-32"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat === "all" ? "All Categories" : cat}
              </option>
            ))}
          </select>
        </div>

        <select
          value={urgencyFilter}
          onChange={(e) => setUrgencyFilter(e.target.value)}
          className="px-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none bg-white min-w-32"
        >
          {urgencyLevels.map((level) => (
            <option key={level} value={level}>
              {level === "all"
                ? "All Urgency"
                : level.charAt(0).toUpperCase() + level.slice(1)}
            </option>
          ))}
        </select>

        <select
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
          className="px-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none bg-white min-w-40"
        >
          {locations.map((loc) => (
            <option key={loc} value={loc}>
              {loc === "all" ? "All Locations" : loc}
            </option>
          ))}
        </select>
      </div>
    </div>

    {/* Request Grid */}
    {requests.length > 0 ? (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {requests.map((request) => (
          <RequestCard
            key={request.id}
            request={request}
            onDonateClick={onDonateClick}
            getUrgencyColor={getUrgencyColor}
            getTimeAgo={getTimeAgo}
          />
        ))}
      </div>
    ) : (
      <div className="text-center py-12">
        <div className="bg-gray-50 rounded-2xl p-8 max-w-md mx-auto">
          <Search className="text-gray-400 mx-auto mb-4" size={48} />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No Requests Found
          </h3>
          <p className="text-gray-600">
            Try adjusting your search criteria or check back later for new
            opportunities.
          </p>
        </div>
      </div>
    )}
  </div>
);

// Request Card Component
const RequestCard = ({
  request,
  onDonateClick,
  getUrgencyColor,
  getTimeAgo,
}) => {
  const progress =
    ((request.quantity - request.needed) / request.quantity) * 100;

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden transform hover:shadow-xl transition-all duration-300">
      <div className="p-6">
        {/* NGO Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-gray-900 text-sm">
              {request.ngo}
            </h3>
            {request.ngo_verified && (
              <ShieldCheck size={14} className="text-green-500" />
            )}
          </div>
          <span
            className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold border ${getUrgencyColor(
              request.urgency
            )}`}
          >
            <Zap size={12} />
            {request.urgency.toUpperCase()}
          </span>
        </div>

        {/* Item Details */}
        <h4 className="text-xl font-bold text-gray-900 mb-2">{request.item}</h4>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {request.description}
        </p>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between text-sm font-medium text-gray-600 mb-2">
            <span>Progress</span>
            <span>
              {request.quantity - request.needed} of {request.quantity}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-gradient-to-r from-primary-500 to-accent-500 h-2.5 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Meta Information */}
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5">
              <MapPin size={14} />
              {request.location}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Package size={14} />
              {request.category}
            </span>
          </div>
          <span className="text-xs">{getTimeAgo(request.created_at)}</span>
        </div>
      </div>

      {/* Donate Button */}
      <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
        <button
          onClick={() => onDonateClick(request)}
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-primary-600 to-accent-600 text-white font-bold py-3 px-6 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
        >
          <Heart size={18} />
          Donate Now
        </button>
      </div>
    </div>
  );
};

// Donation History Component
const DonationHistory = ({
  donations,
  onViewImpact,
  getStatusColor,
  formatDate,
}) => (
  <div className="overflow-hidden rounded-xl border border-gray-200">
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
            Date
          </th>
          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
            Item & NGO
          </th>
          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
            Quantity
          </th>
          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
            Status
          </th>
          <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700 uppercase tracking-wider">
            Actions
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {donations.map((donation) => (
          <tr
            key={donation.id}
            className="hover:bg-gray-50 transition-colors duration-200"
          >
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {formatDate(donation.date)}
            </td>
            <td className="px-6 py-4">
              <div>
                <div className="font-semibold text-gray-900">
                  {donation.item}
                </div>
                <div className="text-gray-500 text-sm">{donation.ngo}</div>
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
              {donation.quantity}
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <span
                className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
                  donation.status
                )}`}
              >
                {donation.status.replace("_", " ").toUpperCase()}
              </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <button
                onClick={() => onViewImpact(donation)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 hover:bg-primary-100 text-primary-700 rounded-xl font-semibold transition-colors duration-200"
              >
                <ExternalLink size={16} />
                View Impact
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// Donation Modal Component
const DonationModal = ({ request, onClose, formatDate, getUrgencyColor }) => {
  const [quantity, setQuantity] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("card");

  const estimatedCost = quantity * 500; // Mock cost calculation

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle payment processing here
    console.log("Processing donation:", { request, quantity, paymentMethod });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-fade-in-up">
        <div className="p-6 border-b border-gray-200 sticky top-0 bg-white rounded-t-2xl">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900">
              Make a Donation
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors p-2 rounded-lg hover:bg-gray-100"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Request Summary */}
          <div className="bg-gray-50 rounded-2xl p-6">
            <h3 className="font-semibold text-gray-900 mb-4">
              You're Donating To
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-gray-500">NGO</div>
                <div className="font-semibold text-gray-900 flex items-center gap-2">
                  {request.ngo}
                  {request.ngo_verified && (
                    <ShieldCheck size={16} className="text-green-500" />
                  )}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Item</div>
                <div className="font-semibold text-gray-900">
                  {request.item}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Location</div>
                <div className="font-semibold text-gray-900 flex items-center gap-2">
                  <MapPin size={14} />
                  {request.location}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Urgency</div>
                <span
                  className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold border ${getUrgencyColor(
                    request.urgency
                  )}`}
                >
                  {request.urgency.toUpperCase()}
                </span>
              </div>
            </div>
          </div>

          {/* Donation Details */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">Donation Details</h3>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quantity to Donate
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="number"
                  min="1"
                  max={request.needed}
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                  className="w-32 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <span className="text-gray-500">
                  Max: {request.needed} available
                </span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Payment Method
              </label>
              <div className="grid grid-cols-2 gap-4">
                {["card", "upi", "netbanking", "wallet"].map((method) => (
                  <label key={method} className="flex items-center">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={method}
                      checked={paymentMethod === method}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="sr-only"
                    />
                    <span className="w-full text-center px-4 py-3 border border-gray-300 rounded-xl cursor-pointer transition-all duration-200 hover:border-primary-500 peer-checked:border-primary-500 peer-checked:bg-primary-50 peer-checked:text-primary-700 capitalize">
                      {method}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Cost Summary */}
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-blue-700 font-semibold">
                  Estimated Cost
                </span>
                <span className="text-2xl font-bold text-blue-900">
                  ₹{estimatedCost.toLocaleString()}
                </span>
              </div>
              <p className="text-blue-600 text-sm">
                Includes item cost and delivery charges
              </p>
            </div>
          </div>

          {/* Payment Gateway Integration Area */}
          <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center">
            <div className="text-gray-500 mb-2">
              Payment Gateway Integration
            </div>
            <div className="text-sm text-gray-400">
              {paymentMethod === "card" &&
                "Stripe Card Element would appear here"}
              {paymentMethod === "upi" && "UPI QR Code would appear here"}
              {paymentMethod === "netbanking" &&
                "Net Banking options would appear here"}
              {paymentMethod === "wallet" &&
                "Wallet payment options would appear here"}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-end pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 text-gray-700 font-semibold rounded-xl border border-gray-300 hover:bg-gray-50 transition-colors duration-200 w-full sm:w-auto"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-primary-600 to-accent-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 w-full sm:w-auto"
            >
              Confirm Donation - ₹{estimatedCost.toLocaleString()}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Impact Report Modal Component
const ImpactReportModal = ({
  donation,
  onClose,
  formatDate,
  getStatusColor,
}) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto animate-fade-in-up">
      <div className="p-6 border-b border-gray-200 sticky top-0 bg-white rounded-t-2xl">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Impact Report</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-2 rounded-lg hover:bg-gray-100"
          >
            <X size={24} />
          </button>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Donation Summary */}
        <div className="bg-gray-50 rounded-2xl p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Donation Summary</h3>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div>
              <div className="text-sm text-gray-500">Item</div>
              <div className="font-semibold text-gray-900">{donation.item}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Quantity</div>
              <div className="font-semibold text-gray-900">
                {donation.quantity}
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Status</div>
              <span
                className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
                  donation.status
                )}`}
              >
                {donation.status.replace("_", " ").toUpperCase()}
              </span>
            </div>
            <div>
              <div className="text-sm text-gray-500">NGO</div>
              <div className="font-semibold text-gray-900">{donation.ngo}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Supplier</div>
              <div className="font-semibold text-gray-900">
                {donation.supplier}
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Date</div>
              <div className="font-semibold text-gray-900">
                {formatDate(donation.date)}
              </div>
            </div>
          </div>
        </div>

        {/* Lifecycle Timeline */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6">
          <h3 className="font-semibold text-gray-900 mb-6">
            Donation Lifecycle
          </h3>
          <div className="space-y-6">
            {/* Step 1: You Donated */}
            <div className="flex items-start gap-4">
              <div className="bg-green-500 rounded-full p-2 mt-1">
                <CheckCircle size={16} className="text-white" />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-gray-900 mb-1">
                  You Donated
                </div>
                <p className="text-gray-600 text-sm">
                  Your donation was successfully processed and recorded on the
                  blockchain.
                </p>
                <div className="mt-2">
                  <a
                    href={`https://etherscan.io/tx/${donation.transaction_hash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 text-sm font-medium"
                  >
                    <ExternalLink size={14} />
                    View Blockchain Transaction
                  </a>
                </div>
              </div>
            </div>

            {/* Step 2: Supplier Delivered */}
            <div className="flex items-start gap-4">
              <div
                className={`rounded-full p-2 mt-1 ${donation.status === "delivered" ||
                    donation.status === "in_transit"
                    ? "bg-green-500"
                    : "bg-gray-300"
                  }`}
              >
                <Truck size={16} className="text-white" />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-gray-900 mb-1">
                  Supplier Delivered
                </div>
                <p className="text-gray-600 text-sm">
                  {donation.supplier} delivered the items to {donation.ngo}.
                  {donation.delivery_proof_url &&
                    " Proof of delivery has been uploaded."}
                </p>
                {donation.delivery_proof_url && (
                  <div className="mt-2">
                    <a
                      href={donation.delivery_proof_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 text-sm font-medium"
                    >
                      <Download size={14} />
                      View Proof of Delivery
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Step 3: NGO Confirmed */}
            <div className="flex items-start gap-4">
              <div
                className={`rounded-full p-2 mt-1 ${donation.status === "delivered"
                    ? "bg-green-500"
                    : "bg-gray-300"
                  }`}
              >
                <ShieldCheck size={16} className="text-white" />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-gray-900 mb-1">
                  NGO Confirmed Receipt
                </div>
                <p className="text-gray-600 text-sm">
                  {donation.ngo} has confirmed successful receipt of the items.
                  {donation.status === "delivered" &&
                    " Your donation is now complete!"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Impact Metrics */}
        <div className="bg-gradient-to-br from-primary-50 to-accent-50 border border-primary-200 rounded-2xl p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Your Impact</h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-600">
                {donation.quantity}
              </div>
              <div className="text-sm text-gray-700">Items Delivered</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-600">
                {Math.ceil(donation.quantity * 2.5)}
              </div>
              <div className="text-sm text-gray-700">Lives Impacted</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-600">100%</div>
              <div className="text-sm text-gray-700">Transparent</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-600">1</div>
              <div className="text-sm text-gray-700">Blockchain Record</div>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-xl transition-colors duration-200"
          >
            Close Report
          </button>
        </div>
      </div>
    </div>
  </div>
);
