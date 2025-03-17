import { NextResponse } from 'next/server';
import { nanoid } from 'nanoid';
import { setupDb } from '../../../lib/db.mjs';

// This function handles POST requests to shorten URLs
export async function POST(request: Request) {
  const db = await setupDb(); // Initialize the database
  const { url } = await request.json(); // Parse the incoming request to get the URL
  let item = await db.get('SELECT * FROM urls WHERE originalUrl = ?', [url]);

  if (item) {
    return NextResponse.json({ ...item });
  }
  // Validate the URL
  if (!url || !isValidUrl(url)) {
    return NextResponse.json({ error: 'Not a valid URL' }, { status: 400 });
  }

  // Fetch the URL content to extract OG metadata
  const response = await fetch(url);
  const html = await response.text();
  const metaOgTitle = extractMetaTagContent(html, 'og:title');
  const metaOgDescription = extractMetaTagContent(html, 'og:description');
  const metaOgImage = extractMetaTagContent(html, 'og:image');

  try {
    const ipResponse = await fetch('http://localhost:3000/api/ip');
    if (!ipResponse.ok) {
      throw new Error('Failed to fetch IP data');
    }
    const ipData = await ipResponse.json();
    console.log("IP Data: ", ipData);

    const shortId = nanoid(6); // Generate a unique short ID

    // Insert the short ID, original URL, and OG metadata into the database
    await db.run(
      'INSERT INTO urls (shortId, originalUrl, metaOgTitle, metaOgDescription, metaOgImage, ip) VALUES (?, ?, ?, ?, ?, ?)',
      [shortId, url, metaOgTitle, metaOgDescription, metaOgImage, ipData.ip]
    );

    item = await db.get('SELECT * FROM urls WHERE originalUrl = ?', [url]);

    // Return the short ID as a JSON response
    return NextResponse.json({ ...item });
  } catch (error) {
    console.error('Error fetching IP data:', error);
    return NextResponse.json({ error: 'Failed to fetch IP data' }, { status: 500 });
  }
}

// Helper function to validate URLs
async function isValidUrl(url: string): Promise<boolean> {
  try {
    const urlObj = new URL(url);
    const response = await fetch(urlObj.toString());
    if (!response.ok) {
      return false;
    }
    return true;
  } catch {
    return false;
  }
}

// Helper function to extract content from meta tags
function extractMetaTagContent(html: string, property: string): string | null {
  if (property === 'og:title') {
    const titleTagMatch = html.match(/<title>(.*?)<\/title>/i);
    if (titleTagMatch) {
      return titleTagMatch[1];
    }
  }
  const regex = new RegExp(`<meta property="${property}" content="(.*?)"`, 'i');
  const match = html.match(regex);
  return match ? match[1] : null;
}
