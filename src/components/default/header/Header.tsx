"use client";

import "./style.scss";
import { getBrand } from "@/src/sanity/sanity-utils";
import Image from "next/image";
import Link from "next/link";
import Menu from "./Menu";
import { brand } from "@/src/types/brand";
import { useEffect, useState } from "react";

const Header = () => {
  const [brandData, setBrandData] = useState<brand[]>([]);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    async function fetchBrand() {
      const brand = await getBrand();
      setBrandData(brand);
    }
    fetchBrand();
  }, []);

  const handleScroll = () => {
    const scrolled = window.scrollY > 0;
    setIsScrolled(scrolled);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={isScrolled ? "scrolled" : ""}>
      <Link href="/" className="logo-container">
        {brandData[0]?.darkImage && brandData[0]?.headerImage && (
          <Image
            src={
              isScrolled ? brandData[0]?.darkImage : brandData[0]?.headerImage
            }
            alt="tripusers.com logo"
            fill
            sizes="(max-width: 768px) 600px, (max-width: 1200px) 1000px, 2000px"
          />
        )}
      </Link>
      {brandData[0]?.logoMark && <Menu logo={brandData[0]?.logoMark} />}
    </header>
  );
};

export default Header;
