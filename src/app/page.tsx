import Image from "next/image";

import Hero from "../../components/Hero";
import Layout from "../../components/Layout";
import { NavBar } from "../../components/NavBar";
import Features from "../../components/Features";
import CardPremiumFloor from "../../components/CardPremiumFloor";
import PremiumFloorSlider from "../../components/PremiumFloorSlider";
import TopMerchants from "../../components/TopMerchants";
import TopCategories from "../../components/TopCategories";
import FeaturedProducts from "../../components/FeaturedProducts";
import Footer from "../../components/Footer";


export default function Home() {
  return (
    <Layout>
      <NavBar/>
      <Hero/>
      <Features/>
      <PremiumFloorSlider/>
      <TopMerchants/>
      <TopCategories/>
      <FeaturedProducts/>
      <Footer />
    </Layout>
  );
}
