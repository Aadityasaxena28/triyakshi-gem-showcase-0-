import { Button } from "@/components/ui/button";
import { Gem, Menu, User, X } from "lucide-react";
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCalcOpen, setIsCalcOpen] = useState(false);
  const timerRef = useRef(null);

  // Simple login check (replace with auth context if needed)
  const isLoggedIn = !!localStorage.getItem("tg_user");
  console.log(localStorage.getItem("tg_user"))
  // Menu items except calculator
  const menuItems = [
    { name: "Gemstones", path: "/gemstones" },
    { name: "Rudraksh", path: "/rudraksha" },
    { name: "Bracelets", path: "/bracelets" },
    { name: "Mala", path: "/mala" },
    { name: "Blogs", path: "/blogs" },
    { name: "About Us", path: "/about-us" },
  ];

  const calculatorItems = [
    { name: "Gemstone Calculator", path: "/gemstone-calculator" },
    { name: "Health Calculator", path: "/health-calculator" },
    { name: "Lucky Stone Calculator", path: "/lucky-stone-calculator" },
  ];
  const Navigate = useNavigate()
  const handleUserClick = () => {
    if (!isLoggedIn) {
      Navigate("/login");
    } else {
      Navigate("/profile"); // redirect to profile
    }
  };

  // Handle dropdown delay
  const handleMouseEnter = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setIsCalcOpen(true);
  };

  const handleMouseLeave = () => {
    timerRef.current = setTimeout(() => {
      setIsCalcOpen(false);
    }, 500); // 3 second delay
  };

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-border/20 shadow-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Link to="/" className="flex items-center space-x-2">
              <div className="bg-gradient-primary p-2 rounded-xl shadow-elegant">
                <Gem className="h-4 w-4 text-white" />
              </div>
              <span className="text-xl font-bold text-gradient">
                Triyakshi Gems
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="text-foreground hover:text-primary transition-smooth link-animated py-2 font-medium"
              >
                {item.name}
              </Link>
            ))}

            {/* Calculator Dropdown with delay */}
            <div
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button className="text-foreground hover:text-primary transition-smooth link-animated py-2 font-medium">
                Calculator
              </button>
              {isCalcOpen && (
                <div className="absolute bg-white shadow-lg rounded-xl mt-2 w-48 border border-border/20">
                  {calculatorItems.map((calc) => (
                    <Link
                      key={calc.name}
                      to={calc.path}
                      className="block px-4 py-2 text-sm text-foreground hover:bg-secondary transition-smooth rounded-lg"
                    >
                      {calc.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button className="bg-red-500 text-white rounded-xl hover:bg-red-600">
              NEW
            </Button>
            <Button className="btn-primary">On Sale</Button>

            {/* User Profile Button */}
            <Button
              variant="outline"
              className="rounded-full p-2"
              onClick={handleUserClick}
            >
              <User className="h-5 w-5" />
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-secondary transition-smooth"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-4 w-4 text-foreground" />
            ) : (
              <Menu className="h-4 w-4 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border/20">
            <nav className="flex flex-col space-y-3">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="text-foreground hover:text-primary transition-smooth py-2 px-4 rounded-lg hover:bg-secondary"
                >
                  {item.name}
                </Link>
              ))}

              {/* Calculator Dropdown (Mobile) */}
              <div className="flex flex-col space-y-1 border-t pt-2 border-border/20">
                <span className="px-4 py-2 font-medium text-foreground">
                  Calculator
                </span>
                {calculatorItems.map((calc) => (
                  <Link
                    key={calc.name}
                    to={calc.path}
                    className="text-foreground hover:text-primary transition-smooth py-2 px-6 rounded-lg hover:bg-secondary text-sm"
                  >
                    {calc.name}
                  </Link>
                ))}
              </div>

              <div className="flex flex-col space-y-2 pt-4 border-t border-border/20">
                <Button className="bg-red-500 text-white rounded-xl hover:bg-red-600">
                  NEW
                </Button>
                <Button className="btn-primary">On Sale</Button>
                <Button
                  variant="outline"
                  className="rounded-full p-2 w-fit mx-auto"
                  onClick={handleUserClick}
                >
                  <User className="h-5 w-5" />
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