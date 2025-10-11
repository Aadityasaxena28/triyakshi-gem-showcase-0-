import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import NewCategories from "@/components/NewCategories";
import ProductSlider from "@/components/ProductSlider";
import Testimonials from "@/components/Testimonials";
import TopSlider from "@/components/TopSlider";
import { useEffect, useState } from "react";
import Categories from "./Categories";
import Loader from "./General/Loader";
const Home = () => {
  const [isLoading,setLoading] = useState(true)

  useEffect(()=>{
if (typeof window === "undefined") return;

    const onLoad = () => {
      console.log("All resources finished loading!");
      setLoading(false)
    };

    // add listener
    window.addEventListener("load", onLoad, { once: false });

    // cleanup on unmount
    return () => {
      window.removeEventListener("load", onLoad);
    };
  },[])
  return (
    <>
    {isLoading ?(<div style={{ height: "100vh" }}>
      <Loader/>
      </div>):(<>
    <TopSlider />
      <Marquee />
      <Hero />
      <Categories />
      <ProductSlider />
      <NewCategories />
      
      <Testimonials />
      </>)}
    </>
  )
}

export default Home
