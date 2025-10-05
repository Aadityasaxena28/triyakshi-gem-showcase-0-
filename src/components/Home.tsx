import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import NewCategories from "@/components/NewCategories";
import ProductSlider from "@/components/ProductSlider";
import Testimonials from "@/components/Testimonials";
import TopSlider from "@/components/TopSlider";
import Categories from "./Categories";
const Home = () => {
  return (
    <>
    <TopSlider />
      <Marquee />
      <Hero />
      <Categories />
      <ProductSlider />
      <NewCategories />
      
      <Testimonials />
    </>
  )
}

export default Home
