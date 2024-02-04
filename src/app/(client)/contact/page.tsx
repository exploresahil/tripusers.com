"use client";
import { BsFillTelephoneFill } from "react-icons/bs";
import { AiFillPhone } from "react-icons/ai";

import { MdEmail } from "react-icons/md";
import "./style.scss";
import Image from "next/image";
import BGImage from "@/src/public/assets/contact-us-bg.svg";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
const schema = z.object({
  name: z.string().min(1),
  phone_number: z
    .string()
    .min(10)
    .regex(/^\+(?:\d\s?){10,15}\d$/, {
      message: "The phone number is not valid; a country code is required.",
    }),
});
type formFields = {
  name: string;
  phone_number: string;
};
const ContactUs = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    reset,
  } = useForm<formFields>();
  const onSubmitForm: SubmitHandler<formFields> = (data) => {
    const error = schema.safeParse(data);
    if (!error.success) {
      error.error.issues.map((v: any) => {
        //console.log(v);

        setError(v.path[0], { message: v.message });
      });
    } else {
      fetch(
        "https://script.google.com/macros/s/AKfycbzOKOIGA8gjND4d30LJ99C66dGOSUkbKHvZsclGqmuKZct_QNi-5Xm8s9BMgyz9A6U4/exec?action=addData",
        {
          method: "POST",
          body: JSON.stringify({
            ...error.data,
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
        });
    }
  };

  return (
    <section className="container">
      <div className="form">
        <div className="header">
          <h1>Contact Us today</h1>
          <div className="info-con">
            <div className="icon">
              <AiFillPhone />
              <p>call</p>
            </div>
            <div className="info">
              <p>+91 88888 00696</p>
            </div>
          </div>
          <div className="info-con">
            <div className="icon">
              <MdEmail />
              <p>email</p>
            </div>
            <div className="info">
              <p>paragkoche0@gmail.com</p>
            </div>
          </div>
        </div>
        <div className="body">
          <form onSubmit={handleSubmit(onSubmitForm)}>
            <label>Want us to call you?</label>
            <div className="input-cont">
              <input
                {...register("name", {
                  required: "Name is required",
                })}
                type="text"
                placeholder="Name"
              />
              {errors.name && (
                <p style={{ color: "tomato" }}>{errors.name.message}</p>
              )}
              <input
                {...register("phone_number", {
                  required: "phone number is required",
                })}
                type="tel"
                placeholder="Phone number"
              />
              {errors.phone_number && (
                <p style={{ color: "tomato" }}>{errors.phone_number.message}</p>
              )}
            </div>
            <button type="submit">
              <BsFillTelephoneFill />
              Request Call Back
            </button>
          </form>
        </div>
      </div>
      <div className="bg">
        <Image src={BGImage} alt="contact-us bg image" />
      </div>
    </section>
  );
};

export default ContactUs;
