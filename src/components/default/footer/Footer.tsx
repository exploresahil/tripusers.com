"use client";

import { AiFillTwitterCircle } from "react-icons/ai";
import { BsInstagram } from "react-icons/bs";
import { BsFacebook } from "react-icons/bs";
import { CgShare } from "react-icons/cg";
import { BiPhoneCall } from "react-icons/bi";
import { MdLocationOn } from "react-icons/md";
import { getBrand, getContactUsInfo } from "@/src/sanity/sanity-utils";
import "./style.scss";
import Image from "next/image";
import Form from "./Form";
import Link from "next/link";
import { useEffect, useState } from "react";
import { brand } from "@/src/types/brand";
import { contactUs } from "@/src/types/contact";

const Footer = () => {
  const [brand, setBrand] = useState<brand[]>();
  const [contact, setContacts] = useState<contactUs>();

  useEffect(() => {
    const fetchBrand = async () => {
      const logoData = await getBrand();
      setBrand(logoData);
    };

    fetchBrand();
  }, []);

  useEffect(() => {
    const fetchContact = async () => {
      const contactData = await getContactUsInfo();
      setContacts(contactData);
    };
    fetchContact();
  }, []);

  //console.log("logoData->", logoData);

  return (
    <>
      <section id="footerTop">
        <div className="location">
          <Link href="/contact" className="title">
            <MdLocationOn />
            <h4>Locate Us</h4>
          </Link>
          <p>
            Located across the country, ready to assist in planning & booking
            your perfect vacation.
          </p>
        </div>
        <div className="call">
          <Link
            href={`tel:${contact?.phone}`}
            target="_blank"
            className="title"
          >
            <BiPhoneCall />
            <h4>{contact?.phone}</h4>
          </Link>
          <p>
            Located across the country, ready to assist in planning & booking
            your perfect vacation.
          </p>
        </div>
        <div className="email">
          <Link
            href={`mailto:${contact?.email}`}
            target="_blank"
            className="title"
          >
            <BiPhoneCall />
            <h4>{contact?.email}</h4>
          </Link>
          <p>Be it an enquiry, feedback or a simple suggestion, write to us.</p>
        </div>
        <div className="social">
          <div className="title">
            <CgShare />
            <h4> Connect with us</h4>
          </div>
          <div className="social-icons">
            <Link
              href={contact?.facebook ? contact.facebook : ""}
              target="_blank"
            >
              <BsFacebook />
            </Link>
            <Link
              href={contact?.instagram ? contact.instagram : ""}
              target="_blank"
            >
              <BsInstagram />
            </Link>
            <Link
              href={contact?.twitter ? contact.twitter : ""}
              target="_blank"
            >
              <AiFillTwitterCircle />
            </Link>
          </div>
        </div>
      </section>
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
    </>
  );
};

export default Footer;
