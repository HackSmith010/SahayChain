import { Routes, Route } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import PendingVerificationPage from "./pages/PendingVerificationPage";

import NgoDashboardPage from "./pages/NgoDashboardPage";
import DonorDashboardPage from "./pages/DonorDashboardPage";
import SupplierDashboardPage from "./pages/SupplierDashboardPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import VerificationQueuePage from "./pages/VerificationQueuePage";
import UserManagementPage from "./pages/UserManagementPage";

import DashboardLayout from "./layouts/DashboardLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminFlaggedNeedsPage from "./pages/AdminFlaggedNeedsPage.jsx";
import AdminFeedbackPage from "./pages/AdminFeedbackPage.jsx";
import AdminBlockchainPage from "./pages/AdminBlockchainPage.jsx";
import SettingsPage from "./pages/SettingsPage.jsx";

import InstitutionNeedsPage from "./pages/InstitutionNeedsPage.jsx";
import CreateNeedPage from "./pages/CreateNeedPage.jsx";
import DeliveriesToConfirmPage from "./pages/DeliveriesToConfirmPage.jsx";
import SupplierFeedbackPage from "./pages/SupplierFeedbackPage.jsx";

import DonationsPage from "./pages/DonationsPage.jsx";
import ImpactReportsPage from "./pages/ImapactReportsPage.jsx";

import SupplierOrdersPage from "./pages/SupplierOrdersPage.jsx";
import SupplierProfilePage from "./pages/SupplierProfilePage.jsx";


// function App() {
//   const { user, isAuthenticated, isLoading } = useAuth();

//   if (isLoading)
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         Loading...
//       </div>
//     );

//   return (
//     <Routes>
//       {/* Public Routes */}
//       <Route path="/" element={<LandingPage />} />

//       <Route
//         path="/login"
//         element={
//           !isAuthenticated ? (
//             <LoginPage />
//           ) : (
//             <Navigate to="/dashboard" replace />
//           )
//         }
//       />

//       {/* Registration */}
//       <Route path="/register" element={<RegisterPage />} />

//       {/* Central post-login router */}
//       <Route
//         path="/dashboard"
//         element={
//           <ProtectedRoute>
//             {/* 1️⃣ Admins always go to admin dashboard */}
//             {user?.role === "admin" ? (
//               <Navigate to="/admin/dashboard" replace />
//             ) : // 2️⃣ For all other roles, check verification
//               user?.is_verified ? (
//                 <Navigate to={`/${user?.role}/dashboard`} replace />
//               ) : (
//                 <PendingVerificationPage />
//               )}
//           </ProtectedRoute>
//         }
//       />

//       {/* --- Institution Dashboard --- */}
//       <Route element={<ProtectedRoute requiredRole="institution" />}>
//         <Route path="/institution/dashboard" element={<DashboardLayout />}>
//           <Route index element={<NgoDashboardPage />} />
//         </Route>
//       </Route>

//       {/* --- Donor Dashboard --- */}
//       <Route element={<ProtectedRoute requiredRole="donor" />}>
//         <Route path="/donor/dashboard" element={<DashboardLayout />}>
//           <Route index element={<DonorDashboardPage />} />
//         </Route>
//       </Route>

//       {/* --- Supplier Dashboard --- */}
//       <Route element={<ProtectedRoute requiredRole="supplier" />}>
//         <Route path="/supplier/dashboard" element={<DashboardLayout />}>
//           <Route index element={<SupplierDashboardPage />} />
//         </Route>
//       </Route>

//       {/* --- Admin Dashboard --- */}
//       <Route element={<ProtectedRoute requiredRole="admin" />}>
//         <Route path="/admin" element={<DashboardLayout />}>
//           <Route path="dashboard" element={<AdminDashboardPage />} />
//           <Route path="verify" element={<VerificationQueuePage />} />
//           <Route path="users" element={<UserManagementPage />} />
//         </Route>
//       </Route>

//       {/* 404 */}
//       <Route
//         path="*"
//         element={
//           <div className="min-h-screen flex items-center justify-center">
//             404 - Page Not Found
//           </div>
//         }
//       />
//     </Routes>
//   );
// }

// export default App;



function App() {
  const { isLoading } = useAuth();

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />

      {/* Auth pages still exist but don’t gate anything */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* You can keep this if you want to see the pending page */}
      <Route path="/pending" element={<PendingVerificationPage />} />

      {/* --- Institution Dashboard (no auth guard) --- */}
      <Route path="/institution" element={<DashboardLayout />}>
        {/* Overview */}
        <Route path="dashboard" element={<NgoDashboardPage />} />

        {/* Needs */}
        <Route path="needs" element={<InstitutionNeedsPage />} />
        <Route path="needs/create" element={<CreateNeedPage />} />

        {/* Deliveries & Feedback */}
        <Route path="deliveries" element={<DeliveriesToConfirmPage />} />
        <Route path="feedback" element={<SupplierFeedbackPage />} />
      </Route>

      {/* --- Donor Dashboard (no auth guard) --- */}
      <Route path="/donor" element={<DashboardLayout />}>
        <Route path="dashboard" element={<DonorDashboardPage />} />
        <Route path="donations" element={<DonationsPage />} />
        <Route path="impact" element={<ImpactReportsPage />} />
      </Route>

      {/* --- Supplier Dashboard (no auth guard) --- */}
      <Route path="/supplier" element={<DashboardLayout />}>
        <Route path="dashboard" element={<SupplierDashboardPage />} />
        <Route path="orders" element={<SupplierOrdersPage />} />
        <Route path="profile" element={<SupplierProfilePage />} />
      </Route>
      {/* --- Admin Dashboard (no auth guard) --- */}
      {/* <Route element={<ProtectedRoute requiredRole="admin" />}> */}
      <Route path="/admin" element={<DashboardLayout />}>
        <Route path="dashboard" element={<AdminDashboardPage />} />
        <Route path="verify" element={<VerificationQueuePage />} />
        <Route path="users" element={<UserManagementPage />} />

        {/* 🔹 NEW admin pages matching the sidebar links */}
        <Route path="flagged" element={<AdminFlaggedNeedsPage />} />
        <Route path="feedback" element={<AdminFeedbackPage />} />
        <Route path="blockchain" element={<AdminBlockchainPage />} />
      </Route>
      {/* </Route> */}


      {/* 404 */}
      <Route
        path="*"
        element={
          <div className="min-h-screen flex items-center justify-center">
            404 - Page Not Found
          </div>
        }
      />

      <Route path="/settings" element={<DashboardLayout />}>
        <Route index element={<SettingsPage />} />
      </Route>

    </Routes>
  );
}

export default App;
