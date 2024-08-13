"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import { useRouter } from "next/navigation";
import { animate, motion } from "framer-motion";


export default function Home() {
  const [driverID, setDriverID] = useState("");
  const [password, setPassword] = useState("");

  const handleDriverIDChange = (e) => setDriverID(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const handleSubmit = (e) => {
    console.log("Submitting form...");
    e.preventDefault();
    if (!driverID|| !password) {
      console.log("All fields are required.");
      setErrorMessage("All fields are required.");
      // setShake(true);
      // setTimeout(() => setShake(false), 500);
    } else {
      setErrorMessage("");
      // Perform any additional form submission logic here
      router.push(`/driver/home?driverId=${encodeURIComponent(driverID)}`); // Navigate to the desired page
    }
  };
  return (
    <main className="min-h-screen min-w-screen flex flex-col justify-center items-center gap-2">
      <div className="flex flex-col items-center gap-5">
        <Header content={"Driver Login"} />
      </div>
      <div
        className={`flex items-center p-4 mb-4 text-sm text-orange rounded-lg bg-yellow-50 dark:bg-black dark:text-grey border-2 border-orange`}
        role="alert"
        style={{
          visibility: errorMessage ? "visible" : "hidden",
          height: "50px",
        }}
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
          <span className="font-medium">alert!</span> {errorMessage}
        </div>
      </div>
      <div className="flex flex-col h-[55vh] w-[25vw] justify-evenly border-4 border-grey rounded-3xl items-center">
        <form
          className="flex flex-col items-center gap-4 justify-evenly h-full w-full"
          onSubmit={handleSubmit}
        >
          <div>
            <label
              className="ml-1 mr-auto text-left uppercase text-[16px] md:text-[12px] mx-[13%] md:mx-[10%] text-[#B7AB98] mt-2 mb-3 tracking-[7px]"
              htmlFor="username"
            >
              Driver ID:
            </label>
            <input
              type="text"
              placeholder="DriverID"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={driverID}
              onChange={handleDriverIDChange}
            />
          </div>
          <div>
            <label
              className="ml-1 mr-auto text-left uppercase text-[16px] md:text-[12px] mx-[13%] md:mx-[10%] text-[#B7AB98] mt-2 mb-3 tracking-[7px]"
              htmlFor="username"
            >
              Password
            </label>
            <input
              type="password"
              placeholder="Password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <div className="flex justify-center items-center">
            <motion.button
              className={`text-grey text-xl rounded-full border-2 border-grey w-56 py-3 hover:bg-[#de4c2c] hover:border-4 hover:text-black hover:font-bold bg-[#0d0d0d] hover:border-[#de4c2c] m-auto`}
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.1 }}
              type="submit"
            >
              Submit
            </motion.button>
          </div>
        </form>
      </div>
    </main>
  );
}
