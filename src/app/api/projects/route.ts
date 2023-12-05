import { connectDB } from "@/config/dbConfig";
import { validateJWT } from "@/helpers/validateJWT";
import Project from "@/models/projectModel";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function POST(request: NextRequest) {
    try {
        const userId = await validateJWT(request);
        const reqBody = await request.json();
        const project = await Project.create({ ...reqBody, user: userId});
        return NextResponse.json({ 
            message: "Project created successfully" ,
            data : project,
        });
    } catch (error:any) {
        console.log(error);
        return NextResponse.json({message: error.message}, {status: 500});
    }
}

export async function GET(request: NextRequest) {
    try {
        validateJWT(request);

        // fetch query string parameters
        const { searchParams } = new URL(request.url);
        const user = searchParams.get('user');
        
        const filtersObject: any = {};
        if (user) {
            filtersObject["user"] = user;
        }
        const projects = await Project.find(filtersObject).populate("user");
        return NextResponse.json({ 
            message: "Project created successfully" , 
            data : projects,
        });
        
    }catch (error:any) {
        console.log(error);
        
        return NextResponse.json({message: error.message}, {status: 500});
        
    }
}

