"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Header from "@/components/Header";
import { motion } from "framer-motion";

const RequestsContent = () => {
  const [requests, setRequests] = useState([]);
  const searchParams = useSearchParams();
  const driverId = searchParams.get("driverId");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const fetchPendingRequests = async () => {
    try {
      const response = await fetch(
        `/api/get-requests/${encodeURIComponent(driverId)}`
      );
      const data = await response.json();
      setRequests(data);
    } catch (error) {
      setErrorMessage("Error fetching pending requests:", error);
      setSuccessMessage("");
    }
  };

  const handleRequestAction = async (requestId, action) => {
    try {
      const response = await fetch(`/api/update-request`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ requestId, action }),
      });
      if (!response.ok) {
        setSuccessMessage("request has already been accepted");
        setErrorMessage("");
        setRequests(requests.filter((request) => request.id !== requestId));
      }
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        setSuccessMessage("response sent successfully");
        setErrorMessage("");
        setRequests(requests.filter((request) => request.id !== requestId));
      } else {
        alert(data.error);
      }
    } catch (error) {
      setErrorMessage("Error updating request:", error);
      setSuccessMessage("");
    }
  };

  useEffect(() => {
    fetchPendingRequests();
  }, []);

  return (
    <div className="p-4 flex flex-col gap-4 items-center">
      <Header content="Manage Requests" />
      {requests.length === 0 && (
        <p className="m-auto uppercase text-[16px] md:text-[12px] mx-[13%] md:mx-[10%] text-[#B7AB98] mb-2 tracking-[7px]">
          No pending requests
        </p>
      )}
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
      {requests.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-3 font-bold uppercase text-gray-600 border-b">
                  Vehicle Model
                </th>
                <th className="p-3 font-bold uppercase text-gray-600 border-b">
                  Start Date
                </th>
                <th className="p-3 font-bold uppercase text-gray-600 border-b">
                  Start Time
                </th>
                <th className="p-3 font-bold uppercase text-gray-600 border-b">
                  End Date
                </th>
                <th className="p-3 font-bold uppercase text-gray-600 border-b">
                  End Time
                </th>
                <th className="p-3 font-bold uppercase text-gray-600 border-b">
                  Response
                </th>
              </tr>
            </thead>
            <tbody>
              {requests.map((request) => (
                <tr key={request.id} className="bg-black hover:bg-orange">
                  <td className="p-3 border-b">{request.vehicleId}</td>
                  <td className="p-3 border-b">
                    {new Date(request.startTime).toLocaleDateString()}
                  </td>
                  <td className="p-3 border-b">
                    {new Date(request.startTime).toLocaleTimeString()}
                  </td>
                  <td className="p-3 border-b">
                    {new Date(request.endTime).toLocaleDateString()}
                  </td>
                  <td className="p-3 border-b">
                    {new Date(request.endTime).toLocaleTimeString()}
                  </td>
                  <td className="p-3 border-b">
                    {
                      <div className="flex gap-4">
                        <motion.button
                          className={`text-grey text-xl rounded-full border-2 border-grey w-fit p-3 hover:border-4 hover:text-black hover:font-bold bg-[#0d0d0d] hover:border-[#de4c2c]`}
                          whileTap={{ scale: 0.9 }}
                          whileHover={{ scale: 1.1 }}
                          onClick={() =>
                            handleRequestAction(request.id, "APPROVED")
                          }
                        >
                          ✔️
                        </motion.button>
                        <motion.button
                          className={`text-grey text-xl rounded-full border-2 border-grey w-fit p-3 hover:border-4 hover:text-black hover:font-bold bg-[#0d0d0d] hover:border-[#de4c2c]`}
                          whileTap={{ scale: 0.9 }}
                          whileHover={{ scale: 1.1 }}
                          onClick={() =>
                            handleRequestAction(request.id, "REJECTED")
                          }
                        >
                          ❌
                        </motion.button>
                      </div>
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
const Requests = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <RequestsContent />
  </Suspense>
);
export default Requests;
