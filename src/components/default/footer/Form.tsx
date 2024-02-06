"use client";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  name: z.string(),
  email: z.string().email(),
  phone: z
    .string()
    .min(10)
    .regex(/^\+(?:\d\s?){10,15}\d$/, {
      message: "The phone number is not valid; a country code is required.",
    }),
});

type formFields = {
  name: string;
  email: string;
  phone: string;
};
const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    reset,
  } = useForm<formFields>();
  const [isSubmit, setIsSubmit] = useState(false);
  const onSubmitForm: SubmitHandler<formFields> = (data) => {
    const error = schema.safeParse(data);
    if (!error.success) {
      error.error.issues.map((v: any) => {
        //console.log(v);

        setError(v.path[0], { message: v.message });
      });
    } else {
      setIsSubmit(true);
      fetch(`${process.env.NEXT_PUBLIC_SANITY_APP_SCRIPT_URL}?action=addSub`, {
        method: "POST",
        body: JSON.stringify({
          ...error.data,
        }),
      })
        .then((response) => {
          if (response.ok) {
            console.log("Data successfully submitted!");
            alert("Data successfully submitted!");
            reset();
          } else {
            console.log(response.body);

            // console.error("Failed to submit data");
          }
        })
        .catch((error) => {
          console.log(error);

          console.error("Error submitting data:", error);
        })
        .finally(() => {
          setIsSubmit(false);
        });
      //console.log(data);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmitForm)}>
      <label>Keep travelling all year round!</label>
      <p>
        Subscribe to our newsletter to find travel inspiration in your inbox.
      </p>
      <div className="form-item">
        <div className="input-item">
          <input
            {...register("name", {
              required: "Name is required",
            })}
            type="text"
            placeholder="Full Name"
          />
          {errors.name && (
            <p style={{ color: "tomato" }}>{errors.name.message}</p>
          )}
        </div>
        <div className="input-item">
          <input
            {...register("email", {
              required: "email is required",
            })}
            type="email"
            placeholder="Email ID"
          />
          {errors.email && (
            <p style={{ color: "tomato" }}>{errors.email.message}</p>
          )}
        </div>
        <div className="input-item">
          <input
            {...register("phone", {
              required: "Phone is required",
            })}
            type="text"
            placeholder="Phone No"
          />
          {errors.phone && (
            <p style={{ color: "tomato" }}>{errors.phone.message}</p>
          )}
        </div>
        <button type="submit">Subscribe</button>
      </div>
    </form>
  );
};

export default Form;
