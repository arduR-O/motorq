"use client"
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const AssignDriver = ({ params }) => {
    const vehicleId = params.id;
    const [drivers, setDrivers] = useState([]);
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const router = useRouter();

    const fetchUnassignedDrivers = async () => {
        try {
            const response = await fetch(`/api/get-drivers/unassigned?startTime=${startTime}&endTime=${endTime}`);
            const data = await response.json();
            setDrivers(data);
        } catch (error) {
            console.error('Error fetching unassigned drivers:', error);
        }
    };

    const handleAssign = async (driverId) => {
        try {
            // Assign driver to vehicle
            const response = await fetch(`/api/assign-driver`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ driverId, vehicleId, startTime, endTime }),
            });

            const data = await response.json();
            if (response.ok) {
                router.push('/manager/assign');
            } else {
                alert(data.error);
            }
        } catch (error) {
            console.error("Error assigning driver:", error);
        }
    };

    useEffect(() => {
        if (startTime && endTime) {
            fetchUnassignedDrivers();
        }
    }, [startTime, endTime]);
    
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
                min={startTime} // Set the minimum value for end time
            />
            {startTime && endTime && drivers.map((driver) => (
                <div key={driver.id} className="flex gap-3">
                    <p>{driver.name}</p>
                    <button onClick={() => handleAssign(driver.id)}>Assign</button>
                </div>
            ))}
        </div>
    );
}

export default AssignDriver;