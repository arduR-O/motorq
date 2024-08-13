"use client"
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
const MapSelector = dynamic(() => import("@/components/MapSelector"), {
  ssr: false,
});
const Create = () => {
  const [driverId, setDriverId] = useState("");
  const [name, setName] = useState("");
  const [driverEmail, setDriverEmail] = useState("");
  const [driverPhone, setDriverPhone] = useState("");
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

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

    if (
      !driverId ||
      !name ||
      !driverEmail ||
      !driverPhone ||
      !selectedLocation
    ) {
      console.log("Allfields are required.");
      setErrorMessage("All fields are required.");
      setSuccessMessage("");
      setIsLoading(false);

      // setShake(true);
      // setTimeout(() => setShake(false), 500);
    } else {
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
          setSuccessMessage("Driver added successfully!");
          setErrorMessage("");
        }
      } catch (error) {
        console.error("Error creating data:", error);
        setErrorMessage("An error occurred while adding the driver");
        setSuccessMessage("");
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <main className="min-h-screen min-w-screen flex flex-col justify-center items-center gap-2 p-4 ">
      <Header content="Add Driver" />
      <div className="flex flex-col min-h-[55vh] min-w-[40vw] justify-evenly border-4 border-grey rounded-3xl items-center p-7 px-8">
        <form
          className="flex flex-col items-center gap-4 justify-evenly h-full w-full"
          onSubmit={handleSubmit}
        >
          <div className="w-full">
            <label
              className="ml-1 mr-auto text-left uppercase text-[16px] md:text-[12px] mx-[13%] md:mx-[10%] text-[#B7AB98] mt-2 mb-3 tracking-[7px]"
              htmlFor="driverId"
            >
              Driver ID:
            </label>
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
              id="driverId"
              name="driverId"
              value={driverId}
              onChange={handleDriverIdChange}
            />
          </div>
          <div className="w-full">
            <label
              className="ml-1 mr-auto text-left uppercase text-[16px] md:text-[12px] mx-[13%] md:mx-[10%] text-[#B7AB98] mt-2 mb-3 tracking-[7px]"
              htmlFor="name"
            >
              Name:
            </label>
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={handleNameChange}
            />
          </div>
          <div className="w-full">
            <label
              className="ml-1 mr-auto text-left uppercase text-[16px] md:text-[12px] mx-[13%] md:mx-[10%] text-[#B7AB98] mt-2 mb-3 tracking-[7px]"
              htmlFor="driverEmail"
            >
              Driver Email:
            </label>
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="email"
              id="driverEmail"
              name="driverEmail"
              value={driverEmail}
              onChange={handleDriverEmailChange}
            />
          </div>
          <div className="w-full">
            <label
              className="ml-1 mr-auto text-left uppercase text-[16px] md:text-[12px] mx-[13%] md:mx-[10%] text-[#B7AB98] mt-2 mb-3 tracking-[7px]"
              htmlFor="driverPhone"
            >
              Driver Phone:
            </label>
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="tel"
              id="driverPhone"
              name="driverPhone"
              value={driverPhone}
              onChange={handleDriverPhoneChange}
            />
          </div>
          <div className="w-full">
            <label
              className="ml-1 mr-auto text-left uppercase text-[16px] md:text-[12px] mx-[13%] md:mx-[10%] text-[#B7AB98] mt-2 mb-3 tracking-[7px]"
              htmlFor="location"
            >
              Location:
            </label>
            <MapSelector onLocationSelect={setSelectedLocation} />
            {selectedLocation && (
              <p className="ml-1 mr-auto text-left uppercase text-[16px] md:text-[12px] mx-[13%] md:mx-[10%] text-[#B7AB98] mt-2 mb-3 tracking-[3px]">
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

      <div className="h-[50px] w-full max-w-[40vw] mt-4">
        {successMessage ? (
          <div
            className={`flex items-center p-4 text-sm text-green-500 rounded-lg bg-green-50 dark:bg-black dark:text-grey border-2 border-green-500`}
            role="alert"
          >
            <svg
              className="flex-shrink-0 inline w-4 h-4 me-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="green"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
            </svg>
            <span className="sr-only">Success</span>
            <div>
              <span className="font-medium">Success!</span> {successMessage}
            </div>
          </div>
        ) : errorMessage ? (
          <div
            className={`flex items-center p-4 text-sm text-orange rounded-lg bg-yellow-50 dark:bg-black dark:text-grey border-2 border-orange`}
            role="alert"
          >
            <svg
              className="flex-shrink-0 inline w-4 h-4 me-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="orange"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
            </svg>
            <span className="sr-only">Info</span>
            <div>
              <span className="font-medium">Alert!</span> {errorMessage}
            </div>
          </div>
        ) : null}
      </div>
      {/* <div
        className={`flex items-center p-4 mb-4 text-sm text-orange rounded-lg bg-yellow-50 dark:bg-black dark:text-grey border-2 border-orange`}
        role="alert"
        style={{ visibility: errorMessage ? 'visible' : 'hidden', height: '50px' }}
      >
        <svg
          className="flex-shrink-0 inline w-4 h-4 me-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="orange"
          viewBox="0 0 20 20"
        >
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
        </svg>
        <span className="sr-only">Info</span>
        <div>
          <span className="font-medium">alert!</span> {errorMessage}
        </div>
      </div> */}
    </main>
  );
};

export default Create;
