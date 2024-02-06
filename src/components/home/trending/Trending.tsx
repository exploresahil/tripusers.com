import {
  getTrending,
  getTrendingHomeInternational,
} from "@/src/sanity/sanity-utils";
import "./style.scss";
import { HiLocationMarker } from "react-icons/hi";
import Image from "next/image";
import Link from "next/link";
import { revalidateTag } from "next/cache";

const Trending = async () => {
  const trendingData = await getTrendingHomeInternational();
  const trending = await getTrending();
  revalidateTag("Trending");
  //console.log("Trending->", trendingData);

  return (
    <section id="trending">
      <div className="title-container">
        <HiLocationMarker size={40} />
        <h2>{trending.internationalName}</h2>
        <p>{trending.internationalSubtitle}</p>
        <Link href="/international/trending">View All</Link>
      </div>
      <div className="trending-grid">
        {trendingData.map((item, index) => (
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
        ))}
      </div>
    </section>
  );
};

export default Trending;
