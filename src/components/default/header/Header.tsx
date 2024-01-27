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

  const logo = brandData[0]?.headerImage;
  const logoMark = brandData[0]?.logoMark;
  const darkLogo = brandData[0]?.darkImage;

  const handleScroll = () => {
    // Check if the user has scrolled down enough to trigger the change
    const scrolled = window.scrollY > 0;
    setIsScrolled(scrolled);
  };

  useEffect(() => {
    // Add scroll event listener when the component mounts
    window.addEventListener("scroll", handleScroll);

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={isScrolled ? "scrolled" : ""}>
      <Link href="/" className="logo-container">
        <Image
          src={isScrolled ? darkLogo : logo}
          alt="tripusers.com logo"
          fill
          sizes="(max-width: 768px) 600px, (max-width: 1200px) 1000px, 2000px"
        />
      </Link>
      <Menu logo={logoMark} />
    </header>
  );
};

export default Header;
