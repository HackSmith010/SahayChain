import { useState } from "react";
import {
  Mail,
  Lock,
  LogIn,
  Eye,
  EyeOff,
  ArrowRight,
  Shield,
  Clock,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isPending, setIsPending] = useState(false);
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsPending(false);

    try {
      await login(email, password);
    } catch (err) {
      if (err.message.includes("pending admin approval")) {
        setIsPending(true);
      } else {
        setError(err.message);
      }
    }
  };

  const handleBlur = (field) => () => {};

  const isFormValid = email && password && password.length >= 6;

  if (isPending) {
    return <PendingApprovalScreen />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-accent-50 p-4 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-72 h-72 bg-primary-300 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-accent-300 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-secondary-200 rounded-full blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-4xl bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-white/20">
        <div className="grid lg:grid-cols-2">
          <div className="hidden lg:block bg-gradient-to-br from-primary-600 to-accent-600 p-12 text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent-300 rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10 h-full flex flex-col justify-between">
              <div>
                <Link
                  to="/"
                  className="text-2xl font-bold text-white mb-8 inline-block"
                >
                  SahayChain
                </Link>
                <h2 className="text-4xl font-bold mb-6 leading-tight">
                  Continue Your{" "}
                  <span className="text-accent-300">Journey of Impact</span>
                </h2>
                <p className="text-lg text-white/90 mb-8 leading-relaxed">
                  Welcome back to the platform where trust meets transparency
                  and every login brings you closer to creating meaningful
                  change.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">100%</div>
                  <div className="text-white/80 text-sm">
                    Transparent Tracking
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">0%</div>
                  <div className="text-white/80 text-sm">Hidden Fees</div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8 sm:p-12">
            <div className="text-center mb-8">
              <div className="lg:hidden mb-6">
                <Link to="/" className="text-2xl font-bold text-primary-600">
                  SahayChain
                </Link>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 font-poppins mb-2">
                Welcome Back
              </h1>
              <p className="text-gray-600">
                Sign in to continue making a difference
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="group">
                <div className="relative">
                  <Mail
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 transition-colors duration-300 group-focus-within:text-primary-600"
                    size={20}
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={handleBlur("email")}
                    required
                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 bg-white/50 group-hover:border-gray-300"
                  />
                </div>
              </div>

              <div className="group">
                <div className="relative">
                  <Lock
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 transition-colors duration-300 group-focus-within:text-primary-600"
                    size={20}
                  />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onBlur={handleBlur("password")}
                    required
                    minLength={6}
                    className="w-full pl-12 pr-12 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 bg-white/50 group-hover:border-gray-300"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <div className="text-right">
                <Link
                  to="/forgot-password"
                  className="text-sm font-medium text-primary-600 hover:text-primary-500 transition-colors"
                >
                  Forgot Password?
                </Link>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-2xl p-4">
                  <p className="text-red-700 text-sm text-center font-medium">
                    {error}
                  </p>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading || !isFormValid}
                className="w-full flex justify-center items-center gap-3 bg-gradient-to-r from-primary-600 to-accent-600 text-white font-bold py-4 rounded-xl hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-0.5"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Signing In...</span>
                  </>
                ) : (
                  <>
                    <LogIn size={20} />
                    <span>Sign In to Your Account</span>
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </form>

            <div className="text-center mt-8 pt-6 border-t border-gray-200">
              <p className="text-gray-600">
                New to SahayChain?{" "}
                <Link
                  to="/register"
                  className="font-bold text-primary-600 hover:text-primary-700 transition-colors inline-flex items-center gap-1 group"
                >
                  Create an Account
                  <ArrowRight
                    size={16}
                    className="transform group-hover:translate-x-1 transition-transform"
                  />
                </Link>
              </p>
            </div>

            <div className="mt-6 text-center">
              <div className="inline-flex items-center gap-2 text-xs text-gray-500 bg-gray-50 rounded-full px-4 py-2">
                <Shield size={12} className="text-green-500" />
                <span>Your data is securely encrypted and protected</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const PendingApprovalScreen = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md text-center bg-white p-12 rounded-2xl shadow-xl animate-fade-in">
        <div className="bg-yellow-100 rounded-full p-4 inline-flex mb-6">
          <Clock className="text-yellow-600" size={48} />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 font-poppins mb-4">
          Account Pending Approval
        </h1>
        <p className="text-gray-600 mb-8">
          Thank you for registering! Your account is currently under review by
          our administration team. You will be notified once approved.
        </p>
        <Link
          to="/"
          className="inline-block bg-primary-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-primary-700 transition-colors"
        >
          Back to Homepage
        </Link>
      </div>
    </div>
  );
};
