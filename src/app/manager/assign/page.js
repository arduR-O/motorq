"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';

const Page = () => {
    const [vehicles, setVehicles] = useState([]);
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [filteredVehicles, setFilteredVehicles] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

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
        <div className="text-white">
            <input
                type="datetime-local"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                placeholder="Start Time"
                className="text-black"
            />
            <input
                type="datetime-local"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                placeholder="End Time"
                className="text-black"
                min={startTime}
            />
            <button onClick={handleFilter}>Filter</button>
            <div>
                {filteredVehicles.length > 0 && (
                    <div>
                        <h2 className="text-2xl">Vehicles</h2>
                        {filteredVehicles.map((vehicle) => (
                            <div key={vehicle.id} className="flex gap-3">
                                <p>
                                    {vehicle.model} - {vehicle.license}
                                </p>
                                {vehicle.driverId ? (
                                    <button onClick={() => handleUnassign(vehicle.id)} disabled={isLoading}>
                                        Unassign
                                    </button>
                                ) : (
                                    <Link href={`/manager/assign/drivers/${encodeURIComponent(vehicle.id)}`}>
                                        <button>Assign</button>
                                    </Link>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Page;