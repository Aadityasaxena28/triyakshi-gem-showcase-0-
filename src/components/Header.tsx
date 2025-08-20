import { useState } from "react";
import { Menu, X, Gem } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    "Health Calculator",
    "Gemstone Calculator", 
    "Lucky Store",
    "Rudraksh"
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-border/20 shadow-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-primary p-2 rounded-xl shadow-elegant">
              <Gem className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gradient">
              Triyakshi Gems
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <a
                key={item}
                href="#"
                className="text-foreground hover:text-primary transition-smooth link-animated py-2 font-medium"
              >
                {item}
              </a>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="outline" className="rounded-xl">
              New In
            </Button>
            <Button className="btn-primary">
              On Sale
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-secondary transition-smooth"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-foreground" />
            ) : (
              <Menu className="h-6 w-6 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border/20">
            <nav className="flex flex-col space-y-3">
              {menuItems.map((item) => (
                <a
                  key={item}
                  href="#"
                  className="text-foreground hover:text-primary transition-smooth py-2 px-4 rounded-lg hover:bg-secondary"
                >
                  {item}
                </a>
              ))}
              <div className="flex flex-col space-y-2 pt-4 border-t border-border/20">
                <Button variant="outline" className="rounded-xl">
                  New In
                </Button>
                <Button className="btn-primary">
                  On Sale
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;