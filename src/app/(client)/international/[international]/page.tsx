"use client";

import { getInternationalSlug } from "@/src/sanity/sanity-utils";
import { international } from "@/src/types/international";
import { useEffect, useState } from "react";

type Props = {
  params: { international: string };
};

const page = ({ params }: Props) => {
  const [countrySlugData, setCountrySlugData] = useState<international>();
  const slug = params.international;

  useEffect(() => {
    async function fetchCountrySlug() {
      try {
        const data = await getInternationalSlug(slug);
        setCountrySlugData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchCountrySlug();
  }, [slug]);

  if (!countrySlugData) {
    return <div>Loading...</div>;
  }
  console.log("slug->", countrySlugData);

  return (
    <section id="internationalSlug">
      <h2>{countrySlugData?.name}</h2>
    </section>
  );
};

export default page;
