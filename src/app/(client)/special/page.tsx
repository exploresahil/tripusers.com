"use client";

import Loader from "@/src/components/default/loader/Loader";
import { useRouter } from "next/navigation";
import { useLayoutEffect } from "react";

const page = () => {
  const router = useRouter();

  useLayoutEffect(() => {
    router.push("/");
  }, []);
  return <Loader />;
};

export default page;
