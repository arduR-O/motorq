import { NextResponse } from 'next/server';
import prisma from "@/lib/prisma";

export async function POST(request) {
    const res = await request.json();
    let { driverId, vehicleId, startTime, endTime } = res;
    driverId = parseInt(driverId, 10);
    vehicleId = parseInt(vehicleId, 10);
    try {
        // Check for overlapping assignments for the driver
        const overlappingDriverAssignments = await prisma.assignment.findMany({
            where: {
                driverId,
                OR: [
                    {
                        startTime: { lte: new Date(endTime) },
                        endTime: { gte: new Date(startTime) }
                    }
                ]
            }
        });

        if (overlappingDriverAssignments.length > 0) {
            return NextResponse.json({ error: "Driver has overlapping assignments" }, { status: 400 });
        }

        // Check for overlapping assignments for the vehicle
        const overlappingVehicleAssignments = await prisma.assignment.findMany({
            where: {
                vehicleId,
                OR: [
                    {
                        startTime: { lte: new Date(endTime) },
                        endTime: { gte: new Date(startTime) }
                    }
                ]
            }
        });

        if (overlappingVehicleAssignments.length > 0) {
            return NextResponse.json({ error: "Vehicle has overlapping assignments" }, { status: 400 });
        }

        // Create the assignment
        const assignment = await prisma.assignment.create({
            data: {
                driverId,
                vehicleId,
                startTime: new Date(startTime),
                endTime: new Date(endTime)
            }
        });

        return NextResponse.json({ assignment });
    } catch (error) {
        console.error(error);
        return NextResponse.error();
    }
}