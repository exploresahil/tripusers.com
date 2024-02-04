import { getTrending, getTrendingWildLife } from "@/src/sanity/sanity-utils";
import "@/src/components/home/domestic/style.scss";
import { HiLocationMarker } from "react-icons/hi";
import SwiperContainer from "@/src/components/home/wildlife/Swiper";
import Link from "next/link";

const WildLife = async () => {
  const wildLifeData = await getTrendingWildLife();
  const trendingData = await getTrending();

  //console.log("domesticData->", wildLifeData[0].wildlifePackage);

  return (
    <section id="trendingDomestic">
      <div className="title-container">
        <HiLocationMarker size={40} />
        <h2>{trendingData.wildlifeName}</h2>
        <p>{trendingData.wildlifeSubtitle}</p>
        <Link href="/wild-life">View All</Link>
      </div>
      <SwiperContainer data={wildLifeData} />
    </section>
  );
};

export default WildLife;
