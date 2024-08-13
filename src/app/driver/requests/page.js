"use client"
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";


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
        <div className="text-white">
            {requests.map((request) => (
                <div key={request.id} className="flex gap-3">
                    <p>{`Request for vehicle ${request.vehicle.model} from ${new Date(request.startTime).toLocaleString()} to ${new Date(request.endTime).toLocaleString()}`}</p>
                    <button onClick={() => handleRequestAction(request.id, 'APPROVED')}>✔️</button>
                    <button onClick={() => handleRequestAction(request.id, 'REJECTED')}>❌</button>
                </div>
            ))}
        </div>
    );
}
const Requests = () => (
    <Suspense fallback={<div>Loading...</div>}>
      <RequestsContent />
    </Suspense>
  );
export default Requests;