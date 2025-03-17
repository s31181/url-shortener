import { getLocalNetworkIP } from "../../../utils/getLocalIP";
import { NextResponse } from 'next/server';


export async function GET() {
    const ip = getLocalNetworkIP(); // Example IP address
    return NextResponse.json({ ip });
}
