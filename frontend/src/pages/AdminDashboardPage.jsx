import {
  Users,
  ShieldCheck,
  AlertCircle,
  Building,
  Truck,
  Heart,
  Flag,
  Clock,
  ArrowRight,
  CheckCircle,
  XCircle,
  FileText,
  Package,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function AdminDashboardPage() {
  const stats = [
    {
      icon: <AlertCircle className="text-yellow-500" size={24} />,
      title: "Pending Verifications",
      value: "8",
      description: "Awaiting review",
      link: "/admin/verify",
      color: "from-yellow-50 to-yellow-100",
      borderColor: "border-yellow-200",
      textColor: "text-yellow-700",
    },
    {
      icon: <Building className="text-blue-500" size={24} />,
      title: "Active NGOs",
      value: "42",
      description: "Verified institutions",
      color: "from-blue-50 to-blue-100",
      borderColor: "border-blue-200",
      textColor: "text-blue-700",
    },
    {
      icon: <Truck className="text-green-500" size={24} />,
      title: "Active Suppliers",
      value: "28",
      description: "Verified partners",
      color: "from-green-50 to-green-100",
      borderColor: "border-green-200",
      textColor: "text-green-700",
    },
    {
      icon: <Heart className="text-red-500" size={24} />,
      title: "Donations This Month",
      value: "156",
      description: "Successful contributions",
      color: "from-red-50 to-red-100",
      borderColor: "border-red-200",
      textColor: "text-red-700",
    },
    {
      icon: <Flag className="text-orange-500" size={24} />,
      title: "Flagged Requests",
      value: "5",
      description: "Needs review",
      link: "/admin/flagged-requests",
      color: "from-orange-50 to-orange-100",
      borderColor: "border-orange-200",
      textColor: "text-orange-700",
    },
  ];

  const recentActivities = [
    {
      id: 1,
      type: "verification_submitted",
      title: "Hope Foundation submitted documents",
      description: "New institution registration awaiting review",
      timestamp: "2 hours ago",
      icon: <FileText className="text-blue-500" size={16} />,
      status: "pending",
    },
    {
      id: 2,
      type: "supplier_approved",
      title: "Quick Provisions approved",
      description: "New supplier added to verified partners",
      timestamp: "5 hours ago",
      icon: <CheckCircle className="text-green-500" size={16} />,
      status: "approved",
    },
    {
      id: 3,
      type: "request_created",
      title: "New request for 500 blankets",
      description: "Created by Seva Trust for winter relief",
      timestamp: "1 day ago",
      icon: <Package className="text-purple-500" size={16} />,
      status: "active",
    },
    {
      id: 4,
      type: "request_flagged",
      title: "Request #123 flagged by AI",
      description: "High quantity anomaly detected",
      timestamp: "1 day ago",
      icon: <Flag className="text-orange-500" size={16} />,
      status: "flagged",
    },
    {
      id: 5,
      type: "user_rejected",
      title: "Supplier application rejected",
      description: "Green Solutions - incomplete documentation",
      timestamp: "2 days ago",
      icon: <XCircle className="text-red-500" size={16} />,
      status: "rejected",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800 border-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "flagged":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "rejected":
        return "bg-red-100 text-red-800 border-red-200";
      case "active":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="animate-fade-in space-y-8">
      {/* Header */}
      <div className="text-center md:text-left">
        <h1 className="text-4xl font-bold text-gray-900 font-poppins mb-3">
          Platform Overview
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl">
          Welcome back! Here's what's happening across the SahayChain ecosystem
          today.
        </p>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Recent Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity Feed */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                <Clock className="text-primary-600" size={24} />
                Recent Activity
              </h2>
              <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                Last 24 hours
              </span>
            </div>
          </div>
          <div className="divide-y divide-gray-100">
            {recentActivities.map((activity) => (
              <div
                key={activity.id}
                className="p-6 hover:bg-gray-50 transition-colors duration-200"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1">{activity.icon}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-gray-900 text-sm">
                        {activity.title}
                      </h3>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                          activity.status
                        )}`}
                      >
                        {activity.status}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-2">
                      {activity.description}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Clock size={12} />
                      {activity.timestamp}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 bg-gray-50 border-t border-gray-200">
            <Link
              to="/admin/activity"
              className="flex items-center justify-center gap-2 text-primary-600 hover:text-primary-700 font-semibold text-sm transition-colors"
            >
              View All Activity
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
              <ShieldCheck className="text-primary-600" size={24} />
              Quick Actions
            </h2>
            <div className="space-y-3">
              <Link
                to="/admin/verify"
                className="flex items-center justify-between p-4 rounded-xl border border-yellow-200 bg-yellow-50 hover:bg-yellow-100 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <AlertCircle className="text-yellow-600" size={20} />
                  <div>
                    <div className="font-semibold text-yellow-800">
                      Review Verifications
                    </div>
                    <div className="text-sm text-yellow-600">
                      8 pending approvals
                    </div>
                  </div>
                </div>
                <ArrowRight
                  className="text-yellow-600 group-hover:translate-x-1 transition-transform"
                  size={16}
                />
              </Link>

              <Link
                to="/admin/flagged-requests"
                className="flex items-center justify-between p-4 rounded-xl border border-orange-200 bg-orange-50 hover:bg-orange-100 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <Flag className="text-orange-600" size={20} />
                  <div>
                    <div className="font-semibold text-orange-800">
                      Check Flagged Requests
                    </div>
                    <div className="text-sm text-orange-600">
                      5 items need attention
                    </div>
                  </div>
                </div>
                <ArrowRight
                  className="text-orange-600 group-hover:translate-x-1 transition-transform"
                  size={16}
                />
              </Link>

              <Link
                to="/admin/users"
                className="flex items-center justify-between p-4 rounded-xl border border-blue-200 bg-blue-50 hover:bg-blue-100 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <Users className="text-blue-600" size={20} />
                  <div>
                    <div className="font-semibold text-blue-800">
                      Manage Users
                    </div>
                    <div className="text-sm text-blue-600">
                      View all platform users
                    </div>
                  </div>
                </div>
                <ArrowRight
                  className="text-blue-600 group-hover:translate-x-1 transition-transform"
                  size={16}
                />
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
              <CheckCircle className="text-green-600" size={24} />
              System Status
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-green-50 border border-green-200">
                <span className="font-medium text-green-800">
                  AI Monitoring
                </span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-green-600">Active</span>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-green-50 border border-green-200">
                <span className="font-medium text-green-800">
                  Blockchain Network
                </span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-green-600">Stable</span>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-blue-50 border border-blue-200">
                <span className="font-medium text-blue-800">Database</span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-blue-600">Optimal</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const StatCard = ({
  icon,
  title,
  value,
  description,
  link,
  color,
  borderColor,
  textColor,
}) => {
  const content = (
    <div
      className={`bg-gradient-to-br ${color} border ${borderColor} rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer h-full flex flex-col justify-between`}
    >
      <div className="flex items-center justify-between mb-4">
        <div
          className={`p-3 rounded-xl bg-white/50 backdrop-blur-sm border border-white/30`}
        >
          {icon}
        </div>
        {link && (
          <ArrowRight
            size={18}
            className={`${textColor} opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300`}
          />
        )}
      </div>
      <div>
        <p className="text-3xl font-bold text-gray-900 mb-1">{value}</p>
        <p className={`font-semibold text-lg mb-2 ${textColor}`}>{title}</p>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>
    </div>
  );

  if (link) {
    return (
      <Link to={link} className="block h-full">
        {content}
      </Link>
    );
  }

  return content;
};
