"use client";

import { BsFillRecordCircleFill } from "react-icons/bs";
import { MdJoinFull } from "react-icons/md";
import { HiEye } from "react-icons/hi";
import { BsFillRocketTakeoffFill } from "react-icons/bs";
import Image from "next/image";
import "./style.scss";
import { About } from "@/src/types/about";
import { useEffect, useState } from "react";
import { getAbout } from "@/src/sanity/sanity-utils";
import PageLoading from "@/src/components/default/loader/PageLoading";
import { PortableText } from "@portabletext/react";
import { useMediaQuery } from "react-responsive";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectFade, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

const page = () => {
  const isMobile = useMediaQuery({ maxWidth: 820 });

  const [aboutData, setAboutData] = useState<About>();

  const fetchAbout = async () => {
    const about = await getAbout();

    setAboutData(about);
  };

  useEffect(() => {
    fetchAbout();
  }, []);

  if (!aboutData) {
    return <PageLoading />;
  }

  return (
    <>
      <section id="aboutHero">
        <div className="titel-container">
          <h2>{aboutData?.title}</h2>
          <p>{aboutData?.subtitle}</p>
        </div>
        <div className="img-container">
          {aboutData?.bannerImage && (
            <>
              <Image
                src={aboutData?.bannerImage}
                alt="contact hero image"
                fill
                sizes="(max-width: 768px) 600px, (max-width: 1200px) 1000px, 2000px"
              />
              <div className="bg" />
            </>
          )}
        </div>
      </section>
      <section id="about">
        <div className="about-container">
          <h3>{aboutData.aboutTitle}</h3>
          {aboutData && <PortableText value={aboutData?.aboutDescription} />}
        </div>
        <div className="vision-container">
          {isMobile ? (
            <Swiper
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
              }}
              navigation={true}
              //onSlideChange={onSildeChange}
              loop={true}
              modules={[Navigation, Autoplay]}
              className="mySwiper"
              speed={500}
              allowTouchMove={false}
              slidesPerView={1}
              spaceBetween={10}
            >
              <SwiperSlide className="swiperSlide-card">
                <div className="img-container">
                  <Image
                    src={aboutData.imageOne}
                    alt="hero background"
                    fill
                    sizes="(max-width: 768px) 600px, (max-width: 1200px) 1000px, 2000px"
                  />
                </div>
              </SwiperSlide>
              <SwiperSlide className="swiperSlide-card">
                <div className="img-container">
                  <Image
                    src={aboutData.imageTwo}
                    alt="hero background"
                    fill
                    sizes="(max-width: 768px) 600px, (max-width: 1200px) 1000px, 2000px"
                  />
                </div>
              </SwiperSlide>
              <SwiperSlide className="swiperSlide-card">
                <div className="img-container">
                  <Image
                    src={aboutData.imageThree}
                    alt="hero background"
                    fill
                    sizes="(max-width: 768px) 600px, (max-width: 1200px) 1000px, 2000px"
                  />
                </div>
              </SwiperSlide>
            </Swiper>
          ) : (
            <div className="images-container">
              <div className="img-container">
                <Image
                  src={aboutData.imageOne}
                  alt="hero background"
                  fill
                  sizes="(max-width: 768px) 600px, (max-width: 1200px) 1000px, 2000px"
                />
              </div>
              <div className="img-container">
                <Image
                  src={aboutData.imageTwo}
                  alt="hero background"
                  fill
                  sizes="(max-width: 768px) 600px, (max-width: 1200px) 1000px, 2000px"
                />
              </div>
              <div className="img-container">
                <Image
                  src={aboutData.imageThree}
                  alt="hero background"
                  fill
                  sizes="(max-width: 768px) 600px, (max-width: 1200px) 1000px, 2000px"
                />
              </div>
            </div>
          )}

          <div className="grid">
            <div className="grid-item">
              <div className="title-container">
                <HiEye />
                <div className="title">
                  <h3>Vision</h3>
                  <h4>{aboutData?.vision.title}</h4>
                </div>
              </div>
              <p>{aboutData?.vision.description}</p>
            </div>
            <div className="grid-item">
              <div className="title-container">
                <BsFillRocketTakeoffFill />
                <div className="title">
                  <h3>Mission</h3>
                  <h4>{aboutData?.mission.title}</h4>
                </div>
              </div>
              <p>{aboutData?.mission.description}</p>
            </div>
            <div className="grid-item">
              <div className="title-container">
                <BsFillRecordCircleFill />
                <div className="title">
                  <h3>Values</h3>
                  <h4>{aboutData?.values.title}</h4>
                </div>
              </div>
              <p>{aboutData?.values.description}</p>
            </div>
            <div className="grid-item">
              <div className="title-container">
                <MdJoinFull />
                <div className="title">
                  <h3>Join Us</h3>
                  <h4>{aboutData?.join.title}</h4>
                </div>
              </div>
              <p>{aboutData?.join.description}</p>
            </div>
          </div>
        </div>

        <div className="quote">
          <h5>"{aboutData?.quote}"</h5>
        </div>
      </section>
    </>
  );
};

export default page;
