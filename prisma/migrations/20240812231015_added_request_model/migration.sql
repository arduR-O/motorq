/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Driver` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[license]` on the table `Vehicle` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "RequestStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateTable
CREATE TABLE "Request" (
    "id" SERIAL NOT NULL,
    "driverId" INTEGER NOT NULL,
    "vehicleId" INTEGER NOT NULL,
    "status" "RequestStatus" NOT NULL DEFAULT 'PENDING',
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Request_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Driver_email_key" ON "Driver"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Vehicle_license_key" ON "Vehicle"("license");

-- AddForeignKey
ALTER TABLE "Request" ADD CONSTRAINT "Request_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "Driver"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Request" ADD CONSTRAINT "Request_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
