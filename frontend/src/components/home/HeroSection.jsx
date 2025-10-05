import { ArrowRight, ShieldCheck } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary-900 via-primary-800 to-accent-700 text-white">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <div className="space-y-8 animate-fade-in">
          {/* Trust Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-3 mb-8">
            <ShieldCheck size={20} className="text-white" />
            <span className="text-white/90 text-sm font-medium">
              Verifiable Transparency
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">
            Where Every
            <span className="block bg-gradient-to-r from-accent-400 to-primary-400 bg-clip-text text-transparent mt-2">
              Donation Tells a Story
            </span>
          </h1>

          <p className="max-w-3xl mx-auto text-xl sm:text-2xl text-white/90 leading-relaxed font-light">
            See your impact unfold in real-time. From the moment you give to the
            moment lives change—
            <span className="font-semibold text-white">
              {" "}
              every step is transparent, verified, and meaningful.
            </span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <a
              href="#get-involved"
              className="group bg-white text-primary-600 px-8 py-4 rounded-xl hover:shadow-2xl transition-all duration-300 font-bold text-lg shadow-lg transform hover:-translate-y-1 flex items-center gap-2"
            >
              Join the Waitlist
              <ArrowRight
                className="group-hover:translate-x-1 transition-transform"
                size={20}
              />
            </a>
            <a
              href="#mission"
              className="group border-2 border-white/30 text-white px-8 py-4 rounded-xl hover:bg-white/10 transition-all duration-300 font-medium text-lg flex items-center gap-2 backdrop-blur-sm"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
