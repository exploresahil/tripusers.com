import Loader from "@/src/components/default/loader/Loader";
import HeroSection from "@/src/components/home/hero/HeroSection";
import Trending from "@/src/components/home/trending/Trending";

export default function Home() {
  return (
    <>
      <Loader />
      <HeroSection />
      <Trending />
    </>
  );
}
