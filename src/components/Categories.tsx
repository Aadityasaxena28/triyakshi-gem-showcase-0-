import gemstonesImg from "@/assets/gemstones-category.jpg";
import healthCalculatorImg from "@/assets/health-calculator-category.jpg";
import luckyStoreImg from "@/assets/lucky-store-category.jpg";
import rudrakshImg from "@/assets/rudraksha-category.jpg";
import { Button } from "@/components/ui/button";
import { Calculator, Gem, Heart, ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface CAT {
  title: string;
  description: string;
  image?: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  color: string;
  link: string;
};
const Categories = () => {
  const categories :CAT[]=[
    {
      title: "Gemstones",
      description: "Healing crystals and precious stones for spiritual growth",
      image: gemstonesImg,
      icon: Gem,
      color: "from-blue-500 to-purple-600",
      link: "/gemstones"
    },
    {
      title: "Rudraksh",
      description: "Sacred beads for meditation and spiritual protection",
      image: rudrakshImg,
      icon: Heart,
      color: "from-orange-500 to-red-500",
      link: "/rudraksha"
    },
    {
      title: "Lucky Store",
      description: "Feng shui items and lucky charms for prosperity",
      image: luckyStoreImg,
      icon: ShoppingBag,
      color: "from-green-500 to-emerald-600",
      link:"/lucky-store"
    },
    {
      title: "Health Calculator",
      description: "Personalized recommendations based on your birth chart",
      image: healthCalculatorImg,
      icon: Calculator,
      color: "from-primary to-primary-light",
      link: "/health-calculator"
    }
  ];
  const Navigate = useNavigate();
  const HandleNavigation = (link: string) => {
    return () => {
      Navigate(link)
    };
    
  }
  return (
    <section className="py-20 bg-gradient-to-br from-secondary/30 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-4">
            Explore Our Collections
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover the perfect gemstone or spiritual item tailored to your needs and aspirations
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <div
                key={category.title}
                className="group card-elegant p-6 text-center hover:shadow-elegant transition-all duration-500"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Image or Icon */}
                <div className="relative mb-6 overflow-hidden rounded-2xl">
                  {category.image ? (
                    <div className="aspect-square bg-gray-100 rounded-2xl overflow-hidden">
                      <img
                        src={category.image}
                        alt={category.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  ) : (
                    <div className={`aspect-square bg-gradient-to-br ${category.color} rounded-2xl flex items-center justify-center`}>
                      <Icon className="h-16 w-16 text-white" />
                    </div>
                  )}
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl flex items-end justify-center pb-4">
                    <Button size="sm" className="btn-hero opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0"
                    onClick={HandleNavigation(category.link)}>
                      Explore
                    </Button>
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                    {category.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {category.description}
                  </p>
                </div>

                {/* Hover Effect Line */}
                <div className="mt-4 w-0 group-hover:w-full h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent transition-all duration-500 mx-auto" />
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <p className="text-muted-foreground mb-6">
            Can't decide? Let our experts guide you to the perfect choice
          </p>
          <Button size="lg" className="btn-primary">
            Get Personal Consultation
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Categories;