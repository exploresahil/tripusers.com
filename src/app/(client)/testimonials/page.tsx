"use client";

import { getTestimonials, getTrending } from "@/src/sanity/sanity-utils";
import Testimonial from "@/src/types/testimonials";
import { useEffect, useState } from "react";
import "./style.scss";
import { trending } from "@/src/types/trending";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectFade, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import { useRouter } from "next/navigation";
import PageLoading from "@/src/components/default/loader/PageLoading";

const page = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [trending, setTrending] = useState<trending>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [lastPage, setLastPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const router = useRouter();

  const fetchTrendingData = async () => {
    const trendingData = await getTrending();
    setTrending(trendingData);
  };

  const fetchTestimonials = async (page: number) => {
    setLoading(true);
    try {
      const { data, totalPages } = await getTestimonials(page);
      setTestimonials(data);
      setLastPage(data.length > 0 ? page : lastPage);
      setTotalPages(totalPages);
    } catch (error) {
      console.error("Error fetching international data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrendingData();
  }, []);

  useEffect(() => {
    fetchTestimonials(currentPage);
  }, [currentPage]);

  const handleNextPage = async () => {
    const nextPage = currentPage + 1;

    try {
      const { data } = await getTestimonials(nextPage);

      if (data.length > 0) {
        setCurrentPage(nextPage);
      }

      router.push("/testimonials/#testimonialsData");
    } catch (error) {
      console.error("Error fetching testimonials data:", error);
    }
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    router.push("/testimonials/#testimonialsData");
  };

  //console.log("Testimonials ->", testimonials);

  if (!testimonials) {
    return <PageLoading />;
  }

  return (
    <>
      <section id="testimonialsHero">
        {testimonials?.length > 0 && (
          <Swiper
            effect={"fade"}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            //navigation={true}
            //onSlideChange={onSildeChange}
            loop={true}
            modules={[EffectFade, Navigation, Autoplay]}
            className="mySwiper"
            speed={500}
            allowTouchMove={false}
            slidesPerView={1}
          >
            {testimonials?.map((data, index) => (
              <SwiperSlide key={index} className="swiperSlide-card">
                <div className="bg-container">
                  <div className="bg" />
                  <Image
                    src={data?.cardImage}
                    alt="hero background"
                    fill
                    sizes="(max-width: 768px) 600px, (max-width: 1200px) 800px, 1080px"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
        <div className="text-container">
          <p>{trending?.testimonialSubtitle}</p>
          <h2>{trending?.testimonialName}</h2>
        </div>
      </section>
      <section id="testimonialsData">
        <p className="pageNo">
          Page {currentPage} / {totalPages}
        </p>
        <div className="testimonial-grid">
          {testimonials?.map((data, index) => (
            <div key={index} className="grid-item">
              <div className="img-container">
                <Image
                  src={data?.cardImage}
                  alt="hero background"
                  fill
                  sizes="(max-width: 768px) 600px, (max-width: 1200px) 800px, 1080px"
                />
              </div>
            </div>
          ))}
        </div>
        <div className="pagination">
          {loading && <p className="pagination-loading">Loading...</p>}
          <div className="buttons">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              aria-label="Previous Page"
            >
              Previous
            </button>
            <span aria-live="polite">{currentPage}</span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              aria-label="Next Page"
            >
              Next
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default page;
