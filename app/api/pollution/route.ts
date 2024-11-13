import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

// Mark the route as dynamic to prevent Next.js from trying to statically generate it
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const lat = searchParams.get("lat");
    const lon = searchParams.get("lon");

    const apiKey = process.env.OPENWEATHERMAP_API_KEY;

    if (!apiKey) {
      throw new Error("API key is missing");
    }

    if (!lat || !lon) {
      throw new Error("Latitude and Longitude parameters are required.");
    }

    const url = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    const res = await axios.get(url);

    return NextResponse.json(res.data);
  } catch (error) {
    console.error("Error fetching pollution data: ", error);
    return new Response("Error fetching pollution data", { status: 500 });
  }
}
