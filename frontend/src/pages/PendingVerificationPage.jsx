import { Clock,CheckCircle } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import DocumentUploader from "../components/DocumentUploader.jsx";

export default function PendingVerificationPage() {
  const { user } = useAuth();
  const role = user?.role;

  const getDocType = () => {
    if (role === "institution") return "Registration Certificate";
    if (role === "supplier") return "GSTIN License";
    return "Document";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-lg text-center bg-white p-12 rounded-2xl shadow-xl animate-fade-in">
        <div className="bg-yellow-100 rounded-full p-4 inline-flex mb-6">
          <Clock className="text-yellow-600" size={48} />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 font-poppins mb-4">
          Welcome, {user?.name || "User"}!
        </h1>
        <p className="text-gray-600">
          Your account is currently **pending approval**. To complete your
          registration, please submit your verification documents for our team
          to review.
        </p>

        <div className="space-y-4 text-left border-t border-b py-6">
          <div className="flex items-center gap-4 text-green-600">
            <CheckCircle />
            <span className="font-semibold">Step 1: Account Created</span>
          </div>
          <div className="flex items-center gap-4 text-green-600">
            <CheckCircle />
            <span className="font-semibold">Step 2: Documents Submitted</span>
          </div>
          <div className="flex items-center gap-4 text-yellow-600 animate-pulse">
            <Clock />
            <span className="font-semibold">
              Step 3: Admin Review in Progress
            </span>
          </div>
        </div>

        {(role === "institution" || role === "supplier") && (
          <DocumentUploader docType={getDocType()} />
        )}
      </div>
    </div>
  );
}
