"use client"
import { useState } from "react";
import { PrismaClient } from "@prisma/client";

const Create = () => {
  const [driverId, setDriverId] = useState("");
  const [name, setName] = useState("");
  const [driverEmail, setDriverEmail] = useState("");
  const [driverPhone, setDriverPhone] = useState("");
  const [location, setLocation] = useState("");

  const handleDriverIdChange = (e) => {
    setDriverId(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleDriverEmailChange = (e) => {
    setDriverEmail(e.target.value);
  };

  const handleDriverPhoneChange = (e) => {
    setDriverPhone(e.target.value);
  };

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };
  
  const [isLoading, setIsLoading] = useState(false);

  const handleFormReset = () => {
    setDriverId("");
    setName("");
    setDriverEmail("");
    setDriverPhone("");
    setLocation("");
  };
  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    // setError("");
  
    try {
      const response = await fetch("/api/add-driver", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ driverId, name, driverEmail, driverPhone, location })
      });
  
      if (!response.ok) {
        alert("duplicate user id");
        const errorData = await response.json();
        console.error(errorData);
        // throw new Error(errorData.message || "Failed to add driver");
      }
  
      // If successful, reset the form
      handleFormReset();
      // You can add a success message here if you want
      // setSuccessMessage("Driver added successfully!");
    } catch (error) {
      console.error("Error creating data:", error);
      // setError(error.message || "An error occurred while adding the driver");
    } finally {
      setIsLoading(false);
    }
  }

  return (

    <main className="h-screen w-screen flex justify-center items-center">
    <div>
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2">
                <label htmlFor="driverId">Driver ID:</label>
                <input
                    className="text-black"
                    type="text"
                    id="driverId"
                    name="driverId"
                    required
                    value={driverId}
                    onChange={handleDriverIdChange}
                />
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="name">Name:</label>
                <input
                    className="text-black"
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={name}
                    onChange={handleNameChange}
                />
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="driverEmail">Driver Email:</label>
                <input
                    className="text-black"
                    type="email"
                    id="driverEmail"
                    name="driverEmail"
                    required
                    value={driverEmail}
                    onChange={handleDriverEmailChange}
                />
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="driverPhone">Driver Phone:</label>
                <input
                    className="text-black"
                    type="tel"
                    id="driverPhone"
                    name="driverPhone"
                    required
                    value={driverPhone}
                    onChange={handleDriverPhoneChange}
                />
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="location">Location:</label>
                <input
                    className="text-black"
                    type="text"
                    id="location"
                    name="location"
                    value={location}
                    onChange={handleLocationChange}
                />
            </div>

            <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                disabled={isLoading}
            >
                {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Creating...
                    </div>
                  ) : (
                    'Submit'
                  )}
            </button>
        </form>
    </div>
    </main>
  );
};

export default Create;
