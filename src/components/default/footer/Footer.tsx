"use client";

import { getBrand } from "@/src/sanity/sanity-utils";
import "./style.scss";
import Image from "next/image";
import Form from "./Form";
import Link from "next/link";
import { useEffect, useState } from "react";
import { brand } from "@/src/types/brand";

const Footer = () => {
  const [brand, setBrand] = useState<brand[]>();

  useEffect(() => {
    const fetchBrand = async () => {
      const logoData = await getBrand();
      setBrand(logoData);
    };

    fetchBrand();
  }, []);

  //console.log("logoData->", logoData);

  return (
    <footer>
      <div className="logo-container">
        {brand && brand[0].lightImage && (
          <Image
            src={brand[0].lightImage}
            alt="logo"
            fill
            sizes="(max-width: 768px) 600px, (max-width: 1200px) 1000px, 2000px"
          />
        )}
      </div>
      <div className="division">
        <Form />
        <div className="links-container">
          <div className="discover">
            <h4>Discover Us</h4>
            <Link href="/about">About</Link>
          </div>
          <div className="support">
            <h4>Support</h4>
            <Link href="/contact">Contact Us</Link>
            <Link href="/privacy-policy">Privacy Policy</Link>
            <Link href="/terms-and-conditions">Terms & Conditions</Link>
          </div>
        </div>
      </div>
      <div className="footer-footer">
        <p> © 2013 - 24 Tripusers.com. All Rights Reserved.</p>
        <p>
          Design & Developed by <br />
          <span>
            <Link href="https://thecirclstudio.com/">the circl studio</Link> &{" "}
            <Link href="https://www.webstack.in/">webstack</Link>
          </span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
