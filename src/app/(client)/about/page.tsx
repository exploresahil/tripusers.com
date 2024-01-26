"use client";
import { getHero } from "@/sanity/sanity-utils";
import { hero } from "@/types/hero";
import React, { useEffect, useState } from "react";

const page = () => {
  const [data, setData] = useState<hero>([]);
  useEffect(() => {
    async function fetchHero() {
      const data = await getHero();
      setData(data);
    }

    fetchHero();
  }, []);
  return (
    <div>
      {data.map((item, index) => (
        <div key={index} className="swiperSlide-card">
          <p>{item.subtitle}</p>
          <h2>{item.title}</h2>
          <div className="text-container"></div>
          <div className="bg-container">
            <div className="bg" />
            {/* <Image
                src={item.heroImage}
                alt="hero background"
                fill
                sizes="(max-width: 768px) 600px, (max-width: 1200px) 1000px, 2000px"
              /> */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default page;
