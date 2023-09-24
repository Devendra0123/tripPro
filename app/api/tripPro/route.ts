import { NextRequest, NextResponse } from "next/server";

export async function OPTIONS(request: Request) {
  const allowedOrigin = request.headers.get("origin");
  const response = new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": allowedOrigin || "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers":
        "Content-Type, Authorization, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Date, X-Api-Version",
      "Access-Control-Max-Age": "86400",
    },
  });

  return response;
}

export async function POST(request: Request) {
  const origin = request.headers.get("origin");

  const { DepartureTime, DepartureLocationCode, ArrivalLocationCode } =
    await request.json();

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Accept-Encoding", "gzip,deflate");
  myHeaders.append("Accept", "application/json");
  myHeaders.append("SearchAccessToken", "6c1bd9412e24462a9c30e9b5514effd1");

  var raw = JSON.stringify({
    OtherInfo: { RequestedIP: "192.168.11.239", TransactionId: "123456" },
    CurrencyInfo: { CurrencyCode: "USD" },
    PaxDetails: {
      NoOfAdults: { count: "1" },
      NoOfInfants: { count: "0", age: "0" },
      NoOfChildren: { count: "0", age: "0" },
    },
    OriginDestination: [
      {
        DepartureTime: DepartureTime,
        DepartureLocationCode: DepartureLocationCode,
        ArrivalLocationCode: ArrivalLocationCode,
        CabinClass: "E",
      },
    ],
    Incremental: "false",
  });

  var requestOptions: any = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const res = await fetch(
    "http://mas.trippro.com/resources/v2/Flights/search",
    requestOptions
  ).then(res=> res.json());

  return new NextResponse(JSON.stringify(res), {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}
