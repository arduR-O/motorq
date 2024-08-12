"use client"
import {useState, useEffect} from "react";
import { useRouter } from "next/navigation";

const AssignDriver = ({params}) => {
    const vehicleId = params.id;
    const [drivers, setDrivers] = useState([]);
    const router = useRouter();
    const fetchUnassignedDrivers = async () => {
        try {
            const response = await fetch('/api/get-drivers/unassigned');
            const data = await response.json();
            setDrivers(data);
        } catch (error) {
            console.error('Error fetching unassigned drivers:', error);
        }
    };

    const handleAssign = async (driverId) => {
        try {
          // Assign driver to vehicle
          await fetch(`/api/assign-driver`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ driverId, vehicleId }),
          });
        } catch (error) {
          console.error("Error assigning driver:", error);
        } finally {
            router.push('/assign');
        }
      };

    useEffect(() => {
        fetchUnassignedDrivers();
    }, []);

    return (
        <div className="text-white">
            {drivers.map((driver) => (
                <div key={driver.id} className="flex gap-3">
                    <p>{driver.name}</p>
                    <button onClick={() => handleAssign(driver.id)}>Assign</button>
                </div>
            ))}
        </div>
    );
}
 
export default AssignDriver;