import { NextResponse } from 'next/server';
import prisma from "@/lib/prisma";

export async function GET(request, {params}) {
    const driverId = parseInt(params.id, 10);
    console.log("driver id " + driverId);

    try {
        const pendingRequests = await prisma.request.findMany({
            where: {
                driverId,
                status: 'PENDING'
            },
            include: {
                vehicle: true
            }
        });

        return NextResponse.json(pendingRequests);
    } catch (error) {
        console.error("Error fetching pending requests:", error);
        return NextResponse.error();
    }
}