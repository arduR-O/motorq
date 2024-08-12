"use client"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

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
        return <div>Loading...</div>;
    }

    if (!driver) {
        return <div>No driver found.</div>;
    }

    return (
        <div>
            <h1>Driver Details</h1>
            <p><strong>Name:</strong> {driver.name}</p>
            <p><strong>Email:</strong> {driver.email}</p>
            <p><strong>Phone:</strong> {driver.phone}</p>
            <p><strong>Location:</strong> {driver.location}</p>

            <h2>Assignments</h2>
            <table>
                <thead>
                    <tr>
                        <th>Vehicle ID</th>
                        <th>Start Time</th>
                        <th>End Time</th>
                    </tr>
                </thead>
                <tbody>
                    {driver.assignments.map(assignment => (
                        <tr key={assignment.id}>
                            <td>{assignment.vehicleId}</td>
                            <td>{new Date(assignment.startTime).toLocaleString()}</td>
                            <td>{new Date(assignment.endTime).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DriverDetails;