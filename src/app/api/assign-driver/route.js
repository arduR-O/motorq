import { NextResponse } from 'next/server';
import prisma from "@/lib/prisma";

export async function POST(request) {
    const res = await request.json();
    const { driverId, vehicleId } = res;
    try {
        // Update the vehicle with the driverId
        const vehicleUpdate = prisma.vehicle.update({
            where: { id: vehicleId },
            data: { driverId }
        });

        // Update the driver with the vehicleId
        const driverUpdate = prisma.driver.update({
            where: { id: driverId },
            data: { vehicleId }
        });

        // Execute both updates in a transaction
        const [vehicleResult, driverResult] = await prisma.$transaction([vehicleUpdate, driverUpdate]);

        return NextResponse.json({ vehicleResult, driverResult });
    } catch (error) {
        console.error(error);
        return NextResponse.error();
    }
}

export async function DELETE(request) {
    const res = await request.json();
    const { vehicleId } = res;
    try {
        // Find the driverId associated with the vehicle
        const vehicle = await prisma.vehicle.findUnique({
            where: { id: vehicleId },
            select: { driverId: true }
        });

        if (!vehicle || !vehicle.driverId) {
            console.log(vehicleId)
            throw new Error('Vehicle or driver not found');
        }

        const driverId = vehicle.driverId;

        // Update the vehicle to remove the driverId
        const vehicleUpdate = prisma.vehicle.update({
            where: { id: vehicleId },
            data: { driverId: null }
        });

        // Update the driver to remove the vehicleId
        const driverUpdate = prisma.driver.update({
            where: { id: driverId },
            data: { vehicleId: null }
        });

        // Execute both updates in a transaction
        const [vehicleResult, driverResult] = await prisma.$transaction([vehicleUpdate, driverUpdate]);

        return NextResponse.json({ vehicleResult, driverResult });
    } catch (error) {
        console.error(error);
        return NextResponse.error();
    }
}