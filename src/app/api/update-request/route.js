import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { RequestStatus } from "@prisma/client";

export async function POST(request) {
  const { requestId, action } = await request.json();

  try {
    await prisma.$transaction(async (prisma) => {
    const currentRequest = await prisma.request.findUnique({
        where: { id: requestId },
    });

    if (currentRequest.status === RequestStatus.REJECTED) {
        throw new Error("Request is already rejected");
    }
      const updatedRequest = await prisma.request.update({
        where: { id: requestId },
        data: { status: RequestStatus[action] },
      });

      if (action === "APPROVED") {

        await prisma.assignment.create({
          data: {
            driverId: updatedRequest.driverId,
            vehicleId: updatedRequest.vehicleId,
            startTime: updatedRequest.startTime,
            endTime: updatedRequest.endTime,
          },
        });
        await prisma.request.updateMany({
          where: {
            vehicleId: updatedRequest.vehicleId,
            startTime: updatedRequest.startTime,
            endTime: updatedRequest.endTime,
            status: RequestStatus.PENDING,
          },
          data: {
            status: RequestStatus.REJECTED,
          },
        });
      }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating request:", error);
    return NextResponse.error();
  }
}
