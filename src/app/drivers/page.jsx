"use client"
import { useState, useEffect } from 'react';
import prisma from "@/lib/prisma";

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
        <div>
            <input
                type="text"
                placeholder="Search by name or number"
                value={searchTerm}
                onChange={handleSearch}
                className='text-black'
            />
            <ul>
                {filteredDrivers.map(driver => (
                    <li key={driver.id}>
                        {driver.name} - {driver.phone}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Drivers;