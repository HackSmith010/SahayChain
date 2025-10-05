import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import DocumentUploader from "../components/DocumentUploader.jsx";
import { LogOut } from "lucide-react";

export default function UploadDocumentsPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const getDocType = () => {
    const role = user?.role;
    if (role === "institution") return "Registration Certificate";
    if (role === "supplier") return "GSTIN License";
    return "Verification Document";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-lg text-center bg-white p-12 rounded-2xl shadow-xl animate-fade-in">
        <h1 className="text-3xl font-bold text-gray-900 font-poppins mb-2">
          One Last Step, {user?.name}!
        </h1>
        <p className="text-gray-600 mb-8">
          To ensure the security of our platform, please upload the following
          document for verification.
        </p>

        <DocumentUploader
          docType={getDocType()}
          onUploadSuccess={() => navigate("/pending-approval")}
        />

        <button
          onClick={handleLogout}
          className="text-sm text-gray-500 hover:underline mt-8 flex items-center gap-2 mx-auto"
        >
          <LogOut size={14} />
          <span>Logout and Finish Later</span>
        </button>
      </div>
    </div>
  );
}
