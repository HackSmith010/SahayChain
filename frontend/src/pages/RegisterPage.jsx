import { useState } from "react";
import {
  User,
  Mail,
  Lock,
  Building,
  Truck,
  Check,
  ArrowRight,
  Heart,
  Shield,
  Target,
  Star,
  Upload,
  Clock,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import DocumentUploader from "../components/DocumentUploader";

export default function RegisterPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    role: "",
    reg_number: "",
    gstin: "",
    doc_type: "",
    s3_uri: "",
  });
  const [error, setError] = useState("");
  const { register, login, isLoading } = useAuth();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  console.log(`--- RegisterPage re-rendering. Current step: ${step} ---`);

  const handleNext = () => {
    console.log(
      `handleNext called. Current step: ${step}, Next step: ${step + 1}`
    );
    setStep((prev) => prev + 1);
    setError("");
  };

  const handleBack = () => setStep((prev) => prev - 1);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
  };

  const handleRoleSelect = (role) => {
    setFormData((prev) => ({ ...prev, role }));
    handleNext();
  };

  const handleDocumentUploaded = ({ doc_type, s3_uri }) => {
    setFormData((prev) => ({ ...prev, doc_type, s3_uri }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await register(formData);
      handleNext();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    { number: 1, name: "Account", description: "Basic information" },
    { number: 2, name: "Your Role", description: "Choose how you'll help" },
    { number: 3, name: "Details", description: "Complete your profile" },
    { number: 4, name: "Document", description: "Upload your documents" },
  ];

  const roleBenefits = {
    donor: [
      "Track every donation in real-time",
      "See photos and stories of impact",
      "Get tax exemption certificates",
      "Join exclusive impact reports",
    ],
    institution: [
      "Access verified donor network",
      "Streamlined resource requests",
      "Automated impact reporting",
      "Enhanced credibility with blockchain",
    ],
    supplier: [
      "Verified business profile",
      "Direct NGO partnerships",
      "Transparent delivery tracking",
      "Build social responsibility portfolio",
    ],
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-accent-50 p-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-72 h-72 bg-primary-300 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-accent-300 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-secondary-200 rounded-full blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-4xl bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-white/20">
        <div className="grid lg:grid-cols-2">
          {/* Left Side - Visual */}
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
                  Join the Future of{" "}
                  <span className="text-accent-300">Transparent Giving</span>
                </h2>
                <p className="text-lg text-white/90 mb-8 leading-relaxed">
                  Become part of a movement where every contribution creates
                  verifiable, meaningful change.
                </p>
              </div>

              {/* Impact Stats */}
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

          {/* Right Side - Form */}
          <div className="p-8 sm:p-12">
            <div className="text-center mb-8">
              <div className="lg:hidden mb-6">
                <Link to="/" className="text-2xl font-bold text-primary-600">
                  SahayChain
                </Link>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 font-poppins mb-2">
                Join the Movement
              </h1>
              <p className="text-gray-600">
                Create your account and start making a verified difference.
              </p>
            </div>

            {/* Enhanced Progress Steps */}
            {step <= 4 && (
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  {steps.map((stepItem, index) => (
                    <div key={stepItem.number} className="flex items-center">
                      <div
                        className={`flex flex-col items-center transition-all duration-300 ${
                          step > stepItem.number
                            ? "text-green-600"
                            : step === stepItem.number
                            ? "text-primary-600"
                            : "text-gray-400"
                        }`}
                      >
                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold border-2 transition-all duration-300 ${
                            step > stepItem.number
                              ? "bg-green-500 border-green-500 text-white"
                              : step === stepItem.number
                              ? "bg-primary-600 border-primary-600 text-white shadow-lg"
                              : "bg-gray-100 border-gray-300 text-gray-500"
                          }`}
                        >
                          {step > stepItem.number ? (
                            <Check size={18} />
                          ) : (
                            stepItem.number
                          )}
                        </div>
                        <span className="text-xs mt-2 font-medium hidden sm:block">
                          {stepItem.name}
                        </span>
                      </div>
                      {index < steps.length - 1 && (
                        <div
                          className={`w-12 h-1 transition-colors duration-300 mx-2 ${
                            step > stepItem.number
                              ? "bg-green-500"
                              : "bg-gray-200"
                          }`}
                        ></div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step Content */}
            <div className="min-h-[350px]">
              {step === 1 && (
                <Step1
                  next={handleNext}
                  data={formData}
                  onChange={handleChange}
                />
              )}
              {step === 2 && (
                <Step2
                  back={handleBack}
                  onSelect={handleRoleSelect}
                  selectedRole={formData.role}
                  benefits={roleBenefits}
                />
              )}
              {step === 3 && (
                <Step3
                  back={handleBack}
                  next={handleNext}
                  data={formData}
                  onChange={handleChange}
                  benefits={roleBenefits}
                />
              )}
              {step === 4 && (
                <Step4
                  back={handleBack}
                  onSubmit={handleSubmit}
                  isLoading={isLoading}
                  error={error}
                  data={formData}
                  onDocUploaded={handleDocumentUploaded}
                />
              )}
              {step === 5 && <SuccessStep role={formData.role} />}
            </div>

            {step <= 3 && (
              <div className="text-center mt-8 pt-6 border-t border-gray-200">
                <p className="text-gray-600">
                  Already part of the change?{" "}
                  <Link
                    to="/login"
                    className="font-bold text-primary-600 hover:text-primary-700 transition-colors"
                  >
                    Sign In Here
                  </Link>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Enhanced Step Components
const Step1 = ({ next, data, onChange }) => {
  const [touched, setTouched] = useState({});

  const handleBlur = (field) => () => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const isFormValid =
    data.name && data.email && data.password && data.password.length >= 6;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        next();
      }}
      className="space-y-6 animate-fade-in"
    >
      <InputField
        icon={<User className="text-primary-600" />}
        name="name"
        type="text"
        placeholder="Full Name"
        value={data.name}
        onChange={onChange}
        onBlur={handleBlur("name")}
        touched={touched.name}
        required
      />
      <InputField
        icon={<Mail className="text-primary-600" />}
        name="email"
        type="email"
        placeholder="Email Address"
        value={data.email}
        onChange={onChange}
        onBlur={handleBlur("email")}
        touched={touched.email}
        required
      />
      <InputField
        icon={<Lock className="text-primary-600" />}
        name="password"
        type="password"
        placeholder="Password (min. 6 characters)"
        value={data.password}
        onChange={onChange}
        onBlur={handleBlur("password")}
        touched={touched.password}
        required
        minLength={6}
      />

      <button
        type="submit"
        disabled={!isFormValid}
        className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-primary-600 to-accent-600 text-white font-bold py-4 rounded-xl hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-0.5"
      >
        Continue to Your Role
        <ArrowRight size={20} />
      </button>
    </form>
  );
};

const Step2 = ({ back, onSelect, selectedRole, benefits }) => (
  <div className="space-y-6 animate-fade-in">
    <div className="text-center mb-6">
      <h3 className="text-2xl font-bold text-gray-900 mb-2">
        How will you create impact?
      </h3>
      <p className="text-gray-600">
        Choose your role in our transparent ecosystem
      </p>
    </div>

    <div className="grid gap-4">
      <RoleCard
        icon={<Heart className="text-red-500" />}
        title="I'm a Donor"
        description="Fund specific needs and watch your impact unfold"
        benefits={benefits.donor}
        onSelect={() => onSelect("donor")}
        selected={selectedRole === "donor"}
      />
      <RoleCard
        icon={<Building className="text-blue-500" />}
        title="I'm an Institution/NGO"
        description="Request resources and build trust with supporters"
        benefits={benefits.institution}
        onSelect={() => onSelect("institution")}
        selected={selectedRole === "institution"}
      />
      <RoleCard
        icon={<Truck className="text-green-500" />}
        title="I'm a Supplier"
        description="Deliver verified goods and grow your social impact"
        benefits={benefits.supplier}
        onSelect={() => onSelect("supplier")}
        selected={selectedRole === "supplier"}
      />
    </div>

    <button
      onClick={back}
      className="w-full text-gray-600 font-bold py-3 rounded-xl hover:bg-gray-50 transition-colors border-2 border-gray-200"
    >
      Back
    </button>
  </div>
);

const Step3 = ({ back, next, data, onChange, benefits }) => {
  const currentBenefits = benefits[data.role] || [];

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        next();
      }}
      className="space-y-6 animate-fade-in"
    >
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Complete Your Profile
        </h3>
        <p className="text-gray-600">Final details to start your journey</p>
      </div>

      {/* Role-specific benefits preview */}
      {currentBenefits.length > 0 && (
        <div className="bg-primary-50 border border-primary-200 rounded-2xl p-6 mb-6">
          <h4 className="font-bold text-primary-900 mb-3 flex items-center gap-2">
            <Star className="text-primary-600" size={20} />
            As a {data.role}, you'll get:
          </h4>
          <ul className="space-y-2">
            {currentBenefits.map((benefit, index) => (
              <li
                key={index}
                className="flex items-center gap-3 text-primary-800"
              >
                <Check size={16} className="text-primary-600 flex-shrink-0" />
                <span className="text-sm">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Role-specific fields */}
      {data.role === "institution" && (
        <InputField
          icon={<Building className="text-blue-500" />}
          name="reg_number"
          type="text"
          placeholder="Official Registration Number"
          value={data.reg_number}
          onChange={onChange}
          required
        />
      )}
      {data.role === "supplier" && (
        <InputField
          icon={<Truck className="text-green-500" />}
          name="gstin"
          type="text"
          placeholder="GSTIN Number"
          value={data.gstin}
          onChange={onChange}
          required
        />
      )}
      {data.role === "donor" && (
        <div className="text-center p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-200">
          <Target className="text-green-600 mx-auto mb-3" size={32} />
          <h4 className="font-bold text-green-900 mb-2">
            Ready to Make an Impact?
          </h4>
          <p className="text-green-800 text-sm">
            You're all set to start funding verified needs and tracking your
            contributions.
          </p>
        </div>
      )}

      <div className="flex gap-4">
        <button
          type="button"
          onClick={back}
          className="flex-1 text-gray-600 font-bold py-4 rounded-xl hover:bg-gray-50 transition-colors border-2 border-gray-200"
        >
          Back
        </button>
        <button
          type="submit"
          className="flex-1 flex justify-center items-center gap-3 bg-gradient-to-r from-primary-600 to-accent-600 text-white font-bold py-4 rounded-xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
        >
          Continue to Documents
          <ArrowRight size={20} />
        </button>
      </div>
    </form>
  );
};

const Step4 = ({ back, onSubmit, isLoading, error, data, onDocUploaded }) => {
  const getDocType = () => {
    if (data.role === "institution") return "Registration Certificate";
    if (data.role === "supplier") return "GSTIN Certificate";
    return "Document";
  };

  const getDocDescription = () => {
    if (data.role === "institution")
      return "Upload your official registration certificate for verification";
    if (data.role === "supplier")
      return "Upload your GSTIN certificate for business verification";
    return "Upload required document";
  };

  if (data.role === "donor") {
    return (
      <div className="animate-fade-in text-center space-y-6">
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-200">
          <Check className="text-green-600 mx-auto mb-4" size={48} />
          <h3 className="text-2xl font-bold text-gray-900 mb-3">
            You're All Set!
          </h3>
          <p className="text-gray-600 mb-6">
            As a donor, no documents are required. Click below to finish
            creating your account.
          </p>
          <button
            onClick={onSubmit}
            disabled={isLoading}
            className="w-full flex justify-center items-center gap-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-4 rounded-xl hover:shadow-xl transition-all duration-300 disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Creating Account...
              </>
            ) : (
              <>
                <Shield size={20} />
                Complete Registration
              </>
            )}
          </button>
        </div>
        <button
          onClick={back}
          className="w-full text-gray-600 font-bold py-3 rounded-xl hover:bg-gray-50 transition-colors border-2 border-gray-200"
        >
          Back
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6 animate-fade-in">
      <div className="text-center mb-6">
        <div className="bg-primary-100 rounded-full p-3 inline-flex mb-4">
          <Upload className="text-primary-600" size={24} />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Final Step: Document Verification
        </h3>
        <p className="text-gray-600">{getDocDescription()}</p>
      </div>

      <DocumentUploader
        docType={getDocType()}
        onUploadSuccess={onDocUploaded}
      />

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-4">
          <p className="text-red-700 text-sm text-center font-medium">
            {error}
          </p>
        </div>
      )}

      <div className="flex gap-4">
        <button
          type="button"
          onClick={back}
          className="flex-1 text-gray-600 font-bold py-4 rounded-xl hover:bg-gray-50 transition-colors border-2 border-gray-200"
        >
          Back
        </button>
        <button
          type="submit"
          disabled={isLoading || !data.s3_uri}
          className="flex-1 flex justify-center items-center gap-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-4 rounded-xl hover:shadow-xl transition-all duration-300 disabled:opacity-50 transform hover:-translate-y-0.5"
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Submitting...
            </>
          ) : (
            <>
              <Check size={20} />
              Finish Registration
            </>
          )}
        </button>
      </div>
    </form>
  );
};

const SuccessStep = () => (
  <div className="text-center space-y-6 animate-fade-in py-8">
    <div className="bg-yellow-100 rounded-full p-6 inline-flex">
      <Clock className="text-yellow-600" size={48} />
    </div>
    <div>
      <h2 className="text-3xl font-bold text-gray-900 mb-3">
        Application Submitted!
      </h2>
      <p className="text-gray-600 max-w-md mx-auto text-lg leading-relaxed">
        Thank you. Your profile and documents are now under review. You will be
        notified via email once your account is approved.
      </p>
    </div>
    <Link
      to="/"
      className="inline-flex items-center gap-3 bg-primary-600 text-white font-bold py-4 px-8 rounded-xl hover:shadow-xl"
    >
      Back to Homepage
      <ArrowRight size={20} />
    </Link>
  </div>
);
// Enhanced Helper Components
const InputField = ({ icon, touched, onBlur, ...props }) => (
  <div className="relative group">
    <div className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300 group-focus-within:text-primary-600">
      {icon}
    </div>
    <input
      {...props}
      onBlur={onBlur}
      className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 bg-white/50 group-hover:border-gray-300"
    />
    {touched && props.value && (
      <div className="absolute right-4 top-1/2 -translate-y-1/2">
        <Check size={16} className="text-green-500" />
      </div>
    )}
  </div>
);

const RoleCard = ({
  icon,
  title,
  description,
  benefits,
  onSelect,
  selected,
}) => (
  <button
    type="button"
    onClick={onSelect}
    className={`w-full text-left p-6 border-2 rounded-2xl transition-all duration-300 group ${
      selected
        ? "border-primary-600 bg-primary-50 shadow-lg scale-[1.02]"
        : "border-gray-200 hover:border-primary-400 hover:bg-primary-25 hover:shadow-md"
    }`}
  >
    <div className="flex items-start gap-4">
      <div
        className={`p-3 rounded-xl transition-colors duration-300 ${
          selected ? "bg-primary-100" : "bg-gray-100 group-hover:bg-primary-50"
        }`}
      >
        {icon}
      </div>
      <div className="flex-1">
        <h3 className="font-bold text-lg text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 mb-3">{description}</p>

        {/* Benefits List */}
        {benefits && (
          <ul className="space-y-1">
            {benefits.slice(0, 2).map((benefit, index) => (
              <li
                key={index}
                className="flex items-center gap-2 text-sm text-gray-500"
              >
                <Check size={14} className="text-green-500 flex-shrink-0" />
                {benefit}
              </li>
            ))}
            {benefits.length > 2 && (
              <li className="text-sm text-primary-600 font-medium">
                +{benefits.length - 2} more benefits
              </li>
            )}
          </ul>
        )}
      </div>

      {/* Selection Indicator */}
      <div
        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
          selected
            ? "bg-primary-600 border-primary-600"
            : "border-gray-300 group-hover:border-primary-400"
        }`}
      >
        {selected && <Check size={14} className="text-white" />}
      </div>
    </div>
  </button>
);
