import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

// Import Pages
import LandingPage from "./pages/LandingPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import NgoDashboardPage from "./pages/NgoDashboardPage.jsx";
import AdminDashboardPage from "./pages/AdminDashboardPage.jsx";
import VerificationQueuePage from "./pages/VerificationQueuePage.jsx";
import PendingVerificationPage from "./pages/PendingVerificationPage.jsx";
import UploadDocumentsPage from "./pages/UploadDocumentsPage.jsx";

import ProtectedRoute from "./components/ProtectedRoute.jsx";
import DashboardLayout from "./layouts/DashboardLayout.jsx";
import "./index.css";

function App() {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route
        path="/login"
        element={
          !isAuthenticated ? <LoginPage /> : <Navigate to="/dashboard" />
        }
      />
      <Route
        path="/register"
        element={
          !isAuthenticated ? <RegisterPage /> : <Navigate to="/dashboard" />
        }
      />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            {user?.role === "admin" ? (
              <Navigate to="/admin/dashboard" replace />
            ) : user?.is_verified ? (
              user.role === "institution" ? (
                <Navigate to="/institution/dashboard" replace />
              ) : (
                <Navigate to="/" replace />
              )
            ) : (
              <Navigate to="/upload-documents" replace />
            )}
          </ProtectedRoute>
        }
      />

      <Route
        path="/upload-documents"
        element={
          <ProtectedRoute>
            <UploadDocumentsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/pending-approval"
        element={
          <ProtectedRoute>
            <PendingVerificationPage />
          </ProtectedRoute>
        }
      />

      <Route element={<ProtectedRoute requiredRole="institution" />}>
        <Route path="/institution/dashboard" element={<DashboardLayout />}>
          <Route index element={<NgoDashboardPage />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute requiredRole="admin" />}>
        <Route path="/admin" element={<DashboardLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboardPage />} />
          <Route path="verify" element={<VerificationQueuePage />} />
        </Route>
      </Route>

      <Route path="*" element={<div>404 Not Found</div>} />
    </Routes>
  );
}

export default App;
