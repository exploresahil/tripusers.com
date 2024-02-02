import { getTrendingInternational } from "@/src/sanity/sanity-utils";
import "./style.scss";
import { HiLocationMarker } from "react-icons/hi";
import Image from "next/image";
import Link from "next/link";

const Trending = async () => {
  const trendingData = await getTrendingInternational();

  //console.log(trendingData[5].internationalPackages.length);

  return (
    <section id="trending">
      <div className="title-container">
        <HiLocationMarker size={40} />
        <h2>Trending Destination</h2>
        <p>These popular destination have a lot to offer</p>
        <Link href="/international">View All</Link>
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
              <p>
                Starts from{" "}
                {item.internationalPackages.length == 0
                  ? 1500
                  : item.internationalPackages[0].price.toLocaleString("en-IN")}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Trending;
