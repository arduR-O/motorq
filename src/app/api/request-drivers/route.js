import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request) {
    const res = await request.json();
    const { driverIds, vehicleId, startTime, endTime } = res;

    try {
        const requests = driverIds.map(driverId => {
            return prisma.request.create({
                data: {
                    driverId: parseInt(driverId, 10),
                    vehicleId: parseInt(vehicleId, 10),
                    startTime: new Date(startTime),
                    endTime: new Date(endTime)
                }
            });
        });

        const results = await Promise.all(requests);
        return NextResponse.json({ results });
    } catch (error) {
        console.error("Error requesting driver assignments:", error);
        return NextResponse.error();
    }
}