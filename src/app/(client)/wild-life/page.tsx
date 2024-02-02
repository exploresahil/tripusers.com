import SwiperHero from "@/src/components/international/Swiper";
import { getWildLife } from "@/src/sanity/sanity-utils";
import "@/src/app/(client)/international/style.scss";
import Image from "next/image";
import Link from "next/link";

const page = async () => {
  const wildLifeData = await getWildLife();
  //console.log("wildLifelData->", wildLifeData[0].wildlifePackage);

  return (
    <>
      <SwiperHero title="India" data={wildLifeData} />
      <section id="internationalPage">
        <div className="grid">
          {wildLifeData.map((data, index) => (
            <Link
              href={`/wild-life/${data.slug}`}
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
                  {/*  {data.wildlifePackage && (
                    <p>
                      Starts from{" "}
                      {data.wildlifePackage.length == 0
                        ? 1500
                        : data?.wildlifePackage[0].price.toLocaleString(
                            "en-IN"
                          )}
                    </p>
                  )} */}
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
