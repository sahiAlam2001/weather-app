import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const lat = searchParams.get("lat");
    const lon = searchParams.get("lon");

    if (!lat || !lon) {
      throw new Error("Latitude and Longitude parameters are required");
    }

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=uv_index_max,uv_index_clear_sky_max&timezone=auto&forecast_days=1`;

    const res = await fetch(url, { next: { revalidate: 900 } });
    if (!res.ok) {
      throw new Error(`Failed to fetch UV data: ${res.statusText}`);
    }

    const uvData = await res.json();
    return NextResponse.json(uvData);
  } catch (error: any) {
    console.error("Error Getting UV Data:", error.message);
    return new Response(`Error getting UV Data: ${error.message}`, {
      status: 500,
    });
  }
}
