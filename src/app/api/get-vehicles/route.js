import { NextResponse } from 'next/server';
import prisma from "@/lib/prisma";

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const startTime = searchParams.get('startTime');
    const endTime = searchParams.get('endTime');

    let vehicles;

    if (startTime && endTime) {
        vehicles = await prisma.vehicle.findMany({
            where: {
                OR: [
                    {
                        assignments: {
                            none: {
                                startTime: { lte: new Date(endTime) },
                                endTime: { gte: new Date(startTime) }
                            }
                        }
                    },
                    {
                        assignments: {
                            some: {
                                startTime: { gt: new Date(endTime) },
                                endTime: { lt: new Date(startTime) }
                            }
                        }
                    }
                ]
            }
        });
    } else {
        vehicles = await prisma.vehicle.findMany();
    }

    return NextResponse.json(vehicles);
}