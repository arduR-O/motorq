'use client'
import Link from "next/link";
import { useSearchParams } from 'next/navigation'

const Home = () => {
    const searchParams = useSearchParams();
    const driverId = searchParams.get("driverId");
    return ( 
        <div className="min-h-full min-w-full flex flex-col gap-5 justify-center items-center">    
            <Link href={`/driver/requests?driverId=${encodeURIComponent(driverId)}`}>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                View Requests
            </button>
            </Link>
            <Link href={`/driver/schedule?driverId=${encodeURIComponent(driverId)}`}>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                View Schedule
            </button>
            </Link>
        </div>
     );
}
 
export default Home;