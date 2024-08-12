"use client"
import { useState } from "react";

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

  return (

    <main className="h-screen w-screen flex justify-center items-center">
    <div>
        <form className="flex flex-col gap-6">
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
            >
                Submit
            </button>
        </form>
    </div>
    </main>
  );
};

export default Create;
