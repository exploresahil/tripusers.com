"use client";

import SwiperHero from "@/src/components/international/Swiper";
import { getDomestic, getInternational } from "@/src/sanity/sanity-utils";
import "@/src/app/(client)/international/style.scss";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Domestic } from "@/src/types/domestic";
import PageLoading from "@/src/components/default/loader/PageLoading";

const page = () => {
  const [domestic, setDomestic] = useState<Domestic[]>([]);
  const [loading, setLoading] = useState(false);
  const [isLast, setIsLast] = useState(false);
  const [page, setPage] = useState<number[]>([1, 6]);
  const fetchDomestic = async () => {
    setLoading(true);
    const domesticData = await getDomestic(page[0], page[1]);
    // console.log(domesticData);
    setIsLast(domestic.length == 0);
    setLoading(false);
    setDomestic([...domestic, ...domesticData]);
  };
  useEffect(() => {
    fetchDomestic();
  }, []);
  useEffect(() => {
    // Function to add event listener for scroll
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  useEffect(() => {
    // Fetch more posts when page state changes
    if (!loading) {
      fetchDomestic();
    }
  }, [page]);
  const handleScroll = () => {
    // Calculate scroll position
    const scrollTop =
      (document.documentElement && document.documentElement.scrollTop) ||
      document.body.scrollTop;
    const scrollHeight =
      (document.documentElement && document.documentElement.scrollHeight) ||
      document.body.scrollHeight;
    const clientHeight =
      document.documentElement.clientHeight || window.innerHeight;
    const scrolledToBottom =
      Math.ceil(scrollTop + clientHeight) >= scrollHeight;

    // Load more posts if scrolled to bottom and not already loading
    if (scrolledToBottom && !loading && !isLast) {
      setPage((prevPage) => [prevPage[1], prevPage[1] + 6]);
    }
  };
  console.log("InternationalData->", domestic);

  if (!domestic) {
    return <PageLoading />;
  }

  return (
    <>
      {domestic && <SwiperHero title="India" data={domestic} />}
      <section id="internationalPage">
        <div className="grid">
          {domestic?.map((data, index) => (
            <Link
              href={`/domestic/${data.slug}`}
              key={index}
              className="child-container"
            >
              <div className="img-container">
                {data?.cardImage && (
                  <Image
                    src={data.cardImage}
                    alt="hero background"
                    fill
                    sizes="(max-width: 768px) 600px, (max-width: 1200px) 1000px, 2000px"
                  />
                )}
              </div>
              <div className="cta-container">
                <div className="text-container">
                  <h3>{data.name}</h3>
                  {data.domesticPackages && (
                    <p>
                      Starts from{" "}
                      {data.domesticPackages.length == 0
                        ? 1500
                        : data?.domesticPackages[0].price.toLocaleString(
                            "en-IN"
                          )}
                    </p>
                  )}
                </div>
                <button>View Details</button>
              </div>
            </Link>
          ))}
        </div>
        {loading && <p>Loading</p>}
      </section>
    </>
  );
};

export default page;
