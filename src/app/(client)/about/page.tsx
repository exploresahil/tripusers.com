"use client";
import { useRouter } from "next/navigation";
import "./style.scss";
import { SignOutButton } from "@clerk/nextjs";

const page = () => {
  const router = useRouter();
  return (
    <section id="about">
      <SignOutButton signOutCallback={() => router.push("/")}>
        Signout
      </SignOutButton>
    </section>
  );
};

export default page;
