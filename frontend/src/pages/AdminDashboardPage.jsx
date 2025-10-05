import { Users, ShieldCheck, AlertCircle } from "lucide-react";

export default function AdminDashboardPage() {
  return (
    <div className="animate-fade-in">
      <h1 className="text-4xl font-bold text-gray-800 font-poppins mb-8">
        Admin Overview
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* These are placeholders; you can make them dynamic later */}
        <StatCard
          icon={<Users className="text-blue-500" />}
          title="Total Users"
          value="150"
        />
        <StatCard
          icon={<ShieldCheck className="text-green-500" />}
          title="Verified Partners"
          value="53"
        />
        <StatCard
          icon={<AlertCircle className="text-yellow-500" />}
          title="Pending Verifications"
          value="8"
        />
      </div>
    </div>
  );
}

// Helper component for stat cards
const StatCard = ({ icon, title, value }) => (
  <div className="bg-white p-6 rounded-2xl shadow-lg flex items-center gap-6">
    <div className="bg-gray-100 p-4 rounded-full">{icon}</div>
    <div>
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-3xl font-bold text-gray-800">{value}</p>
    </div>
  </div>
);
