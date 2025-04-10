import { NextResponse } from 'next/server';
import { getEducationIds } from '@/utils/messages';

export async function GET(request: Request) {
  try {
    // Get the locale from the URL or query parameter
    const url = new URL(request.url);
    const locale = url.searchParams.get('locale') || 'it';
    
    console.log(`API: Fetching education IDs for locale: ${locale}`);
    
    // Get the education IDs for the specified locale (now awaiting the async function)
    const educationIds = await getEducationIds(locale);
    
    console.log(`API: Found ${educationIds.length} education IDs`);
    
    // Return the education IDs as JSON
    return NextResponse.json({ educationIds });
  } catch (error) {
    console.error('Error in education API route:', error);
    return NextResponse.json({ error: 'Failed to fetch education data', details: error instanceof Error ? error.message : String(error) }, { status: 500 });
  }
}
