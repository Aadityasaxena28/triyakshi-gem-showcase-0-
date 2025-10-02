import Categories from "@/components/Categories";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import NewCategories from "@/components/NewCategories";
import ProductSlider from "@/components/ProductSlider";
import Testimonials from "@/components/Testimonials";
import TopSlider from "@/components/TopSlider";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <TopSlider />
      <Marquee />
      <Hero />
      <Categories />
      <NewCategories />
      <ProductSlider />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default Index;
