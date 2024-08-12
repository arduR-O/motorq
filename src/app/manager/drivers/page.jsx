"use client"
import { useState, useEffect } from 'react';
import Link from 'next/link';

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
                    <div key={driver.id}>
                        <div>{driver.name} - {driver.phone}</div>
                        <Link href={`/manager/drivers/details/${encodeURIComponent(driver.id)}`}><button>details</button></Link>
                    </div>
                ))}
            </ul>
        </div>
    );
};

export default Drivers;