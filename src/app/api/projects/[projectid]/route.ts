import { connectDB } from "@/config/dbConfig";
import { validateJWT } from "@/helpers/validateJWT";
import Project from "@/models/projectModel";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function GET(request: NextRequest, {params}:any) {
    try {
        validateJWT(request);
        const project = await Project.findById(params.projectid);
        return NextResponse.json({
            message: " Project fetched successfully ",
            data: project,
        });
    } catch (error:any) {
        console.log(error);
        return NextResponse.json({ message: error.message }, { status: 500 });
        
    }
}

export async function PUT(request: NextRequest, { params }: any) {
    try {
        dateJWT(request);
        const reqBody = await request.json();
        const projects = await Project.findByIdAndUpdate(params.projectid, reqBody, {
            new: true,
            runValidators: true,
        });
        return NextResponse.json({ message: "Project updated successfully" , data : projects,});
    }catch (error:any) {
        return NextResponse.json({message: error.message}, {status: 500});
        
    }
}

export async function DELETE(request: NextRequest, { params }: any) {
    try {
        validateJWT(request);
        const project = await Project.findByIdAndDelete(params.projectid);
        return NextResponse.json({ message: "Project deleted successfully" , data : project,});
    }catch (error:any) {
        return NextResponse.json({message: error.message}, {status: 500});
    } 
}

function dateJWT(request: NextRequest) {
    throw new Error("Function not implemented.");
}
