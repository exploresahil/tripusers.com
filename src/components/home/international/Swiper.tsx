"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectFade, Autoplay } from "swiper/modules";
import Link from "next/link";

import "swiper/css";
import "swiper/css/navigation";
import { international } from "@/src/types/international";

const SwiperContainer = ({ data }: { data: international[] }) => {
  //console.log("data->", data[0].wildlifePackage);

  return (
    <div className="india-swiper">
      <Swiper
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        spaceBetween={10}
        navigation={true}
        loop={true}
        modules={[EffectFade, Navigation, Autoplay]}
        className="mySwiper"
        speed={500}
        allowTouchMove={false}
        slidesPerView={1}
        breakpoints={{
          820: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          1025: {
            slidesPerView: 4,
            spaceBetween: 10,
          },
        }}
      >
        {data.map((item, index) => (
          <SwiperSlide key={index} className="swiperSlide-card">
            <Link href={`/wild-life/${item.slug}`} key={index}>
              {item.cardImage && (
                <Image
                  src={item.cardImage}
                  alt="hero background"
                  fill
                  sizes="(max-width: 768px) 600px, (max-width: 1200px) 1000px, 2000px"
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
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SwiperContainer;
