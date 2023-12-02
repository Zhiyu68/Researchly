import { connectDB } from "@/config/dbConfig";
import { validateJWT } from "@/helpers/vaildateJWT";
import Application from "@/models/applicationModel";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function POST(request: NextRequest) {
    try {
        await validateJWT(request);
        const reqBody = await request.json();
        const application = await Application.create(reqBody);
        return NextResponse.json({ 
            message: "You have successfully applied for this project" ,
            data : application ,
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

        const project = searchParams.get("project");
        const filtersObject: any = {};
        if (user) {
            filtersObject["user"] = user;
        }
        if (project) {
            filtersObject["project"] = project;
          }
         const applications = await Application.find(filtersObject)
         .populate("user")
         .populate({
            path: "project",
            populate: {
                path: "user",
            }
         });


        return NextResponse.json({ 
            message: "Project created successfully" , 
            data : applications,
        });
        
    }catch (error:any) {
        console.log(error);
        
        return NextResponse.json({message: error.message}, {status: 500});
        
    }
}

