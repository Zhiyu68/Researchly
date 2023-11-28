import { connectDB } from "@/config/dbConfig";
import { validdateJWT } from "@/helpers/vaildateJWT";
import User from "@/models/userModel";
import { NextRequest,NextResponse } from "next/server";

connectDB();


export async function PUT(request : NextRequest) {
try {
    await validdateJWT(request);

    const reqBody = await request.json();
    const updateUser = await User.findByIdAndUpdate(
        reqBody._id,
        reqBody,
        {
            new: true
        }).select("-password");
    if (!updateUser) {
        throw new Error("No user found");
    }
    return NextResponse.json({
        message: "User data uodated successfully",
        data: updateUser,
    });
    

} catch (error:any) {
    return NextResponse.json({message: error.message }, { status: 403 });
}
    
}