"use client"
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const AssignDriver = ({ params }) => {
    const vehicleId = params.id;
    const [drivers, setDrivers] = useState([]);
    const [selectedDrivers, setSelectedDrivers] = useState([]);
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

    const handleDriverSelection = (driverId) => {
        setSelectedDrivers((prevSelectedDrivers) => {
            if (prevSelectedDrivers.includes(driverId)) {
                return prevSelectedDrivers.filter((id) => id !== driverId);
            } else {
                return [...prevSelectedDrivers, driverId];
            }
        });
    };

    const handleRequest = async (driverId) => {
        try {
            const response = await fetch(`/api/request-driver`, {
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
            console.error("Error requesting driver assignment:", error);
        }
    };

    const handleMassRequest = async () => {
        try {
            const response = await fetch(`/api/request-drivers`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ driverIds: selectedDrivers, vehicleId, startTime, endTime }),
            });

            const data = await response.json();
            if (response.ok) {
                router.push('/manager/assign');
            } else {
                alert(data.error);
            }
        } catch (error) {
            console.error("Error requesting driver assignments:", error);
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
                    <input
                        type="checkbox"
                        checked={selectedDrivers.includes(driver.id)}
                        onChange={() => handleDriverSelection(driver.id)}
                    />
                    <p>{driver.name}</p>
                    <button onClick={() => handleRequest(driver.id)}>Request Assignment</button>
                </div>
            ))}
            <button onClick={handleMassRequest}>Request Selected Drivers</button>
        </div>
    );
}

export default AssignDriver;