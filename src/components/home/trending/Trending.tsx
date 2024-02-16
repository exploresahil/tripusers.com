"use client";
import {
  getTrending,
  getTrendingHomeInternational,
} from "@/src/sanity/sanity-utils";
import "./style.scss";
import { HiLocationMarker } from "react-icons/hi";
import Image from "next/image";
import Link from "next/link";

import { useEffect, useState } from "react";
import { international } from "@/src/types/international";
import { trending } from "@/src/types/trending";
import ImageSize from "@/src/utils/image-utils";

const Trending = () => {
  const [TrendingData, setTrendingData] = useState<international[]>([]);
  const [Trending, setTrending] = useState<trending>();

  useEffect(() => {
    const fetchTrendingHero = async () => {
      const trendingDataPromises = Array.from({ length: 9 }, (_, index) =>
        getTrendingHomeInternational(index.toString())
      );
      const trendingDataArrays = await Promise.all(trendingDataPromises);
      const trendingData = trendingDataArrays
        .map((dataArray) => dataArray[0])
        .filter(Boolean);

      setTrendingData(trendingData);
    };
    fetchTrendingHero();

    const fetchTrending = async () => {
      const trending = await getTrending();
      setTrending(trending);
    };

    fetchTrending();
  }, []);

  //console.log("Trending->", TrendingData);

  return (
    <section id="trending">
      <div className="title-container">
        <HiLocationMarker size={40} />
        <h2>{Trending?.internationalName}</h2>
        <p>{Trending?.internationalSubtitle}</p>
        <Link href="/international/trending">View All</Link>
      </div>
      <div className="trending-grid">
        {TrendingData.map((item, index) => (
          <Link
            href={`/international/${item.slug}`}
            key={index}
            className="country"
          >
            {item.cardImage && (
              <Image
                src={item.cardImage}
                alt={`image of  ${item.name}`}
                fill
                sizes={ImageSize.bannerSizes}
                style={{
                  objectPosition: `${item.cardImageHotspot?.x * 100}% ${
                    item.cardImageHotspot?.y * 100
                  }%`,
                }}
              />
            )}
            <div className="text-container">
              <h3>{item.name}</h3>
              {item.internationalPackages && (
                <p>
                  Starts from{" "}
                  {item.internationalPackages.length == 0
                    ? 1500
                    : item.internationalPackages[0].price.toLocaleString(
                        "en-IN"
                      )}
                </p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Trending;
