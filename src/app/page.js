import React from 'react';
import Link from 'next/link';

const Page = () => {
    return (
        <div className="min-h-full min-w-full flex justify-center items-center gap-10">
            <Link href="/manager">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Manager</button>
            </Link>
            <Link href="/driver">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Driver</button>
            </Link>
        </div>
    );
};

export default Page;