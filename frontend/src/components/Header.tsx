import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-navy-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">SC</span>
            </div>
            <span className="text-xl font-bold text-navy-600">SahayChain</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#how-it-works" className="text-gray-700 hover:text-navy-600 font-medium transition-colors">
              How It Works
            </a>
            <a href="#features" className="text-gray-700 hover:text-navy-600 font-medium transition-colors">
              Features
            </a>
            <a href="#about" className="text-gray-700 hover:text-navy-600 font-medium transition-colors">
              About
            </a>
            <a href="#contact" className="text-gray-700 hover:text-navy-600 font-medium transition-colors">
              Contact
            </a>
          </nav>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <button className="px-4 py-2 text-navy-600 font-medium hover:bg-gray-50 rounded-lg transition-colors">
              Sign In
            </button>
            <button className="px-4 py-2 bg-teal-500 text-white font-medium rounded-lg hover:bg-teal-600 transition-colors">
              Get Started
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <div className="flex flex-col space-y-4">
              <a href="#how-it-works" className="text-gray-700 hover:text-navy-600 font-medium">
                How It Works
              </a>
              <a href="#features" className="text-gray-700 hover:text-navy-600 font-medium">
                Features
              </a>
              <a href="#about" className="text-gray-700 hover:text-navy-600 font-medium">
                About
              </a>
              <a href="#contact" className="text-gray-700 hover:text-navy-600 font-medium">
                Contact
              </a>
              <div className="pt-4 border-t border-gray-100">
                <div className="flex flex-col space-y-2">
                  <button className="px-4 py-2 text-navy-600 font-medium hover:bg-gray-50 rounded-lg transition-colors text-left">
                    Sign In
                  </button>
                  <button className="px-4 py-2 bg-teal-500 text-white font-medium rounded-lg hover:bg-teal-600 transition-colors">
                    Get Started
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;