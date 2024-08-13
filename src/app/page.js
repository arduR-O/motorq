"use client";

import React from "react";
import Link from "next/link";
import OrgButton from "@/components/OrgButton";

const Page = () => {
  return (
    <div className="min-h-screen min-w-screen flex justify-center items-center gap-10">
      <div className="flex flex-col h-[55vh] w-[25vw] justify-evenly border-8 border-grey rounded-3xl">
        <h1 className="text-justify text-4xl tracking-wide font-bold leading-relaxed lg:text-2xl lg:tracking-wide lg:font-semibold sm:text-2xl sm:tracking-wide sm:font-semibold text-grey mt-5 m-auto hover:scale-105 hover:text-orange duration-100">
          Login As
        </h1>
        <div className="flex flex-col m-auto gap-10 items-center">
          <Link href="/manager">
            <OrgButton content={"Manager"} />
          </Link>
          <Link href="/driver">
            <OrgButton content={"Driver"} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Page;
