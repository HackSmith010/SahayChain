import { useState, useEffect } from "react";
import {
  PlusCircle,
  X,
  Package,
  Truck,
  CheckCircle,
  Clock,
  Search,
  Filter,
  Eye,
  Calendar,
  AlertCircle,
  Star,
  Download,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { getMyRequestsApi, createRequestApi } from "../api/request.api.js";

export default function NgoDashboardPage() {
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const { token, user } = useAuth();

  useEffect(() => {
    const fetchRequests = async () => {
      if (!token) return;
      setIsLoading(true);
      setError("");
      try {
        const data = await getMyRequestsApi(token);
        setRequests(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchRequests();
  }, [token]);

  const handleCreateRequest = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const newRequestData = {
      item: formData.get("item"),
      category: formData.get("category"),
      quantity: parseInt(formData.get("quantity")),
      urgency: formData.get("urgency"),
      description: formData.get("description"),
    };

    try {
      const { request: createdRequest } = await createRequestApi(
        newRequestData,
        token
      );
      setRequests((prev) => [createdRequest, ...prev]);
      setShowModal(false);
      event.target.reset();
    } catch (err) {
      console.error("Failed to create request:", err);
      setError("Failed to create request. Please try again.");
    }
  };

  const filteredRequests = requests.filter((request) => {
    const matchesSearch =
      request.item?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || request.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    active: requests.filter((req) => req.status === "open").length,
    inTransit: requests.filter((req) => req.status === "in_transit").length,
    delivered: requests.filter((req) => req.status === "delivered").length,
    totalItems: requests
      .filter((req) => req.status === "delivered")
      .reduce((sum, req) => sum + (req.quantity || 0), 0),
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "open":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "in_transit":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "delivered":
        return "bg-green-100 text-green-800 border-green-200";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "open":
        return <Clock size={14} />;
      case "in_transit":
        return <Truck size={14} />;
      case "delivered":
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
          <p className="text-gray-600 text-lg">
            Manage your requests and track donations in real-time
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center justify-center gap-3 bg-gradient-to-r from-primary-600 to-accent-600 text-white font-bold py-4 px-8 rounded-xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 w-full lg:w-auto"
        >
          <PlusCircle size={20} />
          <span>Create New Request</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        <StatCard
          icon={<Package className="text-blue-500" size={24} />}
          title="Active Requests"
          value={stats.active}
          color="from-blue-50 to-blue-100"
          borderColor="border-blue-200"
        />
        <StatCard
          icon={<Truck className="text-purple-500" size={24} />}
          title="In Transit"
          value={stats.inTransit}
          color="from-purple-50 to-purple-100"
          borderColor="border-purple-200"
        />
        <StatCard
          icon={<CheckCircle className="text-green-500" size={24} />}
          title="Delivered"
          value={stats.delivered}
          color="from-green-50 to-green-100"
          borderColor="border-green-200"
        />
        <StatCard
          icon={<Download className="text-orange-500" size={24} />}
          title="Total Items"
          value={stats.totalItems}
          color="from-orange-50 to-orange-100"
          borderColor="border-orange-200"
        />
      </div>

      {/* Requests Table Section */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
        {/* Table Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
              <Package className="text-primary-600" size={24} />
              Your Requests
            </h2>

            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Search requests..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent w-full lg:w-64"
                />
              </div>

              <div className="relative">
                <Filter
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none bg-white w-full lg:w-40"
                >
                  <option value="all">All Status</option>
                  <option value="open">Open</option>
                  <option value="in_transit">In Transit</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 lg:px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Item
                </th>
                <th className="px-4 lg:px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Quantity
                </th>
                <th className="px-4 lg:px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Date Requested
                </th>
                <th className="px-4 lg:px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 lg:px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {isLoading ? (
                <tr>
                  <td colSpan="5" className="px-4 lg:px-6 py-8 text-center">
                    <div className="flex items-center justify-center gap-3 text-gray-500">
                      <div className="w-6 h-6 border-2 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
                      <span>Loading requests...</span>
                    </div>
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan="5" className="px-4 lg:px-6 py-8 text-center">
                    <div className="flex items-center justify-center gap-3 text-red-500">
                      <AlertCircle size={20} />
                      <span>{error}</span>
                    </div>
                  </td>
                </tr>
              ) : filteredRequests.length > 0 ? (
                filteredRequests.map((req) => (
                  <tr
                    key={req.request_id}
                    className="hover:bg-gray-50 transition-colors duration-200"
                  >
                    <td className="px-4 lg:px-6 py-4">
                      <div>
                        <div className="font-semibold text-gray-900 text-sm">
                          {req.item}
                        </div>
                        {req.category && (
                          <div className="text-gray-500 text-xs mt-1">
                            {req.category}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                      {req.quantity}
                    </td>
                    <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Calendar size={14} className="text-gray-400" />
                        {req.created_at ? formatDate(req.created_at) : "N/A"}
                      </div>
                    </td>
                    <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
                          req.status
                        )}`}
                      >
                        {getStatusIcon(req.status)}
                        {req.status?.replace("_", " ").toUpperCase()}
                      </span>
                    </td>
                    <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => setSelectedRequest(req)}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 hover:bg-primary-100 text-primary-700 rounded-xl font-semibold transition-colors duration-200"
                      >
                        <Eye size={16} />
                        View Details
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-4 lg:px-6 py-12 text-center">
                    <div className="bg-gray-50 rounded-2xl p-8 max-w-md mx-auto">
                      <Package
                        className="text-gray-400 mx-auto mb-4"
                        size={48}
                      />
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        No Requests Found
                      </h3>
                      <p className="text-gray-600 mb-4">
                        {searchTerm || statusFilter !== "all"
                          ? "Try adjusting your search or filter criteria."
                          : "Get started by creating your first request."}
                      </p>
                      {(searchTerm || statusFilter !== "all") && (
                        <button
                          onClick={() => {
                            setSearchTerm("");
                            setStatusFilter("all");
                          }}
                          className="text-primary-600 hover:text-primary-700 font-semibold"
                        >
                          Clear filters
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Request Modal */}
      {showModal && (
        <CreateRequestModal
          onClose={() => setShowModal(false)}
          onSubmit={handleCreateRequest}
        />
      )}

      {/* Request Details Modal */}
      {selectedRequest && (
        <RequestDetailsModal
          request={selectedRequest}
          onClose={() => setSelectedRequest(null)}
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

// Create Request Modal Component
const CreateRequestModal = ({ onClose, onSubmit }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-fade-in-up">
      <div className="p-6 border-b border-gray-200 sticky top-0 bg-white rounded-t-2xl">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">
            Create New Request
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-2 rounded-lg hover:bg-gray-100"
          >
            <X size={24} />
          </button>
        </div>
      </div>

      <form onSubmit={onSubmit} className="p-6 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Item Name *
            </label>
            <input
              type="text"
              name="item"
              required
              placeholder="e.g., Rice, Blankets, Books"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Category *
            </label>
            <select
              name="category"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="">Select Category</option>
              <option value="Food">Food</option>
              <option value="Clothing">Clothing</option>
              <option value="Education">Education</option>
              <option value="Health">Health</option>
              <option value="Shelter">Shelter</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Quantity Needed *
            </label>
            <input
              type="number"
              name="quantity"
              min="1"
              required
              placeholder="e.g., 100"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Urgency Level *
            </label>
            <div className="grid grid-cols-3 gap-2">
              {["Low", "Medium", "High"].map((level) => (
                <label key={level} className="flex items-center">
                  <input
                    type="radio"
                    name="urgency"
                    value={level.toLowerCase()}
                    required
                    className="sr-only"
                  />
                  <span className="w-full text-center px-4 py-3 border border-gray-300 rounded-xl cursor-pointer transition-all duration-200 hover:border-primary-500 peer-checked:border-primary-500 peer-checked:bg-primary-50 peer-checked:text-primary-700">
                    {level}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Description
          </label>
          <textarea
            name="description"
            rows="4"
            placeholder="Provide additional details about your request..."
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
          />
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
            Submit Request
          </button>
        </div>
      </form>
    </div>
  </div>
);

// Request Details Modal Component
const RequestDetailsModal = ({
  request,
  onClose,
  formatDate,
  getStatusColor,
  getStatusIcon,
}) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-fade-in-up">
      <div className="p-6 border-b border-gray-200 sticky top-0 bg-white rounded-t-2xl">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Request Details</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-2 rounded-lg hover:bg-gray-100"
          >
            <X size={24} />
          </button>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Basic Information */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-gray-50 rounded-xl p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Item</h3>
            <p className="text-gray-700">{request.item}</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Quantity</h3>
            <p className="text-gray-700">{request.quantity}</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Category</h3>
            <p className="text-gray-700">
              {request.category || "Not specified"}
            </p>
          </div>
          <div className="bg-gray-50 rounded-xl p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Date Requested</h3>
            <p className="text-gray-700">
              {request.created_at ? formatDate(request.created_at) : "N/A"}
            </p>
          </div>
        </div>

        {/* Status */}
        <div className="bg-gray-50 rounded-xl p-4">
          <h3 className="font-semibold text-gray-900 mb-2">Status</h3>
          <span
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border ${getStatusColor(
              request.status
            )}`}
          >
            {getStatusIcon(request.status)}
            {request.status?.replace("_", " ").toUpperCase()}
          </span>
        </div>

        {/* Description */}
        {request.description && (
          <div className="bg-gray-50 rounded-xl p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
            <p className="text-gray-700">{request.description}</p>
          </div>
        )}

        {/* Conditional Content Based on Status */}
        {request.status === "in_transit" && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <h3 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
              <Truck className="text-blue-500" size={20} />
              Delivery Information
            </h3>
            <p className="text-blue-700">
              Your request is currently in transit. Estimated delivery within
              2-3 business days.
            </p>
            {request.supplier_name && (
              <p className="text-blue-700 mt-2">
                <strong>Delivery by:</strong> {request.supplier_name}
              </p>
            )}
          </div>
        )}

        {request.status === "delivered" && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-4">
            <h3 className="font-semibold text-green-900 mb-4 flex items-center gap-2">
              <CheckCircle className="text-green-500" size={20} />
              Delivery Completed
            </h3>

            {request.delivery_proof_url && (
              <div className="mb-4">
                <a
                  href={request.delivery_proof_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-xl font-semibold transition-colors duration-200"
                >
                  <Eye size={16} />
                  View Proof of Delivery
                </a>
              </div>
            )}

            <div className="bg-white rounded-lg p-4 border border-green-200">
              <h4 className="font-semibold text-green-900 mb-3">
                Submit Feedback
              </h4>
              <div className="flex items-center gap-2 mb-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    className="text-yellow-400 hover:text-yellow-500 transition-colors"
                  >
                    <Star size={24} className="fill-current" />
                  </button>
                ))}
              </div>
              <textarea
                placeholder="Share your experience with this delivery..."
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
              />
              <button className="mt-3 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold transition-colors duration-200">
                Submit Feedback
              </button>
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
