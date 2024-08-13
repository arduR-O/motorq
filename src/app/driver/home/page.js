// 'use client'
// import Link from "next/link";

// const Home = () => {
//     const searchParams = useSearchParams();
//     const driverId = searchParams.get("driverId");
//     return (
//         <div className="min-h-full min-w-full flex flex-col gap-5 justify-center items-center">
//             <Link href={`/driver/requests?driverId=${encodeURIComponent(driverId)}`}>
//             <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
//                 View Requests
//             </button>
//             </Link>
//             <Link href={`/driver/schedule?driverId=${encodeURIComponent(driverId)}`}>
//             <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
//                 View Schedule
//             </button>
//             </Link>
//         </div>
//      );
// }

"use client";
import Link from "next/link";
import OrgButton from "@/components/OrgButton";
import Header from "@/components/header";
import { useSearchParams } from 'next/navigation'

const Home = () => {
    const searchParams = useSearchParams();
    const driverId = searchParams.get("driverId");
  return (
    <main className="min-h-screen min-w-screen flex flex-col justify-center items-center gap-2">
      <Header content="Driver Home" />
      <div className="flex flex-col h-[55vh] w-[25vw] justify-evenly border-4 border-grey rounded-3xl items-center">
        <Link
          href={`/driver/requests?driverId=${encodeURIComponent(driverId)}`}
        >
          <OrgButton content="Add Driver" />
        </Link>
        <Link
          href={`/driver/schedule?driverId=${encodeURIComponent(driverId)}`}
        >
          <OrgButton content="View Schedule" />
        </Link>
      </div>
    </main>
  );
};

export default Home;
