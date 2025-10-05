import { AlertCircle, Target } from "lucide-react";

export default function OurMissionSection() {
  return (
    <section id="mission" className="py-24 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #000 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-primary-50 text-primary-700 rounded-full px-6 py-2 mb-6">
            <Target size={20} />
            <span className="font-semibold">Our Purpose</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Rebuilding Trust in Charity
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We're turning skepticism into certainty by creating a world where every act of generosity 
            creates verifiable, meaningful change.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Problem Side */}
          <div className="space-y-8">
            <div className="flex items-start gap-6 group">
              <div className="flex-shrink-0 p-4 bg-red-100 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                <AlertCircle className="text-red-600" size={32} />
              </div>
              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  The Trust Gap is Real
                </h3>
                <div className="space-y-4">
                  <p className="text-lg text-gray-700 leading-relaxed">
                    <span className="font-bold text-red-600">80% of donors hesitate</span> because they can't see where their money goes. 
                    This uncertainty prevents billions from reaching those who need it most.
                  </p>
                  <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-2xl">
                    <p className="text-gray-700 italic font-medium">
                      "When trust is broken, generosity suffers. We're here to fix that."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Solution Side */}
          <div className="space-y-8">
            <div className="flex items-start gap-6 group">
              <div className="flex-shrink-0 p-4 bg-green-100 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                <Target className="text-green-600" size={32} />
              </div>
              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  Our Vision for Change
                </h3>
                <div className="space-y-4">
                  <p className="text-lg text-gray-700 leading-relaxed">
                    We're creating a platform where <span className="font-bold text-green-600">every donation has a digital footprint</span>, 
                    tracing its journey from your heart to their hands.
                  </p>
                  <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-2xl">
                    <p className="text-gray-700 italic font-medium">
                      "Imagine knowing exactly whose life you changed today. That's the future we're building."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Impact Statement */}
        <div className="mt-20 text-center">
          <div className="inline-block bg-gradient-to-r from-primary-50 to-green-50 px-8 py-8 rounded-3xl shadow-lg border border-gray-100">
            <p className="text-2xl font-semibold text-gray-900 max-w-4xl leading-relaxed">
              "We're not just tracking donations we're telling the stories of hope, resilience, 
              and transformation that your generosity makes possible."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}