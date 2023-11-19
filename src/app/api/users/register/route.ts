
import { connectDB } from "@/config/dbConfig";
import { NextRequest,NextResponse } from "next/server";
connectDB() 

export async function GET(request:NextRequest) {
    return NextResponse.json({message: "users/register api accessed with get method",})
}

export async function POST(request:NextRequest) {
    return NextResponse.json({message: "users/register api accessed with post method",})}
