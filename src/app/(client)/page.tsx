import Loader from "@/src/components/default/loader/Loader";
import CustomiseForm from "@/src/components/forms/CustomiseForm";
import HeroSection from "@/src/components/home/hero/HeroSection";
import Trending from "@/src/components/home/trending/Trending";

export default function Home() {
  return (
    <>
      <Loader />
      <HeroSection />
      <Trending />
      <CustomiseForm />
    </>
  );
}
