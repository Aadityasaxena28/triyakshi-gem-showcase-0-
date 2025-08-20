import { useState } from "react";
import { ChevronLeft, ChevronRight, Star, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

const ProductSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const discountedProducts = [
    {
      id: 1,
      name: "Blue Sapphire Ring",
      originalPrice: 2500,
      discountedPrice: 1750,
      discount: 30,
      rating: 4.8,
      reviews: 124,
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop"
    },
    {
      id: 2,
      name: "Amethyst Healing Crystal",
      originalPrice: 800,
      discountedPrice: 560,
      discount: 30,
      rating: 4.9,
      reviews: 89,
      image: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=400&h=400&fit=crop"
    },
    {
      id: 3,
      name: "Rudraksha Mala Beads",
      originalPrice: 1200,
      discountedPrice: 840,
      discount: 30,
      rating: 4.7,
      reviews: 156,
      image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=400&h=400&fit=crop"
    },
    {
      id: 4,
      name: "Rose Quartz Pendant",
      originalPrice: 600,
      discountedPrice: 420,
      discount: 30,
      rating: 4.6,
      reviews: 78,
      image: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=400&h=400&fit=crop"
    },
    {
      id: 5,
      name: "Citrine Prosperity Stone",
      originalPrice: 450,
      discountedPrice: 315,
      discount: 30,
      rating: 4.8,
      reviews: 92,
      image: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=400&h=400&fit=crop"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.max(1, discountedProducts.length - 2));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + Math.max(1, discountedProducts.length - 2)) % Math.max(1, discountedProducts.length - 2));
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-4xl font-bold text-gradient mb-2">
              Special Discounts
            </h2>
            <p className="text-muted-foreground text-lg">
              Limited time offers on premium gemstones
            </p>
          </div>
          
          {/* Navigation Buttons */}
          <div className="hidden md:flex space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={prevSlide}
              className="rounded-full hover:shadow-elegant transition-all duration-300"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={nextSlide}
              className="rounded-full hover:shadow-elegant transition-all duration-300"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Product Slider */}
        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * (100 / 3)}%)` }}
          >
            {discountedProducts.map((product) => (
              <div
                key={product.id}
                className="flex-none w-full md:w-1/2 lg:w-1/3 px-4"
              >
                <div className="card-elegant group cursor-pointer relative overflow-hidden">
                  {/* Discount Badge */}
                  <div className="absolute top-4 left-4 z-10 bg-gradient-gold text-white px-3 py-1 rounded-full text-sm font-semibold shadow-gold">
                    {product.discount}% OFF
                  </div>

                  {/* Product Image */}
                  <div className="aspect-square overflow-hidden rounded-t-2xl">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                      {product.name}
                    </h3>

                    {/* Rating */}
                    <div className="flex items-center space-x-2 mb-3">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(product.rating)
                                ? "text-gold fill-current"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {product.rating} ({product.reviews} reviews)
                      </span>
                    </div>

                    {/* Pricing */}
                    <div className="flex items-center space-x-3 mb-4">
                      <span className="text-2xl font-bold text-primary">
                        ₹{product.discountedPrice}
                      </span>
                      <span className="text-lg text-muted-foreground line-through">
                        ₹{product.originalPrice}
                      </span>
                    </div>

                    {/* Add to Cart Button */}
                    <Button className="w-full btn-primary group-hover:shadow-elegant">
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="flex md:hidden justify-center space-x-2 mt-8">
          <Button
            variant="outline"
            size="icon"
            onClick={prevSlide}
            className="rounded-full"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={nextSlide}
            className="rounded-full"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Button size="lg" variant="outline" className="rounded-xl border-primary text-primary hover:bg-primary hover:text-white">
            View All Discounted Items
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProductSlider;