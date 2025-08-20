import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const TopSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: "Welcome to Triyakshi Gems",
      subtitle: "Discover Your Perfect Gemstone",
      description: "Premium gemstones for healing, prosperity, and spiritual growth",
      bgColor: "from-primary/90 to-primary-light/90",
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1200&h=400&fit=crop"
    },
    {
      id: 2,
      title: "Authentic Rudraksha Collection",
      subtitle: "Sacred Beads for Meditation",
      description: "Genuine rudraksha beads blessed for spiritual protection and peace",
      bgColor: "from-gold/90 to-gold-light/90",
      image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=1200&h=400&fit=crop"
    },
    {
      id: 3,
      title: "Personalized Consultations",
      subtitle: "Find Your Lucky Stone",
      description: "Expert guidance based on your birth chart and astrological needs",
      bgColor: "from-primary-light/90 to-gold/90",
      image: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=1200&h=400&fit=crop"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Auto-slide functionality
  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-96 overflow-hidden">
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            />
            <div className={`absolute inset-0 bg-gradient-to-r ${slide.bgColor}`} />
            
            <div className="relative z-10 h-full flex items-center justify-center text-center px-4">
              <div className="max-w-4xl">
                <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
                  {slide.title}
                </h2>
                <h3 className="text-xl md:text-2xl text-white/90 mb-6">
                  {slide.subtitle}
                </h3>
                <p className="text-lg text-white/80 max-w-2xl mx-auto">
                  {slide.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <Button
        variant="outline"
        size="icon"
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 border-white/30 hover:bg-white/30 text-white rounded-full"
      >
        <ChevronLeft className="h-5 w-5" />
      </Button>
      
      <Button
        variant="outline"
        size="icon"
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 border-white/30 hover:bg-white/30 text-white rounded-full"
      >
        <ChevronRight className="h-5 w-5" />
      </Button>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default TopSlider;