"use client";

import { getTrending, getTrendingDomestic } from "@/src/sanity/sanity-utils";
import "./style.scss";
import { HiLocationMarker } from "react-icons/hi";
import SwiperContainer from "./Swiper";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Domestic } from "@/src/types/domestic";
import { trending } from "@/src/types/trending";

const Domestic = () => {
  const [domestic, setDomestic] = useState<Domestic[]>();
  const [trending, setTrending] = useState<trending>();
  useEffect(() => {
    const fetchDomestic = async () => {
      const domesticData = await getTrendingDomestic();
      setDomestic(domesticData);
    };
    fetchDomestic();

    const fetchTrending = async () => {
      const trendingData = await getTrending();
      setTrending(trendingData);
    };
    fetchTrending();
  }, []);

  //console.log("trendingData->", trendingData);
  //console.log("domesticData->", domesticData);

  return (
    <section id="trendingDomestic">
      <div className="title-container">
        <HiLocationMarker size={40} />
        <h2>{trending?.domesticName}</h2>
        <p>{trending?.domesticSubtitle}</p>
        <Link href="/domestic">View All</Link>
      </div>
      {domestic && <SwiperContainer data={domestic} />}
    </section>
  );
};

export default Domestic;
