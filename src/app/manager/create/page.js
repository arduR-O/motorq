"use client";
import { useEffect, useState } from "react";
import MapSelector from "@/components/MapSelector";
import { motion } from "framer-motion";
const Create = () => {
  const [driverId, setDriverId] = useState("");
  const [name, setName] = useState("");
  const [driverEmail, setDriverEmail] = useState("");
  const [driverPhone, setDriverPhone] = useState("");
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleDriverIdChange = (e) => setDriverId(e.target.value);
  const handleNameChange = (e) => setName(e.target.value);
  const handleDriverEmailChange = (e) => setDriverEmail(e.target.value);
  const handleDriverPhoneChange = (e) => setDriverPhone(e.target.value);

  const handleFormReset = () => {
    setDriverId("");
    setName("");
    setDriverEmail("");
    setDriverPhone("");
    setSelectedLocation(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/add-driver", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          driverId,
          name,
          driverEmail,
          driverPhone,
          location: JSON.stringify(selectedLocation), // Convert object to string
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(errorData.message || "Failed to add driver");
        console.error(errorData);
      } else {
        handleFormReset();
        alert("Driver added successfully!");
      }
    } catch (error) {
      console.error("Error creating data:", error);
      alert("An error occurred while adding the driver");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen min-w-screen flex flex-col justify-center items-center gap-2">
      <div className="flex flex-col h-[55vh] w-[25vw] justify-evenly border-4 border-grey rounded-3xl items-center">
        <form className="flex flex-col items-center gap-4 justify-evenly h-full w-full" onSubmit={handleSubmit}>
          <div>
            <label className="ml-1 mr-auto text-left uppercase text-[16px] md:text-[12px] mx-[13%] md:mx-[10%] text-[#B7AB98] mt-2 mb-3 tracking-[7px]" htmlFor="driverId">Driver ID:</label>
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
              id="driverId"
              name="driverId"
              required
              value={driverId}
              onChange={handleDriverIdChange}
            />
          </div>
          <div>
            <label className="ml-1 mr-auto text-left uppercase text-[16px] md:text-[12px] mx-[13%] md:mx-[10%] text-[#B7AB98] mt-2 mb-3 tracking-[7px]" htmlFor="name">Name:</label>
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
              id="name"
              name="name"
              required
              value={name}
              onChange={handleNameChange}
            />
          </div>
          <div>
            <label className="ml-1 mr-auto text-left uppercase text-[16px] md:text-[12px] mx-[13%] md:mx-[10%] text-[#B7AB98] mt-2 mb-3 tracking-[7px]" htmlFor="driverEmail">Driver Email:</label>
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="email"
              id="driverEmail"
              name="driverEmail"
              required
              value={driverEmail}
              onChange={handleDriverEmailChange}
            />
          </div>
          <div>
            <label className="ml-1 mr-auto text-left uppercase text-[16px] md:text-[12px] mx-[13%] md:mx-[10%] text-[#B7AB98] mt-2 mb-3 tracking-[7px]" htmlFor="driverPhone">Driver Phone:</label>
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="tel"
              id="driverPhone"
              name="driverPhone"
              required
              value={driverPhone}
              onChange={handleDriverPhoneChange}
            />
          </div>
          <div>
            <label className="ml-1 mr-auto text-left uppercase text-[16px] md:text-[12px] mx-[13%] md:mx-[10%] text-[#B7AB98] mt-2 mb-3 tracking-[7px]" htmlFor="location">Location</label>
            <MapSelector onLocationSelect={setSelectedLocation} />
            {selectedLocation && (
              <p>
                Selected Location: {selectedLocation.lat},{" "}
                {selectedLocation.lng}
              </p>
            )}
          </div>
          <motion.button
              className={`text-grey text-xl rounded-full border-2 border-grey w-56 py-3 hover:bg-[#de4c2c] hover:border-4 hover:text-black hover:font-bold bg-[#0d0d0d] hover:border-[#de4c2c] m-auto`}
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.1 }}
              type="submit"
              disabled={isLoading}
            >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Loading...
              </div>
            ) : (
              "Add Driver"
            )}
          </motion.button>
        </form>
      </div>
    </main>
  );
};

export default Create;
