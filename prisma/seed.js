const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function clearDatabase() {
  await prisma.request.deleteMany({});
  await prisma.assignment.deleteMany({});
  await prisma.driver.deleteMany({});
  await prisma.vehicle.deleteMany({});
  // Add more models here if needed
}


async function main() {
  await clearDatabase();
  const vehicles = [
    { model: 'Toyota Prius', license: 'ABC123' },
    { model: 'Honda Civic', license: 'XYZ789' },
    { model: 'Ford Focus', license: 'LMN456' },
    { model: 'Tesla Model 3', license: 'TESLA3' },
    { model: 'Chevrolet Bolt', license: 'CHEV123' },
  ];

  const createdVehicles = [];

  for (const vehicle of vehicles) {
    const createdVehicle = await prisma.vehicle.create({
      data: vehicle,
    });
    createdVehicles.push(createdVehicle);
  }

  
const drivers = [
  { name: 'John Doe', email: 'john@example.com', phone: '1234567890', location: JSON.stringify({ lat: 40.71, lng: -74.01 }) }, // New York
  { name: 'Jane Smith', email: 'jane@example.com', phone: '0987654321', location: JSON.stringify({ lat: 34.05, lng: -118.24 }) }, // Los Angeles
  { name: 'Alice Johnson', email: 'alice@example.com', phone: '1122334455', location: JSON.stringify({ lat: 41.88, lng: -87.63 }) }, // Chicago
  { name: 'Bob Brown', email: 'bob@example.com', phone: '6677889900', location: JSON.stringify({ lat: 29.76, lng: -95.37 }) }, // Houston
  { name: 'Charlie Davis', email: 'charlie@example.com', phone: '5566778899', location: JSON.stringify({ lat: 33.45, lng: -112.07 }) }, // Phoenix
];

  for (const driver of drivers) {
    await prisma.driver.create({
      data: driver,
    });
  }

  console.log('Dummy data added to Vehicle and Driver models');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });