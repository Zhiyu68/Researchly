import { connectDB } from "@/config/dbConfig";
import { sendEmail } from "@/helpers/sendEmail";
import { validateJWT } from "@/helpers/validateJWT";
import Application from "@/models/applicationModel";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function POST(request: NextRequest) {
    try {
        await validateJWT(request);
        
        const reqBody = await request.json();
        const application: any = await Application.create(reqBody);

        const applicationData: any = await Application.findById(application._id)
      .populate("user")
      .populate({
        path: "project",
        populate: {
          path: "user",
        },
      });


        await sendEmail({
            to : applicationData.user.email,
            subject: " New application received ",
            text:`Your have received application from ${applicationData.user.name}`,

            html:`<div>
            <p> Your have received application from ${applicationData.user.name} </p> 
            
            <p> 
            Applicant's name is ${applicationData.project.user.name}
            </p>
            
            <p> 
            Applicant's email: ${applicationData.project.email}
            </p>
          
            <p> 
            Applicant's phone number: ${applicationData.project.email}
            </p>
            </div>`,
        });

        return NextResponse.json({ 
            message: "You have successfully applied for this project" ,
            data : applicationData ,
        });
    } catch (error:any) {
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

