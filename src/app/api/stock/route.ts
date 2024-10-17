import { NextResponse } from "next/server";

export async function GET (request: Request) {
  const { searchParams } = new URL (request.url);
  const symbol = searchParams.get("symbol");
  const apiKey = process.env.ALPHA_VANTAGE_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "API key not found" },
      { status: 500 }
    );
  }

  const res = await fetch(
    `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&outputsize=compact&apikey=${apiKey}`
  );

  if (!res.ok) {
    return NextResponse.json(
      { error: "Failed to fetch data from Alpha Vantage" },
      { status: res.status }
    );
  }

  const data = await res.json();

  return NextResponse.json(data);
}