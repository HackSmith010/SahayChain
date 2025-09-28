import React from 'react';
import { Search, Network, TrendingUp, Shield } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: Search,
      title: "Track Your Funds",
      subtitle: "For Donors",
      description: "See exactly how your money is spent, from donation to delivery.",
      color: "teal"
    },
    {
      icon: Network,
      title: "Access Trusted Vendors", 
      subtitle: "For Institutions",
      description: "Get quality goods at fair prices from a vetted network of suppliers.",
      color: "navy"
    },
    {
      icon: TrendingUp,
      title: "Grow Your Business",
      subtitle: "For Vendors", 
      description: "Reach new customers and get involved in meaningful social impact projects.",
      color: "coral"
    },
    {
      icon: Shield,
      title: "Reduced Fraud",
      subtitle: "For Everyone",
      description: "Our escrow and verification system ensures funds are used only for their intended purpose.",
      color: "green"
    }
  ];

  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-600 mb-4">
            Why Choose SahayChain?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Built for transparency, designed for impact, trusted by thousands
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const colorClasses = {
              teal: "bg-teal-500 group-hover:bg-teal-600",
              navy: "bg-navy-600 group-hover:bg-navy-700", 
              coral: "bg-coral-500 group-hover:bg-coral-600",
              green: "bg-green-500 group-hover:bg-green-600"
            };

            return (
              <div key={index} className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl ${colorClasses[feature.color]} mb-4 transition-colors duration-300`}>
                  <Icon className="h-7 w-7 text-white" />
                </div>

                {/* Content */}
                <div className="mb-3">
                  <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">{feature.subtitle}</span>
                </div>
                <h3 className="text-xl font-bold text-navy-600 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <button className="px-8 py-4 bg-navy-600 text-white font-semibold rounded-xl hover:bg-navy-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
            Explore All Features
          </button>
        </div>
      </div>
    </section>
  );
};

export default Features;