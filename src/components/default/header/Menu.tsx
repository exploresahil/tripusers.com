"use client";

import Link from "next/link";
import { BiMenu } from "react-icons/bi";
import { AiFillCloseCircle } from "react-icons/ai";
import { BiPhoneCall } from "react-icons/bi";
import { useMediaQuery } from "react-responsive";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";

interface props {
  logo: string;
}

const links = [
  {
    title: "Home",
    link: "/",
  },
  {
    title: "About",
    link: "/about",
  },
  {
    title: "Contact",
    link: "/contact",
  },
];

const Menu = (logo: props) => {
  const isMobile = useMediaQuery({ maxWidth: 820 });
  const navRef = useRef<HTMLElement | null>(null);
  const menuOpenButtonRef = useRef<HTMLButtonElement | null>(null);
  const menuCloseButtonRef = useRef<HTMLButtonElement | null>(null);
  const linksRef = useRef<HTMLDivElement | null>(null);
  const linkRef = useRef<HTMLAnchorElement | null>(null);
  const logoMarkRef = useRef<HTMLAnchorElement | null>(null);

  const handleCloseMenu = () => {
    gsap.to(navRef.current, {
      left: "100%",
      ease: "power1.inOut",
    });
  };

  useGSAP(() => {
    menuOpenButtonRef.current?.addEventListener("click", () => {
      gsap.to(navRef.current, {
        left: 0,
        ease: "power1.inOut",
      });

      gsap.fromTo(
        ".link",
        {
          x: 400,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          ease: "power1.inOut",
          delay: 0.2,
          stagger: 0.1,
        }
      );
    });

    menuCloseButtonRef.current?.addEventListener("click", () => {
      handleCloseMenu();
    });

    linksRef.current?.addEventListener("click", () => {
      handleCloseMenu();
    });

    logoMarkRef.current?.addEventListener("click", () => {
      handleCloseMenu();
    });
  });

  return (
    <div id="menu">
      {isMobile ? (
        <div>
          <button ref={menuOpenButtonRef}>
            <BiMenu size={40} />
          </button>

          <nav ref={navRef}>
            <div className="logo-container">
              <Link href="/" className="logo-mark" ref={logoMarkRef}>
                <Image
                  src={logo.logo}
                  alt="tripusers.com logo"
                  fill
                  sizes="(max-width: 768px) 600px, (max-width: 1200px) 1000px, 2000px"
                />
              </Link>
              <button ref={menuCloseButtonRef}>
                <AiFillCloseCircle size={40} />
              </button>
            </div>

            <div className="links" ref={linksRef}>
              {links.map((link, index) => (
                <Link
                  key={index}
                  href={link.link}
                  ref={linkRef}
                  className="link"
                >
                  {link.title}
                </Link>
              ))}
            </div>

            <button className="formButton">Customise your trip</button>
            <Link href="tel:+918888800696" target="_blank" className="tel">
              <BiPhoneCall size={20} />
              +91 88888 00696
            </Link>
          </nav>
        </div>
      ) : null}
    </div>
  );
};

export default dynamic(() => Promise.resolve(Menu), { ssr: false });
