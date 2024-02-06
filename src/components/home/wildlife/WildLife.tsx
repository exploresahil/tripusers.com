"use client";

import { getTrending, getTrendingWildLife } from "@/src/sanity/sanity-utils";
import "@/src/components/home/domestic/style.scss";
import { HiLocationMarker } from "react-icons/hi";
import SwiperContainer from "@/src/components/home/wildlife/Swiper";
import Link from "next/link";
import { wildLife } from "@/src/types/wildlife";
import { useEffect, useState } from "react";
import { trending } from "@/src/types/trending";

const WildLife = () => {
  const [wildlife, setWildlife] = useState<wildLife[]>();
  const [trending, setTrending] = useState<trending>();

  useEffect(() => {
    const fetchDomestic = async () => {
      const wildLifeData = await getTrendingWildLife();
      setWildlife(wildLifeData);
    };
    fetchDomestic();

    const fetchTrending = async () => {
      const trendingData = await getTrending();
      setTrending(trendingData);
    };
    fetchTrending();
  }, []);

  //console.log("domesticData->", wildLifeData[0].wildlifePackage);

  return (
    <section id="trendingDomestic">
      <div className="title-container">
        <HiLocationMarker size={40} />
        <h2>{trending?.wildlifeName}</h2>
        <p>{trending?.wildlifeSubtitle}</p>
        <Link href="/wild-life">View All</Link>
      </div>
      {wildlife && <SwiperContainer data={wildlife} />}
    </section>
  );
};

export default WildLife;
