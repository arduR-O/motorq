"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

const AssignDriver = () => {
  const [vehicles, setVehicles] = useState([]);
  const [driverId, setDriverId] = useState("");
  const [vehicleId, setVehicleId] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Fetch vehicles from the backend
    const fetchVehicles = async () => {
      try {
        const response = await fetch("/api/get-vehicles"); // Adjust the endpoint as needed
        const data = await response.json();
        setVehicles(data);
      } catch (error) {
        console.error("Error fetching vehicles:", error);
      }
    };

    fetchVehicles();
  }, []);

  

  const handleUnassign = async (vehicleId) => {
    setIsLoading(true);
    try {
      // Unassign driver from vehicle
      await fetch(`/api/assign-driver`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ vehicleId }),
      });
      // Update the vehicle list
      setVehicles((prevVehicles) =>
        prevVehicles.map((vehicle) =>
          vehicle.id === vehicleId ? { ...vehicle, driverId: null } : vehicle
        )
      );
    } catch (error) {
      console.error("Error unassigning driver:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const assignedVehicles = vehicles.filter((vehicle) => vehicle.driverId);
  const unassignedVehicles = vehicles.filter((vehicle) => !vehicle.driverId);

  return (
    <div>
      {assignedVehicles.length > 0 && (
        <div>
          <h2 className="text-2xl">Assigned Vehicles</h2>
          {assignedVehicles.map((vehicle) => (
            <div key={vehicle.id} className="flex gap-3">
              <p>
                {vehicle.model} - {vehicle.license}
              </p>
              <button onClick={() => handleUnassign(vehicle.id)} disabled={isLoading}>
                Unassign
              </button>
            </div>
          ))}
        </div>
      )}
      {unassignedVehicles.length > 0 && (
        <div>
          <h2 className="text-2xl">Unassigned Vehicles</h2>
          {unassignedVehicles.map((vehicle) => (
            <div key={vehicle.id} className="flex gap-3">
              <p>
                {vehicle.model} - {vehicle.license}
              </p>
              <Link href={`/assign/drivers/${encodeURIComponent(vehicle.id)}`}>
                <button>Assign</button>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AssignDriver;
