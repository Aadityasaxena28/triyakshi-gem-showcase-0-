import Header from "@/components/Header";
import TopSlider from "@/components/TopSlider";
import Marquee from "@/components/Marquee";
import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import NewCategories from "@/components/NewCategories";
import ProductSlider from "@/components/ProductSlider";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";

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
