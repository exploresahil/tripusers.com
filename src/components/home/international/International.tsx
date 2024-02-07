"use client";

import {
  getSliderHomeInternational,
  getTrending,
} from "@/src/sanity/sanity-utils";
import "@/src/components/home/domestic/style.scss";
import { HiLocationMarker } from "react-icons/hi";
import SwiperContainer from "./Swiper";
import Link from "next/link";

import { useEffect, useState } from "react";
import { trending } from "@/src/types/trending";
import { international } from "@/src/types/international";

const International = () => {
  const [international, seInternational] = useState<international[]>();
  const [trending, setTrending] = useState<trending>();

  useEffect(() => {
    const fetchInternational = async () => {
      const internationalData = await getSliderHomeInternational();
      seInternational(internationalData);
    };
    fetchInternational();

    const fetchTrending = async () => {
      const trendingData = await getTrending();
      setTrending(trendingData);
    };
    fetchTrending();
  }, []);

  //console.log("trending->", trending);

  return (
    <section id="trendingDomestic">
      <div className="title-container">
        <HiLocationMarker size={40} />
        <h2>{trending?.internationalSliderName}</h2>
        <p>{trending?.internationalSliderSubtitle}</p>
        <Link href="/international">View All</Link>
      </div>
      {international && <SwiperContainer data={international} />}
    </section>
  );
};

export default International;
