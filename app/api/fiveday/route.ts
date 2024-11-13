import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

// Force dynamic behavior for the API route
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const apiKey = process.env.OPENWEATHERMAP_API_KEY;

    // Access query parameters
    const searchParams = req.nextUrl.searchParams;
    const lat = searchParams.get("lat");
    const lon = searchParams.get("lon");

    // Check if lat and lon are provided
    if (!lat || !lon) {
      throw new Error("Latitude and Longitude are required");
    }

    // Construct the API URL
    const dailyUrl = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;

    // Use axios to make the request
    const dailyRes = await axios.get(dailyUrl);

    // Return the response data
    return NextResponse.json(dailyRes.data);
  } catch (error: any) {
    console.error("Error in getting daily data:", error.message);
    return new Response(`Error in getting daily data: ${error.message}`, {
      status: 500,
    });
  }
}
