import prisma from "@/lib/prisma";


export async function GET(request) {
    try {
        // Fetch all drivers from the database
        const drivers = await prisma.driver.findMany();
        
        // Return the drivers as a JSON response
        return new Response(JSON.stringify(drivers), {
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error(error);
        return new Response('Internal Server Error', { status: 500 });
    }
}