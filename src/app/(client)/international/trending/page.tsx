import SwiperHero from "@/src/components/international/trending/Swiper";
import { getTrendingInternational } from "@/src/sanity/sanity-utils";
import "../style.scss";
import Image from "next/image";
import Link from "next/link";

const page = async () => {
  const InternationalData = await getTrendingInternational();
  //console.log("InternationalData->", InternationalData);

  return (
    <>
      <SwiperHero title="International" data={InternationalData} />
      <section id="internationalPage">
        <div className="grid">
          {InternationalData.map((data, index) => (
            <Link
              href={`/international/${data.slug}`}
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
                  {data.internationalPackages && (
                    <p>
                      Starts from{" "}
                      {data.internationalPackages.length == 0
                        ? 1500
                        : data?.internationalPackages[0].price.toLocaleString(
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
      </section>
    </>
  );
};

export default page;
