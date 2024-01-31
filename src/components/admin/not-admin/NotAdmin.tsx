"use client";

import { SignOutButton } from "@clerk/nextjs";
import "./style.scss";
import { useRouter } from "next/navigation";

const NotAdmin = () => {
  const router = useRouter();

  return (
    <section id="notAdmin">
      <h3>You are not an Admin</h3>
      <p>Please Sign Out</p>
      <button>
        <SignOutButton signOutCallback={() => router.push("/")} />
      </button>
    </section>
  );
};

export default NotAdmin;
