import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const apiKey = process.env.OPENWEATHERMAP_API_KEY;
    if (!apiKey) throw new Error("API key is missing");

    const searchParams = req.nextUrl.searchParams;
    const lat = searchParams.get("lat");
    const lon = searchParams.get("lon");

    if (!lat || !lon)
      throw new Error("Latitude and Longitude parameters are required");

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    const res = await axios.get(url);

    return NextResponse.json(res.data);
  } catch (error: any) {
    console.error("Error fetching forecast data:", error.message);
    return new Response(`Error fetching forecast data: ${error.message}`, {
      status: 500,
    });
  }
}
