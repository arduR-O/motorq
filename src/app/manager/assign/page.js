"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import {motion} from "framer-motion";
const Page = () => {
    const [vehicles, setVehicles] = useState([]);
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [filteredVehicles, setFilteredVehicles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Fetch all vehicles initially
        fetchVehicles();
    }, []);

    const fetchVehicles = async () => {
        setIsLoading(true);
        const response = await fetch('/api/get-vehicles');
        const data = await response.json();
        setVehicles(data);
        setFilteredVehicles(data);
        setIsLoading(false);
    };

    // !TODO: Either make it so that it does filtering on the frontend itself or ask user for dates before fetching data, there is no point in making two calls to the backend 
    const handleFilter = async () => {
        if (startTime && endTime) {
            setIsLoading(true);
            const response = await fetch(`/api/get-vehicles?startTime=${encodeURIComponent(startTime)}&endTime=${encodeURIComponent(endTime)}`);
            const data = await response.json();
            setFilteredVehicles(data);
            setIsLoading(false);
        } else {
            setFilteredVehicles(vehicles);
        }
    };

    return (
        <div className="p-4 flex flex-col gap-4 items-center">
            <Header content="Assign Drivers"/>
            <div className='flex gap-4'>
            <input
                type="datetime-local"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                placeholder="Start Time"
                className='text-black mb-4 p-2 border rounded self-start'
                max={endTime}
                />
            <input
                type="datetime-local"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                placeholder="End Time"
                className='text-black mb-4 p-2 border rounded self-start'
                min={startTime}
                />
                </div>
<div className="w-56 h-[52px] flex items-center justify-center">
<motion.button
              className={`text-grey text-xl rounded-full border-2 border-grey w-56 py-3 hover:bg-[#de4c2c] hover:border-4 hover:text-black hover:font-bold bg-[#0d0d0d] hover:border-[#de4c2c] m-auto`}
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.1 }}
              disabled={isLoading}
              style={{ transformOrigin: 'center', transformStyle: 'preserve-3d' }}
              onClick={handleFilter}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Loading...
                </div>
              ) : (
                "Filter"
              )}
            </motion.button>
</div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg self-start w-full">{ !isLoading &&
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-200">
                            <th scope="col" className="p-3 font-bold uppercase text-gray-600 border-b">
                                Vehicle ID
                            </th>
                            <th scope="col" className="p-3 font-bold uppercase text-gray-600 border-b">
                                Model
                            </th>
                            <th scope="col" className="p-3 font-bold uppercase text-gray-600 border-b">
                                License
                            </th>
                            <th scope="col" className="p-3 font-bold uppercase text-gray-600 border-b">
                                <span className="sr-only">Drivers</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredVehicles.map(vehicle => (
                            <tr key={vehicle.id} className="bg-black hover:bg-orange">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {vehicle.id}
                                </th>
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {vehicle.model}
                                </th>
                                <td className="px-6 py-4">
                                    {vehicle.license}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <Link href={`/manager/assign/drivers/${encodeURIComponent(vehicle.id)}`}>
                                        <span className="font-medium text-blue-600 dark:text-blue-500 hover:text-black cursor-pointer">
                                            See Drivers
                                        </span>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                }
            </div>
        </div>
    );
};

export default Page;