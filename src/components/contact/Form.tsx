"use client";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
const schema = z.object({
  name: z.string(),
  email: z.string().email(),
  message: z.string(),
});
type formFields = {
  name: string;
  email: string;
  message: string;
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
      fetch(
        `${process.env.NEXT_PUBLIC_SANITY_APP_SCRIPT_URL}?action=addContact`,
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
      <input
        {...register("name", {
          required: "Name is required",
        })}
        type="text"
        placeholder="Full Name"
      />
      {errors.name && <p style={{ color: "tomato" }}>{errors.name.message}</p>}
      <input
        {...register("email", {
          required: "Email is required",
        })}
        type="email"
        placeholder="Email"
      />
      {errors.email && (
        <p style={{ color: "tomato" }}>{errors.email.message}</p>
      )}
      <textarea
        {...register("message", {
          required: "Message is required",
        })}
        placeholder="Message"
        rows={5}
      />
      {errors.message && (
        <p style={{ color: "tomato" }}>{errors.message.message}</p>
      )}
      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;
