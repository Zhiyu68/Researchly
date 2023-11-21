import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const validdateJWT =async (request:NextRequest) => {
    try {
        const token = request.cookies.get("token")?.value;
        if(!token){
            throw new Error("No token found");
        }
        const decodedDate:any = jwt.verify(token, process.env.JWT_SECRET!);
        return decodedDate.userId;
    } catch (error:any) {
        throw new Error(error.message);
    }
}