import { useState } from "react";
import { ChevronLeft, ChevronRight, Briefcase, GraduationCap, Heart, Shield, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const NewCategories = () => {
  const [activeCategory, setActiveCategory] = useState(0);
  const [currentSlides, setCurrentSlides] = useState({
    career: 0,
    education: 0,
    loveLife: 0,
    health: 0
  });
  const [priceFilters, setPriceFilters] = useState({
    career: "all",
    education: "all",
    loveLife: "all",
    health: "all"
  });
  

  const categories = [
    {
      id: "career",
      name: "Career",
      icon: Briefcase,
      color: "from-primary to-primary-light",
      products: [
        { name: "Citrine Success Stone", price: 850, image: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=300&h=300&fit=crop" },
        { name: "Tiger Eye Confidence", price: 650, image: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=300&h=300&fit=crop" },
        { name: "Pyrite Abundance", price: 750, image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=300&h=300&fit=crop" },
        { name: "Green Aventurine Luck", price: 550, image: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=300&h=300&fit=crop" }
      ]
    },
    {
      id: "education",
      name: "Education",
      icon: GraduationCap,
      color: "from-gold to-gold-light",
      products: [
        { name: "Fluorite Focus Stone", price: 600, image: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=300&h=300&fit=crop" },
        { name: "Clear Quartz Clarity", price: 500, image: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=300&h=300&fit=crop" },
        { name: "Amethyst Wisdom", price: 700, image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=300&h=300&fit=crop" },
        { name: "Sodalite Intelligence", price: 450, image: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=300&h=300&fit=crop" }
      ]
    },
    {
      id: "loveLife",
      name: "Love Life",
      icon: Heart,
      color: "from-primary-light to-gold",
      products: [
        { name: "Rose Quartz Love", price: 550, image: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=300&h=300&fit=crop" },
        { name: "Moonstone Romance", price: 800, image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=300&h=300&fit=crop" },
        { name: "Garnet Passion", price: 900, image: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=300&h=300&fit=crop" },
        { name: "Rhodonite Healing", price: 650, image: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=300&h=300&fit=crop" }
      ]
    },
    {
      id: "health",
      name: "Health",
      icon: Shield,
      color: "from-gold-dark to-primary",
      products: [
        { name: "Bloodstone Vitality", price: 700, image: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=300&h=300&fit=crop" },
        { name: "Carnelian Energy", price: 600, image: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=300&h=300&fit=crop" },
        { name: "Jade Wellness", price: 850, image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=300&h=300&fit=crop" },
        { name: "Hematite Grounding", price: 500, image: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=300&h=300&fit=crop" }
      ]
    }
  ];

  const handleSlideChange = (categoryId: string, direction: 'next' | 'prev') => {
    const category = categories.find(cat => cat.id === categoryId);
    if (!category) return;

    setCurrentSlides(prev => ({
      ...prev,
      [categoryId]: direction === 'next' 
        ? (prev[categoryId as keyof typeof prev] + 1) % Math.max(1, category.products.length - 2)
        : (prev[categoryId as keyof typeof prev] - 1 + Math.max(1, category.products.length - 2)) % Math.max(1, category.products.length - 2)
    }));
  };

  const handlePriceFilter = (categoryId: string, filter: string) => {
    setPriceFilters(prev => ({
      ...prev,
      [categoryId]: filter
    }));
  };

  const getFilteredProducts = (categoryId: string, products: any[]) => {
    const filter = priceFilters[categoryId as keyof typeof priceFilters];
    if (filter === "all") return products;
    
    switch (filter) {
      case "under-500":
        return products.filter(p => p.price < 500);
      case "500-700":
        return products.filter(p => p.price >= 500 && p.price <= 700);
      case "above-700":
        return products.filter(p => p.price > 700);
      default:
        return products;
    }
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-4">
            Shop by Life Area
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Find the perfect gemstone for your specific needs and aspirations
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(index)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all duration-300 ${
                  activeCategory === index
                    ? `bg-gradient-to-r ${category.color} text-white shadow-elegant`
                    : 'bg-white border border-border hover:shadow-card'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span className="font-medium">{category.name}</span>
              </button>
            );
          })}
        </div>

        {/* Active Category Products */}
        {categories.map((category, categoryIndex) => (
          <div
            key={category.id}
            className={`transition-all duration-500 ${
              activeCategory === categoryIndex ? 'block' : 'hidden'
            }`}
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 space-y-4 sm:space-y-0">
              <h3 className="text-2xl font-bold text-foreground">
                {category.name} Gemstones
              </h3>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <Select 
                    value={priceFilters[category.id as keyof typeof priceFilters]} 
                    onValueChange={(value) => handlePriceFilter(category.id, value)}
                  >
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Filter by price" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Prices</SelectItem>
                      <SelectItem value="under-500">Under ₹500</SelectItem>
                      <SelectItem value="500-700">₹500 - ₹700</SelectItem>
                      <SelectItem value="above-700">Above ₹700</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleSlideChange(category.id, 'prev')}
                    className="rounded-full"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleSlideChange(category.id, 'next')}
                    className="rounded-full"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="relative overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ 
                  transform: `translateX(-${currentSlides[category.id as keyof typeof currentSlides] * (100 / 3)}%)` 
                }}
              >
                {getFilteredProducts(category.id, category.products).map((product, productIndex) => (
                  <div
                    key={productIndex}
                    className="flex-none w-full md:w-1/2 lg:w-1/3 px-4"
                  >
                    <div className="card-elegant group cursor-pointer">
                      <div className="aspect-square overflow-hidden rounded-t-2xl">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-6">
                        <h4 className="text-lg font-semibold text-foreground mb-2">
                          {product.name}
                        </h4>
                        <div className="text-xl font-bold text-primary">
                          ₹{product.price}
                        </div>
                        <Button className="w-full mt-4 btn-primary">
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NewCategories;