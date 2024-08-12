import { NextResponse } from 'next/server';
import prisma from "@/lib/prisma";

export async function GET(request, { params }) {
    const { id } = params;
    const driverId = parseInt(id, 10);

    try {
        const driver = await prisma.driver.findUnique({
            where: { id: driverId },
            include: { assignments: true }
        });

        if (!driver) {
            return NextResponse.json({ error: "Driver not found" }, { status: 404 });
        }

        return NextResponse.json({ driver });
    } catch (error) {
        console.error(error);
        return NextResponse.error();
    }
}