import {NextResponse} from 'next/server';
import prisma from "@/lib/prisma";
import { parse } from 'dotenv';

export async function POST(request){
    const res = await request.json();
    console.log(res);
    const {driverId, name, driverEmail, driverPhone, location} = res;
    const intDriverId = parseInt(driverId, 10);
    try {
        const result = await prisma.driver.create({
            data:{
                id : intDriverId,
                name,
                email : driverEmail,
                phone: driverPhone,
                location
            }
        });
        return NextResponse.json({result});
    } catch (error) {
        // Handle the error here
        // console.log("Error creating data:", error);
        console.error(error);
        return NextResponse.error();
    }
}