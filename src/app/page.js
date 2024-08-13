"use client";

import React from "react";
import Link from "next/link";
import OrgButton from "@/components/OrgButton";
import Header from "@/components/Header";

const Page = () => {
  return (
    <div className="min-h-screen min-w-screen flex flex-col justify-center items-center gap-10">
      <div className="w-[25vw] flex flex-col items-center">
      <Header content={"Role"}/>
      </div>
      <div className="flex flex-col h-[40vh] w-[25vw] justify-evenly border-8 border-grey rounded-3xl">
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
