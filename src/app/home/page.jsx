import Link from "next/link";
const Home = () => {
    return ( 

        <main className="h-screen w-screen flex justify-center items-center">
        <div className="flex flex-col gap-6">
            <Link href="/create">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Create</button>
            </Link>
            <Link href="/drivers">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Drivers</button>
            </Link>
            <Link href="/assign">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Assign Drivers</button>
            </Link>
        </div>
        </main>
     );
}
 
export default Home;

