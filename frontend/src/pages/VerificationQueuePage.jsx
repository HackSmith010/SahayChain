import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import {
  getPendingInstitutionsApi,
  verifyInstitutionApi,
  getPendingSuppliersApi,
  verifySupplierApi,
} from "../api/admin.api.js";
import { CheckCircle, XCircle, ExternalLink } from "lucide-react";

export default function VerificationQueuePage() {
  const [pendingInstitutions, setPendingInstitutions] = useState([]);
  const [pendingSuppliers, setPendingSuppliers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("institutions");
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
    await verifyInstitutionApi(id, status, token);
    setPendingInstitutions((prev) =>
      prev.filter((inst) => inst.institution_id !== id)
    );
  };

  const handleVerifySupplier = async (id, status) => {
    await verifySupplierApi(id, status, token);
    setPendingSuppliers((prev) => prev.filter((sup) => sup.supplier_id !== id));
  };

  return (
    <div className="animate-fade-in">
      <h1 className="text-4xl font-bold text-gray-800 font-poppins mb-8">
        Verification Queue
      </h1>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex gap-6" aria-label="Tabs">
          <button
            onClick={() => setActiveTab("institutions")}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === "institutions"
                ? "border-primary-500 text-primary-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Institutions ({pendingInstitutions.length})
          </button>
          <button
            onClick={() => setActiveTab("suppliers")}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === "suppliers"
                ? "border-primary-500 text-primary-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Suppliers ({pendingSuppliers.length})
          </button>
        </nav>
      </div>

      {isLoading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {activeTab === "institutions" && (
        <VerificationTable
          items={pendingInstitutions}
          headers={["Name", "Registration Number"]}
          dataKeys={["name", "reg_number"]}
          onApprove={(item) =>
            handleVerifyInstitution(item.institution_id, "approved")
          }
          onReject={(item) =>
            handleVerifyInstitution(item.institution_id, "rejected")
          }
        />
      )}

      {activeTab === "suppliers" && (
        <VerificationTable
          items={pendingSuppliers}
          headers={["Name", "GSTIN"]}
          dataKeys={["name", "gstin"]}
          onApprove={(item) => handleVerifySupplier(item.supplier_id, true)}
          onReject={(item) => handleVerifySupplier(item.supplier_id, false)}
        />
      )}
    </div>
  );
}

// Reusable table component
const VerificationTable = ({
  items,
  headers,
  dataKeys,
  onApprove,
  onReject,
}) => (
  <div className="bg-white p-6 rounded-2xl shadow-lg">
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {headers.map((h) => (
              <th
                key={h}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {h}
              </th>
            ))}
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Document
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {items.length > 0 ? (
            items.map((item, index) => (
              <tr key={index}>
                {dataKeys.map((key) => (
                  <td
                    key={key}
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-700"
                  >
                    {item[key]}
                  </td>
                ))}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {item.document_url ? (
                    <a
                      href={item.document_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-600 hover:text-primary-800 hover:underline inline-flex items-center gap-1"
                    >
                      View Document <ExternalLink size={14} />
                    </a>
                  ) : (
                    <span className="text-gray-400">Not Submitted</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-4">
                  <button
                    onClick={() => onApprove(item)}
                    className="text-green-600 hover:text-green-900"
                    title="Approve"
                  >
                    <CheckCircle />
                  </button>
                  <button
                    onClick={() => onReject(item)}
                    className="text-red-600 hover:text-red-900"
                    title="Reject"
                  >
                    <XCircle />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={headers.length + 2}
                className="text-center py-8 text-gray-500"
              >
                No pending verifications.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
);
