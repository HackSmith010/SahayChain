import { Heart, ArrowRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Brand Column */}
          <div className="space-y-6 md:col-span-1">
            <h3 className="text-2xl font-bold text-white">SahayChain</h3>
            <p className="text-gray-400 leading-relaxed text-lg">
              Building the future of transparent, trustworthy charitable giving.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-6">
              Quick Links
            </h4>
            <ul className="space-y-4">
              {["Our Mission", "The Technology", "Get Involved"].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase().replace(/ /g, "-")}`}
                    className="text-gray-400 hover:text-blue-400 transition-colors text-lg flex items-center gap-2 group"
                  >
                    <ArrowRight
                      size={16}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support & Legal */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-6">
              Support & Legal
            </h4>
            <ul className="space-y-4">
              {["Contact Us", "Privacy Policy", "Terms of Service"].map(
                (link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-blue-400 transition-colors text-lg"
                    >
                      {link}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row justify-between items-center gap-6">
          <p className="text-gray-400 text-lg">
            © 2025 SahayChain. All rights reserved.
          </p>
          <div className="flex items-center gap-3 text-gray-400 text-lg">
            <span>Built with</span>
            <Heart
              size={20}
              className="text-red-500 fill-current animate-pulse"
            />
            <span>for a better tomorrow.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
