"use client";

import { AiFillPlusSquare } from "react-icons/ai";
import { AiFillMinusSquare } from "react-icons/ai";
import Image from "next/image";
import Link from "next/link";
import { AiFillCloseCircle } from "react-icons/ai";
import "./style.scss";
import { useEffect, useRef, useState } from "react";
import { brand } from "@/src/types/brand";
import { getBrand } from "@/src/sanity/sanity-utils";

interface props {
  onClick?: () => void;
  packageName: string;
}

const SlugForm = ({ onClick, packageName }: props) => {
  const [brandData, setBrandData] = useState<brand[]>();
  const [adultCount, setAdultCount] = useState<number>(1);
  const [childCount, setChildCount] = useState<number>(0);
  const [infantCount, setInfantCount] = useState<number>(0);

  const formContainerRef = useRef<HTMLDivElement | null>(null);

  const fetchBrand = async () => {
    const responce = await getBrand();
    setBrandData(responce);
  };

  useEffect(() => {
    fetchBrand();
  }, []);

  //console.log("fetchBrand->", brandData);

  useEffect(() => {
    const boxClose = (e: any) => {
      if (!formContainerRef.current?.contains(e.target)) {
        if (typeof onClick !== "undefined") onClick();
      }
    };
    document.addEventListener("mousedown", boxClose);
    return () => {
      document.removeEventListener("mousedown", boxClose);
    };
  }, []);
  interface CounterProps {
    title: string;
    value: number;
    onIncrement: () => void;
    onDecrement: () => void;
  }
  const Counter = ({
    value,
    onIncrement,
    onDecrement,
    title,
  }: CounterProps) => {
    return (
      <div className="counter">
        <label>{title}</label>
        <div className="value">
          <button type="button" onClick={onDecrement}>
            <AiFillMinusSquare />
          </button>
          <input type="text" value={value} />
          <button type="button" onClick={onIncrement} className="plus">
            <AiFillPlusSquare />
          </button>
        </div>
      </div>
    );
  };

  return (
    <section id="slugForm">
      <div className="form-container" ref={formContainerRef}>
        <div className="title-container">
          <Link href="/" className="logo-mark">
            {brandData && (
              <Image
                src={brandData[0]?.logoMark}
                alt="tripusers.com logo"
                fill
                sizes="(max-width: 768px) 600px, (max-width: 1200px) 800px, 1080px"
              />
            )}
          </Link>
          <h2>Send Enquiry</h2>
          <button onClick={onClick}>
            <AiFillCloseCircle size={30} />
          </button>
        </div>
        <div className="form-main">
          <form>
            <label>Package Name</label>
            <input type="text" value={packageName} readOnly />
            <div className="count-container">
              <Counter
                value={adultCount}
                title="Adult"
                onIncrement={() => setAdultCount(adultCount + 1)}
                onDecrement={() =>
                  setAdultCount(adultCount > 0 ? adultCount - 1 : 0)
                }
              />
              <Counter
                value={childCount}
                title="Child"
                onIncrement={() => setChildCount(childCount + 1)}
                onDecrement={() =>
                  setChildCount(childCount > 0 ? childCount - 1 : 0)
                }
              />
              <Counter
                value={infantCount}
                title="Infant"
                onIncrement={() => setInfantCount(infantCount + 1)}
                onDecrement={() =>
                  setInfantCount(infantCount > 0 ? infantCount - 1 : 0)
                }
              />
            </div>
            <div className="contact-details">
              <label>Contact Details</label>
              <div className="top">
                <input type="text" placeholder="Your Full Name" required />
                <input type="email" placeholder="Your Email" required />
              </div>
              <input type="text" placeholder="Your Mobile No." required />
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SlugForm;
