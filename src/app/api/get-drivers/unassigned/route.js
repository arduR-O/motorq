import prisma from "@/lib/prisma";

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const startTime = new Date(searchParams.get('startTime'));
    const endTime = new Date(searchParams.get('endTime'));

    try {
        // Fetch unassigned drivers from the database
        const unassignedDrivers = await prisma.driver.findMany({
            where: {
                assignments: {
                    none: {
                        OR: [
                            {
                                startTime: { lte: endTime },
                                endTime: { gte: startTime }
                            }
                        ]
                    }
                }
            }
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