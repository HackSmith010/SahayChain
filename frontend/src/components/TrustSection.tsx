import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const TrustSection = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const metrics = [
    { value: "$2M+", label: "Donations Processed" },
    { value: "500+", label: "Institutions Helped" }, 
    { value: "95%", label: "Less Operational Overhead" },
    { value: "10,000+", label: "Lives Impacted" }
  ];

  const testimonials = [
    {
      quote: "For the first time, I received a photo of the books my donation bought. It feels amazing to see the direct result.",
      author: "Priya S.",
      role: "Donor",
      type: "donor"
    },
    {
      quote: "SahayChain cut our procurement time in half and brought incredible transparency to our donors.",
      author: "Green Future NGO",
      role: "Institution",
      type: "institution"
    },
    {
      quote: "We've expanded our social impact business significantly through SahayChain's trusted vendor network.",
      author: "EcoSupply Co.",
      role: "Vendor Partner",
      type: "vendor"
    }
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-600 mb-4">
            Building a Community of Trust
          </h2>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {metrics.map((metric, index) => (
            <div key={index} className="text-center group">
              <div className="bg-gray-50 rounded-2xl p-6 group-hover:bg-gray-100 transition-colors duration-300">
                <div className="text-3xl sm:text-4xl font-bold text-navy-600 mb-2">
                  {metric.value}
                </div>
                <div className="text-gray-600 font-medium">
                  {metric.label}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Testimonial Carousel */}
        <div className="max-w-4xl mx-auto">
          <div className="relative bg-gray-50 rounded-3xl p-8 lg:p-12">
            {/* Quote Icon */}
            <div className="absolute top-6 left-6">
              <Quote className="h-8 w-8 text-teal-500" />
            </div>

            {/* Testimonial Content */}
            <div className="text-center">
              <blockquote className="text-xl lg:text-2xl text-gray-700 leading-relaxed mb-8 italic">
                "{testimonials[currentTestimonial].quote}"
              </blockquote>
              
              <div className="flex items-center justify-center space-x-4">
                <div>
                  <div className="font-semibold text-navy-600">
                    {testimonials[currentTestimonial].author}
                  </div>
                  <div className="text-gray-500">
                    {testimonials[currentTestimonial].role}
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={prevTestimonial}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center hover:scale-110"
            >
              <ChevronLeft className="h-5 w-5 text-gray-600" />
            </button>
            
            <button
              onClick={nextTestimonial}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center hover:scale-110"
            >
              <ChevronRight className="h-5 w-5 text-gray-600" />
            </button>

            {/* Dots Indicator */}
            <div className="flex justify-center space-x-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                    index === currentTestimonial ? 'bg-teal-500' : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;