import {NextResponse} from 'next/server';

export async function POST(request){
    const res = await request.json();
    const {id, name, email, phone, location} = res;
    const result = await prisma.post.create({
        data:{
            id,
            name,
            email,
            phone,
            location
        }
    })
    return NextResponse.json({data:res})
}