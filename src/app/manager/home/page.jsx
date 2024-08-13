"use client"
import Link from "next/link";
import OrgButton from "@/components/OrgButton";
import Header from "@/components/Header";
const Home = () => {
    return ( 

        <main className="min-h-screen min-w-screen flex flex-col justify-center items-center gap-2">
        <Header content="Manager Home" />
        <div className="flex flex-col h-[55vh] w-[25vw] justify-evenly border-4 border-grey rounded-3xl items-center">
            <Link href="/manager/create">
            <OrgButton content="Add Driver" />
            </Link>
            <Link href="/manager/drivers">
            <OrgButton content="View Drivers" />
            </Link>
            <Link href="/manager/assign">
            <OrgButton content="Assign Driver" />
            </Link>
        </div>
        </main>
     );
}
 
export default Home;

