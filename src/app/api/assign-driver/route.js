import { NextResponse } from 'next/server';
import prisma from "@/lib/prisma";

export async function POST(request) {
    const res = await request.json();
    const { driverId, vehicleId } = res;
    try {
        const result = await prisma.vehicle.update({
            where: { id: vehicleId },
            data: { driverId }
        });
        return NextResponse.json({ result });
    } catch (error) {
        console.error(error);
        return NextResponse.error();
    }
}

export async function DELETE(request) {
    const res = await request.json();
    const { vehicleId } = res;
    try {
        const result = await prisma.vehicle.update({
            where: { id: vehicleId },
            data: { driverId: null }
        });
        return NextResponse.json({ result });
    } catch (error) {
        console.error(error);
        return NextResponse.error();
    }
}