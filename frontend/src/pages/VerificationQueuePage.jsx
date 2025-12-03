import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import {
  getPendingInstitutionsApi,
  verifyInstitutionApi,
  getPendingSuppliersApi,
  verifySupplierApi,
} from "../api/admin.api.js";
import {
  CheckCircle,
  XCircle,
  ExternalLink,
  Building,
  Truck,
  FileText,
  Calendar,
  Shield,
  AlertCircle,
  Download,
  Eye,
} from "lucide-react";

export default function VerificationQueuePage() {
  const [pendingInstitutions, setPendingInstitutions] = useState([]);
  const [pendingSuppliers, setPendingSuppliers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("institutions");
  const [processingId, setProcessingId] = useState(null);
  const { token } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      if (!token) return;
      setIsLoading(true);
      setError("");
      try {
        if (activeTab === "institutions") {
          const data = await getPendingInstitutionsApi(token);
          setPendingInstitutions(data);
        } else {
          const data = await getPendingSuppliersApi(token);
          setPendingSuppliers(data);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [token, activeTab]);

  const handleVerifyInstitution = async (id, status) => {
    setProcessingId(id);
    try {
      await verifyInstitutionApi(id, status, token);
      setPendingInstitutions((prev) =>
        prev.filter((inst) => inst.institution_id !== id)
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setProcessingId(null);
    }
  };

  const handleVerifySupplier = async (id, status) => {
    setProcessingId(id);
    try {
      await verifySupplierApi(id, status, token);
      setPendingSuppliers((prev) =>
        prev.filter((sup) => sup.supplier_id !== id)
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setProcessingId(null);
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 font-poppins mb-2">
            Verification Queue
          </h1>
          <p className="text-gray-600 text-lg">
            Review and verify new institutions and suppliers joining the
            platform
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="text-sm text-gray-500">Total Pending</div>
            <div className="text-2xl font-bold text-primary-600">
              {pendingInstitutions.length + pendingSuppliers.length}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-2xl p-6">
          <div className="flex items-center gap-4">
            <div className="bg-blue-500 rounded-xl p-3">
              <Building className="text-white" size={24} />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {pendingInstitutions.length}
              </div>
              <div className="text-blue-700 font-semibold">
                Pending Institutions
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-2xl p-6">
          <div className="flex items-center gap-4">
            <div className="bg-green-500 rounded-xl p-3">
              <Truck className="text-white" size={24} />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {pendingSuppliers.length}
              </div>
              <div className="text-green-700 font-semibold">
                Pending Suppliers
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-2xl p-6">
          <div className="flex items-center gap-4">
            <div className="bg-purple-500 rounded-xl p-3">
              <Shield className="text-white" size={24} />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {pendingInstitutions.filter((inst) => inst.created_at).length +
                  pendingSuppliers.filter((sup) => sup.created_at).length}
              </div>
              <div className="text-purple-700 font-semibold">
                Submitted Today
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex" aria-label="Tabs">
            <button
              onClick={() => setActiveTab("institutions")}
              className={`flex-1 py-6 px-8 text-center border-b-2 font-semibold text-lg transition-all duration-300 ${
                activeTab === "institutions"
                  ? "border-primary-500 text-primary-600 bg-primary-50"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center justify-center gap-3">
                <Building size={20} />
                Pending Institutions
                <span
                  className={`px-3 py-1 rounded-full text-sm font-bold ${
                    activeTab === "institutions"
                      ? "bg-primary-500 text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {pendingInstitutions.length}
                </span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab("suppliers")}
              className={`flex-1 py-6 px-8 text-center border-b-2 font-semibold text-lg transition-all duration-300 ${
                activeTab === "suppliers"
                  ? "border-primary-500 text-primary-600 bg-primary-50"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center justify-center gap-3">
                <Truck size={20} />
                Pending Suppliers
                <span
                  className={`px-3 py-1 rounded-full text-sm font-bold ${
                    activeTab === "suppliers"
                      ? "bg-primary-500 text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {pendingSuppliers.length}
                </span>
              </div>
            </button>
          </nav>
        </div>

        {/* Content */}
        <div className="p-6">
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-2xl p-4 flex items-center gap-3">
              <AlertCircle className="text-red-500" size={20} />
              <p className="text-red-700">{error}</p>
            </div>
          )}

          {isLoading ? (
            <div className="text-center py-12">
              <div className="inline-flex items-center gap-3 text-gray-500">
                <div className="w-6 h-6 border-2 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-lg">Loading verifications...</span>
              </div>
            </div>
          ) : activeTab === "institutions" ? (
            <VerificationTable
              items={pendingInstitutions}
              type="institution"
              onApprove={(item) =>
                handleVerifyInstitution(item.institution_id, "approved")
              }
              onReject={(item) =>
                handleVerifyInstitution(item.institution_id, "rejected")
              }
              processingId={processingId}
              formatDate={formatDate}
              getTimeAgo={getTimeAgo}
            />
          ) : (
            <VerificationTable
              items={pendingSuppliers}
              type="supplier"
              onApprove={(item) => handleVerifySupplier(item.supplier_id, true)}
              onReject={(item) => handleVerifySupplier(item.supplier_id, false)}
              processingId={processingId}
              formatDate={formatDate}
              getTimeAgo={getTimeAgo}
            />
          )}
        </div>
      </div>
    </div>
  );
}

// Enhanced Table Component
const VerificationTable = ({
  items,
  type,
  onApprove,
  onReject,
  processingId,
  formatDate,
  getTimeAgo,
}) => {
  const columns =
    type === "institution"
      ? [
          { key: "name", label: "NGO Name", width: "25%" },
          { key: "reg_number", label: "Registration Number", width: "20%" },
          { key: "created_at", label: "Date Submitted", width: "15%" },
          { key: "document", label: "Document", width: "20%" },
          { key: "actions", label: "Actions", width: "20%" },
        ]
      : [
          { key: "name", label: "Business Name", width: "25%" },
          { key: "gstin", label: "GSTIN", width: "20%" },
          { key: "created_at", label: "Date Submitted", width: "15%" },
          { key: "document", label: "Document", width: "20%" },
          { key: "actions", label: "Actions", width: "20%" },
        ];

  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="bg-gray-50 rounded-2xl p-8 max-w-md mx-auto">
          <Shield className="text-gray-400 mx-auto mb-4" size={48} />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No Pending Verifications
          </h3>
          <p className="text-gray-600">
            All {type === "institution" ? "institutions" : "suppliers"} have
            been reviewed.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                style={{ width: column.width }}
                className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider"
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {items.map((item) => (
            <tr
              key={
                type === "institution" ? item.institution_id : item.supplier_id
              }
              className="hover:bg-gray-50 transition-colors duration-200"
            >
              {/* Name */}
              <td className="px-6 py-4">
                <div>
                  <div className="font-semibold text-gray-900 text-sm">
                    {item.name}
                  </div>
                  <div className="text-gray-500 text-xs mt-1">{item.email}</div>
                </div>
              </td>

              {/* Registration Number / GSTIN */}
              <td className="px-6 py-4">
                <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono text-gray-800">
                  {type === "institution" ? item.reg_number : item.gstin}
                </code>
              </td>

              {/* Date Submitted */}
              <td className="px-6 py-4">
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <Calendar size={14} className="text-gray-400" />
                  {item.created_at ? (
                    <div>
                      <div>{formatDate(item.created_at)}</div>
                      <div className="text-xs text-gray-500">
                        {getTimeAgo(item.created_at)}
                      </div>
                    </div>
                  ) : (
                    "N/A"
                  )}
                </div>
              </td>

              {/* Document */}
              <td className="px-6 py-4">
                {item.document_url ? (
                  <div className="flex items-center gap-3">
                    <a
                      href={item.document_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 hover:bg-primary-100 text-primary-700 rounded-xl font-medium transition-colors duration-200 group"
                    >
                      <Eye size={16} />
                      View Document
                      <ExternalLink
                        size={14}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      />
                    </a>
                    <button
                      onClick={() => window.open(item.document_url, "_blank")}
                      className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                      title="Download"
                    >
                      <Download size={16} />
                    </button>
                  </div>
                ) : (
                  <span className="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 text-gray-500 rounded-full text-sm">
                    <FileText size={14} />
                    Not Submitted
                  </span>
                )}
              </td>

              {/* Actions */}
              <td className="px-6 py-4">
                <div className="flex items-center justify-end gap-3">
                  <button
                    onClick={() => onApprove(item)}
                    disabled={
                      processingId ===
                      (type === "institution"
                        ? item.institution_id
                        : item.supplier_id)
                    }
                    className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 disabled:bg-green-300 text-white rounded-xl font-semibold transition-all duration-200 disabled:cursor-not-allowed transform hover:scale-105 disabled:scale-100"
                  >
                    {processingId ===
                    (type === "institution"
                      ? item.institution_id
                      : item.supplier_id) ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <CheckCircle size={16} />
                    )}
                    Approve
                  </button>
                  <button
                    onClick={() => onReject(item)}
                    disabled={
                      processingId ===
                      (type === "institution"
                        ? item.institution_id
                        : item.supplier_id)
                    }
                    className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 disabled:bg-red-300 text-white rounded-xl font-semibold transition-all duration-200 disabled:cursor-not-allowed transform hover:scale-105 disabled:scale-100"
                  >
                    <XCircle size={16} />
                    Reject
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
