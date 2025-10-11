import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Auth from "./components/Auth";
import BraceletPage from "./components/BraceletPage";
import CheckoutPage from "./components/checkout_page";
import GemstoneCalculator from "./components/GemstoneCalculator";
import GemstonesPage from "./components/gemstones-category-page";
import Home from "./components/Home";
import LuckyStoneCalculator from "./components/LuckyStoneCalculator";
import Mala_listing from "./components/Mala_listing";
import ProductDetailView from "./components/Product-view";
import ProfilePage from "./components/Profile/profile_page";
import { RequireAuth } from "./components/RequireAuth";
import RudrakshPage from "./components/rudraksha-category";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();
const base = import.meta.env.VITE_basename ;
const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter basename={base}>
      
        <Routes>
        <Route path="/login" element={<Auth  state="login"/>} />
        <Route path="/signup" element={<Auth  state="signup"/>} />
          {/* <Route path="" element={<Index />} /> */}
          <Route path="/" element={<Index />} >
          <Route path="" element={<Home />} />
          {/* <Route index element={<Index />} > */}
          <Route path="home" element={<Home />} />
          <Route path="gemstone-calculator" element={<GemstoneCalculator />} />
          <Route path="lucky-store" element={<LuckyStoneCalculator />} />
          <Route path="bracelets" element= {<BraceletPage/>}/>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="gemstones" element={<GemstonesPage/>}/>
          <Route path="gem-view/:id" element={<ProductDetailView category= "gemstone"/>}/>
          <Route path="rudraksha" element= {<RudrakshPage/>}/>
          <Route path="rudra-view/:id" element={<ProductDetailView category= "rudraksha"/>}/>
          <Route path="mala" element={<Mala_listing/>} />
          <Route element={<RequireAuth/>}>
          {/* For Cart Purchase Functionality */}
          <Route path="checkout" element= {<CheckoutPage/>}/>
          {/*For Buy now functionality*/}
          <Route path="checkout/:id" element= {<CheckoutPage/>}/>
          <Route path="/profile" element={<ProfilePage/>}/>
          </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
