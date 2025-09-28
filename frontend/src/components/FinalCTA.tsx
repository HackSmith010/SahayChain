import React from 'react';
import { ArrowRight } from 'lucide-react';

const FinalCTA = () => {
  return (
    <section className="py-20 bg-navy-600 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-teal-500 rounded-full mix-blend-multiply filter blur-xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-coral-500 rounded-full mix-blend-multiply filter blur-xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Headlines */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
          Ready to Be Part of the Change?
        </h2>
        
        <p className="text-xl text-gray-200 mb-12 max-w-3xl mx-auto">
          Join SahayChain today and experience philanthropy redefined.
        </p>

        {/* CTA Buttons */}
        <div className="grid sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {/* Donor CTA */}
          <div className="group">
            <button className="w-full px-8 py-6 bg-teal-500 text-white font-semibold rounded-2xl hover:bg-teal-400 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl">
              <div className="flex items-center justify-center space-x-2">
                <span>Start Donating</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
              <div className="text-sm text-teal-100 mt-2">Make an impact today</div>
            </button>
          </div>

          {/* Institution CTA */}
          <div className="group">
            <button className="w-full px-8 py-6 bg-coral-500 text-white font-semibold rounded-2xl hover:bg-coral-400 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl">
              <div className="flex items-center justify-center space-x-2">
                <span>List Your Institution</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
              <div className="text-sm text-coral-100 mt-2">Get funding for your cause</div>
            </button>
          </div>

          {/* Vendor CTA */}
          <div className="group">
            <button className="w-full px-8 py-6 bg-transparent border-2 border-white text-white font-semibold rounded-2xl hover:bg-white hover:text-navy-600 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl">
              <div className="flex items-center justify-center space-x-2">
                <span>Register as a Vendor</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
              <div className="text-sm opacity-80 mt-2">Expand your business</div>
            </button>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 text-gray-300">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span>Blockchain Secured</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span>Escrow Protected</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span>Fully Transparent</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;