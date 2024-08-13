"use client"
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Header from "@/components/Header";

const RequestsContent = () => {
    const [requests, setRequests] = useState([]);
    const searchParams = useSearchParams();
    const driverId = searchParams.get("driverId");

    const fetchPendingRequests = async () => {
        try {
            const response = await fetch(`/api/get-requests/${encodeURIComponent(driverId)}`);
            const data = await response.json();
            setRequests(data);
        } catch (error) {
            console.error('Error fetching pending requests:', error);
        }
    };

    const handleRequestAction = async (requestId, action) => {
        try {
            const response = await fetch(`/api/update-request`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ requestId, action }),
            });
            if(!response.ok){
                alert("request has already been accepted");
                setRequests(requests.filter(request => request.id !== requestId));
            }
            const data = await response.json();
            console.log(data);
            if (response.ok) {
                alert("request accepted successfully")
                setRequests(requests.filter(request => request.id !== requestId));
            } else {
                alert(data.error);
            }
        } catch (error) {
            console.error("Error updating request:", error);
        }
    };

    useEffect(() => {
        fetchPendingRequests();
    }, []);

    return (
        <div className="p-4 flex flex-col gap-4 items-center">
            <Header content="Manage Requests"/>
            {requests.length === 0 && <p className="m-auto uppercase text-[16px] md:text-[12px] mx-[13%] md:mx-[10%] text-[#B7AB98] mb-2 tracking-[7px]">No pending requests</p>}
            <div className="overflow-x-auto">

                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="p-3 font-bold uppercase text-gray-600 border-b">Vehicle Model</th>
                            <th className="p-3 font-bold uppercase text-gray-600 border-b">Start Date</th>
                            <th className="p-3 font-bold uppercase text-gray-600 border-b">Start Time</th>
                            <th className="p-3 font-bold uppercase text-gray-600 border-b">End Date</th>
                            <th className="p-3 font-bold uppercase text-gray-600 border-b">End Time</th>
                            <th className="p-3 font-bold uppercase text-gray-600 border-b">Response</th>

                        </tr>
                    </thead>
                    <tbody>
                        {requests.map(request => (
                            <tr key={request.id} className="bg-black hover:bg-orange">
                                <td className="p-3 border-b">{request.vehicleId}</td>
                                <td className="p-3 border-b">{new Date(request.startTime).toLocaleDateString()}</td>
                                <td className="p-3 border-b">{new Date(request.startTime).toLocaleTimeString()}</td>
                                <td className="p-3 border-b">{new Date(request.endTime).toLocaleDateString()}</td>
                                <td className="p-3 border-b">{new Date(request.endTime).toLocaleTimeString()}</td>
                                <td className="p-3 border-b">{<div className="flex gap-4"><button className="bg-black p-2" onClick={() => handleRequestAction(request.id, 'APPROVED')}>✔️</button>
                                <button className="bg-black p-2" onClick={() => handleRequestAction(request.id, 'REJECTED')}>❌</button></div>}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* {requests.map((request) => (
                <div key={request.id} className="flex gap-3 text-white">
                    <p>{`Request for vehicle ${request.vehicle.model} from ${new Date(request.startTime).toLocaleString()} to ${new Date(request.endTime).toLocaleString()}`}</p>
                    <button onClick={() => handleRequestAction(request.id, 'APPROVED')}>✔️</button>
                    <button onClick={() => handleRequestAction(request.id, 'REJECTED')}>❌</button>
                </div>
            ))} */}
        </div>
    );
}
const Requests = () => (
    <Suspense fallback={<div>Loading...</div>}>
      <RequestsContent />
    </Suspense>
  );
export default Requests;