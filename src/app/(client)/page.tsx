import Loader from "@/src/components/default/loader/Loader";
import Domestic from "@/src/components/home/domestic/Domestic";
import HeroSection from "@/src/components/home/hero/HeroSection";
import International from "@/src/components/home/international/International";
import Trending from "@/src/components/home/trending/Trending";
import WildLife from "@/src/components/home/wildlife/WildLife";

export default function Home() {
  return (
    <>
      {/*  <Loader /> */}
      <HeroSection />
      <Trending />
      <International />
      <Domestic />
      <WildLife />
    </>
  );
}
