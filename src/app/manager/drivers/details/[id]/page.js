"use client"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';

const DriverDetails = ({ params }) => {
    const router = useRouter();
    const id = params?.id;
    const [driver, setDriver] = useState(null);
    const [loading, setLoading] = useState(true);

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

    if (!driver) {
        return <div className="text-center text-2xl text-gray-600 mt-10">No driver found.</div>;
    }
    const location = JSON.parse(driver.location);
    return (
        <div className="max-w-4xl mx-auto p-6 bg-black shadow-lg rounded-lg mt-10 flex flex-col gap-4">
            <Header content="Driver Details" />

            <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-black border-2 border-gray p-4 rounded">
                    <p className="ml-1 mr-auto text-left uppercase text-[16px] md:text-[12px] mx-[13%] md:mx-[10%] text-[#B7AB98] mb-2 tracking-[7px]">Name</p>
                    <p className="text-lg font-semibold">{driver.name}</p>
                </div>
                <div className="bg-black border-2 border-gray p-4 rounded">
                    <p className="ml-1 mr-auto text-left uppercase text-[16px] md:text-[12px] mx-[13%] md:mx-[10%] text-[#B7AB98] mb-2 tracking-[7px]">Email</p>
                    <p className="text-lg font-semibold">{driver.email}</p>
                </div>
                <div className="bg-black border-2 border-gray p-4 rounded">
                    <p className="ml-1 mr-auto text-left uppercase text-[16px] md:text-[12px] mx-[13%] md:mx-[10%] text-[#B7AB98] mb-2 tracking-[7px]">Phone</p>
                    <p className="text-lg font-semibold">{driver.phone}</p>
                </div>
                <div className="bg-black border-2 border-gray p-4 rounded">
                    <p className="ml-1 mr-auto text-left uppercase text-[16px] md:text-[12px] mx-[13%] md:mx-[10%] text-[#B7AB98] mb-2 tracking-[7px]">Location</p>
                    <p className="text-lg font-semibold">({location.lat}, {location.lng})</p>
                </div>
            </div>
            
            <h2 className="text-2xl font-bold text-grey mb-4">Assignments</h2>
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="p-3 font-bold uppercase text-gray-600 border-b">Vehicle ID</th>
                            <th className="p-3 font-bold uppercase text-gray-600 border-b">Start Time</th>
                            <th className="p-3 font-bold uppercase text-gray-600 border-b">End Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {driver.assignments.map(assignment => (
                            <tr key={assignment.id} className="bg-black hover:bg-orange">
                                <td className="p-3 border-b">{assignment.vehicleId}</td>
                                <td className="p-3 border-b">{new Date(assignment.startTime).toLocaleString()}</td>
                                <td className="p-3 border-b">{new Date(assignment.endTime).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DriverDetails;