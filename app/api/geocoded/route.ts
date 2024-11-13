import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic"; // Forces the route to be treated dynamically

export async function GET(req: NextRequest) {
  try {
    const apiKey = process.env.OPENWEATHERMAP_API_KEY;
    const searchParams = req.nextUrl.searchParams;

    const city = searchParams.get("search");

    if (!city) {
      throw new Error("City parameter is required");
    }

    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`;

    const res = await axios.get(url);

    if (!res.data || res.data.length === 0) {
      throw new Error("No geocoded data found for the provided city");
    }

    return NextResponse.json(res.data);
  } catch (error: any) {
    console.error("Error fetching geocoded data:", error.message);
    return new Response(`Error fetching geocoded data: ${error.message}`, {
      status: 500,
    });
  }
}
