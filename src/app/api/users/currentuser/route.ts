import { connectDB } from "@/config/dbConfig";
import { validdateJWT } from "@/helpers/vaildateJWT";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connectDB();


export async function GET(request: NextRequest) {
    try {
        const userId = await validdateJWT(request);
        const user = await User.findById(userId).select("-password");
        if (!user) {
            throw new Error("No user found");
        }
        return NextResponse.json({ message: "User data fetched successfully" , data : user});
        
    } catch (error:any) {
        return NextResponse.json({message: error.message}, {status: 500});
    }
}