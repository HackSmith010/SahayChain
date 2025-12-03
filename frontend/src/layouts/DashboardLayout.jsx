// src/layouts/DashboardLayout.jsx
import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  PackagePlus,
  LogOut,
  ShieldCheck,
  Users,
  Flag,
  User,
  ChevronRight,
  Settings,
  Menu,
  X,
  Bell,
  Heart,
  Truck,
  Building,
  FileText,
  Activity,
  Sparkles,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

export default function DashboardLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // 🔹 NEW: helper to infer role from the current URL when user.role is missing
  const inferRoleFromPath = (pathname) => {
    if (pathname.startsWith("/admin")) return "admin";
    if (pathname.startsWith("/institution")) return "institution";
    if (pathname.startsWith("/donor")) return "donor";
    if (pathname.startsWith("/supplier")) return "supplier";
    return null;
  };

  // 🔹 Use user.role if available, otherwise fall back to URL-based guess
  const role = user?.role || inferRoleFromPath(location.pathname);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Role-based navigation config stays the same
  const navLinks = {
    institution: [
      {
        name: "Overview",
        description: "Snapshot of your active needs",
        icon: <LayoutDashboard size={20} />,
        path: "/institution/dashboard",
      },
      {
        name: "Create Need",
        description: "Post a new item-based requirement",
        icon: <PackagePlus size={20} />,
        path: "/institution/needs/create",
      },
      {
        name: "My Needs",
        description: "Track approvals & funding status",
        icon: <FileText size={20} />,
        path: "/institution/needs",
      },
      {
        name: "Deliveries to Confirm",
        description: "Upload proof and close the loop",
        icon: <Truck size={20} />,
        path: "/institution/deliveries",
      },
      {
        name: "Supplier Feedback",
        description: "Share experience & trigger AI sentiment",
        icon: <Heart size={20} />,
        path: "/institution/feedback",
      },
    ],
    donor: [
      {
        name: "Live Needs",
        description: "Browse verified requests from NGOs",
        icon: <LayoutDashboard size={20} />,
        path: "/donor/dashboard",
      },
      {
        name: "My Donations",
        description: "See where your items are in the journey",
        icon: <Heart size={20} />,
        path: "/donor/donations",
      },
      {
        name: "Impact Reports",
        description: "View delivery proof & blockchain trail",
        icon: <Activity size={20} />,
        path: "/donor/impact",
      },
    ],
    supplier: [
      {
        name: "Available Orders",
        description: "Accept orders recommended by AI",
        icon: <LayoutDashboard size={20} />,
        path: "/supplier/dashboard",
      },
      {
        name: "My Orders",
        description: "Update delivery status in real time",
        icon: <Truck size={20} />,
        path: "/supplier/orders",
      },
      {
        name: "My Profile",
        description: "Service area, rating & preferences",
        icon: <User size={20} />,
        path: "/supplier/profile",
      },
    ],
    admin: [
      {
        name: "Overview",
        description: "System health & key metrics",
        icon: <LayoutDashboard size={20} />,
        path: "/admin/dashboard",
      },
      {
        name: "Verification Queue",
        description: "Approve NGOs, donors & suppliers",
        icon: <ShieldCheck size={20} />,
        path: "/admin/verify",
      },
      {
        name: "Flagged Needs",
        description: "Review AI anomaly alerts",
        icon: <Flag size={20} />,
        path: "/admin/flagged",
      },
      {
        name: "Feedback & Sentiment",
        description: "See how partners rate deliveries",
        icon: <Sparkles size={20} />,
        path: "/admin/feedback",
      },
      {
        name: "Blockchain Events",
        description: "Simulated on-chain traceability log",
        icon: <Activity size={20} />,
        path: "/admin/blockchain",
      },
      {
        name: "User Management",
        description: "Roles, status, and access control",
        icon: <Users size={20} />,
        path: "/admin/users",
      },
    ],
  };

  const getRoleIcon = () => {
    switch (role) {
      case "admin":
        return <ShieldCheck size={20} className="text-accent-400" />;
      case "institution":
        return <Building size={20} className="text-accent-400" />;
      case "donor":
        return <Heart size={20} className="text-accent-400" />;
      case "supplier":
        return <Truck size={20} className="text-accent-400" />;
      default:
        return <User size={20} className="text-accent-400" />;
    }
  };

  const getQuickStats = () => {
    switch (role) {
      case "admin":
        return {
          label1: "Open Flags",
          value1: "8",
          label2: "Pending Verifications",
          value2: "12",
        };
      case "institution":
        return {
          label1: "Active Needs",
          value1: "3",
          label2: "Deliveries to Confirm",
          value2: "2",
        };
      case "donor":
        return {
          label1: "Items Sponsored",
          value1: "5",
          label2: "Deliveries in Transit",
          value2: "1",
        };
      case "supplier":
        return {
          label1: "Active Orders",
          value1: "4",
          label2: "On-Time Rate",
          value2: "96%",
        };
      default:
        return {
          label1: "Open Actions",
          value1: "0",
          label2: "Notifications",
          value2: "0",
        };
    }
  };

  const currentLinks = navLinks[role] || [];
  const quickStats = getQuickStats();

  const isActiveLink = (path) =>
    location.pathname === path || location.pathname.startsWith(path + "/");

  const NavLink = ({ link, isActive, onClick }) => (
    <Link
      to={link.path}
      onClick={onClick}
      className={`flex items-center justify-between gap-3 px-4 py-4 rounded-2xl transition-all duration-300 group ${isActive
        ? "bg-white/20 backdrop-blur-sm border border-white/30 shadow-lg"
        : "hover:bg-white/10 hover:border-white/20 border border-transparent"
        }`}
    >
      <div className="flex items-center gap-3">
        <div
          className={`transition-colors duration-300 ${isActive
            ? "text-accent-400"
            : "text-primary-200 group-hover:text-white"
            }`}
        >
          {link.icon}
        </div>
        <div className="flex flex-col">
          <span
            className={`font-semibold transition-colors duration-300 ${isActive
              ? "text-white"
              : "text-primary-100 group-hover:text-white"
              }`}
          >
            {link.name}
          </span>
          {link.description && (
            <span className="text-xs text-primary-200 group-hover:text-primary-50">
              {link.description}
            </span>
          )}
        </div>
      </div>
      <ChevronRight
        size={16}
        className={`transition-all duration-300 ${isActive
          ? "text-accent-400 opacity-100"
          : "text-primary-300 opacity-0 group-hover:opacity-100 group-hover:translate-x-1"
          }`}
      />
    </Link>
  );

  return (
    <div className="flex h-screen bg-gradient-to-br from-sky-50 via-teal-50 to-emerald-50">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-gradient-to-r from-teal-600 to-emerald-600 text-white p-3 rounded-2xl shadow-lg"
      >
        <Menu size={20} />
      </button>

      {/* Sidebar */}
      <aside
        className={`
        fixed lg:relative z-40 w-80 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-800 text-white flex flex-col shadow-2xl border-r border-slate-700
        transform transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
          }
        h-full
      `}
      >
        {/* Header */}
        <div className="p-6 lg:p-8 border-b border-slate-700/60">
          <div className="flex items-center justify-between">
            <Link
              to="/"
              className="flex items-center gap-3 group flex-1"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <div className="bg-gradient-to-tr from-teal-400 to-emerald-400 rounded-xl p-2.5 group-hover:scale-110 transition-transform duration-300">
                <ShieldCheck size={26} className="text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-white via-teal-100 to-emerald-200 bg-clip-text text-transparent">
                  SahayChain
                </h1>
                <p className="text-slate-300 text-xs font-medium capitalize mt-1">
                  {role ? `${role} portal` : "Impact dashboard"}
                </p>
              </div>
            </Link>

            {/* Close button for mobile */}
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="lg:hidden text-slate-200 hover:text-white p-2"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 lg:p-6 space-y-2 overflow-y-auto">
          {currentLinks.map((link) => {
            const active = isActiveLink(link.path);
            return (
              <NavLink
                key={link.name}
                link={link}
                isActive={active}
                onClick={() => setIsMobileMenuOpen(false)}
              />
            );
          })}

          {currentLinks.length === 0 && (
            <div className="mt-6 text-sm text-slate-200/80">
              No navigation items available for this role yet.
            </div>
          )}
        </nav>

        {/* User Profile & Logout */}
        <div className="p-4 lg:p-6 border-t border-slate-700/60 space-y-4">
          <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
            <div className="bg-gradient-to-tr from-teal-400 to-emerald-400 rounded-full p-2">
              {getRoleIcon()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-semibold text-sm truncate">
                {user?.name || "SahayChain user"}
              </p>
              <p className="text-slate-200 text-xs truncate">
                {user?.email || "connected for transparent impact"}
              </p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-2xl bg-red-500/15 hover:bg-red-500/25 border border-red-400/40 hover:border-red-400/70 text-red-100 hover:text-white transition-all duration-300 group"
          >
            <LogOut
              size={18}
              className="group-hover:scale-110 transition-transform"
            />
            <span className="font-semibold text-sm">Sign out securely</span>
          </button>

          <Link
            to="/settings"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-white/5 border border-transparent hover:border-white/10 transition-all duration-300 group"
          >
            <Settings
              size={18}
              className="text-slate-200 group-hover:text-white"
            />
            <span className="text-slate-200 group-hover:text-white font-medium text-sm">
              Preferences & alerts
            </span>
          </Link>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden min-w-0">
        {/* Top Bar */}
        <header className="bg-white/80 backdrop-blur-md border-b border-slate-200/60 px-4 lg:px-8 py-4 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1 min-w-0">
              <h1 className="text-xl lg:text-2xl font-bold text-slate-900 truncate">
                Welcome back, {user?.name?.split(" ")[0] || "Changemaker"}
              </h1>
              <p className="text-slate-600 mt-1 text-sm lg:text-sm">
                Every update you make here strengthens the traceability story
                behind real-world impact.
              </p>
            </div>

            <div className="flex items-center gap-2 lg:gap-4">
              {/* Notification Bell */}
              <button className="relative p-2 rounded-xl hover:bg-slate-100 transition-colors duration-300">
                <div className="w-2 h-2 bg-teal-500 rounded-full absolute top-2 right-2"></div>
                <Bell size={20} className="text-slate-600" />
              </button>

              {/* Quick Stats */}
              <div className="hidden sm:flex items-center gap-4 lg:gap-6">
                <div className="text-right">
                  <div className="text-xs lg:text-xs text-slate-500">
                    {quickStats.label1}
                  </div>
                  <div className="text-lg font-bold text-teal-700">
                    {quickStats.value1}
                  </div>
                </div>
                <div className="w-px h-7 bg-slate-300"></div>
                <div className="text-right">
                  <div className="text-xs lg:text-xs text-slate-500">
                    {quickStats.label2}
                  </div>
                  <div className="text-lg font-bold text-emerald-700">
                    {quickStats.value2}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Quick Stats */}
          <div className="sm:hidden flex items-center justify-between mt-4 pt-4 border-t border-slate-200">
            <div className="text-center flex-1">
              <div className="text-xs text-slate-500">{quickStats.label1}</div>
              <div className="text-lg font-bold text-teal-700">
                {quickStats.value1}
              </div>
            </div>
            <div className="text-center flex-1">
              <div className="text-xs text-slate-500">{quickStats.label2}</div>
              <div className="text-lg font-bold text-emerald-700">
                {quickStats.value2}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 p-4 lg:p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto w-full">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}

