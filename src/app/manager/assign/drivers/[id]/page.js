"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import MapSelector from "@/components/MapSelector";
import { motion } from "framer-motion";
const AssignDriver = ({ params }) => {
  const vehicleId = params.id;
  const [drivers, setDrivers] = useState([]);
  const [selectedDrivers, setSelectedDrivers] = useState([]);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [isMapVisible, setIsMapVisible] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [searchRadius, setSearchRadius] = useState("");
  const [filteredDrivers, setFilteredDrivers] = useState([]);

  const router = useRouter();

  const fetchUnassignedDrivers = async () => {
    try {
      const response = await fetch(
        `/api/get-drivers/unassigned?startTime=${startTime}&endTime=${endTime}`
      );
      const data = await response.json();
      setDrivers(data);
      setFilteredDrivers(data);
    } catch (error) {
      console.error("Error fetching unassigned drivers:", error);
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
        router.push("/manager/assign");
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
        body: JSON.stringify({
          driverIds: selectedDrivers,
          vehicleId,
          startTime,
          endTime,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        router.push("/manager/assign");
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

  const handleFilterByLocation = () => {
    if (selectedLocation && searchRadius) {
      const radius = parseFloat(searchRadius);
      const filtered = drivers.filter((driver) => {
        const distance = calculateDistance(selectedLocation, driver.location);
        return distance <= radius;
      });
      setFilteredDrivers(filtered);
    }
  };

  const calculateDistance = (location1, location2) => {
    const R = 6371; // Radius of the Earth in km
    location2 = JSON.parse(location2);
    const dLat = (location2.lat - location1.lat) * (Math.PI / 180);
    const dLng = (location2.lng - location1.lng) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(location1.lat * (Math.PI / 180)) *
        Math.cos(location2.lat * (Math.PI / 180)) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in km
    console.log(distance);
    return distance;
  };

  return (
    <div className="text-white">
      <div className="flex gap-4">
        <input
          type="datetime-local"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          placeholder="Start Time"
          className="text-black mb-4 p-2 border rounded self-start"
        />
        <input
          type="datetime-local"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          placeholder="End Time"
          className="text-black mb-4 p-2 border rounded self-start"
          min={startTime}
        />
      </div>
      {startTime && endTime && (
        <motion.button
          className={`text-grey text-xl rounded-full border-2 border-grey w-56 py-3  hover:bg-[#de4c2c] hover:border-4 hover:text-black hover:font-bold bg-[#0d0d0d] hover:border-[#de4c2c] self-center`}
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.1 }}
          onClick={() => setIsMapVisible(!isMapVisible)}
        >
          {isMapVisible ? "Hide Map" : "Filter by Location"}
        </motion.button>
      )}
      {isMapVisible && (
        <div>
          <MapSelector onLocationSelect={setSelectedLocation} />
          <input
            type="number"
            placeholder="Search Radius (km)"
            value={searchRadius}
            onChange={(e) => setSearchRadius(e.target.value)}
            className="text-black"
          />
          <motion.button
            className={`text-grey text-xl rounded-full border-2 border-grey w-56 py-3  hover:bg-[#de4c2c] hover:border-4 hover:text-black hover:font-bold bg-[#0d0d0d] hover:border-[#de4c2c] self-center`}
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.1 }}
            onClick={handleFilterByLocation}
          >
            Apply Filter
          </motion.button>
        </div>
      )}
      {startTime &&
        endTime &&
        filteredDrivers.map((driver) => (
          <div key={driver.id} className="flex gap-3">
            <input
              type="checkbox"
              checked={selectedDrivers.includes(driver.id)}
              onChange={() => handleDriverSelection(driver.id)}
            />
            <p>{driver.name}</p>
            <button onClick={() => handleRequest(driver.id)}>Request</button>
          </div>
        ))}
      {selectedDrivers.length > 0 && (
        <motion.button
          className={`text-grey text-xl rounded-full border-2 border-grey w-56 py-3  hover:bg-[#de4c2c] hover:border-4 hover:text-black hover:font-bold bg-[#0d0d0d] hover:border-[#de4c2c] self-center`}
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.1 }}
          onClick={handleMassRequest}
        >
          Request Drivers
        </motion.button>
      )}
      
    </div>
  );
};

export default AssignDriver;
