/*
  Warnings:

  - A unique constraint covering the columns `[vehicleId]` on the table `Driver` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Driver" ADD COLUMN     "vehicleId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Driver_vehicleId_key" ON "Driver"("vehicleId");
