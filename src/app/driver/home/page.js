"use client";
import Link from "next/link";
import OrgButton from "@/components/OrgButton";
import Header from "@/components/Header";
import { useSearchParams } from 'next/navigation'
import { Suspense } from "react";
const HomeContent = () => {
  const searchParams = useSearchParams();
  const driverId = searchParams.get("driverId");
  
  return (
          <main className="min-h-screen min-w-screen flex flex-col justify-center items-center gap-2">
              <Header content="Driver Home" />
              <div className="flex flex-col h-[55vh] w-[25vw] justify-evenly border-4 border-grey rounded-3xl items-center">
                  <Link href={`/driver/requests?driverId=${encodeURIComponent(driverId)}`}>
                      <OrgButton content="View Requests" />
                  </Link>
                  <Link href={`/driver/schedule?driverId=${encodeURIComponent(driverId)}`}>
                      <OrgButton content="View Schedule" />
                  </Link>
              </div>
          </main>
  );
};
const Home = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <HomeContent />
  </Suspense>
);

export default Home;
