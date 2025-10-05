import { Outlet, Link, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  PackagePlus,
  LogOut,
  ShieldCheck,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function DashboardLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const role = user?.role;

  const handleLogout = () => {
    logout();
    navigate("/login"); 
  };

  const navLinks = {
    institution: [
      {
        name: "Dashboard",
        icon: <LayoutDashboard />,
        path: "/institution/dashboard",
      },
      {
        name: "Create Request",
        icon: <PackagePlus />,
        path: "/institution/dashboard/create-request",
      },
    ],
    admin: [
      { name: "Overview", icon: <LayoutDashboard />, path: "/admin/dashboard" },
      {
        name: "Verification Queue",
        icon: <ShieldCheck />,
        path: "/admin/verify",
      },
    ],
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-gray-800 text-white flex flex-col">
        <div className="p-4 border-b border-gray-700 text-center">
          <Link to="/" className="text-2xl font-bold">
            SahayChain
          </Link>
          <p className="text-sm text-gray-400 capitalize mt-1">
            {role} Dashboard
          </p>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {role &&
            navLinks[role] &&
            navLinks[role].map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
              >
                {link.icon}
                <span>{link.name}</span>
              </Link>
            ))}
        </nav>
        <div className="p-4 border-t border-gray-700">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-2 rounded-lg hover:bg-red-500/80 transition-colors"
          >
            <LogOut />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      <main className="flex-1 p-8 overflow-y-auto">
        <Outlet /> 
      </main>
    </div>
  );
}
