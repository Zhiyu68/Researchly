import { connectDB } from "@/config/dbConfig";
import { validdateJWT } from "@/helpers/vaildateJWT";
import Project from "@/models/projectModel";

import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function POST(request: NextRequest) {
    try {
        const userId = await validdateJWT(request);
        const reqBody = await request.json();
        const project = await Project.create({ ...reqBody, user: userId});
        return NextResponse.json({ message: "Project created successfully" , data : project,});
        
    } catch (error:any) {
        console.log(error);
        
        return NextResponse.json({message: error.message}, {status: 500});
    }
}

export async function GET(request: NextRequest) {
    try {
        const projects = await Project.find();
        return NextResponse.json({ message: "Project created successfully" , data : projects,});
        
    }catch (error:any) {
        console.log(error);
        
        return NextResponse.json({message: error.message}, {status: 500});
        
    }
}