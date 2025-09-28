import React from 'react';
import { FileText, Heart, Package } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: FileText,
      number: "1",
      title: "Request",
      subtitle: "Institution Raises a Request",
      description: "A verified institution posts a specific need (e.g., '100 School Kits') with a defined budget.",
      color: "navy"
    },
    {
      icon: Heart,
      number: "2", 
      title: "Donate",
      subtitle: "Donor Contributes Securely",
      description: "Donors fund the specific request. Funds are securely held in escrow until the need is fulfilled.",
      color: "teal"
    },
    {
      icon: Package,
      number: "3",
      title: "Fulfill", 
      subtitle: "Vendor Fulfills & Delivers",
      description: "The platform matches the request to a trusted vendor who provides the items directly to the institution.",
      color: "coral"
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-600 mb-4">
            How SahayChain Ensures 100% Transparency
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our three-step process creates complete visibility from donation to delivery
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const colorClasses = {
              navy: "bg-navy-600 text-white",
              teal: "bg-teal-500 text-white", 
              coral: "bg-coral-500 text-white"
            };

            return (
              <div key={index} className="relative group">
                {/* Connecting Line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-16 left-full w-full h-0.5 bg-gray-200 z-0 transform -translate-x-6">
                    <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
                      <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                    </div>
                  </div>
                )}

                <div className="text-center relative z-10">
                  {/* Step Number */}
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 text-gray-600 font-bold text-lg mb-4 group-hover:scale-110 transition-transform duration-300">
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl ${colorClasses[step.color]} mb-6 group-hover:scale-105 transition-all duration-300 shadow-lg group-hover:shadow-xl`}>
                    <Icon className="h-10 w-10" />
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold text-navy-600 mb-2">{step.title}</h3>
                  <h4 className="text-lg font-semibold text-gray-700 mb-4">{step.subtitle}</h4>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Trust Badge */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center px-6 py-3 bg-gray-50 rounded-full">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-3 animate-pulse"></div>
            <span className="text-gray-700 font-medium">100% Transparent • Blockchain Verified • Escrow Protected</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;