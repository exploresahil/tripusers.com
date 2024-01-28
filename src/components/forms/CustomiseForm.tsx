"use client";

import "./style.scss";
import FormImage from "../Icons/FormImage";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { error } from "console";

const schema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(10),
  date: z.string(),
  guest: z.number(),
  message: z.string().min(1),
});

type formFields = {
  name: string;
  email: string;
  phone: string;
  date: string;
  guest: number;
  message: string;
};

//type formFields = z.infer<typeof schema>;

const CustomiseForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<formFields>();

  const onSubmitForm: SubmitHandler<formFields> = (data) => {
    console.log(data);
  };

  return (
    <section id="CustomiseForm" onSubmit={handleSubmit(onSubmitForm)}>
      <div className="form-container">
        <h2>Customise your trip</h2>
        <div className="form-main">
          <div className="left">
            <FormImage fill="#fa0001" />
          </div>
          <div className="right">
            <form>
              <input
                {...register("name", {
                  required: "Name is required",
                })}
                type="text"
                placeholder="Name"
              />
              {errors.name && <p>{errors.name.message}</p>}
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
              {errors.email && <p>{errors.email.message}</p>}
              <input
                {...register("phone", {
                  required: "Phone No is required",
                  minLength: {
                    value: 10,
                    message: "Phone No must be atleast 10 digits",
                  },
                })}
                type="text"
                placeholder="Phone No"
              />
              {errors.phone && <p>{errors.phone.message}</p>}
              <div className="data-container">
                <input
                  {...register("date")}
                  type="date"
                  placeholder="Travel Date"
                />
                <input
                  {...register("guest")}
                  type="number"
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
              {errors.message && <p>{errors.message.message}</p>}
              <button type="submit" disabled={isSubmitting}>
                Submit Enquiry
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomiseForm;
