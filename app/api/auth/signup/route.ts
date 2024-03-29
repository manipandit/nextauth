import prisma from "@/db";
import { signupBody } from "@/lib/types";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt"


export async function POST(request: NextRequest){
    try {
        const body = await request.json();
        const {firstName, lastName, email, password} = body;

        // do zod validation
        const {success} = signupBody.safeParse(body);

        if(!success) {
            return NextResponse.json({message: "Invalid Inputs"});
        }
        
        const exisitingUser = await prisma.user.findUnique({
            where: {
                email
            }
        })

        if(exisitingUser) return NextResponse.json({message: " user already exists with this email"});

        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                firstName,
                lastName,
                email,
                password: hashedPassword
            }
        })

        return NextResponse.json({message: "User created successfully", id: user.id})
    } catch (error) {
        return NextResponse.json({message: "Something went wrong", error: error})
    }
}