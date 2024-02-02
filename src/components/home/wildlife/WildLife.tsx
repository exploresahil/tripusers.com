import { getTrendingWildLife } from "@/src/sanity/sanity-utils";
import "@/src/components/home/domestic/style.scss";
import { HiLocationMarker } from "react-icons/hi";
import SwiperContainer from "@/src/components/home/domestic/Swiper";
import Link from "next/link";

const WildLife = async () => {
  const wildLifeData = await getTrendingWildLife();
  //console.log("domesticData->", domesticData);

  return (
    <section id="trendingDomestic">
      <div className="title-container">
        <HiLocationMarker size={40} />
        <h2>Best of India</h2>
        <p>Discover the wonder of India</p>
        <Link href="/wild-life">View All</Link>
      </div>
      <SwiperContainer data={wildLifeData} />
    </section>
  );
};

export default WildLife;
