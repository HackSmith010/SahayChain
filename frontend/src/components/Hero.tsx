import React from 'react';
import { ArrowRight, Heart, Building2, Truck } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-br from-gray-50 to-white py-20 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-72 h-72 bg-teal-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-navy-600 rounded-full mix-blend-multiply filter blur-xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-coral-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Main Headlines */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-navy-600 mb-6 leading-tight">
            Ensure Every Donation
            <br />
            <span className="text-teal-500">Reaches Its True Destination</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            SahayChain connects Institutions, Donors, and Vendors on a single, transparent platform 
            to turn generosity into real-world impact.
          </p>

          {/* Flow Visualization */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-6 sm:space-y-0 sm:space-x-8 mb-12">
            {/* Institution */}
            <div className="flex flex-col items-center group">
              <div className="w-16 h-16 bg-navy-600 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                <Building2 className="h-8 w-8 text-white" />
              </div>
              <span className="text-sm font-medium text-gray-700">Institution</span>
            </div>

            <ArrowRight className="h-6 w-6 text-gray-400 rotate-90 sm:rotate-0" />

            {/* Donor */}
            <div className="flex flex-col items-center group">
              <div className="w-16 h-16 bg-teal-500 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <span className="text-sm font-medium text-gray-700">Donor</span>
            </div>

            <ArrowRight className="h-6 w-6 text-gray-400 rotate-90 sm:rotate-0" />

            {/* Vendor */}
            <div className="flex flex-col items-center group">
              <div className="w-16 h-16 bg-coral-500 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                <Truck className="h-8 w-8 text-white" />
              </div>
              <span className="text-sm font-medium text-gray-700">Vendor</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button className="w-full sm:w-auto px-8 py-4 bg-teal-500 text-white font-semibold rounded-xl hover:bg-teal-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
              Become a Donor
            </button>
            <button className="w-full sm:w-auto px-8 py-4 bg-navy-600 text-white font-semibold rounded-xl hover:bg-navy-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
              Join as an Institution
            </button>
          </div>
          
          <div className="mt-4">
            <a href="#vendor" className="text-gray-600 hover:text-coral-500 font-medium transition-colors underline underline-offset-4">
              Are you a Vendor?
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;