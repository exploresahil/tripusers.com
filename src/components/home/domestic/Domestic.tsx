import { getTrending, getTrendingDomestic } from "@/src/sanity/sanity-utils";
import "./style.scss";
import { HiLocationMarker } from "react-icons/hi";
import SwiperContainer from "./Swiper";
import Link from "next/link";

const Domestic = async () => {
  const domesticData = await getTrendingDomestic();
  const trendingData = await getTrending();
  //console.log("trendingData->", trendingData);

  //console.log("domesticData->", domesticData);

  return (
    <section id="trendingDomestic">
      <div className="title-container">
        <HiLocationMarker size={40} />
        <h2>{trendingData.domesticName}</h2>
        <p>{trendingData.domesticSubtitle}</p>
        <Link href="/domestic">View All</Link>
      </div>
      <SwiperContainer data={domesticData} />
    </section>
  );
};

export default Domestic;
