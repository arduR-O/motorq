"use client"
import React, { useState, useEffect } from 'react';

const AssignDriver = () => {
  const [vehicles, setVehicles] = useState([]);
  const [driverId, setDriverId] = useState('');
  const [vehicleId, setVehicleId] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Fetch vehicles from the backend
    const fetchVehicles = async () => {
      try {
        const response = await fetch('/api/get-vehicles'); // Adjust the endpoint as needed
        const data = await response.json();
        setVehicles(data);
      } catch (error) {
        console.error('Error fetching vehicles:', error);
      }
    };

    fetchVehicles();
  }, []);

  const handleAssign = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // Assign driver to vehicle
      await fetch(`/api/assign`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ driverId, vehicleId }),
      });
      // Update the vehicle list
      setVehicles((prevVehicles) =>
        prevVehicles.map((vehicle) =>
          vehicle.id === vehicleId ? { ...vehicle, driverId } : vehicle
        )
      );
    } catch (error) {
      console.error('Error assigning driver:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUnassign = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // Unassign driver from vehicle
      await fetch(`/api/unassign`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ vehicleId }),
      });
      // Update the vehicle list
      setVehicles((prevVehicles) =>
        prevVehicles.map((vehicle) =>
          vehicle.id === vehicleId ? { ...vehicle, driverId: null } : vehicle
        )
      );
    } catch (error) {
      console.error('Error unassigning driver:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const assignedVehicles = vehicles.filter((vehicle) => vehicle.driverId);
  const unassignedVehicles = vehicles.filter((vehicle) => !vehicle.driverId);

  return (
    <div>
      <div>
        <h2>Assigned Vehicles</h2>
        {assignedVehicles.map((vehicle) => (
          <div key={vehicle.id}>
            <p>{vehicle.model} - {vehicle.license}</p>
            <button onClick={() => handleUnassign({ target: { value: vehicle.id } })} disabled={isLoading}>Unassign</button>
          </div>
        ))}
      </div>
      <div>
        <h2>Unassigned Vehicles</h2>
        {unassignedVehicles.map((vehicle) => (
          <div key={vehicle.id}>
            <p>{vehicle.model} - {vehicle.license}</p>
            <button onClick={() => handleAssign({ target: { value: vehicle.id } })} disabled={isLoading}>Assign</button>
          </div>
        ))}
      </div>
      <form onSubmit={handleAssign}>
        <input type="text" value={driverId} onChange={(e) => setDriverId(e.target.value)} placeholder="Driver ID" required />
        <input type="text" value={vehicleId} onChange={(e) => setVehicleId(e.target.value)} placeholder="Vehicle ID" required />
        <button type="submit" disabled={isLoading}>Assign Driver</button>
      </form>
      <form onSubmit={handleUnassign}>
        <input type="text" value={vehicleId} onChange={(e) => setVehicleId(e.target.value)} placeholder="Vehicle ID" required />
        <button type="submit" disabled={isLoading}>Unassign Driver</button>
      </form>
    </div>
  );
};

export default AssignDriver;