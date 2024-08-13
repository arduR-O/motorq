"use client"
import Header from "@/components/Header";
import { useState, useEffect } from "react";
import { useSearchParams } from 'next/navigation'
import { Suspense } from "react";

const ScheduleContent = () => {
    const [driver, setDriver] = useState(null);
    const [loading, setLoading] = useState(true);
    const searchParams = useSearchParams();
    const id = searchParams.get("driverId");

    useEffect(() => {
        if (id) {
            const fetchDriver = async () => {
                try {
                    const response = await fetch(`/api/get-driver/${id}`);
                    const data = await response.json();
                    setDriver(data.driver);
                } catch (error) {
                    console.error('Error fetching driver details:', error);
                } finally {
                    setLoading(false);
                }
            };
            fetchDriver();
        } else {
            setLoading(false);
        }
    }, [id]);

    if (loading) {
        return <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
        </div>;
    }
    return ( 
        <main className="min-h-screen min-w-screen flex flex-col justify-start items-center gap-5 py-5">
            <Header content="Driver Schedule" />
            {driver.assignments.length === 0? <div className="mx-auto uppercase text-[16px] md:text-[12px]  md:mx-[10%] text-[#B7AB98] mb-2 tracking-[7px]">No assignments found.</div> :(<div className="overflow-x-auto">
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
              </tr>
            </thead>
            <tbody>
              {driver.assignments.map((assignment) => (
                <tr key={assignment.id} className="bg-black hover:bg-orange">
                  <td className="p-3 border-b">{assignment.vehicleId}</td>
                  <td className="p-3 border-b">
                    {new Date(assignment.startTime).toLocaleDateString()}
                  </td>
                  <td className="p-3 border-b">
                    {new Date(assignment.startTime).toLocaleTimeString()}
                  </td>
                  <td className="p-3 border-b">
                    {new Date(assignment.endTime).toLocaleDateString()}
                  </td>
                  <td className="p-3 border-b">
                    {new Date(assignment.endTime).toLocaleTimeString()}
                  </td>
                </tr>
              ))}
            </tbody>
                </table>
            </div>)}
            
        </main>
     );
}

const Schedule = () => (
    <Suspense fallback={<div>Loading...</div>}>
      <ScheduleContent />
    </Suspense>
  );
export default Schedule;