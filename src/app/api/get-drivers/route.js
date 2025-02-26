import prisma from "@/lib/prisma";


export async function GET(request) {
    try {
        const drivers = await prisma.driver.findMany();
        
        return new Response(JSON.stringify(drivers), {
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error(error);
        return new Response('Internal Server Error', { status: 500 });
    }
}