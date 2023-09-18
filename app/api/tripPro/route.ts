import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { DepartureTime, DepartureLocationCode, ArrivalLocationCode } =
    await req.json();

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
  );
  const data = await res.json();
  return NextResponse.json({ data });
}
