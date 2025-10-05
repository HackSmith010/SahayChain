import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-lg shadow-md py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <a
            href="#"
            className={`text-2xl font-bold transition-colors ${
              scrolled ? "text-primary-600" : "text-white"
            }`}
          >
            SahayChain
          </a>
          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#mission"
              className={`font-medium hover:text-primary-600 transition-colors ${
                scrolled ? "text-gray-700" : "text-white/90 hover:text-white"
              }`}
            >
              Our Mission
            </a>
            <a
              href="#technology"
              className={`font-medium hover:text-primary-600 transition-colors ${
                scrolled ? "text-gray-700" : "text-white/90 hover:text-white"
              }`}
            >
              The Technology
            </a>
            <a
              href="#get-involved"
              className={`font-medium hover:text-primary-600 transition-colors ${
                scrolled ? "text-gray-700" : "text-white/90 hover:text-white"
              }`}
            >
              Get Involved
            </a>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/login"
              className={`font-medium transition-colors ${
                scrolled
                  ? "text-gray-700 hover:text-primary-600"
                  : "text-white/90 hover:text-white"
              }`}
            >
              Login
            </Link>
            <a
              href="#get-involved"
              className="bg-gradient-to-r from-primary-600 to-accent-600 text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl hover:scale-105 transition-all"
            >
              Join the Waitlist
            </a>
          </div>
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`transition-colors ${
                scrolled ? "text-gray-700" : "text-white"
              }`}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-lg border-t border-gray-100">
          <div className="px-4 pt-2 pb-4 space-y-3">
            <a
              href="#mission"
              onClick={() => setIsMenuOpen(false)}
              className="block text-gray-700 hover:text-primary-600 font-medium py-2"
            >
              Our Mission
            </a>
            <a
              href="#technology"
              onClick={() => setIsMenuOpen(false)}
              className="block text-gray-700 hover:text-primary-600 font-medium py-2"
            >
              The Technology
            </a>
            <a
              href="#get-involved"
              onClick={() => setIsMenuOpen(false)}
              className="block text-gray-700 hover:text-primary-600 font-medium py-2"
            >
              Get Involved
            </a>
            <Link
              to="/login"
              className="block text-gray-700 hover:text-primary-600 font-medium py-2"
            >
              Login
            </Link>
            <a
              href="#get-involved"
              onClick={() => setIsMenuOpen(false)}
              className="block bg-gradient-to-r from-primary-600 to-accent-600 text-white px-6 py-3 rounded-lg font-medium text-center"
            >
              Join the Waitlist
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
