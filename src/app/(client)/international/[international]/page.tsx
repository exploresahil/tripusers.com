"use client";

import { getCountry, getCountrySlug } from "@/src/sanity/sanity-utils";
import { Country } from "@/src/types/international";
import { useEffect, useState } from "react";

type Props = {
  params: { country: string };
};

const page = ({ params }: Props) => {
  const [countrySlugData, setCountrySlugData] = useState<Country>();
  const slug = params.country;

  useEffect(() => {
    async function fetchCountrySlug() {
      const data = await getCountrySlug(slug);
      setCountrySlugData(data);
    }
    fetchCountrySlug();
  }, [slug]);

  return (
    <div>
      <h2>{countrySlugData?.countryName}</h2>
    </div>
  );
};

export default page;
