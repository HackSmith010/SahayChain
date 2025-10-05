import { Send, CheckCircle, Users } from "lucide-react";
import { useState } from "react";

export default function GetInvolvedSection() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      setEmail("");

      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }, 1000);
  };

  return (
    <section
      id="get-involved"
      className="py-24 bg-gradient-to-br from-primary-600 via-primary-700 to-accent-600 relative overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-128 h-128 bg-white/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 bg-white/20 text-white rounded-full px-6 py-2 backdrop-blur-sm">
              <Users size={20} />
              <span className="font-semibold">Join Our Movement</span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Be the Change
              <span className="block text-accent-300 mt-2">
                You Wish to See
              </span>
            </h2>

            <p className="text-xl text-white/90 leading-relaxed">
              We're building the future of charitable giving, and we need
              passionate founders—donors, NGOs, and suppliers—who believe in a
              transparent, accountable world.
            </p>

            {/* Benefits List */}
            <div className="space-y-4">
              {[
                "Early access to our revolutionary platform",
                "Direct influence on product development",
                "Exclusive founding member benefits",
                "First look at impact reports and success stories",
              ].map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 text-white/90"
                >
                  <div className="flex-shrink-0 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <CheckCircle size={20} className="text-white" />
                  </div>
                  <span className="text-lg">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Waitlist Form */}
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-8 shadow-2xl">
            {!isSubmitted ? (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-white text-center">
                  Join the Waitlist
                </h3>
                <p className="text-white/80 text-center">
                  Be among the first to experience transparent giving
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-4">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      required
                      className="w-full px-6 py-4 rounded-xl bg-white/5 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 text-lg backdrop-blur-sm"
                    />
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-gradient-to-r from-accent-500 to-primary-500 text-white px-8 py-4 rounded-xl hover:shadow-2xl transition-all font-bold text-lg shadow-lg transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isLoading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Securing Your Spot...
                        </>
                      ) : (
                        <>
                          Join as Founding Member
                          <Send size={20} />
                        </>
                      )}
                    </button>
                  </div>
                </form>

                <div className="text-center text-white/60 text-sm">
                  Join 1,000+ visionaries already waiting
                </div>
              </div>
            ) : (
              <div className="text-center space-y-6">
                <div className="bg-green-500/20 border border-green-500/30 rounded-2xl p-8 backdrop-blur-sm">
                  <div className="bg-white rounded-full p-4 inline-flex mb-4">
                    <CheckCircle className="text-green-600" size={48} />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Welcome to the Movement!
                  </h3>
                  <p className="text-white/90">
                    Thank you for joining our mission. We'll be in touch soon
                    with exclusive updates and early access opportunities.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div id="waitlist" className="absolute -bottom-1"></div>
    </section>
  );
}
