import { Star, Quote } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Priya Sharma",
      location: "Mumbai, India", 
      rating: 5,
      review: "The blue sapphire I purchased has brought incredible clarity to my life. The quality is exceptional and the energy is truly transformative.",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
    },
    {
      id: 2,
      name: "Rajesh Kumar",
      location: "Delhi, India",
      rating: 5,
      review: "Amazing collection of rudraksha beads! The spiritual energy and authenticity is unmatched. Highly recommend for anyone on a spiritual journey.",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
    },
    {
      id: 3,
      name: "Anitha Reddy",
      location: "Bangalore, India",
      rating: 5,
      review: "The health calculator feature helped me choose the perfect gemstone. My stress levels have reduced significantly since wearing the recommended stone.",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
    },
    {
      id: 4,
      name: "Manoj Patel",
      location: "Ahmedabad, India",
      rating: 5,
      review: "Excellent customer service and authentic products. The lucky charms I bought have definitely improved my business prospects!",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-secondary/20 to-primary/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-gold/10 px-4 py-2 rounded-full mb-6">
            <Star className="h-5 w-5 text-gold fill-current" />
            <span className="text-gold font-semibold">Customer Reviews</span>
            <Star className="h-5 w-5 text-gold fill-current" />
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-4">
            10,000+ Happy Customers
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join thousands of satisfied customers who have experienced the transformative power of our authentic gemstones
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="card-elegant p-6 hover:shadow-elegant transition-all duration-500"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Quote Icon */}
              <div className="mb-4">
                <Quote className="h-8 w-8 text-gold/60" />
              </div>

              {/* Review Text */}
              <p className="text-muted-foreground leading-relaxed mb-6 italic">
                "{testimonial.review}"
              </p>

              {/* Rating */}
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-gold fill-current" />
                ))}
              </div>

              {/* Customer Info */}
              <div className="flex items-center space-x-3">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-gold/20"
                />
                <div>
                  <h4 className="font-semibold text-foreground">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.location}
                  </p>
                </div>
              </div>

              {/* Decorative Element */}
              <div className="mt-4 w-12 h-1 bg-gradient-gold rounded-full" />
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 text-center">
          <div className="space-y-2">
            <div className="text-3xl font-bold text-primary">10K+</div>
            <div className="text-sm text-muted-foreground">Happy Customers</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold text-primary">25+</div>
            <div className="text-sm text-muted-foreground">Years Experience</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold text-primary">500+</div>
            <div className="text-sm text-muted-foreground">Gemstone Varieties</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold text-primary">99%</div>
            <div className="text-sm text-muted-foreground">Satisfaction Rate</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;