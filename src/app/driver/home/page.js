import Link from "next/link";
const Home = () => {
    return ( 
        <div className="min-h-full min-w-full flex flex-col gap-5 justify-center items-center">    
            <Link href="/driver/requests">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                View Requests
            </button>
            </Link>
            <Link href="/driver/schedule">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                View Schedule
            </button>
            </Link>
        </div>
     );
}
 
export default Home;