import { middleware } from "@/middleware";
import { request } from "http";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  
  middleware(req);

  const { DepartureTime, DepartureLocationCode, ArrivalLocationCode } =
    await req.json();
const data = {
  DepartureTime,
  DepartureLocationCode,
  ArrivalLocationCode
}
  return NextResponse.json(data, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}
