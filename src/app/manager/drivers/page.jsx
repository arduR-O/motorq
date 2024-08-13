"use client"
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
const Drivers = () => {
    const [drivers, setDrivers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredDrivers, setFilteredDrivers] = useState([]);

    useEffect(() => {
        async function fetchDrivers() {
            try {
                const response = await fetch('/api/get-drivers');
                const data = await response.json();
                setDrivers(data);
                setFilteredDrivers(data);
            } catch (error) {
                console.error('Error fetching drivers:', error);
            }
        }
        fetchDrivers();
    }, []);

    const handleSearch = (event) => {
        const term = event.target.value.toLowerCase();
        setSearchTerm(term);
        const filtered = drivers.filter(driver =>
            driver.name.toLowerCase().includes(term) ||
            driver.phone.toString().includes(term)
        );
        setFilteredDrivers(filtered);
    };

    return (
        <div className="p-4 flex flex-col gap-4 items-center">
            <Header content="View Drivers"/>
            <input
                type="text"
                placeholder="Search by name or number"
                value={searchTerm}
                onChange={handleSearch}
                className='text-black mb-4 p-2 border rounded self-start'
            />
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg self-start w-full">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-200">
                            <th scope="col" className="p-3 font-bold uppercase text-gray-600 border-b">
                                Driver ID
                            </th>
                            <th scope="col" className="p-3 font-bold uppercase text-gray-600 border-b">
                                Driver Name
                            </th>
                            <th scope="col" className="p-3 font-bold uppercase text-gray-600 border-b">
                                Phone
                            </th>
                            <th scope="col" className="p-3 font-bold uppercase text-gray-600 border-b">
                                <span className="sr-only">Details</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredDrivers.map(driver => (
                            <tr key={driver.id} className="bg-black hover:bg-orange">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {driver.id}
                                </th>
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {driver.name}
                                </th>
                                <td className="px-6 py-4">
                                    {driver.phone}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <Link href={`/manager/drivers/details/${encodeURIComponent(driver.id)}`}>
                                        <span className="font-medium text-blue-600 dark:text-blue-500 hover:text-black cursor-pointer">
                                            Details
                                        </span>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Drivers;