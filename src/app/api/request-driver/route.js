import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request) {
  const res = await request.json();
  const { driverId, vehicleId, startTime, endTime } = res;

  try {
    // Check for overlapping assignments for the driver
    const overlappingDriverAssignments = await prisma.assignment.findMany({
      where: {
        driverId: parseInt(driverId, 10),
        OR: [
          {
            startTime: { lte: new Date(endTime) },
            endTime: { gte: new Date(startTime) },
          },
        ],
      },
    });

    if (overlappingDriverAssignments.length > 0) {
      return NextResponse.json(
        { error: "Driver has overlapping assignments" },
        { status: 400 }
      );
    }

    // Check for overlapping assignments for the vehicle
    const overlappingVehicleAssignments = await prisma.assignment.findMany({
      where: {
        vehicleId: parseInt(vehicleId, 10),
        OR: [
          {
            startTime: { lte: new Date(endTime) },
            endTime: { gte: new Date(startTime) },
          },
        ],
      },
    });

    if (overlappingVehicleAssignments.length > 0) {
      return NextResponse.json(
        { error: "Vehicle has overlapping assignments" },
        { status: 400 }
      );
    }

    const request = await prisma.request.create({
      data: {
        driverId: parseInt(driverId, 10),
        vehicleId: parseInt(vehicleId, 10),
        startTime: new Date(startTime),
        endTime: new Date(endTime),
      },
    });

    return NextResponse.json({ request });
  } catch (error) {
    console.error("Error requesting driver assignment:", error);
    return NextResponse.error();
  }
}
