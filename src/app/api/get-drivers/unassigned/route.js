import prisma from "@/lib/prisma";

export async function GET(request) {
    try {
        // Fetch unassigned drivers from the database
        const unassignedDrivers = await prisma.driver.findMany({
            where: {
                vehicleId: null, // Assuming `vehicleId` is null for unassigned drivers
            },
        });

        // Return the unassigned drivers as a JSON response
        return new Response(JSON.stringify(unassignedDrivers), {
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error(error);
        return new Response('Internal Server Error', { status: 500 });
    }
}