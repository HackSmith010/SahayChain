import { useState } from "react";
import { Shield, Link2, Package, ShieldCheck } from "lucide-react";

export default function TheTechnologyOfTrustSection() {
  const [hoveredCard, setHoveredCard] = useState(null);

  const features = [
    {
      id: 1,
      icon: Shield,
      title: "A Verified Trust Network",
      description:
        "AI-powered vetting will ensure every partner—NGOs, suppliers, and beneficiaries—is thoroughly verified before joining our ecosystem.",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      id: 2,
      icon: Link2,
      title: "A Permanent Record of Good",
      description:
        "Every contribution is permanently recorded, creating an unchangeable public story of all transactions and deliveries that cannot be altered.",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      id: 3,
      icon: Package,
      title: "Tangible Impact Tracking",
      description:
        "Fund specific needs like blankets or food—then watch in real-time as your contribution reaches its destination.",
      gradient: "from-green-500 to-emerald-500",
    },
  ];

  return (
    <section
      id="technology"
      className="py-24 bg-gray-900 text-white relative overflow-hidden"
    >
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-72 h-72 bg-cyan-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-500 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            The Architecture of Impact
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            We've engineered trust into every layer of our platform, creating a
            system where transparency isn't just a feature—it's the foundation.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.id}
                onMouseEnter={() => setHoveredCard(feature.id)}
                onMouseLeave={() => setHoveredCard(null)}
                className="relative bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/10 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer group"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                ></div>

                <div className="relative z-10 space-y-6">
                  <div
                    className={`p-4 inline-block rounded-2xl bg-gradient-to-br ${feature.gradient}`}
                  >
                    <Icon className="text-white" size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-white leading-tight">
                    {feature.title}
                  </h3>
                  <p className="text-white/80 leading-relaxed text-lg">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Updated Trust Seal */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-4 bg-white/5 backdrop-blur-sm border border-white/20 rounded-2xl px-8 py-6">
            <ShieldCheck className="text-green-400" size={32} />
            <div className="text-left">
              <div className="text-white font-semibold text-lg">
                A Verifiable Trust Seal
              </div>
              <div className="text-white/70">
                Every transaction is secured and publicly auditable for complete
                peace of mind.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
