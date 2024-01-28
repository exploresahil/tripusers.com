"use client";

import { AiFillCloseCircle } from "react-icons/ai";
import "./style.scss";
import FormImage from "../Icons/FormImage";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { useEffect, useRef, useState } from "react";

const schema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z
    .string()
    .min(10)
    .regex(/^\+(?:\d\s?){10,15}\d$/, {
      message: "phone number not valid (country code required)",
    }),
  date: z.string(),
  guest: z.string().min(0),
  message: z.string().min(1),
});

interface props {
  onClick?: () => void;
}

type formFields = {
  name: string;
  email: string;
  phone: string;
  date: string;
  guest: number;
  message: string;
};

//type formFields = z.infer<typeof schema>;

const CustomiseForm = ({ onClick }: props) => {
  const CustomiseFormRef = useRef<HTMLElement | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    reset,
  } = useForm<formFields>();
  console.log(errors);
  const [isSubmit, setIsSubmit] = useState(false);
  const onSubmitForm: SubmitHandler<formFields> = (data) => {
    const error = schema.safeParse(data);
    if (!error.success) {
      error.error.issues.map((v: any) => {
        //console.log(v);

        setError(v.path[0], { message: v.message });
      });
    } else {
      console.log(data);
      setIsSubmit(true);
      setTimeout(() => {
        setIsSubmit(false);
        reset();
        console.log("in 500", data);
      }, 5000);
    }
  };

  return (
    <section id="CustomiseForm" ref={CustomiseFormRef}>
      <div className="form-container">
        <div className="title-container">
          <h2>Customise your trip</h2>
          <button onClick={onClick}>
            <AiFillCloseCircle size={30} />
          </button>
        </div>

        <div className="form-main">
          <div className="left">
            <FormImage fill="#fa0001" />
          </div>
          <div className="right">
            <form onSubmit={handleSubmit(onSubmitForm)}>
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
                {...register("email", {
                  required: "Email is required",
                  validate: (value) => {
                    if (!value.includes("@")) {
                      return "Email must include @";
                    }
                    return true;
                  },
                })}
                type="email"
                placeholder="Email"
              />
              {errors.email && (
                <p style={{ color: "tomato" }}>{errors.email.message}</p>
              )}
              <input
                {...register("phone", {
                  required: "Phone No is required",
                  minLength: {
                    value: 10,
                    message:
                      "Phone No must be atleast 10 digits and countrycode is required",
                  },
                })}
                type="text"
                placeholder="Phone No"
              />
              {errors.phone && (
                <p style={{ color: "tomato" }}>{errors.phone.message}</p>
              )}
              <div className="data-container">
                <input
                  {...register("date")}
                  type="date"
                  placeholder="Travel Date"
                />
                <input
                  {...register("guest")}
                  type="number"
                  min={0}
                  placeholder="Number of Guest"
                />
              </div>
              <textarea
                {...register("message", {
                  required: "Message is required",
                })}
                placeholder="Tell us where you want to go ?"
                rows={5}
              />
              {errors.message && (
                <p style={{ color: "tomato" }}>{errors.message.message}</p>
              )}

              <button type="submit" disabled={isSubmitting}>
                {isSubmit ? "Submit" : "Submit Enquiry"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomiseForm;
