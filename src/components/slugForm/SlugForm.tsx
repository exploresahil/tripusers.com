"use client";

import { AiFillPlusSquare } from "react-icons/ai";
import { AiFillMinusSquare } from "react-icons/ai";
import Image from "next/image";
import Link from "next/link";
import { AiFillCloseCircle } from "react-icons/ai";
import "./style.scss";
import {
  InputHTMLAttributes,
  ReactHTML,
  useEffect,
  useRef,
  useState,
} from "react";
import { brand } from "@/src/types/brand";
import { getBrand } from "@/src/sanity/sanity-utils";
import ImageSize from "@/src/utils/image-utils";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";

interface props {
  onClick?: () => void;
  packageName: string;
}

const schema = z.object({
  packageName: z.string(),
  adult: z.string().min(0),
  child: z.string().min(0),
  travelDate: z.string().min(0),
  name: z.string(),
  email: z.string(),
  mobile: z
    .string()
    .min(10)
    .regex(/^\+(?:\d\s?){10,15}\d$/, {
      message: "The phone number is not valid; a country code is required.",
    }),
});

type formField = z.infer<typeof schema>;
interface CounterProps {
  title: string;
  value: number;
  onIncrement: () => void;
  onDecrement: () => void;
  inputProps: InputHTMLAttributes<HTMLInputElement>;
}
const Counter = ({
  value,
  onIncrement,
  onDecrement,
  title,
  inputProps,
}: CounterProps) => {
  return (
    <div className="counter">
      <label>{title}</label>
      <div className="value">
        <button type="button" onClick={onDecrement}>
          <AiFillMinusSquare />
        </button>
        <input type="text" value={value} {...inputProps} />
        <button type="button" onClick={onIncrement} className="plus">
          <AiFillPlusSquare />
        </button>
      </div>
    </div>
  );
};
const SlugForm = ({ onClick, packageName }: props) => {
  const [brandData, setBrandData] = useState<brand[]>();
  const [adultCount, setAdultCount] = useState<number>(1);
  const [childCount, setChildCount] = useState<number>(0);

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
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    reset,
  } = useForm<formField>();
  const [isSubmit, setIsSubmit] = useState(false);
  const onSubmitForm: SubmitHandler<formField> = (data) => {
    const error = schema.safeParse(data);
    if (!error.success) {
      error.error.issues.map((v: any) => {
        console.log(v);

        setError(v.path[0], { message: v.message });
      });
    } else {
      setIsSubmit(true);
      fetch(
        `${process.env.NEXT_PUBLIC_FORM_APP_SCRIPT_URL}?action=addEnquiry`,
        {
          method: "POST",
          body: JSON.stringify({
            ...error.data,
            adult: adultCount,
            child: childCount,
          }),
        }
      )
        .then((response) => {
          if (response.ok) {
            console.log("Data successfully submitted!");
            alert("Data successfully submitted!");
            reset();
          } else {
            console.error("Failed to submit data");
          }
        })
        .catch((error) => {
          console.error("Error submitting data:", error);
        })
        .finally(() => {
          setIsSubmit(false);
        });
      //console.log(data);
    }
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
                sizes={ImageSize.cardSize}
              />
            )}
          </Link>
          <h2>Send Enquiry</h2>
          <button onClick={onClick}>
            <AiFillCloseCircle size={30} />
          </button>
        </div>
        <div className="form-main">
          <form onSubmit={handleSubmit(onSubmitForm)}>
            <label>Package Name</label>
            <input
              {...register("packageName", {
                required: "package Name is required",
              })}
              type="text"
              value={packageName}
              readOnly
            />

            <div className="count-container">
              <Counter
                value={adultCount}
                title="Adult"
                onIncrement={() => setAdultCount(adultCount + 1)}
                onDecrement={() =>
                  setAdultCount(adultCount > 0 ? adultCount - 1 : 0)
                }
                inputProps={{
                  ...register("adult", {
                    required: "Number of Adult is required",
                  }),
                }}
              />
              {errors.adult && (
                <p className="errors" style={{ color: "tomato" }}>
                  {errors.adult.message}
                </p>
              )}
              <Counter
                value={childCount}
                title="Child"
                onIncrement={() => setChildCount(childCount + 1)}
                onDecrement={() =>
                  setChildCount(childCount > 0 ? childCount - 1 : 0)
                }
                inputProps={{
                  ...register("child", {
                    required: "Number of Child is required",
                  }),
                }}
              />
              {errors.child && (
                <p className="errors" style={{ color: "tomato" }}>
                  {errors.child.message}
                </p>
              )}
            </div>
            <label>Travel Date</label>
            <input
              type="date"
              {...register("travelDate", {
                required: "travel date is required",
              })}
              required
            />
            {errors.travelDate && (
              <p className="errors" style={{ color: "tomato" }}>
                {errors.travelDate.message}
              </p>
            )}
            <div className="contact-details">
              <label>Contact Details</label>
              <div className="top">
                <div className="input-section">
                  <input
                    type="text"
                    {...register("name", {
                      required: "Name is required",
                    })}
                    placeholder="Your Full Name"
                    required
                  />
                  {errors.name && (
                    <p className="errors" style={{ color: "tomato" }}>
                      {errors.name.message}
                    </p>
                  )}
                </div>
                <div className="input-section">
                  <input
                    type="email"
                    {...register("email", {
                      required: "Email is required",
                    })}
                    placeholder="Your Email"
                    required
                  />
                  {errors.email && (
                    <p className="errors" style={{ color: "tomato" }}>
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>
              <input
                type="text"
                {...register("mobile", {
                  required: "Phone is required",
                })}
                placeholder="Your Mobile No."
                required
              />
              {errors.mobile && (
                <p className="errors" style={{ color: "tomato" }}>
                  {errors.mobile.message}
                </p>
              )}
            </div>
            <button type="submit">{!isSubmit ? "Submit" : "Loading..."}</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SlugForm;
