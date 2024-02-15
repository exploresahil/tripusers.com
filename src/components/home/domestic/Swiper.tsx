"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { Domestic } from "@/src/types/domestic";
import Link from "next/link";

import "swiper/css";
import "swiper/css/navigation";

const SwiperContainer = ({ data }: { data: Domestic[] }) => {
  //console.log("data->", data[5].wildlifePackage);

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
        modules={[Navigation, Autoplay]}
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
            <Link href={`/domestic/${item.slug}`} key={index}>
              {item.cardImage && (
                <>
                  <Image
                    src={item.cardImage}
                    alt="hero background"
                    fill
                    sizes="(max-width: 768px) 600px, (max-width: 1200px) 800px, 1080px"
                  />
                </>
              )}

              <div className="text-container">
                <h3>{item.name}</h3>
                {item.domesticPackages && (
                  <p>
                    Starts from{" "}
                    {item.domesticPackages.length == 0
                      ? 1500
                      : item.domesticPackages[0].price.toLocaleString("en-IN")}
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
